import fs from "fs/promises";
import path from "path";
import { ProjectItem } from "./types";
import { projectsData as defaultProjects } from "@/data/projects";
import { supabaseAdmin } from "./supabase";

const PROJECTS_FILE_PATH = path.join(process.cwd(), "src", "data", "projects.json");

function rowToProject(row: any): ProjectItem {
  return {
    id: row.id,
    name: row.name,
    location: row.location || "Nairobi, Kenya",
    category: row.category || "Other Projects",
    description: row.description || "",
    fullDetails: row.full_details || row.fullDetails || "",
    image: row.image || "/assets/projects/project_swimming_pool.jpg",
    systemsUsed: Array.isArray(row.systems_used)
      ? row.systems_used
      : Array.isArray(row.systemsUsed)
      ? row.systemsUsed
      : typeof row.systems_used === "string"
      ? JSON.parse(row.systems_used)
      : [],
    scope: row.scope || "",
    client: row.client || "",
    completionYear: row.completion_year || row.completionYear || "",
    featured: row.featured ?? false,
    status: row.status || "published",
    createdAt: row.created_at || row.createdAt,
    updatedAt: row.updated_at || row.updatedAt,
  };
}

function projectToRow(project: ProjectItem): any {
  return {
    id: project.id,
    name: project.name,
    location: project.location,
    category: project.category,
    description: project.description,
    full_details: project.fullDetails,
    image: project.image,
    systems_used: project.systemsUsed,
    scope: project.scope,
    client: project.client || null,
    completion_year: project.completionYear || null,
    featured: project.featured ?? false,
    status: project.status || "published",
    updated_at: new Date().toISOString(),
  };
}

// Fallback to local JSON file
async function getLocalProjects(): Promise<ProjectItem[]> {
  try {
    const fileContent = await fs.readFile(PROJECTS_FILE_PATH, "utf-8");
    const parsed = JSON.parse(fileContent);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // If file missing, populate from default static projects
    try {
      await saveLocalProjects(defaultProjects as ProjectItem[]);
      return defaultProjects as ProjectItem[];
    } catch {
      // ignore
    }
  }
  return defaultProjects as ProjectItem[];
}

async function saveLocalProjects(projects: ProjectItem[]): Promise<void> {
  try {
    const dir = path.dirname(PROJECTS_FILE_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(PROJECTS_FILE_PATH, JSON.stringify(projects, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving local projects file:", err);
  }
}

export async function getAllProjects(): Promise<ProjectItem[]> {
  // 1. Try Supabase Cloud
  try {
    const { data, error } = await supabaseAdmin
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      return data.map(rowToProject);
    }

    // If Supabase table exists but has 0 records, seed it from local projects
    if (!error && Array.isArray(data) && data.length === 0) {
      const local = await getLocalProjects();
      if (local.length > 0) {
        const rows = local.map(projectToRow);
        await supabaseAdmin.from("projects").insert(rows);
        return local;
      }
    }
  } catch {
    // Supabase offline or table not yet created, use local
  }

  // 2. Fallback to local
  return await getLocalProjects();
}

export async function getProjectById(id: string): Promise<ProjectItem | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from("projects")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (!error && data) {
      return rowToProject(data);
    }
  } catch {
    // fallback
  }

  const projects = await getAllProjects();
  return projects.find((p) => p.id === id) || null;
}

export async function createProject(
  newProject: Omit<ProjectItem, "id" | "createdAt" | "updatedAt"> & { id?: string }
): Promise<ProjectItem> {
  const projects = await getAllProjects();
  const id =
    newProject.id ||
    newProject.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") ||
    `project-${Date.now()}`;

  let counter = 1;
  let uniqueId = id;
  while (projects.some((p) => p.id === uniqueId)) {
    uniqueId = `${id}-${counter++}`;
  }

  const now = new Date().toISOString();
  const project: ProjectItem = {
    ...newProject,
    id: uniqueId,
    status: newProject.status || "published",
    createdAt: now,
    updatedAt: now,
  };

  // 1. Save to Supabase Cloud
  try {
    await supabaseAdmin.from("projects").insert(projectToRow(project));
  } catch (err) {
    console.error("Supabase project insert error (saving locally):", err);
  }

  // 2. Save locally
  projects.unshift(project);
  await saveLocalProjects(projects);

  return project;
}

export async function updateProject(
  id: string,
  updates: Partial<ProjectItem>
): Promise<ProjectItem | null> {
  const projects = await getAllProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updated: ProjectItem = {
    ...projects[index],
    ...updates,
    id,
    updatedAt: new Date().toISOString(),
  };

  // 1. Update in Supabase
  try {
    await supabaseAdmin.from("projects").update(projectToRow(updated)).eq("id", id);
  } catch (err) {
    console.error("Supabase project update error (updating locally):", err);
  }

  // 2. Update locally
  projects[index] = updated;
  await saveLocalProjects(projects);

  return updated;
}

export async function deleteProject(id: string): Promise<boolean> {
  // 1. Delete from Supabase
  try {
    await supabaseAdmin.from("projects").delete().eq("id", id);
  } catch (err) {
    console.error("Supabase project delete error (deleting locally):", err);
  }

  // 2. Delete locally
  const projects = await getLocalProjects();
  const filtered = projects.filter((p) => p.id !== id);
  await saveLocalProjects(filtered);

  return true;
}

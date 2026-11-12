import { NextRequest, NextResponse } from "next/server";
import { getAllProjects, createProject } from "@/lib/projects-store";
import { isAuthenticated, verifyAuthToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const showAll = searchParams.get("all") === "true";

    let projects = await getAllProjects();

    if (!showAll) {
      projects = projects.filter((p) => p.status !== "draft");
    } else {
      const token = request.headers.get("Authorization")?.replace("Bearer ", "");
      const isAuthed = (await isAuthenticated()) || verifyAuthToken(token);
      if (!isAuthed) {
        projects = projects.filter((p) => p.status !== "draft");
      }
    }

    if (category && category !== "All Projects") {
      projects = projects.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      projects = projects.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fullDetails.toLowerCase().includes(q) ||
          p.scope.toLowerCase().includes(q) ||
          p.systemsUsed.some((s) => s.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    const authed = (await isAuthenticated()) || verifyAuthToken(token);
    if (!authed) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin access required." },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { success: false, message: "Project name is required" },
        { status: 400 }
      );
    }

    if (!body.description || !body.description.trim()) {
      return NextResponse.json(
        { success: false, message: "Project description is required" },
        { status: 400 }
      );
    }

    const created = await createProject({
      name: body.name.trim(),
      location: body.location?.trim() || "Nairobi, Kenya",
      category: body.category || "Other Projects",
      description: body.description.trim(),
      fullDetails: body.fullDetails?.trim() || body.description.trim(),
      image: body.image || "/assets/projects/project_swimming_pool.jpg",
      systemsUsed: Array.isArray(body.systemsUsed)
        ? body.systemsUsed
        : typeof body.systemsUsed === "string"
        ? body.systemsUsed.split(",").map((s: string) => s.trim()).filter(Boolean)
        : [],
      scope: body.scope?.trim() || "",
      client: body.client?.trim() || "",
      completionYear: body.completionYear?.trim() || new Date().getFullYear().toString(),
      featured: body.featured === true,
      status: body.status || "published",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Project published successfully",
        project: created,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create project" },
      { status: 500 }
    );
  }
}


import fs from "fs/promises";
import path from "path";
import { BlogPost } from "./types";
import { blogPostsData } from "@/data/blog";
import { supabaseAdmin } from "./supabase";

const POSTS_FILE_PATH = path.join(process.cwd(), "src", "data", "posts.json");

function rowToPost(row: any): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    date: row.date,
    monthYear: row.month_year || row.monthYear,
    isNewsletter: row.is_newsletter ?? row.isNewsletter ?? false,
    newsletterEdition: row.newsletter_edition || row.newsletterEdition,
    pdfUrl: row.pdf_url || row.pdfUrl || "",
    readTime: row.read_time || row.readTime || "5 min read",
    summary: row.summary,
    image: row.image,
    author: row.author,
    projectHighlightsTitle: row.project_highlights_title || row.projectHighlightsTitle || "Project Highlights",
    projectHighlights: row.project_highlights || row.projectHighlights || [],
    storylineTitle: row.storyline_title || row.storylineTitle || "Our Storyline",
    storylineContent: row.storyline_content || row.storylineContent || [],
    content: row.content || [],
    keyTakeaways: row.key_takeaways || row.keyTakeaways || [],
    status: row.status || "published",
    featured: row.featured || false,
    createdAt: row.created_at || row.createdAt,
    updatedAt: row.updated_at || row.updatedAt,
  };
}

function postToRow(post: BlogPost): any {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    category: post.category,
    date: post.date,
    month_year: post.monthYear || null,
    is_newsletter: post.isNewsletter || false,
    newsletter_edition: post.newsletterEdition || null,
    pdf_url: post.pdfUrl || null,
    read_time: post.readTime || "5 min read",
    summary: post.summary,
    image: post.image,
    author: post.author || null,
    project_highlights_title: post.projectHighlightsTitle || null,
    project_highlights: post.projectHighlights || [],
    storyline_title: post.storylineTitle || null,
    storyline_content: post.storylineContent || [],
    content: post.content || [],
    key_takeaways: post.keyTakeaways || [],
    status: post.status || "published",
    featured: post.featured || false,
    updated_at: new Date().toISOString(),
  };
}

// Fallback to local JSON file
async function getLocalPosts(): Promise<BlogPost[]> {
  try {
    const fileContent = await fs.readFile(POSTS_FILE_PATH, "utf-8");
    const parsed = JSON.parse(fileContent);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // If file missing
  }
  return [];
}

async function saveLocalPosts(posts: BlogPost[]): Promise<void> {
  try {
    const dir = path.dirname(POSTS_FILE_PATH);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(POSTS_FILE_PATH, JSON.stringify(posts, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving local posts file:", err);
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  // 1. Try fetching from Supabase Cloud
  try {
    const { data, error } = await supabaseAdmin
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      return data.map(rowToPost);
    }

    // If Supabase table exists but has 0 records, seed it from local
    if (!error && Array.isArray(data) && data.length === 0) {
      const local = await getLocalPosts();
      if (local.length > 0) {
        const rows = local.map(postToRow);
        await supabaseAdmin.from("posts").insert(rows);
        return local;
      }
    }
  } catch {
    // Supabase not ready or offline, fallback to local
  }

  // 2. Fallback to local posts
  return await getLocalPosts();
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (!error && data) {
      return rowToPost(data);
    }
  } catch {
    // Fallback
  }

  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from("posts")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (!error && data) {
      return rowToPost(data);
    }
  } catch {
    // Fallback
  }

  const posts = await getAllPosts();
  return posts.find((p) => p.id === id) || null;
}

export async function createPost(
  newPost: Omit<BlogPost, "id" | "createdAt" | "updatedAt"> & { id?: string }
): Promise<BlogPost> {
  const posts = await getAllPosts();
  const id = newPost.id || `post-${Date.now()}`;
  const now = new Date().toISOString();

  let slug = newPost.slug;
  if (!slug) {
    slug = newPost.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  let counter = 1;
  let uniqueSlug = slug;
  while (posts.some((p) => p.slug === uniqueSlug)) {
    uniqueSlug = `${slug}-${counter++}`;
  }

  const post: BlogPost = {
    ...newPost,
    id,
    slug: uniqueSlug,
    status: newPost.status || "published",
    createdAt: now,
    updatedAt: now,
  };

  // 1. Save to Supabase Cloud
  try {
    await supabaseAdmin.from("posts").insert(postToRow(post));
  } catch (err) {
    console.error("Supabase insert error (saving locally):", err);
  }

  // 2. Save locally
  posts.unshift(post);
  await saveLocalPosts(posts);

  return post;
}

export async function updatePost(
  id: string,
  updates: Partial<BlogPost>
): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updated: BlogPost = {
    ...posts[index],
    ...updates,
    id,
    updatedAt: new Date().toISOString(),
  };

  // 1. Update in Supabase Cloud
  try {
    await supabaseAdmin.from("posts").update(postToRow(updated)).eq("id", id);
  } catch (err) {
    console.error("Supabase update error (updating locally):", err);
  }

  // 2. Update locally
  posts[index] = updated;
  await saveLocalPosts(posts);

  return updated;
}

export async function deletePost(id: string): Promise<boolean> {
  // 1. Delete from Supabase Cloud
  try {
    await supabaseAdmin.from("posts").delete().eq("id", id);
  } catch (err) {
    console.error("Supabase delete error (deleting locally):", err);
  }

  // 2. Delete locally
  const posts = await getLocalPosts();
  const filtered = posts.filter((p) => p.id !== id);
  await saveLocalPosts(filtered);

  return true;
}

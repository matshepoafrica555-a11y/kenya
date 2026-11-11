import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, createPost } from "@/lib/posts-store";
import { isAuthenticated, verifyAuthToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const newsletter = searchParams.get("newsletter");
    const search = searchParams.get("search");
    const monthYear = searchParams.get("monthYear");
    const showAll = searchParams.get("all") === "true";

    let posts = await getAllPosts();

    // Unless showAll is requested by authenticated admin, show only published posts
    if (!showAll) {
      posts = posts.filter((p) => p.status !== "draft");
    } else {
      // Verify admin auth for drafts access
      const token = request.headers.get("Authorization")?.replace("Bearer ", "");
      const isAuthed = (await isAuthenticated()) || verifyAuthToken(token);
      if (!isAuthed) {
        posts = posts.filter((p) => p.status !== "draft");
      }
    }

    if (newsletter === "true") {
      posts = posts.filter((p) => p.isNewsletter || p.category === "Monthly Newsletter");
    }

    if (category && category !== "All Insights" && category !== "All Articles") {
      posts = posts.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (monthYear) {
      posts = posts.filter(
        (p) =>
          p.monthYear?.toLowerCase() === monthYear.toLowerCase() ||
          p.date?.toLowerCase().includes(monthYear.toLowerCase())
      );
    }

    if (search) {
      const q = search.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.content.some((c) =>
            c.paragraphs.some((para) => para.toLowerCase().includes(q))
          )
      );
    }

    return NextResponse.json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify auth
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    const authed = (await isAuthenticated()) || verifyAuthToken(token);
    if (!authed) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin access required." },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (!body.title || !body.title.trim()) {
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 }
      );
    }

    if (!body.summary || !body.summary.trim()) {
      return NextResponse.json(
        { success: false, message: "Summary / Excerpt is required" },
        { status: 400 }
      );
    }

    const isNewsletter =
      body.isNewsletter === true ||
      body.category === "Monthly Newsletter";

    // Format default date if missing
    const now = new Date();
    const formattedDate =
      body.date ||
      now.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });

    const monthYear =
      body.monthYear ||
      now.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });

    const created = await createPost({
      title: body.title.trim(),
      slug: body.slug?.trim() || "",
      category: body.category || (isNewsletter ? "Monthly Newsletter" : "Company News"),
      date: formattedDate,
      monthYear,
      isNewsletter,
      newsletterEdition: body.newsletterEdition || (isNewsletter ? `${monthYear} Edition` : undefined),
      pdfUrl: body.pdfUrl || "",
      readTime: body.readTime || "4 min read",
      summary: body.summary.trim(),
      image: body.image || "/assets/blog/blog_tile_adhesive.jpg",
      author: body.author || {
        name: "Matshepo Editorial Team",
        role: "Content & Technical Publishing",
      },
      content: Array.isArray(body.content) && body.content.length > 0
        ? body.content
        : [
            {
              sectionHeading: "Overview",
              paragraphs: [body.summary],
            },
          ],
      keyTakeaways: Array.isArray(body.keyTakeaways) ? body.keyTakeaways : [],
      status: body.status || "published",
      featured: body.featured === true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Post published successfully",
        post: created,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create post" },
      { status: 500 }
    );
  }
}


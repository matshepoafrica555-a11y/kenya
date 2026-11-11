import fs from "fs/promises";
import path from "path";
import { BlogPost } from "./types";
import { blogPostsData } from "@/data/blog";

const POSTS_FILE_PATH = path.join(process.cwd(), "src", "data", "posts.json");

const initialNewsletters: BlogPost[] = [
  {
    id: "matshepo-newsletter-november-2026",
    slug: "matshepo-monthly-newsletter-november-2026",
    title: "Matshepo Monthly Newsletter — November 2026 Edition: Weatherproofing Substructures & Industrial Scaling",
    category: "Monthly Newsletter",
    date: "Nov 01, 2026",
    monthYear: "November 2026",
    isNewsletter: true,
    newsletterEdition: "Volume 1 • Issue 11 — November 2026",
    pdfUrl: "",
    readTime: "5 min read",
    summary:
      "Welcome to the November 2026 edition of the Matshepo Africa Monthly Newsletter. This month we spotlight monsoon-grade waterproofing protocols, plant automation updates in Athi River, and contractor safety workshops.",
    image: "/assets/blog/blog_waterproofing.jpg",
    author: {
      name: "Matshepo Editorial Team",
      role: "Technical Communications Division",
    },
    content: [
      {
        sectionHeading: "Director's Note: Building Resilient Structures Across the Region",
        paragraphs: [
          "As we step into November, the Kenyan construction corridor is experiencing heightened activity with commercial developments reaching roof slab and external facade stages before year-end. At Matshepo Africa Ltd, our core commitment remains unchanged: delivering manufacturing precision that shields contractors from costly site failures.",
          "Our production facility at Athi 55 Business Park in Mlolongo has successfully scaled production throughput by 35% this quarter, fulfilling surging demand for Simba Grip C2 tile adhesives and Ultraguard 2K cementitious waterproofing kits across Nairobi, Kiambu, and Machakos counties.",
        ],
      },
      {
        sectionHeading: "Featured Technical Focus: Monsoon-Ready Roof & Balcony Detailing",
        paragraphs: [
          "Waterproofing before tiling is often treated as an afterthought, yet seasonal rainfall exposes even micro-fissures in poorly prepared substrates. In this issue, our engineering team highlights three essential installation standards:",
          "1. 48-Hour Flood Testing: Prior to applying tile adhesives, ensure all 2K membranes are submerged under 50mm of static water for 48 hours to confirm continuous bond.",
          "2. Corner Filleting: Eliminating 90-degree angular junctions with coved polymer mortar drastically reduces thermal stress cracking at floor-wall interfaces.",
          "3. Primer Compatibility: Always apply acrylic bonding primers over highly absorbent screeds to prevent flash-drying of tile adhesive beds.",
        ],
      },
      {
        sectionHeading: "Factory Floor Updates: Quality Control Batching Automation",
        paragraphs: [
          "We are proud to announce the full commissioning of our automated dry-mix pneumatic blending unit. This enhancement guarantees precise silica aggregate sizing and homogeneous polymer dispersion in every single 25kg bag of Simba Grip 777 and 818.",
          "Contractors can now verify lot numbers and batch quality certificates directly by contacting our technical desk or via customer support.",
        ],
      },
      {
        sectionHeading: "Upcoming Events & Contractor Training Schedule",
        paragraphs: [
          "Registration is now open for our bi-weekly On-Site Tiling Masterclasses scheduled for mid-November. Certified tile installers will demonstrate large-format porcelain handling, back-buttering techniques, and Tile Lit waterproof grouting best practices.",
          "Contact our sales desk at info@matshepo.co.ke to register your site crew or request technical site assistance.",
        ],
      },
    ],
    keyTakeaways: [
      "November newsletter spotlights seasonal waterproofing and plant throughput expansion.",
      "Automated pneumatic dry-mix unit commissioned at Athi 55 factory.",
      "Upcoming contractor masterclasses covering large-format porcelain adhesive applications.",
      "Complimentary technical site inspections available for commercial developers.",
    ],
    status: "published",
    featured: true,
    createdAt: new Date("2026-11-01T08:00:00Z").toISOString(),
    updatedAt: new Date("2026-11-01T08:00:00Z").toISOString(),
  },
  {
    id: "matshepo-newsletter-october-2026",
    slug: "matshepo-monthly-newsletter-october-2026",
    title: "Matshepo Monthly Newsletter — October 2026 Edition: Milestone 25th Landmark Project & C2TES1 Quality",
    category: "Monthly Newsletter",
    date: "Oct 01, 2026",
    monthYear: "October 2026",
    isNewsletter: true,
    newsletterEdition: "Volume 1 • Issue 10 — October 2026",
    pdfUrl: "",
    readTime: "6 min read",
    summary:
      "Celebrating our 25th major commercial installation milestone, deep-dive into international C2TES1 standards, and our community builder outreach.",
    image: "/assets/blog/blog_landmark_construction.jpg",
    author: {
      name: "Matshepo Editorial Team",
      role: "Corporate Communications",
    },
    content: [
      {
        sectionHeading: "Celebratory Milestone: 25th Landmark Project Supplied",
        paragraphs: [
          "October marked a proud milestone in the growth of Matshepo Africa Ltd. We officially surpassed our 25th major commercial building development supplied with full-system construction chemicals, encompassing luxury apartment complexes, shopping centers, and medical facilities in Nairobi.",
          "Our flagship products — Simba Grip 777, Simba Grip 818, and Ultraguard Waterproofing — were commended by leading structural engineers for flawless adhesion and zero reported debonding across over 45,000 square meters of tiled space.",
        ],
      },
      {
        sectionHeading: "Understanding Why C2TES1 Matters for High-Rise Development",
        paragraphs: [
          "With modern architectural trends favoring 800x800mm and 1200x600mm porcelain slabs, conventional cement-sand mortar fails within months due to thermal deflection and weight.",
          "Simba Grip 818 meets the rigorous C2TES1 standard: C2 (enhanced tensile strength > 1.0 N/mm²), T (anti-slip for vertical walls), E (extended open time for African ambient temperatures), and S1 (flexible deformation).",
        ],
      },
      {
        sectionHeading: "Community and Industry Outreach",
        paragraphs: [
          "During October, our executive leadership participated in regional industrial roundtables discussing sustainable building materials and local manufacturing self-reliance in East Africa.",
          "We thank our clients, distributors, and contractor partners for their steadfast trust.",
        ],
      },
    ],
    keyTakeaways: [
      "Over 45,000 m² of successful commercial installations completed without warranty claims.",
      "Simba Grip 818 C2TES1 certified for large-format porcelain and facade installations.",
      "Ongoing commitment to locally manufactured, world-class building chemicals.",
    ],
    status: "published",
    featured: false,
    createdAt: new Date("2026-10-01T08:00:00Z").toISOString(),
    updatedAt: new Date("2026-10-01T08:00:00Z").toISOString(),
  },
  {
    id: "landmark-25th-project",
    slug: "matshepo-africa-achieves-landmark-25th-project",
    title: "Matshepo Africa Achieves Landmark 25th Project With Cutting-Edge Construction Chemistry",
    category: "Company News",
    date: "Oct 18, 2026",
    monthYear: "October 2026",
    isNewsletter: false,
    readTime: "4 min read",
    summary:
      "The introduction of the enhanced Simba Grip 555 and Simba Grip 777, along with advanced Ultra Guard Waterproofing, has been met with enthusiastic reception from East Africa's construction industry.",
    image: "/assets/blog/blog_landmark_construction.jpg",
    author: {
      name: "Matshepo Media Desk",
      role: "Corporate PR",
    },
    content: [
      {
        sectionHeading: "A Proven Track Record of Commercial Reliability",
        paragraphs: [
          "Matshepo Africa Ltd has completed product supply for its 25th landmark commercial installation in Nairobi, Kenya. The project incorporated complete sub-tile waterproofing and high-performance polymer-modified tile adhesives across multi-story commercial suites.",
          "Contractors cited significant reductions in application time and zero tile slippage on vertical bathroom walls as pivotal factors in project velocity.",
        ],
      },
      {
        sectionHeading: "Looking Ahead to Regional Distribution",
        paragraphs: [
          "With manufacturing operations consolidated at Athi 55 Business Park in Mlolongo, the company is expanding direct distribution routes to Mombasa, Kisumu, Eldoret, and cross-border regional hubs.",
        ],
      },
    ],
    keyTakeaways: [
      "Supplied 25+ major commercial projects across Kenya.",
      "Zero warranty claims or delamination defects recorded.",
      "Expanding distribution networks to regional builder centers.",
    ],
    status: "published",
    featured: false,
    createdAt: new Date("2026-10-18T08:00:00Z").toISOString(),
    updatedAt: new Date("2026-10-18T08:00:00Z").toISOString(),
  },
];

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const fileContent = await fs.readFile(POSTS_FILE_PATH, "utf-8");
    const parsed = JSON.parse(fileContent);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // File doesn't exist yet or is invalid, initialize with seeded data
  }

  // Combine initial newsletters, company news, and existing blog posts
  const combined: BlogPost[] = [
    ...initialNewsletters,
    ...blogPostsData.map((post) => ({
      ...post,
      status: "published" as const,
      isNewsletter: false,
      monthYear: post.date.includes("Oct")
        ? "October 2026"
        : post.date.includes("Sep")
        ? "September 2026"
        : "August 2026",
      author: {
        name: "Matshepo Technical Desk",
        role: "Advisory & Applications",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })),
  ];

  await saveAllPosts(combined);
  return combined;
}

export async function saveAllPosts(posts: BlogPost[]): Promise<void> {
  const dir = path.dirname(POSTS_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(POSTS_FILE_PATH, JSON.stringify(posts, null, 2), "utf-8");
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.id === id) || null;
}

export async function createPost(newPost: Omit<BlogPost, "id" | "createdAt" | "updatedAt"> & { id?: string }): Promise<BlogPost> {
  const posts = await getAllPosts();
  const id = newPost.id || `post-${Date.now()}`;
  const now = new Date().toISOString();

  // If slug exists, ensure it is unique
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

  // Prepend to list so newest posts appear first
  posts.unshift(post);
  await saveAllPosts(posts);
  return post;
}

export async function updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updated: BlogPost = {
    ...posts[index],
    ...updates,
    id, // protect id
    updatedAt: new Date().toISOString(),
  };

  posts[index] = updated;
  await saveAllPosts(posts);
  return updated;
}

export async function deletePost(id: string): Promise<boolean> {
  const posts = await getAllPosts();
  const filtered = posts.filter((p) => p.id !== id);
  if (filtered.length === posts.length) return false;

  await saveAllPosts(filtered);
  return true;
}


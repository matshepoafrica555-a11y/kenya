export interface BlogContentSection {
  sectionHeading?: string;
  paragraphs: string[];
}

export interface PostAuthor {
  name: string;
  role: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category:
    | "Monthly Newsletter"
    | "Company News"
    | "Tile Adhesives"
    | "Waterproofing"
    | "Flooring"
    | "Construction Tips"
    | "Product Education"
    | "Industry Insights"
    | string;
  date: string;
  monthYear?: string; // e.g. "November 2026"
  isNewsletter?: boolean;
  newsletterEdition?: string; // e.g. "Issue #12 — November 2026"
  pdfUrl?: string; // Optional downloadable PDF file URL
  readTime: string;
  summary: string;
  image: string;
  author?: PostAuthor;
  content: BlogContentSection[];
  keyTakeaways: string[];
  status?: "published" | "draft";
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}


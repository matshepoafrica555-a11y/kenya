export interface BlogContentSection {
  sectionHeading?: string;
  paragraphs: string[];
}

export interface PostAuthor {
  name: string;
  role: string;
}

export interface ProjectHighlight {
  title: string;
  location?: string;
  completionDate?: string;
  image?: string;
  description?: string;
  systemsUsed?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  monthYear?: string; // e.g. "November 2026"
  isNewsletter?: boolean;
  newsletterEdition?: string; // e.g. "Building the Future – November 2026 Edition"
  pdfUrl?: string; // Optional downloadable PDF file URL
  readTime: string;
  summary: string;
  image: string;
  author?: PostAuthor;
  projectHighlightsTitle?: string; // e.g. "Project Highlights"
  projectHighlights?: ProjectHighlight[];
  storylineTitle?: string; // e.g. "Our Storyline"
  storylineContent?: string[]; // e.g. monthly company updates, factory progress, product developments
  content: BlogContentSection[];
  keyTakeaways: string[];
  status?: "published" | "draft";
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  location: string;
  category:
    | "Swimming Pools"
    | "Basements"
    | "Rooftops"
    | "Wet Areas"
    | "Balconies"
    | "Other Projects"
    | string;
  description: string;
  fullDetails: string;
  image: string;
  systemsUsed: string[];
  scope: string;
  client?: string;
  completionYear?: string;
  featured?: boolean;
  status?: "published" | "draft";
  createdAt?: string;
  updatedAt?: string;
}


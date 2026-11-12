import { MetadataRoute } from "next";
import { productsData } from "@/data/products";
import { blogPostsData } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.matshepo.com";

  const staticRoutes = [
    "",
    "/about",
    "/products",
    "/services",
    "/quality",
    "/testimonials",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-10-12"),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const productRoutes = productsData.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date("2026-10-12"),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const blogRoutes = blogPostsData.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date("2026-11-11"),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}

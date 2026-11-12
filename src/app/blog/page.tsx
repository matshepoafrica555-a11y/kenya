import React from "react";
import { getAllPosts } from "@/lib/posts-store";
import { InsightsClient } from "@/app/insights/InsightsClient";
import type { Metadata } from "next";

export const instant = false;

export const metadata: Metadata = {
  title: "Blog & Monthly Newsletters | Matshepo Africa Ltd",
  description:
    "Explore our company monthly newsletters, construction chemical guides, waterproofing bulletins, and industry updates from Matshepo Africa Ltd in Nairobi, Kenya.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const publishedPosts = posts.filter((p) => p.status !== "draft");

  return <InsightsClient initialPosts={publishedPosts} />;
}

import React from "react";
import { getAllPosts } from "@/lib/posts-store";
import { InsightsClient } from "@/app/insights/InsightsClient";
import type { Metadata } from "next";

export const instant = false;

export const metadata: Metadata = {
  title: "What’s New — Building the Future | Matshepo Africa Ltd",
  description:
    "Building the Future – Monthly Edition: Project highlights, completed works with completion dates, company milestones, and technical breakthroughs from Matshepo Africa Ltd in Nairobi, Kenya.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const publishedPosts = posts.filter((p) => p.status !== "draft");

  return <InsightsClient initialPosts={publishedPosts} />;
}

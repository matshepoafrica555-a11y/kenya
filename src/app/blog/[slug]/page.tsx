import React from "react";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts-store";
import { blogPostsData } from "@/data/blog";
import { InsightsDetailClient } from "@/app/insights/[slug]/InsightsDetailClient";
import type { Metadata } from "next";

export const instant = false;

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogPostsData.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Matshepo Africa Ltd",
    };
  }

  const isNewsletter = post.isNewsletter || post.category === "Monthly Newsletter";
  const title = isNewsletter
    ? `${post.title} | Building the Future – Matshepo Monthly Edition`
    : `${post.title} | Matshepo Africa What’s New`;

  return {
    title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.status !== "draft")
    .slice(0, 3);

  return <InsightsDetailClient post={post} relatedPosts={relatedPosts} />;
}

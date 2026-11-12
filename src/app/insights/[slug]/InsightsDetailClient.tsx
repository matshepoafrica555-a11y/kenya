"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/types";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  CheckCircle,
  FileDown,
  Newspaper,
  BookOpen,
  Copy,
  Check,
} from "lucide-react";

interface Props {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export const InsightsDetailClient: React.FC<Props> = ({ post, relatedPosts }) => {
  const [copied, setCopied] = useState(false);
  const isNewsletter = post.isNewsletter || post.category === "Monthly Newsletter";

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-[#F5F8FC] min-h-screen pb-24">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200/80 py-3.5 shadow-2xs">
        <div className="container-custom flex items-center justify-between text-xs">
          <div className="text-slate-500 flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <Link href="/" className="hover:text-[#0875C9] transition-colors shrink-0">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#0875C9] transition-colors shrink-0">
              What’s New
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold truncate">{post.title}</span>
          </div>

          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1.5 text-slate-600 hover:text-[#0875C9] font-bold shrink-0 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to What’s New</span>
          </Link>
        </div>
      </div>

      <div className="container-custom mt-8 max-w-4xl mx-auto space-y-8">
        {/* Article Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              {isNewsletter ? (
                <span className="bg-[#FFC400] text-[#073B69] font-black px-3 py-1 rounded-lg uppercase tracking-wider text-[11px] flex items-center gap-1.5 shadow-2xs">
                  <Newspaper className="w-3.5 h-3.5" />
                  <span>{post.newsletterEdition || "Monthly Newsletter"}</span>
                </span>
              ) : (
                <span className="bg-blue-50 text-[#0875C9] font-black px-3 py-1 rounded-lg uppercase tracking-wider text-[11px]">
                  {post.category}
                </span>
              )}

              {post.monthYear && (
                <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded-lg text-[11px]">
                  {post.monthYear}
                </span>
              )}

              <span className="text-slate-400">•</span>
              <span className="text-slate-500 flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> {post.date}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> {post.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#073B69] tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
              {post.summary}
            </p>

            {/* Author & Share Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#073B69] text-white flex items-center justify-center font-black text-sm shadow-xs">
                  {post.author?.name ? post.author.name.charAt(0) : "M"}
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {post.author?.name || "Matshepo Editorial Team"}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {post.author?.role || "Quality & Technical Communications"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Share</span>
                    </>
                  )}
                </button>

                {post.pdfUrl && (
                  <a
                    href={post.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#0875C9] text-white text-xs font-bold hover:bg-[#073B69] flex items-center gap-1.5 transition-colors"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Cover Image */}
          {post.image && (
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-xs border border-slate-200 bg-slate-100">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 850px"
                className="object-cover"
              />
            </div>
          )}

          {/* Key Takeaways Callout Box */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="p-6 rounded-2xl bg-[#F5F8FC] border border-blue-100 space-y-3">
              <span className="text-xs font-black uppercase text-[#0875C9] tracking-wider block">
                Executive Takeaways &amp; Bulletins
              </span>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {post.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Article Content Body */}
          <div className="space-y-8 pt-4">
            {post.content && post.content.length > 0 ? (
              post.content.map((section, idx) => (
                <section key={idx} className="space-y-3">
                  {section.sectionHeading && (
                    <h2 className="text-lg sm:text-xl font-black text-[#073B69] tracking-tight">
                      {section.sectionHeading}
                    </h2>
                  )}
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                      {p}
                    </p>
                  ))}
                </section>
              ))
            ) : (
              <p className="text-slate-700 text-sm leading-relaxed">{post.summary}</p>
            )}
          </div>

          {/* Download Newsletter PDF banner if applicable */}
          {isNewsletter && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-blue-50 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-black text-[#073B69] uppercase tracking-wider block">
                  Official Matshepo Africa Monthly Newsletter
                </span>
                <p className="text-xs text-slate-600">
                  Published by the Matshepo Technical Desk in Nairobi, Kenya. Distributed to certified contractors and developers.
                </p>
              </div>
              <Link
                href="/contact"
                className="btn-yellow px-5 py-2.5 rounded-xl text-xs font-black whitespace-nowrap shadow-xs"
              >
                REQUEST PRINT COPIES
              </Link>
            </div>
          )}
        </div>

        {/* Related Insights Grid */}
        {relatedPosts.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-base font-black text-[#073B69] uppercase tracking-wide">
              More Insights &amp; Updates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <div
                  key={rPost.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between p-4 group"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-[#0875C9] uppercase">
                      {rPost.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#073B69] group-hover:text-[#0875C9] line-clamp-2 leading-snug">
                      <Link href={`/blog/${rPost.slug}`}>{rPost.title}</Link>
                    </h4>
                  </div>
                  <Link
                    href={`/blog/${rPost.slug}`}
                    className="text-xs text-[#0875C9] font-bold inline-flex items-center gap-1 pt-3 mt-3 border-t border-slate-100"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


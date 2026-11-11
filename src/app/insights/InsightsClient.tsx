"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/types";
import {
  Calendar,
  Clock,
  ArrowRight,
  FileDown,
  Newspaper,
  Search,
  Lock,
} from "lucide-react";

interface Props {
  initialPosts: BlogPost[];
}

export const InsightsClient: React.FC<Props> = ({ initialPosts }) => {
  const [posts] = useState<BlogPost[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");

  // Separate monthly newsletters and all issues
  const allIssues = useMemo(() => {
    return posts.filter((p) => p.status !== "draft");
  }, [posts]);

  // Featured is the latest monthly newsletter or latest post
  const latestIssue = useMemo(() => {
    return (
      allIssues.find((p) => p.isNewsletter || p.category === "Monthly Newsletter") ||
      allIssues[0]
    );
  }, [allIssues]);

  // Other issues excluding the featured one
  const pastIssues = useMemo(() => {
    const remaining = allIssues.filter((p) => p.id !== latestIssue?.id);
    if (!searchQuery.trim()) return remaining;

    const q = searchQuery.toLowerCase().trim();
    return allIssues.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        (p.monthYear && p.monthYear.toLowerCase().includes(q))
    );
  }, [allIssues, latestIssue, searchQuery]);

  return (
    <div className="bg-[#FAFBFD] min-h-screen pb-20">
      {/* Clean Minimal Header */}
      <section className="bg-white border-b border-slate-200/70 py-12 sm:py-16">
        <div className="container-custom max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#0875C9] bg-blue-50 px-3 py-1 rounded-full">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Monthly Newsletters &amp; Bulletins</span>
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#073B69] tracking-tight uppercase">
            BLOG &amp; UPDATES
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Our company newsletter published on a monthly basis, featuring manufacturing milestones, product standards, and on-site engineering tips.
          </p>

          {/* Quick Search */}
          <div className="pt-4 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search monthly issues (e.g. November 2026, Waterproofing)..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-full border border-slate-200 bg-[#FAFBFD] focus:outline-none focus:border-[#0875C9] focus:bg-white shadow-2xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container-custom max-w-5xl mx-auto mt-10 space-y-12">
        {/* Latest Issue Spotlight (Only shown when not searching) */}
        {!searchQuery && latestIssue && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>Current Monthly Release</span>
              <span className="text-[#0875C9] font-black">{latestIssue.monthYear || latestIssue.date}</span>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                <div className="md:col-span-5 relative aspect-[16/11] md:aspect-auto md:h-full bg-slate-100 min-h-[260px]">
                  <Image
                    src={latestIssue.image || "/assets/blog/blog_waterproofing.jpg"}
                    alt={latestIssue.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#FFC400] text-[#073B69] text-[11px] font-black px-3 py-1 rounded-lg shadow-xs">
                    LATEST ISSUE
                  </div>
                </div>

                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="font-bold text-[#0875C9]">
                        {latestIssue.newsletterEdition || latestIssue.monthYear || "Monthly Edition"}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {latestIssue.date}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-[#073B69] hover:text-[#0875C9] transition-colors leading-snug">
                      <Link href={`/blog/${latestIssue.slug}`}>
                        {latestIssue.title}
                      </Link>
                    </h2>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {latestIssue.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/blog/${latestIssue.slug}`}
                      className="btn-yellow px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black inline-flex items-center gap-2 shadow-xs"
                    >
                      <span>READ NEWSLETTER</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {latestIssue.pdfUrl && (
                      <a
                        href={latestIssue.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 inline-flex items-center gap-1.5 transition-colors"
                      >
                        <FileDown className="w-4 h-4 text-[#0875C9]" />
                        <span>Download PDF</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Monthly Editions Archive */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-[#073B69] uppercase tracking-wide">
              {searchQuery ? `Search Results (${pastIssues.length})` : "Monthly Archive & Editions"}
            </h3>
            <span className="text-xs text-slate-400 font-medium">
              {pastIssues.length} {pastIssues.length === 1 ? "issue" : "issues"} published
            </span>
          </div>

          {pastIssues.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastIssues.map((issue) => (
                <article
                  key={issue.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                      <Image
                        src={issue.image || "/assets/blog/blog_tile_adhesive.jpg"}
                        alt={issue.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-104 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 bg-[#073B69]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs">
                        {issue.monthYear || issue.date}
                      </div>
                    </div>

                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {issue.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {issue.readTime}
                        </span>
                      </div>

                      <h4 className="text-sm font-black text-[#073B69] group-hover:text-[#0875C9] transition-colors leading-snug line-clamp-2">
                        <Link href={`/blog/${issue.slug}`}>{issue.title}</Link>
                      </h4>

                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                        {issue.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-slate-50 flex items-center justify-between text-xs">
                    <Link
                      href={`/blog/${issue.slug}`}
                      className="text-[#0875C9] group-hover:text-[#073B69] font-bold inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Read Issue</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {issue.pdfUrl && (
                      <a
                        href={issue.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-slate-700 inline-flex items-center gap-1 text-[11px]"
                      >
                        <FileDown className="w-3 h-3" />
                        <span>PDF</span>
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200/80 text-xs text-slate-500">
              No newsletter issues found matching &ldquo;{searchQuery}&rdquo;.
            </div>
          )}
        </div>

        {/* Minimal Footer & Staff Admin Access */}
        <div className="pt-6 border-t border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            Published monthly by Matshepo Africa Ltd • Nairobi, Kenya
          </p>

          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-slate-600 hover:text-[#0875C9] font-bold transition-colors"
          >
            <Lock className="w-3 h-3" />
            <span>Staff Publishing Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

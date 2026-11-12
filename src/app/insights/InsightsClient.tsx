"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost, ProjectHighlight } from "@/lib/types";
import {
  Calendar,
  Clock,
  ArrowRight,
  FileDown,
  Sparkles,
  MapPin,
  CheckCircle2,
  Lock,
  Building,
  History,
} from "lucide-react";

interface Props {
  initialPosts: BlogPost[];
}

export const InsightsClient: React.FC<Props> = ({ initialPosts }) => {
  const [posts] = useState<BlogPost[]>(initialPosts);

  // Active / selected edition
  const [selectedPostId, setSelectedPostId] = useState<string>(() => {
    return initialPosts[0]?.id || "";
  });

  const activePost = useMemo(() => {
    return posts.find((p) => p.id === selectedPostId) || posts[0];
  }, [posts, selectedPostId]);

  // Project highlights for current edition (either custom or fallback to Levington sample)
  const highlights: ProjectHighlight[] = useMemo(() => {
    if (activePost?.projectHighlights && activePost.projectHighlights.length > 0) {
      return activePost.projectHighlights;
    }
    // Default fallback sample reflecting Levington Project
    return [
      {
        title: "Levington Project",
        location: "Nairobi, Kenya",
        completionDate: "November 2026",
        image: "/assets/projects/project_swimming_pool.jpg",
        description:
          "Full structural waterproofing and premium tile adhesive installation for luxury residences. Featuring substrate preparation, dual-component cementitious tanking, and C2TES1 adhesive fixing.",
        systemsUsed: [
          "Ultraguard 2K Cementitious Waterproofing",
          "Simba Grip 818 (White Powder)",
          "Tile Lit Waterproof Grout",
        ],
      },
      {
        title: "Athi River Industrial Facility",
        location: "Athi River, Kenya",
        completionDate: "October 2026",
        image: "/assets/projects/project_basement.jpg",
        description:
          "Heavy-duty underground foundation tanking and retaining wall moisture protection system covering multi-level storage slabs.",
        systemsUsed: [
          "APP 4mm Mineral Membrane",
          "Ultraguard 2K Heavy Duty",
        ],
      },
    ];
  }, [activePost]);

  // Storyline items for current edition
  const storylineItems: string[] = useMemo(() => {
    if (activePost?.storylineContent && activePost.storylineContent.length > 0) {
      return activePost.storylineContent;
    }
    if (activePost?.content && activePost.content.length > 0) {
      const paras: string[] = [];
      activePost.content.forEach((sec) => {
        paras.push(...sec.paragraphs);
      });
      return paras.slice(0, 4);
    }
    return [
      "Factory Capacity Expansion: Commissioned new automated dry-mortar blending line in Nairobi, ramping up Simba Grip and Ultraguard production capacity by 40%.",
      "Chemical R&D Milestones: Formulated enhanced polymers for C2 grade adhesives, offering zero vertical slip and extended open time for large porcelain slabs.",
      "Contractor Training Programs: Conducted on-site masterclass sessions for 120+ local tile applicators across Nairobi and Kiambu counties.",
    ];
  }, [activePost]);

  const projectTitle = activePost?.projectHighlightsTitle || "Project Highlights";
  const storylineTitle = activePost?.storylineTitle || "Our Storyline";

  return (
    <div className="bg-[#FAFBFD] min-h-screen pb-24">
      {/* Clean Minimal Header: Just One Main Heading */}
      <section className="bg-gradient-to-b from-white via-white to-[#F5F8FC] border-b border-slate-200/80 py-16 lg:py-20">
        <div className="container-custom max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#0875C9]/10 text-[#0875C9] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-[#FFC400]" />
            What’s New
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#073B69] tracking-tight">
            Building the Future – Monthly Edition
          </h1>

          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            A clean, transparent monthly review of our completed project milestones, factory developments, and construction chemical innovations across Kenya.
          </p>

          {/* Month / Edition Switcher (if multiple editions exist) */}
          {posts.length > 1 && (
            <div className="pt-2 flex items-center justify-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                Select Edition:
              </span>
              {posts.slice(0, 6).map((post) => {
                const label = post.monthYear || post.newsletterEdition || post.title;
                const isSelected = post.id === activePost?.id;
                return (
                  <button
                    key={post.id}
                    onClick={() => setSelectedPostId(post.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? "bg-[#073B69] text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Main Single Page Layout */}
      <div className="container-custom max-w-4xl mx-auto mt-10 space-y-12">
        {/* Edition Subheader Info */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0875C9] flex items-center justify-center font-black">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Current Release
              </span>
              <h2 className="text-sm sm:text-base font-black text-[#073B69]">
                {activePost?.monthYear || activePost?.date || "November 2026 Edition"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activePost?.pdfUrl && (
              <a
                href={activePost.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 inline-flex items-center gap-1.5 transition-colors"
              >
                <FileDown className="w-3.5 h-3.5 text-[#0875C9]" />
                <span>Download PDF Edition</span>
              </a>
            )}

            <Link
              href={`/blog/${activePost?.slug || "how-to-choose-the-right-tile-adhesive-for-your-project"}`}
              className="px-4 py-2 rounded-xl text-xs font-bold text-[#0875C9] hover:bg-blue-50 inline-flex items-center gap-1 transition-colors"
            >
              <span>Full Article View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ================= SUBHEADING 1: PROJECT HIGHLIGHTS ================= */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0875C9] block">
                Section 1
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#073B69] tracking-tight">
                1. {projectTitle}
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Completed site works with completion dates
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((proj, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <Image
                      src={proj.image || "/assets/projects/project_swimming_pool.jpg"}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 450px"
                      className="object-cover"
                    />
                    {proj.completionDate && (
                      <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                        <Calendar className="w-3 h-3 text-[#FFC400]" />
                        <span>Completed: {proj.completionDate}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-3">
                    <div>
                      <h3 className="text-lg font-black text-[#073B69]">
                        {proj.title}
                      </h3>
                      {proj.location && (
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#0875C9]" />
                          <span>{proj.location}</span>
                        </div>
                      )}
                    </div>

                    {proj.description && (
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {proj.description}
                      </p>
                    )}

                    {proj.systemsUsed && proj.systemsUsed.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                          Products &amp; Systems Specified:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.systemsUsed.map((sys, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[11px] bg-blue-50 text-[#0875C9] border border-blue-100 px-2.5 py-0.5 rounded-lg font-semibold flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              {sys}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SUBHEADING 2: OUR STORYLINE ================= */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0875C9] block">
                Section 2
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#073B69] tracking-tight">
                2. {storylineTitle}
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Monthly updates, factory progress &amp; product milestones
            </span>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="space-y-4">
              {storylineItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:border-blue-200 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-[#0875C9] text-white flex items-center justify-center shrink-0 text-xs font-black mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* General Newsletter Summary if available */}
            {activePost?.summary && (
              <div className="pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-500 italic">
                &ldquo;{activePost.summary}&rdquo; — {activePost.author?.name || "Matshepo Editorial Team"}
              </div>
            )}
          </div>
        </section>

        {/* Footer Admin Link */}
        <div className="pt-8 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400">
          <span>Published monthly by Matshepo Africa Ltd • Nairobi, Kenya</span>
          <Link
            href="/admin"
            className="hover:text-[#0875C9] font-bold flex items-center gap-1 text-slate-500"
          >
            <Lock className="w-3 h-3" />
            <span>Admin Editorial Desk</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

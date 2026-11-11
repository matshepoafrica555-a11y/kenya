import React from "react";
import Link from "next/link";
import Image from "next/image";
import { blogPostsData } from "@/data/blog";
import { ArrowRight, Clock, Calendar } from "lucide-react";

export const BlogPreview: React.FC = () => {
  const posts = blogPostsData.slice(0, 4);

  return (
    <section className="py-16 bg-[#F5F8FC]">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#0875C9] block mb-1">
              Insights &amp; Updates
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#073B69] tracking-tight">
              Latest Publications &amp; Newsletters
            </h2>
          </div>
          <Link
            href="/insights"
            className="text-xs sm:text-sm font-bold text-[#0875C9] hover:text-[#073B69] inline-flex items-center gap-1 transition-colors"
          >
            <span>View All Insights &amp; Updates</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/insights/${post.slug}`}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-blue-300 card-shadow-hover group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#073B69]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                    {post.category}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2.5 text-[11px] text-slate-400 mb-2 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-[#172333] group-hover:text-[#0875C9] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="px-4 pb-4 pt-1">
                <span className="text-[11px] font-bold text-[#0875C9] group-hover:underline flex items-center gap-1">
                  Read Article <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

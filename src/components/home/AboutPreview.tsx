import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Cpu, Users, Leaf } from "lucide-react";

export const AboutPreview: React.FC = () => {
  const pillars = [
    {
      title: "Quality Materials",
      desc: "Consistent and reliable products manufactured under strict quality checks.",
      icon: ShieldCheck,
      color: "text-[#0875C9] bg-blue-50",
    },
    {
      title: "Innovation",
      desc: "Continuous product development to meet evolving construction demands.",
      icon: Cpu,
      color: "text-[#0795A5] bg-teal-50",
    },
    {
      title: "Customer Focus",
      desc: "Solutions tailored for modern builders, contractors, and developers.",
      icon: Users,
      color: "text-amber-600 bg-amber-50",
    },
    {
      title: "Sustainability",
      desc: "Responsible material handling and environmental practices.",
      icon: Leaf,
      color: "text-emerald-600 bg-emerald-50",
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-[#F5F8FC]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-[#0875C9] block">
              About Matshepo Africa
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#073B69] tracking-tight leading-tight">
              Driven by Quality. <br />
              <span className="text-[#0875C9]">Built for the Future.</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Matshepo Africa Ltd is a construction chemicals manufacturer based in Nairobi, Kenya, providing solutions for tile installation, waterproofing, grouting, plastering and flooring systems.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Our focus is on quality, innovation and customer satisfaction, supporting durable and reliable building structures across residential and commercial developments.
            </p>
            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-slate-700 leading-relaxed">
              <span className="font-black text-[#0875C9] uppercase tracking-wider text-[10px] block mb-1">
                Our Vision
              </span>
              <p className="font-medium text-slate-800">
                &ldquo;To build a stronger, more prosperous Africa through sustainable manufacturing, innovation and industrial growth.&rdquo;
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/about"
                className="btn-yellow px-6 py-3 rounded-xl text-xs sm:text-sm font-black inline-flex items-center gap-2 shadow-sm"
              >
                <span>LEARN MORE ABOUT US</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: 4 Company Pillars */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {pillars.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs flex items-start gap-3 hover:border-blue-200 transition-colors"
                >
                  <div
                    className={`w-9 h-9 rounded-lg ${item.color} flex items-center justify-center shrink-0 mt-0.5`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#172333] leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

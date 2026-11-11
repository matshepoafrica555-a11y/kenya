import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle,
  Microscope,
  FileCheck,
  RotateCcw,
  Boxes,
  ArrowRight,
  FileText,
} from "lucide-react";

export const metadata = {
  title: "Quality Assurance | Matshepo Africa Ltd",
  description:
    "Learn about our quality-focused manufacturing, rigorous batch consistency testing, and continuous research for construction chemicals in Nairobi, Kenya.",
};

export default function QualityPage() {
  const sections = [
    {
      title: "Quality-Focused Manufacturing",
      desc: "Our automated batch blending lines ensure precise proportions of hydraulic binders, graded sands, and performance polymer additives for every production run.",
      icon: Boxes,
    },
    {
      title: "Product Consistency",
      desc: "Raw materials are tested prior to blending to guarantee standard particle sizing, uniform moisture levels, and consistent chemical properties across all batches.",
      icon: CheckCircle,
    },
    {
      title: "Testing and Inspection",
      desc: "Routine testing measures tensile adhesion strength, open time, slump resistance, and setting times in accordance with established regional building requirements.",
      icon: Microscope,
    },
    {
      title: "Research and Product Development",
      desc: "Our technical team constantly optimizes formulations to address African tropical weather conditions, temperature extremes, and demanding architectural trends.",
      icon: FileCheck,
    },
    {
      title: "Responsible Material Handling",
      desc: "Protected multi-wall moisture-barrier packaging prevents premature hydration during storage and transport across Kenyan distribution channels.",
      icon: ShieldCheck,
    },
    {
      title: "Customer Feedback & Continuous Improvement",
      desc: "Regular field feedback from leading Kenyan tiling contractors and civil engineers directly informs ongoing improvements in product workability and ease of trowel application.",
      icon: RotateCcw,
    },
  ];

  return (
    <div className="bg-[#F5F8FC] min-h-screen pb-24">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#073B69] via-[#0875C9] to-[#05294A] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-[#FFC400]">
            Commitment to Standards
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            QUALITY BUILT INTO EVERY SOLUTION
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed">
            We are committed to delivering construction chemical solutions that meet the company&apos;s quality expectations and support dependable construction outcomes.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200/80 py-3">
        <div className="container-custom text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#0875C9]">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Quality Assurance</span>
        </div>
      </div>

      <div className="container-custom mt-12 space-y-16">
        {/* Introduction Philosophy */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
          <div className="max-w-4xl space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-[#0875C9]">
              Our Quality Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#073B69] tracking-tight">
              Rigorous Discipline at Every Step of Manufacturing
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              In the construction chemicals industry, failure is not an option. A tile adhesive that loses grip or a waterproofing system that degrades under water pressure leads to severe structural repair expenses.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              At Matshepo Africa Ltd, we instill quality control into each operational stage—from the arrival of high-purity silica sand and Portland cement at our Nairobi godown to precision packaging and dispatch.
            </p>
            <div className="p-4 bg-[#F5F8FC] rounded-2xl border border-slate-200/80 text-xs text-slate-700">
              <strong>Our Promise:</strong> Every bag of Simba Grip and every kit of Ultraguard 2K meets consistent performance parameters, ensuring contractors get predictable results on site every single time.
            </div>
          </div>
        </section>

        {/* 6 Quality Pillars Grid */}
        <section className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-black uppercase tracking-wider text-[#0875C9]">
              Manufacturing Rigor
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#073B69] tracking-tight mt-1">
              Six Pillars of Our Quality System
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-200 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0875C9] flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-black text-[#172333] mb-2 leading-tight">
                      {sec.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {sec.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Documentation & TDS Submittal Desk */}
        <section className="bg-gradient-to-br from-[#073B69] to-[#05294A] text-white rounded-3xl p-8 sm:p-12 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-[#FFC400]">
                Technical Document Center
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Product Technical Data & Safety Sheets
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                We provide project architects, consulting structural engineers, and contractors with project-specific technical submittals, method statements, and batch quality confirmations upon request.
              </p>
              <div className="p-4 bg-white/10 rounded-2xl border border-white/15 text-xs text-slate-200">
                <strong>Notice:</strong> Technical documentation and certified specification packages are tailored to specific project requirements. Contact our technical team to receive the verified submittal documents for your tenders.
              </div>
            </div>

            <div className="lg:col-span-4 text-center lg:text-right">
              <Link
                href="/contact"
                className="btn-yellow px-8 py-3.5 rounded-xl text-xs sm:text-sm font-black inline-flex items-center gap-2 shadow-lg"
              >
                <span>REQUEST TECHNICAL SUBMITTAL</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

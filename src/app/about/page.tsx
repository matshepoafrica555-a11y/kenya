import React from "react";
import Image from "next/image";
import Link from "next/link";
import { companyData } from "@/data/company";
import {
  ShieldCheck,
  Target,
  Eye,
  Award,
  CheckCircle,
  Factory,
  ArrowRight,
  MapPin,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "About Us | Some Bonds are Forever",
  description:
    "Matshepo Africa Ltd is a construction chemicals manufacturer based in Nairobi, Kenya, delivering solutions for tile installation, waterproofing, grouting, plastering, and flooring.",
};

export default function AboutPage() {
  const values = [
    { name: "Quality", desc: "Commitment to stringent batch-to-batch consistency and reliable performance standards." },
    { name: "Reliability", desc: "Formulations engineered to endure local climate extremes and structural loads." },
    { name: "Innovation", desc: "Continuous research and formulation development matching modern architectural trends." },
    { name: "Customer Commitment", desc: "Dedicated technical consultation to help contractors choose the right system." },
    { name: "Integrity", desc: "Honest technical communication and transparent, realistic product ratings." },
    { name: "Sustainability", desc: "Environmentally conscious raw material selection and minimized production waste." },
  ];

  const whyChooseUs = [
    "A broad construction chemicals portfolio engineered for regional building methods.",
    "Graded tile adhesives covering economy (Grip Master) and certified classes (Simba Grip C1, C2, C2TES1).",
    "Specialized 2K cementitious and APP membrane waterproofing systems.",
    "Professional project execution services with an available 10-Year Waterproofing Guarantee.",
    "Customer-focused product and job-site technical support based right in Nairobi.",
  ];

  return (
    <div className="bg-[#F5F8FC] min-h-screen pb-20">
      {/* Page Header Banner */}
      <section className="bg-gradient-to-r from-[#073B69] via-[#0875C9] to-[#05294A] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-black uppercase tracking-widest text-[#FFC400]">
            About Matshepo Africa Ltd
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase">
            SOME BONDS ARE FOREVER
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed">
            Manufacturing practical, high-performance construction chemicals in Nairobi, Kenya to support contractors, builders, developers, and distributors.
          </p>
        </div>
      </section>

      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200/80 py-3">
        <div className="container-custom text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#0875C9]">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">About Us</span>
        </div>
      </div>

      <div className="container-custom mt-12 space-y-16">
        {/* Section A: Who We Are */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
          <div className="max-w-4xl space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-[#0875C9]">
              Who We Are
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#073B69] tracking-tight">
              Empowering Kenya&apos;s Modern Construction Sector
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Matshepo Africa Ltd is a construction chemicals manufacturer based in Nairobi, Kenya, providing solutions for tile installation, waterproofing, grouting, plastering, and flooring systems.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Our focus is on developing practical construction chemical solutions that support reliable installation, durable building surfaces, and long-lasting performance.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Through product quality, technical development, and customer-focused service, we aim to support contractors, builders, distributors, developers, and construction professionals across our markets.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#073B69]">
              <MapPin className="w-4 h-4 text-[#0875C9]" />
              <span>Manufacturing & Distribution: Athi 55 Business Park, Nairobi, Kenya</span>
            </div>
          </div>
        </section>

        {/* Section: Co-Founders Heading & Profiles */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-wider text-[#0875C9]">
              Leadership &amp; Vision
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#073B69] tracking-tight uppercase mt-1">
              CO-FOUNDERS
            </h2>
            <div className="w-16 h-1 bg-[#FFC400] rounded-full mx-auto mt-2.5 mb-3" />
            <p className="text-xs sm:text-sm text-slate-600">
              The visionary leadership driving sustainable manufacturing, regional industrial growth, and durable building solutions across Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Co-Founder 1: Shery Yohannan */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group">
              <div className="relative w-full max-w-[240px] aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 mb-4 shadow-sm border border-slate-100 mx-auto">
                <Image
                  src="/assets/about/shery_yohannan_cofounder.jpeg"
                  alt="Shery Yohannan - Co-Founder & Director of Matshepo Africa"
                  fill
                  sizes="(max-width: 768px) 100vw, 240px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-black text-[#073B69] tracking-tight">
                  Shery Yohannan
                </h3>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0875C9] block">
                  Co-Founder &amp; Director
                </span>
              </div>
            </div>

            {/* Co-Founder 2: Mathews Thomas Pulickal */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group">
              <div className="relative w-full max-w-[240px] aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 mb-4 shadow-sm border border-slate-100 mx-auto">
                <Image
                  src="/assets/about/mathews_thomas_cofounder.jpeg"
                  alt="Mathews Thomas Pulickal - Co-Founder & Director of Matshepo Africa"
                  fill
                  sizes="(max-width: 768px) 100vw, 240px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg sm:text-xl font-black text-[#073B69] tracking-tight">
                  Mathews Thomas Pulickal
                </h3>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0875C9] block">
                  Co-Founder &amp; Director
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section B & C: Mission & Vision */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-wider text-[#0875C9]">
              Purpose &amp; Direction
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#073B69] tracking-tight mt-1">
              Our Vision &amp; Mission
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Committed to industrial growth, technical excellence, and sustainable prosperity across Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Vision Card */}
            <div className="relative bg-gradient-to-br from-white via-white to-sky-50/50 rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-[#0875C9]/10 text-[#0875C9] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Eye className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#FFC400]/20 text-[#8F6B00] border border-[#FFC400]/40">
                    OUR VISION
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#073B69] tracking-tight mb-3">
                    Building Africa&apos;s Industrial Future
                  </h3>
                  <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-semibold">
                    &ldquo;To build a stronger, more prosperous Africa through sustainable manufacturing, innovation and industrial growth—creating opportunities, empowering communities and shaping a better future for generations to come.&rdquo;
                  </p>
                </div>

                {/* Key Focus Highlights */}
                <div className="pt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-[#0875C9]" />
                    Sustainable Manufacturing
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-[#0875C9]" />
                    Empowering Communities
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-[#0875C9]" />
                    Generational Impact
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Socio-Economic Transformation</span>
                <span className="font-bold text-[#0875C9]">Pan-African Outlook</span>
              </div>
            </div>

            {/* Mission Card */}
            <div className="relative bg-gradient-to-br from-white via-white to-blue-50/50 rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Target className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-50 text-[#0875C9] border border-blue-200/60">
                    OUR MISSION
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#073B69] tracking-tight mb-3">
                    Engineered Solutions &amp; Lasting Value
                  </h3>
                  <div className="space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed">
                    <p className="font-medium text-slate-800">
                      &ldquo;To manufacture high-quality, innovative and sustainable construction chemical solutions that strengthen the built environment, create meaningful employment, develop local talent and contribute to economic growth across Africa.&rdquo;
                    </p>
                    <p className="text-slate-600">
                      &ldquo;Through responsible manufacturing, continuous innovation and strategic partnerships, we aim to build a competitive African industry that creates lasting value for our customers, employees and communities.&rdquo;
                    </p>
                  </div>
                </div>

                {/* Key Focus Highlights */}
                <div className="pt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    High-Quality Solutions
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Local Talent Development
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Strategic Partnerships
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Customer &amp; Community Value</span>
                <span className="font-bold text-[#073B69]">Built Environment</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section D: Our Core Values */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-wider text-[#0875C9]">
              Guiding Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#073B69] tracking-tight mt-1">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#F5F8FC] border border-slate-200/60 hover:border-blue-200 hover:bg-white transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-[#0875C9] flex items-center justify-center mb-3 font-black text-xs">
                  0{idx + 1}
                </div>
                <h3 className="text-sm font-black text-[#172333] mb-1">{val.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section E: Manufacturing Approach */}
        <section className="bg-gradient-to-br from-[#073B69] to-[#05294A] text-white rounded-3xl p-8 sm:p-12 shadow-lg">
          <div className="max-w-4xl space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-[#FFC400]">
              Production & Precision
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Our Manufacturing Approach
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Operating modern manufacturing facilities in Nairobi, Matshepo Africa adheres to disciplined production workflows designed to produce reliable construction chemical batches.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                <CheckCircle className="w-5 h-5 text-[#FFC400] mb-2.5" />
                <h3 className="text-sm font-bold text-white mb-1.5">Graded Raw Material Sourcing</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  High-grade silica sands, hydraulic cements, and specialized polymer additives.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                <CheckCircle className="w-5 h-5 text-[#FFC400] mb-2.5" />
                <h3 className="text-sm font-bold text-white mb-1.5">Homogeneous Batch Blending</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Automated dry-mixing ensuring uniform dispersion of chemical admixtures.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
                <CheckCircle className="w-5 h-5 text-[#FFC400] mb-2.5" />
                <h3 className="text-sm font-bold text-white mb-1.5">Protective Sealed Packaging</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Multi-ply moisture-resistant packaging preventing premature hydration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section F: Why Choose Us? */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-[#0875C9]">
                Professional Advantage
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#073B69] tracking-tight">
                Why Choose Matshepo Africa?
              </h2>
              <div className="space-y-3 pt-2">
                {whyChooseUs.map((point, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                    </div>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#F5F8FC] p-6 rounded-2xl border border-slate-200 text-center space-y-4">
              <Factory className="w-10 h-10 text-[#0875C9] mx-auto" />
              <h3 className="text-base font-black text-[#073B69]">Ready to Discuss Your Project?</h3>
              <p className="text-xs text-slate-600">
                Connect with our Nairobi technical team to request product samples, job-site demonstrations, or project pricing.
              </p>
              <Link
                href="/contact"
                className="btn-yellow px-6 py-3 rounded-xl text-xs font-black inline-flex items-center gap-2 shadow-xs"
              >
                <span>CONTACT OUR TEAM</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

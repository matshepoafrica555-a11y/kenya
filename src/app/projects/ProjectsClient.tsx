"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProjectItem } from "@/lib/types";
import { projectCategories } from "@/data/projects";
import {
  MapPin,
  ArrowRight,
  X,
  Layers,
  CheckCircle2,
  Calendar,
  Building,
  Sparkles,
  Search,
} from "lucide-react";

interface ProjectsClientProps {
  initialProjects?: ProjectItem[];
}

export const ProjectsClient: React.FC<ProjectsClientProps> = ({
  initialProjects = [],
}) => {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Projects");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // Sync with API in case of updates
  useEffect(() => {
    const fetchLatestProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (data.success && Array.isArray(data.projects)) {
          setProjects(data.projects);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchLatestProjects();
  }, []);

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      selectedCategory === "All Projects" || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.scope.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.systemsUsed.some((sys) =>
        sys.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#F5F8FC] min-h-screen pb-24">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#073B69] via-[#0875C9] to-[#05294A] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="container-custom relative z-10 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FFC400]/20 text-[#FFC400] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-[#FFC400]/30">
            <Sparkles className="w-3.5 h-3.5" />
            Track Record & Applications
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            PROJECTS & PORTFOLIO
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed">
            Showcasing real-world construction chemical applications, swimming pool tanking, below-grade foundations, rooftop membranes, and structural protection across Kenya.
          </p>
        </div>
      </section>

      {/* Breadcrumb & Search Bar */}
      <div className="bg-white border-b border-slate-200/80 py-3 sticky top-[68px] z-20 shadow-xs">
        <div className="container-custom flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <Link href="/" className="hover:text-[#0875C9]">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Projects Portfolio</span>
            <span className="text-slate-400">({filteredProjects.length} items)</span>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects or chemicals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0875C9] focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container-custom mt-8 space-y-8">
        {/* Category Filters */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-2 overflow-x-auto scrollbar-none">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#0875C9] text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0875C9] flex items-center justify-center mx-auto">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              No projects found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No portfolio projects match your selected filter. Clear filters or browse another category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All Projects");
                setSearchQuery("");
              }}
              className="mt-2 px-4 py-2 bg-[#0875C9] text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-[#073B69]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setActiveModalProject(project)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-blue-300 shadow-xs card-shadow-hover cursor-pointer group flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <Image
                      src={project.image || "/assets/projects/project_swimming_pool.jpg"}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#073B69]/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md backdrop-blur-xs">
                      {project.category}
                    </div>
                    {project.completionYear && (
                      <div className="absolute top-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5" />
                        {project.completionYear}
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-base font-black text-[#172333] group-hover:text-[#0875C9] transition-colors leading-tight">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#0875C9]" />
                      <span>{project.location}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Systems preview */}
                    {project.systemsUsed && project.systemsUsed.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.systemsUsed.slice(0, 2).map((sys, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-blue-50 text-[#0875C9] px-2 py-0.5 rounded-md font-medium border border-blue-100"
                          >
                            {sys}
                          </span>
                        ))}
                        {project.systemsUsed.length > 2 && (
                          <span className="text-[10px] text-slate-400 self-center">
                            +{project.systemsUsed.length - 2} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0875C9] group-hover:underline flex items-center gap-1">
                    View Full Case Study <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Case Study Modal */}
      {activeModalProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in"
        >
          <div className="relative w-full max-w-2xl bg-white text-[#172333] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col">
            <div className="relative aspect-[16/9] bg-slate-900 shrink-0">
              <Image
                src={activeModalProject.image || "/assets/projects/project_swimming_pool.jpg"}
                alt={activeModalProject.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-3 bg-[#073B69]/90 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-lg">
                {activeModalProject.category}
              </div>
              {activeModalProject.completionYear && (
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white text-xs font-medium px-3 py-1 rounded-lg flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#FFC400]" />
                  <span>Completed: {activeModalProject.completionYear}</span>
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8 space-y-4 overflow-y-auto">
              <div>
                <h3 className="text-2xl font-black text-[#073B69]">
                  {activeModalProject.name}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1.5">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#0875C9]" />
                    <span>{activeModalProject.location}</span>
                  </div>
                  {activeModalProject.client && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        <span>Client: {activeModalProject.client}</span>
                      </div>
                    </>
                  )}
                  {activeModalProject.scope && (
                    <>
                      <span>•</span>
                      <span>
                        <strong>Scope:</strong> {activeModalProject.scope}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-black uppercase text-slate-400 tracking-wider">
                  Case Study & Technical Execution
                </span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {activeModalProject.fullDetails || activeModalProject.description}
                </p>
              </div>

              {activeModalProject.systemsUsed && activeModalProject.systemsUsed.length > 0 && (
                <div className="bg-[#F5F8FC] p-4 rounded-xl border border-slate-200/60">
                  <span className="text-xs font-bold text-[#073B69] block mb-2">
                    Chemical Systems & Products Specified:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.systemsUsed.map((sys, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold bg-white text-[#0875C9] border border-blue-200 px-3 py-1 rounded-lg shadow-2xs flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                        {sys}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="btn-yellow px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

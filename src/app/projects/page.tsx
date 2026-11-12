import React from "react";
import { ProjectsClient } from "./ProjectsClient";
import { getAllProjects } from "@/lib/projects-store";
import type { Metadata } from "next";

export const instant = false;

export const metadata: Metadata = {
  title: "Projects & Portfolio | Matshepo Africa Ltd Kenya",
  description:
    "Explore our completed projects and track record across swimming pools, basements, rooftops, wet areas, and commercial flooring in Nairobi, Kenya.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  const publishedProjects = projects.filter((p) => p.status !== "draft");

  return <ProjectsClient initialProjects={publishedProjects} />;
}

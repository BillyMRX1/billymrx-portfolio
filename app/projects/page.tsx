import { getAllProjects } from "@/lib/loadProjects";
import ProjectsClient from "@/components/ProjectsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore Brilian Ade Putra's portfolio of AI systems, intelligent products, and full stack experiments from Honda's AI Engineer.",
  keywords: [
    "AI Projects",
    "Machine Learning Portfolio",
    "Data Product Showcase",
    "Full Stack Projects",
    "Next.js Portfolio",
    "Billy Projects",
    "Honda AI Projects"
  ],
  openGraph: {
    title: "Projects by Brilian Ade Putra (Billy) - AI Engineering Portfolio",
    description: "Comprehensive portfolio showcasing AI solutions, intelligent products, and full stack experiments by Honda's AI Engineer.",
  },
  twitter: {
    title: "Projects by Brilian Ade Putra (Billy) - AI Engineering Portfolio",
    description: "Comprehensive portfolio showcasing AI solutions, intelligent products, and full stack experiments by Honda's AI Engineer.",
  },
};

export default async function ProjectsPage() {
  const allProjects = await getAllProjects();

  return (
    <div className="min-h-screen pt-28 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-neon mb-6 text-center">Projects</h1>
      <ProjectsClient allProjects={allProjects} />
    </div>
  );
}

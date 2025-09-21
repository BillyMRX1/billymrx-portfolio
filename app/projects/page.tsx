import { getAllProjects } from "@/lib/loadProjects";
import ProjectsClient from "@/components/ProjectsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore Brilian Ade Putra's portfolio of AI, mobile, and full-stack projects. Android apps, Flutter applications, AI solutions, and web development work from Honda AI Engineer.",
  keywords: [
    "AI Projects",
    "Mobile App Portfolio",
    "Android Projects",
    "Flutter Applications",
    "Full Stack Projects",
    "Kotlin Projects",
    "Next.js Portfolio",
    "Billy Projects",
    "Honda AI Projects"
  ],
  openGraph: {
    title: "Projects by Brilian Ade Putra (Billy) - AI & Mobile Development Portfolio",
    description: "Comprehensive portfolio showcasing AI solutions, mobile applications, and full-stack projects by Honda's AI Engineer.",
  },
  twitter: {
    title: "Projects by Brilian Ade Putra (Billy) - AI & Mobile Development Portfolio",
    description: "Comprehensive portfolio showcasing AI solutions, mobile applications, and full-stack projects by Honda's AI Engineer.",
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

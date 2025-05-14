import { getAllProjects } from "@/lib/loadProjects";
import ProjectsClient from "@/components/ProjectsClient";

export default async function ProjectsPage() {
  const allProjects = await getAllProjects();

  return (
    <div className="min-h-screen pt-28 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-neon mb-6 text-center">Projects</h1>
      <ProjectsClient allProjects={allProjects} />
    </div>
  );
}

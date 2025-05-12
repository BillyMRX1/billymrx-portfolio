import { getAllProjects, Project } from "@/lib/loadProjects";
import ProjectsClient from "@/components/ProjectsClient";

export default async function ProjectsPage() {
  const allProjects: Record<string, Project[]> = await getAllProjects();

  return (
    <div className="min-h-screen pt-28 px-8">
      <h1 className="text-4xl font-bold text-neon mb-6">Projects</h1>
      <ProjectsClient allProjects={allProjects} />
    </div>
  );
}

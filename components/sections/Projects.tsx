import { getAllProjects } from "@/lib/loadProjects";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "@/components/ui/ProjectCard";

export default async function Projects() {
  const allProjects = await getAllProjects();

  // ML projects first, then mobile, then web
  const mlProjects = allProjects["machine-learning"] ?? [];
  const mobileProjects = allProjects["mobile"] ?? [];
  const webProjects = allProjects["web"] ?? [];

  const projects = [...mlProjects, ...mobileProjects, ...webProjects];

  return (
    <div style={{ background: "var(--bg-alt)" }} id="projects">
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "5rem 2rem",
        }}
      >
        <FadeInWhenVisible>
          <SectionHeader
            label="Projects"
            title="Things I've built."
            description="From production ML pipelines to mobile apps used by millions."
          />
        </FadeInWhenVisible>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.5rem",
          }}
          className="projects-grid"
        >
          {projects.map((project, index) => (
            <FadeInWhenVisible key={project.title} delay={index * 0.05}>
              <ProjectCard
                title={project.title}
                description={project.description}
                category={project.category}
                type={project.type}
                link={project.link}
                tech={project.tech}
              />
            </FadeInWhenVisible>
          ))}
        </div>

        <style>{`
          @media (max-width: 640px) {
            .projects-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>
    </div>
  );
}

import Link from "next/link";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import { getAllProjects, type Project } from "@/lib/loadProjects";

// Titles of the 3 featured projects. Order matters.
// Titles must match each MDX `title:` exactly (case + spelling).
const FEATURED_TITLES = [
  "Islam Time",
  "Gesture Controller",
  "Amazon Scraper MCP",
];

export default async function Projects() {
  const allProjects = await getAllProjects();
  const flat: Project[] = [
    ...(allProjects["machine-learning"] ?? []),
    ...(allProjects["web"] ?? []),
    ...(allProjects["mobile"] ?? []),
  ];

  const featured = FEATURED_TITLES.map((t) =>
    flat.find((p) => p.title === t),
  ).filter((p): p is Project => Boolean(p));

  const featuredSet = new Set(featured.map((p) => p.title));
  const rest = flat.filter((p) => !featuredSet.has(p.title));

  return (
    <section id="projects" className="bg-[var(--bg)] py-section-y-lg px-gutter">
      {/* Section header */}
      <div className="mx-auto max-w-apple-wide">
        <FadeInWhenVisible>
          <span className="block text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
            PROJECTS
          </span>
          <h2 className="mt-6 text-balance text-[clamp(40px,6vw,72px)] font-semibold leading-[1.08] tracking-[-0.028em] text-[var(--text)]">
            Things I&apos;ve built.
          </h2>
          <p className="mt-6 max-w-prose text-[21px] leading-[1.5] text-[var(--text-secondary)]">
            From production ML pipelines to mobile apps used by millions.
          </p>
        </FadeInWhenVisible>
      </div>

      {/* Featured top 3 — typographic single-column treatment */}
      <div className="mt-section-y-md">
        {featured.map((project, i) => (
          <FadeInWhenVisible key={project.title}>
            <article
              className={`flex min-h-[80vh] items-center justify-center px-gutter ${
                i > 0 ? "border-t border-[var(--separator)]" : ""
              }`}
            >
              <div className="mx-auto w-full max-w-apple text-center">
                <span className="block text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                  {project.category}
                </span>
                <h3 className="mt-8 text-balance text-[clamp(48px,7vw,96px)] font-semibold leading-[1.04] tracking-[-0.03em] text-[var(--text)]">
                  {project.title}
                </h3>
                <p className="mx-auto mt-8 max-w-prose text-[21px] leading-[1.5] text-[var(--text-secondary)]">
                  {project.description}
                </p>
                {project.tech && (
                  <p className="mt-8 text-[14px] text-[var(--text-tertiary)]">
                    {project.tech.split(",").map((t) => t.trim()).join(" · ")}
                  </p>
                )}
                {project.link && (
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link mt-12 inline-flex items-center gap-2 text-[17px] font-medium text-[var(--accent)] hover:underline"
                  >
                    View project{" "}
                    <span className="transition-transform duration-[var(--dur-base)] ease-apple group-hover/link:translate-x-1">
                      →
                    </span>
                  </Link>
                )}
              </div>
            </article>
          </FadeInWhenVisible>
        ))}
      </div>

      {/* Remaining projects: clean list */}
      <div className="mx-auto mt-section-y-md max-w-apple-wide">
        <FadeInWhenVisible>
          <h3 className="mb-12 text-[24px] font-semibold text-[var(--text)]">
            More projects
          </h3>
          <ul className="divide-y divide-[var(--separator)] border-t border-[var(--separator)]">
            {rest.map((project) => (
              <li key={project.title}>
                {project.link ? (
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ProjectListRow project={project} />
                  </Link>
                ) : (
                  <ProjectListRow project={project} />
                )}
              </li>
            ))}
          </ul>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}

function ProjectListRow({ project }: { project: Project }) {
  return (
    <div className="group/row -mx-4 grid items-baseline gap-4 rounded px-4 py-6 transition-colors duration-[var(--dur-base)] ease-apple hover:bg-[var(--surface)] md:grid-cols-[140px_1fr_auto]">
      <span className="text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
        {project.category}
      </span>
      <span className="text-[17px] font-medium text-[var(--text)]">
        {project.title}
      </span>
      <span className="text-[var(--accent)] transition-transform duration-[var(--dur-base)] ease-apple group-hover/row:translate-x-1">
        →
      </span>
    </div>
  );
}

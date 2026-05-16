"use client";

import { useRef } from "react";
import ExperienceItem from "@/components/ui/ExperienceItem";
import { useExperienceRail } from "@/components/hooks/useExperienceRail";

const EXPERIENCES = [
  {
    date: "Mar 2025 — Present",
    role: "AI Engineer",
    company: "Honda Motor Co., Ltd.",
    location: "Tokyo, Japan",
    description:
      "Design and deploy machine learning systems at Honda's AdvanceAI Strategy Planning Division. Build production ML pipelines, generative AI applications, and data platforms that drive real product decisions.",
    tech: ["Python", "LangChain", "RAG", "Azure AI", "OpenAI", "FastAPI", "Docker"],
  },
  {
    date: "Sep 2023 — Jan 2025",
    role: "Mobile Developer",
    company: "MMS Group Indonesia",
    location: "Jakarta, Indonesia",
    description:
      "Built and maintained MMSGI Chat (Android/iOS) using React Native with Rocket.Chat integration. Led external team in delivering MMSGI Super App, a multi-featured enterprise mobile solution. Set up CI/CD pipelines via GitHub Actions, cutting deployment time by 50%.",
    tech: ["React Native", "TypeScript", "Android", "iOS", "GitHub Actions", "CI/CD"],
  },
  {
    date: "Oct 2022 — Sep 2023",
    role: "Android Engineer",
    company: "Gravel",
    location: "Jakarta, Indonesia",
    description:
      "Delivered two Android apps (Gravel, Gravel Dulur) using Kotlin and Jetpack Compose. Built a reusable design system and library, reducing dev time for future projects by 20%. Designed Surveyor and Home Service features that unlocked new revenue streams.",
    tech: ["Kotlin", "Jetpack Compose", "Android", "Retrofit", "Room"],
  },
  {
    date: "Sep 2021 — Oct 2022",
    role: "Android Developer",
    company: "Vision+ (MNC Vision Networks)",
    location: "Jakarta, Indonesia",
    description:
      "Integrated Dolby Vision & Atmos, leading a team of 5 developers. Improved app performance by 75% and reduced crash rate by 15%. Maintained and released updates using Java and Kotlin.",
    tech: ["Kotlin", "Java", "Android", "ExoPlayer", "Dolby Vision"],
  },
  {
    date: "Aug 2021 — Feb 2023",
    role: "Flutter Developer · Part-Time",
    company: "Garapin",
    location: "Jakarta, Indonesia",
    description:
      "Built cross-platform apps for Android and iOS using Flutter. Developed a responsive web version with Next.js. Collaborated in feature planning and agile product cycles.",
    tech: ["Flutter", "Dart", "Next.js", "Android", "iOS"],
  },
] as const;

export default function Experience() {
  const scopeRef = useRef<HTMLElement>(null);

  useExperienceRail(scopeRef);

  return (
    <section
      ref={scopeRef}
      id="experience"
      className="relative bg-[var(--bg)] px-gutter py-20 md:py-section-y lg:py-section-y-lg"
    >
      <div className="mx-auto max-w-apple-wide">
        {/* Eyebrow */}
        <span className="block text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
          EXPERIENCE
        </span>

        {/* Display headline */}
        <h2 className="mt-6 text-balance text-[clamp(32px,6vw,72px)] font-semibold leading-[1.08] tracking-[-0.028em] text-[var(--text)]">
          Where I&rsquo;ve worked.
        </h2>

        {/* Lede */}
        <p className="mt-6 max-w-prose text-[21px] leading-[1.5] text-[var(--text-secondary)]">
          A timeline of my professional journey from mobile engineering to AI.
        </p>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Rail track + scrubbed fill */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-3 top-0 w-[2px] bg-[color-mix(in_oklab,var(--accent)_30%,transparent)]"
          >
            <div
              id="exp-rail"
              className="h-full w-full origin-top bg-[var(--accent)]"
            />
          </div>

          {/* Items */}
          <ol className="flex flex-col gap-16 pl-12">
            {EXPERIENCES.map((exp) => (
              <li key={`${exp.company}-${exp.date}`}>
                <ExperienceItem
                  date={exp.date}
                  role={exp.role}
                  company={exp.company}
                  location={exp.location}
                  description={exp.description}
                  tech={[...exp.tech]}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

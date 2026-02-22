import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import SectionHeader from "@/components/ui/SectionHeader";
import ExperienceItem from "@/components/ui/ExperienceItem";

const experiences = [
  {
    date: "Mar 2025 — Present",
    role: "AI Engineer",
    company: "Honda Motor Co., Ltd. · Tokyo, Japan",
    description:
      "Design and deploy machine learning systems at Honda's AdvanceAI Strategy Planning Division. Build production ML pipelines, generative AI applications, and data platforms that drive real product decisions.",
    tech: ["Python", "LangChain", "RAG", "Azure AI", "OpenAI", "FastAPI", "Docker"],
  },
  {
    date: "Sep 2023 — Jan 2025",
    role: "Mobile Developer",
    company: "MMS Group Indonesia · Jakarta, Indonesia",
    description:
      "Built and maintained MMSGI Chat (Android/iOS) using React Native with Rocket.Chat integration. Led external team in delivering MMSGI Super App, a multi-featured enterprise mobile solution. Set up CI/CD pipelines via GitHub Actions, cutting deployment time by 50%.",
    tech: ["React Native", "TypeScript", "Android", "iOS", "GitHub Actions", "CI/CD"],
  },
  {
    date: "Oct 2022 — Sep 2023",
    role: "Android Engineer",
    company: "Gravel · Jakarta, Indonesia",
    description:
      "Delivered two Android apps (Gravel, Gravel Dulur) using Kotlin and Jetpack Compose. Built a reusable design system and library, reducing dev time for future projects by 20%. Designed Surveyor and Home Service features that unlocked new revenue streams.",
    tech: ["Kotlin", "Jetpack Compose", "Android", "Retrofit", "Room"],
  },
  {
    date: "Sep 2021 — Oct 2022",
    role: "Android Developer",
    company: "Vision+ (MNC Vision Networks) · Jakarta, Indonesia",
    description:
      "Integrated Dolby Vision & Atmos, leading a team of 5 developers. Improved app performance by 75% and reduced crash rate by 15%. Maintained and released updates using Java and Kotlin.",
    tech: ["Kotlin", "Java", "Android", "ExoPlayer", "Dolby Vision"],
  },
  {
    date: "Aug 2021 — Feb 2023",
    role: "Flutter Developer · Part-Time",
    company: "Garapin · Jakarta, Indonesia",
    description:
      "Built cross-platform apps for Android and iOS using Flutter. Developed a responsive web version with Next.js. Collaborated in feature planning and agile product cycles.",
    tech: ["Flutter", "Dart", "Next.js", "Android", "iOS"],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "5rem 2rem",
      }}
    >
      <FadeInWhenVisible>
        <SectionHeader
          label="Experience"
          title="Where I've worked."
          description="A timeline of my professional journey from mobile engineering to AI."
        />
      </FadeInWhenVisible>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {experiences.map((exp, index) => (
          <FadeInWhenVisible key={exp.company} delay={index * 0.1}>
            <ExperienceItem
              date={exp.date}
              role={exp.role}
              company={exp.company}
              description={exp.description}
              tech={exp.tech}
            />
          </FadeInWhenVisible>
        ))}
      </div>
    </section>
  );
}

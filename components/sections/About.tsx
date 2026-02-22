import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import SectionHeader from "@/components/ui/SectionHeader";
import SkillTag from "@/components/ui/SkillTag";

const skills = [
  "Python",
  "TensorFlow",
  "PyTorch",
  "LangChain",
  "RAG",
  "Computer Vision",
  "OpenAI",
  "Azure AI",
  "Amazon Bedrock",
  "Next.js",
  "TypeScript",
  "React",
  "Kotlin",
  "Flutter",
  "Docker",
  "PostgreSQL",
];

export default function About() {
  return (
    <div style={{ background: "var(--bg-alt)" }} id="about">
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "5rem 2rem",
        }}
      >
        <FadeInWhenVisible>
          <SectionHeader label="About" title="Building at the intersection of AI and product." />
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <div style={{ maxWidth: "720px" }}>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1.25rem", lineHeight: 1.8 }}>
              I&apos;m an AI Engineer with a background that spans mobile apps, full stack
              development, and production machine learning. I&apos;ve shipped products to millions
              of users and now focus on building intelligent systems at Honda&apos;s AI strategy division.
            </p>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1.25rem", lineHeight: 1.8 }}>
              My work sits at the intersection of{" "}
              <strong style={{ color: "var(--text)", fontWeight: 600 }}>applied ML</strong> and{" "}
              <strong style={{ color: "var(--text)", fontWeight: 600 }}>product engineering</strong>.
              I care about models that work in the real world, not just in notebooks.
            </p>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1.25rem", lineHeight: 1.8 }}>
              Previously I built mobile products at Vision+, Gravel, and MMS Group Indonesia
              before transitioning into AI full time. Based in Tokyo.
            </p>

            <blockquote
              style={{
                borderLeft: "3px solid var(--accent)",
                paddingLeft: "1.25rem",
                marginTop: "1.75rem",
                marginBottom: "1.25rem",
                fontStyle: "italic",
                color: "var(--text-secondary)",
                fontSize: "0.95rem",
              }}
            >
              &ldquo;Intelligence is only useful when it ships.&rdquo;
            </blockquote>

            <p
              style={{
                color: "var(--text-secondary)",
                fontStyle: "italic",
                fontSize: "0.9rem",
                marginTop: "0.5rem",
              }}
            >
              When I&apos;m not training models, I&apos;m training Pokémon. 🎮
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "2rem" }}>
              {skills.map((skill) => (
                <SkillTag key={skill} name={skill} />
              ))}
            </div>
          </div>
        </FadeInWhenVisible>
      </section>
    </div>
  );
}

import Image from "next/image";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";

const STATS = [
  { value: "4 yrs", label: "AI in production" },
  { value: "5+", label: "products shipped" },
  { value: "2M+", label: "users reached" },
  { value: "Tokyo", label: "based in" },
] as const;

const SPECS = [
  { label: "Languages", values: "Python · TypeScript · Kotlin · Dart" },
  { label: "ML", values: "PyTorch · TensorFlow · LangChain · RAG" },
  { label: "Cloud", values: "Azure AI · AWS Bedrock · OpenAI · Vercel" },
  { label: "Stack", values: "Next.js · React · FastAPI · PostgreSQL" },
  { label: "Currently", values: "Honda AdvanceAI Strategy Planning Division" },
] as const;

export default function About() {
  return (
    <section id="about" className="bg-[var(--bg)] py-section-y-lg px-gutter">
      <div className="mx-auto max-w-apple">
        <FadeInWhenVisible>
          <span className="block text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
            ABOUT
          </span>
          <h2 className="mt-6 text-balance text-[clamp(40px,6vw,72px)] font-semibold leading-[1.08] tracking-[-0.028em] text-[var(--text)]">
            Building at the intersection<br className="hidden md:block" /> of AI and product.
          </h2>
        </FadeInWhenVisible>

        {/* Photo + bio */}
        <FadeInWhenVisible>
          <div className="mt-16 grid items-start gap-12 md:grid-cols-[240px_1fr]">
            {/* Photo */}
            <div className="group relative">
              <Image
                src="/avatar.jpg"
                alt="Brilian Ade Putra"
                width={240}
                height={240}
                className="h-60 w-60 rounded-2xl border border-[var(--separator)] object-cover grayscale-[20%] transition-all duration-[var(--dur-slow)] ease-apple group-hover:grayscale-0"
              />
            </div>

            {/* Bio */}
            <div>
              <p className="max-w-prose text-[21px] leading-[1.5] text-[var(--text-secondary)]">
                I&apos;m an AI Engineer with a background that spans mobile apps, full
                stack development, and production machine learning. I&apos;ve shipped products
                to millions of users and now focus on building intelligent systems at
                Honda&apos;s AdvanceAI Strategy division.
              </p>

              <blockquote className="mt-8 border-l-2 border-[var(--accent)] pl-4 text-[19px] italic text-[var(--text)]">
                &ldquo;Intelligence is only useful when it ships.&rdquo;
              </blockquote>

              <p className="mt-6 text-[17px] italic text-[var(--text-secondary)]">
                When I&apos;m not training models, I&apos;m training Pokémon. 🎮
              </p>
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Stats */}
        <FadeInWhenVisible>
          <dl className="mt-24 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-[var(--separator)] pt-16 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="text-[clamp(40px,5vw,56px)] font-semibold leading-none tracking-[-0.02em] tabular-nums text-[var(--accent)]">
                  {s.value}
                </dt>
                <dd className="mt-2 text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </FadeInWhenVisible>

        {/* Specs */}
        <FadeInWhenVisible>
          <dl className="mt-24 space-y-4 border-t border-[var(--separator)] pt-12">
            {SPECS.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[120px_1fr] items-baseline gap-4 md:grid-cols-[160px_1fr]"
              >
                <dt className="text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
                  {row.label}
                </dt>
                <dd className="text-[17px] text-[var(--text)]">{row.values}</dd>
              </div>
            ))}
          </dl>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}

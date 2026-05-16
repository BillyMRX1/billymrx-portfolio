interface ExperienceItemProps {
  date: string;
  role: string;
  company: string;
  location: string;
  description: string;
  tech: string[];
}

export default function ExperienceItem({
  date,
  role,
  company,
  location,
  description,
  tech,
}: ExperienceItemProps) {
  return (
    <article className="exp-item group relative rounded-2xl border border-[var(--separator)] bg-[var(--surface-elevated)] p-6 md:p-8 transition-all duration-[var(--dur-base)] ease-apple hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]">
      {/* Timeline dot — sits over the rail at left */}
      <span
        aria-hidden
        className="absolute -left-[37px] top-9 h-2 w-2 rounded-full bg-[var(--accent)] ring-4 ring-[var(--bg)] transition-shadow duration-[var(--dur-base)] ease-apple group-hover:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_20%,transparent)]"
      />

      <time className="block text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--text-tertiary)]">
        {date}
      </time>

      <h3 className="mt-3 text-[24px] font-semibold leading-[1.25] tracking-[-0.012em] text-[var(--text)]">
        {role}
      </h3>

      <p className="mt-1 text-[17px] text-[var(--text-secondary)]">
        {company} <span className="text-[var(--text-tertiary)]">·</span> {location}
      </p>

      <p className="mt-5 max-w-prose text-[17px] leading-[1.55] text-[var(--text-secondary)]">
        {description}
      </p>

      {tech.length > 0 && (
        <p className="mt-5 text-[14px] text-[var(--text-tertiary)]">
          {tech.join(" · ")}
        </p>
      )}
    </article>
  );
}

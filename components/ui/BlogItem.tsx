interface BlogItemProps {
  title: string;
  date: string;
  link: string;
  snippet?: string;
}

export default function BlogItem({ title, date, link, snippet }: BlogItemProps) {
  const formatted = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <li className="border-b border-[var(--separator)]">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group/post grid gap-2 py-6 md:grid-cols-[1fr_140px] md:items-baseline md:gap-4"
      >
        <div>
          <h4 className="text-[19px] font-semibold leading-[1.3] text-[var(--text)] transition-colors duration-[var(--dur-base)] ease-apple group-hover/post:text-[var(--accent)]">
            {title}
          </h4>
          {snippet ? (
            <p className="mt-2 max-w-prose text-[15px] text-[var(--text-secondary)] line-clamp-2">
              {snippet}
            </p>
          ) : null}
        </div>
        <time className="text-[15px] tabular-nums text-[var(--text-tertiary)] md:text-right">
          {formatted}
        </time>
      </a>
    </li>
  );
}

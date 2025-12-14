"use client";

import type { ProjectType } from "@/lib/loadProjects";

interface HologramCardProps {
  title: string;
  description: string;
  link?: string;
  type?: ProjectType;
  tech?: string;
}

export default function HologramCard({ title, description, link, type, tech }: HologramCardProps) {
  const badgeColor =
    type === "personal"
      ? "bg-purple-700"
      : type === "work"
      ? "bg-blue-700"
      : type === "freelance"
      ? "bg-green-700"
      : type === "academic"
      ? "bg-yellow-600"
      : "";

  const CardContent = (
    <div
      className={`flex flex-col h-full justify-between gap-2 p-4 border border-neon rounded-lg bg-black/30 ${
        link ? "hover:shadow-[0_0_20px_#00ffffaa] transition" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neon">{title}</h3>
        {type && (
          <span
            className={`text-xs px-2 py-1 rounded uppercase tracking-wide text-white ${badgeColor}`}
          >
            {type}
          </span>
        )}
      </div>
      <p className="text-sm text-text-primary">{description}</p>
      {tech && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {tech.split(',').map((t) => (
            <span
              key={t.trim()}
              className="text-xs px-2 py-0.5 rounded bg-neon/10 text-neon border border-neon/30"
            >
              {t.trim()}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
    >
      {CardContent}
    </a>
  ) : (
    <div className="h-full">{CardContent}</div>
  );
}

"use client";

interface HologramCardProps {
  title: string;
  description: string;
  link?: string;
  type?: "personal" | "work" | "freelance" | "academic";
}

export default function HologramCard({ title, description, link, type }: HologramCardProps) {
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
      <p className="text-sm text-gray-300">{description}</p>
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

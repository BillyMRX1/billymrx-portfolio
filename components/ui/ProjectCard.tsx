"use client";

import { useState } from "react";
import SkillTag from "./SkillTag";

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  type?: string;
  link?: string;
  tech?: string;
}

export default function ProjectCard({ title, description, category, type, link, tech }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const techTags = tech ? tech.split(",").map((t) => t.trim()).filter(Boolean) : [];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "2rem",
        border: `1px solid ${hovered ? "var(--card-border-hover)" : "var(--card-border)"}`,
        borderRadius: "12px",
        background: "var(--card-bg)",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? "var(--card-hover)" : "var(--card-shadow)",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", flexWrap: "wrap" }}>
        <span
          style={{
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--accent)",
            fontWeight: 600,
          }}
        >
          {category}
        </span>
        {type && (
          <span
            style={{
              fontSize: "0.7rem",
              padding: "0.2rem 0.6rem",
              border: "1px solid var(--border)",
              borderRadius: "100px",
              color: "var(--text-secondary)",
            }}
          >
            {type}
          </span>
        )}
      </div>

      <h3
        style={{
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "var(--text)",
          lineHeight: 1.4,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: "0.875rem",
          color: "var(--text-secondary)",
          lineHeight: 1.7,
          flex: 1,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {description}
      </p>

      {techTags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {techTags.slice(0, 4).map((tag) => (
            <SkillTag key={tag} name={tag} small />
          ))}
        </div>
      )}

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "0.85rem",
            color: "var(--accent)",
            textDecoration: "none",
            fontWeight: 500,
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
            marginTop: "0.25rem",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.textDecoration = "none")
          }
        >
          View project →
        </a>
      )}
    </div>
  );
}

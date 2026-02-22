"use client";

import { useState } from "react";
import SkillTag from "./SkillTag";

interface ExperienceItemProps {
  date: string;
  role: string;
  company: string;
  description: string;
  tech: string[];
}

export default function ExperienceItem({ date, role, company, description, tech }: ExperienceItemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr",
        gap: "2rem",
        padding: "1.75rem",
        borderRadius: "12px",
        border: `1px solid ${hovered ? "var(--border)" : "transparent"}`,
        background: hovered ? "var(--bg)" : "transparent",
        boxShadow: hovered ? "var(--card-hover)" : "none",
        transition: "all 0.25s ease",
      }}
      className="exp-item"
    >
      {/* Left column — date + timeline indicator */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* Timeline dot */}
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "var(--accent)",
            marginTop: "0.35rem",
            marginBottom: "0.5rem",
            flexShrink: 0,
            boxShadow: hovered ? "0 0 0 3px var(--accent-subtle, rgba(99,102,241,0.15))" : "none",
            transition: "box-shadow 0.25s ease",
          }}
        />
        {/* Date label */}
        <div
          style={{
            fontSize: "0.8rem",
            color: "var(--text-secondary)",
            fontWeight: 500,
            lineHeight: 1.5,
            marginBottom: "0.5rem",
          }}
        >
          {date}
        </div>
        {/* Vertical timeline line */}
        <div
          style={{
            flex: 1,
            width: "1px",
            background: "var(--border)",
            marginLeft: "3.5px",
            opacity: 0.6,
          }}
        />
      </div>

      {/* Right column — content */}
      <div>
        <div
          style={{
            fontWeight: 600,
            fontSize: "1rem",
            color: "var(--text)",
            marginBottom: "0.25rem",
          }}
        >
          {role}
        </div>
        <div
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.9rem",
            marginBottom: "0.5rem",
          }}
        >
          {company}
        </div>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.875rem",
            lineHeight: 1.7,
          }}
        >
          {description}
        </p>
        {tech.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.75rem" }}>
            {tech.map((t) => (
              <SkillTag key={t} name={t} small />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .exp-item { grid-template-columns: 1fr !important; gap: 0.25rem !important; }
        }
      `}</style>
    </div>
  );
}

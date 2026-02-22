"use client";

import { useState } from "react";

interface BlogItemProps {
  title: string;
  date: string;
  link: string;
  snippet?: string;
}

export default function BlogItem({ title, date, link, snippet }: BlogItemProps) {
  const [hovered, setHovered] = useState(false);

  const formatted = date
    ? new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : "";

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: "1.25rem 1.5rem",
        borderRadius: "10px",
        border: `1px solid ${hovered ? "var(--border)" : "transparent"}`,
        background: hovered ? "var(--bg)" : "transparent",
        boxShadow: hovered ? "var(--card-shadow)" : "none",
        transition: "all 0.2s ease",
        textDecoration: "none",
        color: "var(--text)",
        gap: "1rem",
      }}
      className="blog-item"
    >
      <div>
        <div
          style={{
            fontWeight: 600,
            fontSize: "1rem",
            color: "var(--text)",
            marginBottom: snippet ? "0.25rem" : 0,
          }}
        >
          {title}
        </div>
        {snippet && (
          <div
            style={{
              fontSize: "0.8rem",
              color: "var(--text-secondary)",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
            }}
          >
            {snippet}
          </div>
        )}
      </div>
      <div
        style={{
          fontSize: "0.8rem",
          color: "var(--text-secondary)",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {formatted}
      </div>
      <style>{`
        @media (max-width: 640px) {
          .blog-item { flex-direction: column !important; gap: 0.25rem !important; }
        }
      `}</style>
    </a>
  );
}

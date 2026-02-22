import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description:
    "The page you're looking for doesn't exist. Return to explore AI engineering projects and professional experience.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        background: "var(--bg)",
      }}
    >
      {/* Zelda-style pixel sword icon */}
      <div
        style={{
          fontSize: "4rem",
          marginBottom: "1.5rem",
          filter: "drop-shadow(0 0 16px rgba(99,102,241,0.3))",
        }}
        role="img"
        aria-label="Sword"
      >
        🗡️
      </div>

      <div
        style={{
          fontSize: "0.8rem",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "var(--accent)",
          fontWeight: 600,
          marginBottom: "1rem",
        }}
      >
        404 — Lost in Hyrule
      </div>

      <h1
        style={{
          fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "var(--text)",
          marginBottom: "1rem",
          lineHeight: 1.2,
        }}
      >
        It&apos;s dangerous to go alone!
      </h1>

      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "1rem",
          maxWidth: "420px",
          lineHeight: 1.8,
          marginBottom: "2.5rem",
        }}
      >
        This page doesn&apos;t exist. Take this link back to safety.
      </p>

      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem 1.75rem",
          background: "var(--accent)",
          color: "#fff",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: 500,
          fontSize: "0.9rem",
          transition: "background 0.2s",
        }}
      >
        ← Take this
      </Link>
    </div>
  );
}

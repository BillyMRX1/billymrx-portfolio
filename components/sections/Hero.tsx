"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function Hero() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "0 2rem",
        paddingTop: "64px",
      }}
    >
      <div
        className="hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "4rem",
          alignItems: "center",
        }}
      >
        {/* Left: text content */}
        <div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "var(--accent)",
              marginBottom: "1rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            AI Engineer · Tokyo, Japan
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              marginBottom: "1.5rem",
              color: "var(--text)",
            }}
          >
            I build intelligent
            <br />
            products that ship.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
            style={{
              fontSize: "1.2rem",
              color: "var(--text-secondary)",
              maxWidth: "580px",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}
          >
            I&apos;m Brilian Ade Putra, an AI Engineer at Honda Japan. I design and deploy
            machine learning systems for real world products, from model training to the
            interfaces people actually use.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
          >
            <button
              onClick={() => handleScroll("contact")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.6rem",
                borderRadius: "8px",
                fontSize: "0.9rem",
                fontWeight: 500,
                background: "var(--accent)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                transition: "background 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = "var(--accent-hover)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background = "var(--accent)")
              }
            >
              Get in touch
            </button>

            <a
              href="/resume.pdf"
              download
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.6rem",
                borderRadius: "8px",
                fontSize: "0.9rem",
                fontWeight: 500,
                border: "1px solid var(--border)",
                color: "var(--text)",
                background: "transparent",
                cursor: "pointer",
                transition: "all 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text)";
              }}
            >
              ↓ Resume
            </a>

            <a
              href="https://github.com/BillyMRX1"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.6rem",
                borderRadius: "8px",
                fontSize: "0.9rem",
                fontWeight: 500,
                border: "1px solid var(--border)",
                color: "var(--text)",
                background: "transparent",
                cursor: "pointer",
                transition: "all 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text)";
              }}
            >
              GitHub
            </a>
          </motion.div>
        </div>

        {/* Right: profile photo — hidden on mobile */}
        <div
          className="hero-photo-col"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
            style={{
              width: 260,
              height: 260,
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid rgba(99, 102, 241, 0.25)",
              boxShadow: "0 0 0 6px rgba(99, 102, 241, 0.08)",
              flexShrink: 0,
            }}
          >
            <Image
              src="/avatar.jpg"
              alt="Brilian Ade Putra"
              width={260}
              height={260}
              priority
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--text-secondary)",
          fontSize: "0.75rem",
          cursor: "pointer",
        }}
        onClick={() => handleScroll("about")}
      >
        <span>scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-photo-col {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

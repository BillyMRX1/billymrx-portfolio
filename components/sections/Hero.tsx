"use client";

import { useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useHeroScroll } from "@/components/hooks/useHeroScroll";
import LatentDrift from "@/components/hero/LatentDrift";
import { scrollToSection } from "@/lib/scrollToSection";

// Apple "expo-out" curve matches `--ease-apple`. Single source of truth so
// stagger timing reads identically on every child.
const APPLE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: APPLE_EASE } },
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export default function Hero(): React.JSX.Element {
  const scopeRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useHeroScroll(scopeRef);

  // When reduced-motion is on, render everything fully visible immediately
  // (skip the stagger entirely rather than relying on the global `*` reset).
  const initialState = reduced ? "visible" : "hidden";

  return (
    <section
      id="hero"
      ref={scopeRef}
      className="relative min-h-[100dvh] flex items-center justify-center px-gutter py-24"
    >
      <motion.div
        variants={container}
        initial={initialState}
        animate="visible"
        className="mx-auto max-w-apple w-full flex flex-col items-center text-center"
      >
        <div id="hero-copy" className="flex flex-col items-center will-change-transform">
          <motion.span
            variants={fadeUp}
            className="text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--text-tertiary)]"
          >
            AI Engineer · Tokyo, Japan
          </motion.span>

          <h1
            className="mt-6 font-sans font-semibold text-[var(--text)] text-[clamp(40px,9vw,96px)] leading-[1.05] tracking-[-0.035em] [text-wrap:balance]"
          >
            Intelligence, shipped.
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-[clamp(16px,1.6vw,21px)] leading-[1.5] text-[var(--text-secondary)]"
          >
            I&apos;m Brilian Ade Putra. At Honda in Tokyo, I take machine learning
            from training run to shipped product.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-[17px] font-medium text-white transition-colors duration-[400ms] ease-apple hover:bg-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
            >
              Get in touch
            </button>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-[17px] font-medium text-[var(--accent)] transition-opacity duration-[400ms] ease-apple hover:underline hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
            >
              <span aria-hidden="true">↓</span>
              <span className="ml-1">Resume</span>
            </a>
          </motion.div>
        </div>

        <motion.div
          id="hero-artifact"
          variants={fadeUp}
          className="mt-16 w-full max-w-[600px] will-change-transform"
        >
          <LatentDrift className="mx-auto w-full" />
        </motion.div>
      </motion.div>

    </section>
  );
}

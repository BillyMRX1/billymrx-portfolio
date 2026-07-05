"use client";

import { useEffect, useRef, type JSX } from "react";

type ProjectFieldProps = {
  /** Seed string (project title). Same seed always draws the same field. */
  seed: string;
  className?: string;
};

const TAU = Math.PI * 2;
const RGB_RE = /(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/;
const HEX_RE = /^#([0-9a-f]{6})$/i;

// FNV-1a: string -> 32-bit seed.
const hashSeed = (s: string): number => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

// mulberry32: tiny deterministic PRNG.
const mulberry32 = (a: number) => (): number => {
  a |= 0;
  a = (a + 0x6d2b79f5) | 0;
  let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/**
 * A deterministic "latent fingerprint" for one project: a small generative
 * dot constellation seeded by the project title. Echoes the hero's
 * LatentDrift motif so featured projects share the site's visual language.
 * Pauses rendering while offscreen; static under prefers-reduced-motion.
 */
export default function ProjectField({ seed, className }: ProjectFieldProps): JSX.Element {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = wrap.clientWidth || 300;
    let height = wrap.clientHeight || 300;
    const applyCanvasSize = (): void => {
      width = wrap.clientWidth || 300;
      height = wrap.clientHeight || 300;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    applyCanvasSize();

    // Theme colors, refreshed on data-theme flips (same approach as LatentDrift).
    const root = document.documentElement;
    const theme = { accent: "0,113,227", base: "150,150,150" };
    const parseRGB = (s: string): string => {
      const str = s.trim();
      const m = str.match(RGB_RE);
      if (m) return `${m[1]},${m[2]},${m[3]}`;
      const hex = str.match(HEX_RE);
      if (hex) {
        const n = parseInt(hex[1], 16);
        return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
      }
      return "";
    };
    const readTheme = (): void => {
      const cs = getComputedStyle(root);
      const a = parseRGB(cs.getPropertyValue("--accent"));
      const t = parseRGB(cs.getPropertyValue("--text-tertiary"));
      if (a) theme.accent = a;
      if (t) theme.base = t;
    };
    readTheme();
    const themeObs = new MutationObserver(readTheme);
    themeObs.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    // Deterministic constellation from the seed.
    const rand = mulberry32(hashSeed(seed));
    const clusterCount = 3 + Math.floor(rand() * 2); // 3-4 clusters
    const total = 150;
    const bx = new Float32Array(total);
    const by = new Float32Array(total);
    const sx = new Float32Array(total);
    const sy = new Float32Array(total);
    const ph = new Float32Array(total);
    const acc = new Uint8Array(total); // 1 = accent-colored point
    {
      let i = 0;
      for (let c = 0; c < clusterCount && i < total; c++) {
        const cx = 0.22 + rand() * 0.56;
        const cy = 0.22 + rand() * 0.56;
        const radius = 0.1 + rand() * 0.16;
        const isAccent = c === 0 ? 1 : 0;
        const count = c === clusterCount - 1 ? total - i : Math.floor(total / clusterCount);
        for (let k = 0; k < count && i < total; k++) {
          const u1 = rand() || 1e-9;
          const u2 = rand();
          const r = Math.sqrt(-2 * Math.log(u1)) * 0.45 * radius;
          const t = u2 * TAU;
          bx[i] = cx + Math.cos(t) * r;
          by[i] = cy + Math.sin(t) * r;
          sx[i] = rand() * TAU;
          sy[i] = rand() * TAU;
          ph[i] = rand() * TAU;
          acc[i] = isAccent;
          i++;
        }
      }
    }

    const drift = (t: number, s: number): number =>
      Math.sin(t * 0.0008 + s) * 0.6 + Math.sin(t * 0.00033 + s * 1.7) * 0.4;

    let cancelled = false;
    let rafId = 0;
    let visible = false;

    const render = (t: number): void => {
      if (cancelled) return;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < total; i++) {
        const px = (bx[i] + drift(t, sx[i]) * 0.018) * width;
        const py = (by[i] + drift(t, sy[i] + 1.3) * 0.018) * height;
        let alpha: number;
        let r: number;
        let color: string;
        if (acc[i] === 1) {
          alpha = 0.35 + 0.55 * (Math.sin(t * 0.0014 + ph[i] * 0.6) * 0.5 + 0.5);
          r = 1.6;
          color = `rgba(${theme.accent},${alpha.toFixed(3)})`;
        } else {
          alpha = 0.28 + (Math.sin(ph[i] + t * 0.0004) * 0.5 + 0.5) * 0.26;
          r = 1 + ((i * 2654435761) >>> 30) * 0.25;
          color = `rgba(${theme.base},${alpha.toFixed(3)})`;
        }
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, TAU);
        ctx.fill();
      }
      if (!reduced && visible) rafId = requestAnimationFrame(render);
    };

    // Only animate while on screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = visible;
        visible = entry.isIntersecting;
        if (visible && !wasVisible) {
          if (reduced) render(0);
          else rafId = requestAnimationFrame(render);
        } else if (!visible && rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      },
      { threshold: 0.05 },
    );
    io.observe(wrap);

    const resizeObs = new ResizeObserver(() => {
      applyCanvasSize();
      if (reduced && visible) render(0);
    });
    resizeObs.observe(wrap);

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      io.disconnect();
      themeObs.disconnect();
      resizeObs.disconnect();
    };
  }, [seed]);

  return (
    <div
      ref={wrapRef}
      className={className}
      aria-hidden="true"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}

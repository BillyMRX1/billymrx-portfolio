"use client";

import { useEffect, useRef, useState, type JSX } from "react";

type Cluster = { id: number; cx: number; cy: number; radius: number; count: number };
type LatentDriftProps = { className?: string; width?: number; height?: number };

const WORDS = ["embeddings", "rag", "kotlin", "honda", "tokyo", "shipped", "tokens", "context"];
const TAU = Math.PI * 2;
const RGB_RE = /(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/;
const HEX_RE = /^#([0-9a-f]{6})$/i;
const LIFT_MAX = 30;

export default function LatentDrift({
  className,
  width = 600,
  height = 400,
}: LatentDriftProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tip, setTip] = useState<{ x: number; y: number; word: string } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Theme: read accent + tertiary text once; refresh on data-theme change.
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

    let cancelled = false;
    let rafId = 0;

    // Allocate flat buffers; populate from JSON.
    const state = { pts: 0, bx: new Float32Array(0), by: new Float32Array(0), sx: new Float32Array(0), sy: new Float32Array(0), ph: new Float32Array(0), cl: new Uint8Array(0), tightness: new Float32Array(0) };

    const init = (clusters: Cluster[]): void => {
      const total = clusters.reduce((s, c) => s + c.count, 0);
      state.pts = total;
      state.bx = new Float32Array(total);
      state.by = new Float32Array(total);
      state.sx = new Float32Array(total);
      state.sy = new Float32Array(total);
      state.ph = new Float32Array(total);
      state.cl = new Uint8Array(total);
      state.tightness = new Float32Array(total);
      let i = 0;
      for (const c of clusters) {
        // tighter clusters drift less; looser clusters wander more.
        const drift = 0.35 + c.radius * 2.2;
        for (let k = 0; k < c.count; k++) {
          // Gaussian-ish radial spread via Box-Muller.
          const u1 = Math.random() || 1e-9;
          const u2 = Math.random();
          const r = Math.sqrt(-2 * Math.log(u1)) * 0.45 * c.radius;
          const t = u2 * TAU;
          state.bx[i] = c.cx + Math.cos(t) * r;
          state.by[i] = c.cy + Math.sin(t) * r;
          // Per-point seed offsets (so each dot wanders uniquely).
          state.sx[i] = Math.random() * TAU;
          state.sy[i] = Math.random() * TAU;
          state.ph[i] = Math.random() * TAU;
          state.cl[i] = c.id;
          state.tightness[i] = drift;
          i++;
        }
      }
      liftedSet = new Uint8Array(total);
    };

    // Mouse tracking + reusable lift buffers (avoid per-frame GC).
    const mouse = { x: -1e3, y: -1e3, lift: 0 };
    const liftIdx = new Int32Array(LIFT_MAX);
    const liftDist = new Float32Array(LIFT_MAX);
    // Bitset for O(1) lifted lookup, sized once after init.
    let liftedSet: Uint8Array = new Uint8Array(0);
    const onMove = (e: MouseEvent): void => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / width;
      mouse.y = (e.clientY - rect.top) / height;
      mouse.lift = reduced ? 0 : 30;
      // Choose a word from pool by approximate cluster.
      const idx = Math.floor(((mouse.x + mouse.y) * 4.7) % WORDS.length + WORDS.length) % WORDS.length;
      setTip({ x: e.clientX - rect.left, y: e.clientY - rect.top, word: WORDS[idx] });
    };
    const onLeave = (): void => { mouse.x = mouse.y = -1e3; mouse.lift = 0; setTip(null); };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    // Layered low-frequency drift — Perlin-shaped via two sin layers per axis.
    const drift = (t: number, seed: number, scale: number): number =>
      Math.sin(t * 0.0009 + seed) * 0.6 + Math.sin(t * 0.00037 + seed * 1.7) * 0.4 * scale;

    const render = (t: number): void => {
      if (cancelled) return;
      ctx.clearRect(0, 0, width, height);

      // Cache hot refs locally for tight loops.
      const pts = state.pts;
      const bx = state.bx, by = state.by, sx = state.sx, sy = state.sy;
      const ph = state.ph, cl = state.cl, tg = state.tightness;
      const mx = mouse.x, my = mouse.y;
      const lift = mouse.lift;

      // Reset lifted bitset.
      if (liftedSet.length > 0) liftedSet.fill(0);

      // Find nearest N (squared distance) to cursor; reuse hoisted buffers.
      if (lift > 0 && pts > 0) {
        for (let k = 0; k < LIFT_MAX; k++) { liftDist[k] = Infinity; liftIdx[k] = -1; }
        for (let i = 0; i < pts; i++) {
          // approximate current position for picking (cheap).
          const px = bx[i] + drift(t, sx[i], tg[i]) * 0.02;
          const py = by[i] + drift(t, sy[i] + 1.3, tg[i]) * 0.02;
          const dx = px - mx;
          const dy = py - my;
          const d = dx * dx + dy * dy;
          // insertion into top-N (small, so linear scan is fine).
          let worst = 0;
          for (let k = 1; k < LIFT_MAX; k++) if (liftDist[k] > liftDist[worst]) worst = k;
          if (d < liftDist[worst]) { liftDist[worst] = d; liftIdx[worst] = i; }
        }
        for (let k = 0; k < LIFT_MAX; k++) {
          if (liftDist[k] < 0.012 && liftIdx[k] >= 0) liftedSet[liftIdx[k]] = 1;
        }
      }

      const baseRGB = theme.base;
      const accRGB = theme.accent;
      const pulse = 0.7 + Math.sin(t * 0.0016) * 0.3; // 0.4..1.0

      for (let i = 0; i < pts; i++) {
        const tight = tg[i];
        const ox = drift(t, sx[i], tight) * 0.02;
        const oy = drift(t, sy[i] + 1.3, tight) * 0.02;
        const nx = bx[i] + ox;
        const ny = by[i] + oy;
        const isLifted = liftedSet[i] === 1;
        const px = nx * width;
        const py = ny * height - (isLifted ? 4 : 0);
        const cluster = cl[i];

        let r: number;
        let alpha: number;
        let color: string;

        if (cluster === 0) {
          // accent cluster — phase-shifted alpha modulation.
          const a = 0.4 + 0.6 * (Math.sin(t * 0.0016 + ph[i] * 0.6) * 0.5 + 0.5);
          alpha = a * (isLifted ? 1 : 0.95) * pulse;
          r = isLifted ? 2.5 : 1.6;
          color = `rgba(${accRGB},${alpha.toFixed(3)})`;
        } else {
          alpha = 0.32 + (Math.sin(ph[i] + t * 0.0004) * 0.5 + 0.5) * 0.28;
          if (isLifted) alpha = Math.min(1, alpha + 0.35);
          r = isLifted ? 2.5 : 1 + ((i * 2654435761) >>> 30) * 0.25; // 1..1.75
          color = `rgba(${baseRGB},${alpha.toFixed(3)})`;
        }

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, TAU);
        ctx.fill();
      }

      if (!reduced) rafId = requestAnimationFrame(render);
    };

    // Load JSON, init, kick rAF.
    fetch("/data/latent-drift.json", { cache: "force-cache" })
      .then((r) => r.json())
      .then((data: { clusters: Cluster[] }) => {
        if (cancelled) return;
        init(data.clusters);
        if (reduced) render(0);
        else rafId = requestAnimationFrame(render);
      })
      .catch(() => {/* silent: artifact simply doesn't appear */});

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      themeObs.disconnect();
    };
  }, [width, height]);

  return (
    <div
      className={className}
      role="presentation"
      aria-label="Decorative latent-space visualization"
      style={{ position: "relative", width, height, pointerEvents: "auto" }}
    >
      <canvas ref={canvasRef} aria-hidden="true" style={{ display: "block" }} />
      {tip && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: tip.x + 12,
            top: tip.y - 22,
            pointerEvents: "none",
            fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
            fontSize: 11,
            letterSpacing: "0.02em",
            color: "var(--text-tertiary, #86868b)",
            background: "transparent",
            whiteSpace: "nowrap",
            opacity: 0.85,
          }}
        >
          {tip.word}
        </span>
      )}
    </div>
  );
}

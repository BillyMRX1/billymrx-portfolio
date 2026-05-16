# Apple-Direction Portfolio Redesign — Design Plan

**Date:** 2026-05-15
**Subject:** billymrx.com (Brilian Ade Putra)
**Goal:** Redesign the portfolio toward Apple design language while keeping it unmistakably personal.

---

## 1. Overview

The current site is a competent dark editorial dev-portfolio (Vercel/Linear family). It works, but it reads like a template — any AI engineer could ship it. The redesign moves to **Apple's design language for marketing pages** (think apple.com/iphone, apple.com/intelligence): massive whitespace, oversized display typography, a hero artifact that does the visual heavy lifting, Liquid Glass surfaces, restrained color, and slow purposeful scroll-driven motion.

The brand identity stays: "Brilian.", AI Engineer at Honda Motor Co. in Tokyo. The personality (Pokémon line, "Intelligence is only useful when it ships." quote) stays. The skeleton stays single-page with the same six sections.

What changes is the *quality of execution* and one new feature: the hero artifact.

---

## 2. Design Principles

1. **One message per fold.** Each section has one clear job. No cramming.
2. **The artifact is the hero.** Apple sells iPhones with renders; we sell ML work with a custom visualization.
3. **Type is the architecture.** Display sizes up to 96px. Tight tracking. SF Pro Display.
4. **Color is restraint.** Black anchors. One accent. Numbers > words.
5. **Motion is purpose.** Slow, scroll-driven, one element at a time. Never decorative.

---

## 3. Design System

### 3.1 Color Tokens

Replace the current `:root` and `[data-theme="dark"]` blocks in `app/globals.css` with:

```css
/* Light — "Studio at 11am" */
:root, [data-theme="light"] {
  --bg:                #fbfbfd;
  --surface:           #f5f5f7;
  --surface-elevated:  #ffffff;
  --text:              #1d1d1f;
  --text-secondary:    #424245;
  --text-tertiary:     #86868b;
  --accent:            #0071e3;          /* Apple buy-blue */
  --accent-hover:      #0077ed;
  --separator:         rgba(0, 0, 0, 0.08);
  --glass-bg:          rgba(251, 251, 253, 0.72);
  --glass-border:      rgba(0, 0, 0, 0.06);
}

/* Dark — "OLED at midnight" */
[data-theme="dark"] {
  --bg:                #000000;          /* true black for OLED */
  --surface:           #1d1d1f;
  --surface-elevated:  #2a2a2c;
  --text:              #f5f5f7;
  --text-secondary:    #a1a1a6;
  --text-tertiary:     #6e6e73;
  --accent:            #2997ff;          /* Apple dark-mode link blue */
  --accent-hover:      #41a4ff;
  --separator:         rgba(255, 255, 255, 0.10);
  --glass-bg:          rgba(29, 29, 31, 0.72);
  --glass-border:      rgba(255, 255, 255, 0.10);
}
```

**Decision logged:** moved from `#6366f1` indigo to Apple's canonical buy-blue. Indigo is iOS-system; buy-blue is apple.com.

### 3.2 Typography

**Drop `next/font/google` Inter. Use Apple's system font stack** so SF Pro Display renders natively on Apple devices (where most design-conscious viewers will browse), with Inter as fallback elsewhere.

```css
--font-display: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", system-ui, sans-serif;
--font-text:    -apple-system, BlinkMacSystemFont, "SF Pro Text",    "Inter", system-ui, sans-serif;
--font-mono:    ui-monospace, "SF Mono", Menlo, monospace;
```

**Type scale (Apple-aggressive):**

| Token         | Size                          | Weight | Tracking  | Use                       |
|---------------|-------------------------------|--------|-----------|---------------------------|
| `display-xl`  | `clamp(56px, 9vw, 96px)` / 1.05 | 600  | -0.035em  | Hero headline             |
| `display-lg`  | `clamp(40px, 6vw, 72px)` / 1.08 | 600  | -0.028em  | Section heroes            |
| `h1`          | 48px / 1.1                    | 600    | -0.022em  | Page H1                   |
| `h2`          | 32px / 1.15                   | 600    | -0.018em  | Section title             |
| `h3`          | 24px / 1.25                   | 600    | -0.012em  | Card title                |
| `body-lg`     | 21px / 1.5                    | 400    | -0.003em  | Lede paragraph            |
| `body`        | 17px / 1.55                   | 400    | 0         | Body (Apple's canonical)  |
| `caption`     | 13px / 1.4                    | 500    | +0.005em  | Meta, timestamps          |
| `mono`        | 14px / 1.5                    | 500    | 0         | Code, tags                |

Body max-measure: 65ch. Headings tighten tracking as size grows (signature Apple optical move).

### 3.3 Spacing

Apple uses generous vertical rhythm. Extend `tailwind.config.ts`:

```ts
spacing: {
  'section-y':    '120px',
  'section-y-md': '160px',
  'section-y-lg': '200px',
  'gutter':       '22px',
},
maxWidth: {
  'apple':      '980px',   // prose-heavy sections
  'apple-wide': '1280px',  // project grids
}
```

Rule: text content stays at `max-w-apple`. Project grids and timelines can use `max-w-apple-wide`. Edge-to-edge anything is forbidden.

### 3.4 Motion

```css
--ease-apple: cubic-bezier(0.16, 1, 0.3, 1);   /* expo-out, signature */
--ease-glide: cubic-bezier(0.32, 0.72, 0, 1);  /* sheet / hand-off */
--dur-fast:  200ms;
--dur-base:  400ms;
--dur-slow:  800ms;
```

**Rules:**
- Animate only: `opacity`, `transform`, `backdrop-filter`, `color`. Never `width`/`height`/`top`/`left`.
- Hero text: 800ms fade + 32px translate.
- Cards: 200ms lift on hover (`translateY(-2px)`).
- Scroll-triggered fades: 600ms.
- Reduced motion: zero out all transitions and transforms (see `prefers-reduced-motion` block below).

### 3.5 Liquid Glass

Used on the navbar and (optionally) hero overlay only. **Not on cards** — cards stay solid surfaces, Apple doesn't put glass on cards.

```css
.glass {
  background: var(--glass-bg);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid var(--glass-border);
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.06);
}
```

Tailwind shortcut: `bg-[var(--glass-bg)] backdrop-blur-[20px] backdrop-saturate-150 border-b border-[var(--glass-border)]`.

### 3.6 Component principles

- **Button (filled):** `--accent` bg, white text, pill shape (`rounded-full`), 11px / 22px padding, 17px weight 500.
- **Button (tertiary):** transparent, `--accent` text, underline on hover.
- **Card:** `--surface-elevated` bg, no border (light) / `1px var(--separator)` (dark), 16px radius, no rest shadow, `0 12px 32px rgba(0,0,0,0.08)` on hover.
- **Input:** `--surface` bg, `1px var(--separator)`, 12px radius, focus ring `0 0 0 4px rgba(0,113,227,0.25)`.
- **Link:** `--accent`, no underline at rest, underline on hover, never color-change.

---

## 4. Section-by-Section Spec

### 4.1 Hero

**Current:** Side-by-side. Text left, floating 260px avatar right. Generic copy.
**New:** Centered. Single column. Display-xl headline. **Hero artifact** below headline replaces the avatar entirely. The page must feel like apple.com/iphone.

Layout:
```
                  [eyebrow: AI ENGINEER · TOKYO]
                  
                  Intelligence,
                  shipped.
                  
                  [21px subhead: 1 sentence specific to Billy]
                  
                  [ Get in touch ]   ↓ Resume
                  
                  [ HERO ARTIFACT — 600x400, replaces avatar ]
                  
                  scroll ↓
```

- Section is `100dvh`, content centered vertically.
- Headline 96px desktop, 56px mobile. Weight 600. Tracking -0.035em.
- One primary CTA only (filled). Resume button becomes tertiary.
- Drop the floating-photo motion entirely.
- Headline can use `text-wrap: balance`.

### 4.2 About

**Current:** Three prose paragraphs + 16 skill-tag pills + blockquote + Pokemon line.
**New:** Apple "specs" treatment.

```
ABOUT

Building at the intersection
of AI and product.

[Single tight paragraph — 4 lines max — about what you do.]

"Intelligence is only useful when it ships."  ← keep this, it's gold

[ 4 large numbers in a row ]
   4 yrs        5+              2M+         Tokyo
   AI in prod   products shipped users      based

[ Specs block — Apple style:
  Languages   Python · TypeScript · Kotlin
  Frameworks  PyTorch · LangChain · Next.js
  Cloud       Azure · AWS Bedrock · OpenAI
  Currently   Honda AdvanceAI Strategy
]

When I'm not training models, I'm training Pokémon. 🎮
```

- Kill the 16-tag pill wrap entirely.
- Stats: 56px tabular numerals, label 13px uppercase tracking +0.05em.
- Specs block: each row is `[label][indent][values]`, label in `text-tertiary`.

### 4.3 Experience

**Current:** Hardcoded 5 entries with dot timeline.
**New:** Editorial Apple Newsroom treatment with a *scrubbed* vertical accent rail (GSAP).

- Each entry: date eyebrow → role → company → 2-line description → tech inline (not pill cluster).
- Scrub a 2px accent line on left from 0% → 100% as the section scrolls.
- Each dot pops to scale 1 when its row crosses 60% viewport (batched).
- Item content slides `x: -24 → 0` 600ms on entry.

### 4.4 Projects

**Current:** Uniform 2-column card grid. All cards look identical.
**New:** Top 3 projects get **Apple product-page treatment**; the rest collapse to a quiet list.

For each of the top 3:
- Full-bleed section, ~100vh each
- Display-lg title
- One hero image / clip per project (this is the visual carry — we'll need real screenshots)
- Two big stat numbers ("**47M** inferences/day · **120ms** p99")
- Body: problem · architecture · result, in three short paragraphs
- "Read full case study →" link (future: separate route per project)

Remaining projects: clean table-style list below, no cards.

**Scroll behavior:** consider horizontal pin-scroll for the top-3 hero section (one viewport per project) — see Motion section.

### 4.5 Blog

**Current:** Clean list, dates right-aligned.
**New:** Same skeleton, but visual upgrade. Featured post (most recent) gets oversized treatment at top. Remaining posts use the current list style with the new typography.

- Featured: 32px title, 21px excerpt, 13px date eyebrow.
- List: 19px title, 15px date, hover underline grows left-to-right (CSS transform).

### 4.6 Contact

**Current:** Form right, contact links left.
**New:** Centered. One large statement.

```
                  CONTACT
                  
                  Let's build
                  something.
                  
                  [21px subhead]
                  
                  [ email pill ]   [ linkedin pill ]   [ github pill ]
                  
                  -- or --
                  
                  [ inline contact form — name, email, message, send ]
```

- Drop the side-by-side. Center everything.
- Contact pills use the new Liquid Glass / pill style.
- Form fields full-width centered, max-w-apple.

---

## 5. The Hero Artifact: "Latent Drift"

**Decision:** Latent Drift ships in v1. Live Gesture Field is planned as v2 upgrade.

### What the visitor sees

A 600×400 (responsive) canvas in the hero. About 1,200 small dots drift through a 2D embedding-like space. Soft clusters form, dissolve, recombine on a ~40s cycle. Mostly grayscale. One cluster pulses very subtly in `--accent` (Apple blue).

### Why this for Billy

Every RAG system, every LangChain agent, every embedding-based retrieval he ships lives inside a vector space. This is what his vector DB looks like internally — made visible. It's the geometry of his job. Quiet, mathematical, confident. Apple-like restraint.

### Tech approach

- Canvas 2D. ~150 LOC.
- Pre-computed UMAP positions in `public/data/latent-drift.json` (mock embedding cluster centers).
- Animation: 2D Perlin noise drives each point's offset from its cluster center.
- Honda-red pulse: cluster index 0 has phase-shifted alpha modulation.
- 60 FPS via `requestAnimationFrame`, throttle to 30 FPS on `prefers-reduced-motion`.
- File: `components/hero/LatentDrift.tsx` (client component).

### Interaction

- **Idle:** Slow Brownian drift. Always on.
- **Hover:** The 30 nearest dots to cursor lift slightly (translate up 4px, scale 1.2). Optional: tooltip reveals a label drawn from a small pool of Billy-themed words ("rag", "kotlin", "honda", "tokyo", "embeddings").
- **Scroll:** As hero exits viewport, canvas opacity fades 1 → 0.15 and depth-of-field blur ramps 0 → 8px. Controlled by GSAP pin (see motion section).

### v2 upgrade path: Live Gesture Field

When v1 is shipped and validated, replace Latent Drift with the MediaPipe-driven gesture field:
- 400 unit-vector segments
- Default: cursor-driven curl-noise alignment
- If user grants camera: MediaPipe Hands tracks index fingertip; vectors orient like iron filings
- Requires consent UX, MediaPipe WASM bundle (~3MB), and graceful degradation

This goes behind a feature flag (`NEXT_PUBLIC_HERO_ARTIFACT=gesture`) so we can A/B without recommitting.

---

## 6. Motion Choreography

### Library decision

- **Adopt GSAP + ScrollTrigger** for 3 signature scroll-pinned moments only.
- **Keep Framer Motion 12** for one-shot entries, hover/tap, theme transitions.
- **Keep `FadeInWhenVisible`** for About body, Blog list, Contact form.
- **Replace `FadeInWhenVisible`** on Hero subhead, Experience items, Project cards.
- Use `@gsap/react`'s `useGSAP()` hook for automatic cleanup.

Added deps: `gsap`, `@gsap/react`. ~28KB gzipped.

### The 3 signature moments

#### 1. Hero pin + artifact morph

`components/hooks/useHeroScroll.ts`:

```tsx
"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

export function useHeroScroll(scope: React.RefObject<HTMLElement>) {
  useGSAP(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "+=80%",
        pin: true,
        scrub: 1,
      },
    });
    tl.to("#hero-artifact",
      { scale: 1.35, rotate: -8, filter: "blur(8px)", opacity: 0.15, ease: "none" }, 0)
      .to("#hero-copy",
      { y: -60, opacity: 0.2, ease: "none" }, 0);
  }, { scope });
}
```

#### 2. Experience timeline rail + dot batch

```tsx
useGSAP(() => {
  gsap.to("#exp-rail", {
    scaleY: 1,
    transformOrigin: "top",
    scrollTrigger: {
      trigger: "#experience",
      start: "top 70%",
      end: "bottom 70%",
      scrub: true,
    },
  });
  ScrollTrigger.batch(".exp-item", {
    start: "top 75%",
    onEnter: (els) => gsap.to(els, {
      opacity: 1, x: 0,
      duration: 0.6, stagger: 0.08, ease: "expo.out",
    }),
  });
}, { scope: ref });
```

#### 3. Projects horizontal pin-scroll (top 3 only)

```tsx
useGSAP(() => {
  const row = document.querySelector<HTMLElement>("#projects-row")!;
  const distance = () => row.scrollWidth - window.innerWidth;
  gsap.to(row, {
    x: () => -distance(),
    ease: "none",
    scrollTrigger: {
      trigger: "#projects",
      pin: true,
      scrub: 0.6,
      start: "top top",
      end: () => `+=${distance()}`,
      invalidateOnRefresh: true,
    },
  });
}, { scope: ref });
```

### Reduced motion

In `app/globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    transform: none !important;
  }
}
```

And every GSAP setup gates with:

```ts
if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
```

---

## 7. Migration Plan (4 phases)

### Phase 1 — Foundation (1–2 days, invisible)

- Migrate inline styles in section components to Tailwind classes.
- Replace `:root` and `[data-theme]` blocks with new color tokens (Section 3.1).
- Extend `tailwind.config.ts` with new spacing, max-widths, easings.
- Drop `next/font/google` Inter import in `app/layout.tsx`; rely on `-apple-system` stack.
- Add type scale utilities (display-xl, display-lg, etc.) to globals.
- Update Liquid Glass styling on the navbar.
- Add reduced-motion CSS block.

Files: `app/globals.css`, `tailwind.config.ts`, `app/layout.tsx`, `components/Navbar.tsx`, all `components/sections/*.tsx` (style migration only).

### Phase 2 — Hero (2–3 days)

- Build `components/hero/LatentDrift.tsx` (Canvas 2D, ~150 LOC).
- Create `public/data/latent-drift.json` with mock cluster data.
- Rewrite `components/sections/Hero.tsx`: centered layout, drop avatar, drop floating motion, single CTA.
- Install `gsap` and `@gsap/react`.
- Create `components/hooks/useHeroScroll.ts`.
- Wire pin + artifact morph.
- Write hero copy: "Intelligence, shipped." (or Billy's pick).

### Phase 3 — Sections (3–5 days)

- Rebuild About: kill tag-pill cloud, add stats block, add specs block. Section 4.2.
- Rebuild Experience: scrubbed rail, dot batch motion. Section 4.3.
- Rebuild Projects: select top 3 for product-page treatment, gather hero images, build horizontal pin. Section 4.4.
- Featured post styling on Blog. Section 4.5.
- Centered Contact section. Section 4.6.
- Replace `FadeInWhenVisible` where listed.

### Phase 4 — Polish (1–2 days)

- Lighthouse pass (target 95+ all metrics).
- Light-mode review of every section.
- `prefers-reduced-motion` verification.
- Mobile review (375px, 768px, 1024px).
- Real device check on actual iPhone / Mac.
- Asset optimization (any new images via `next/image`).
- Update Open Graph image to match new brand.

---

## 8. Decisions Logged

| Decision | Choice | Rationale |
|---|---|---|
| Accent color | Apple buy-blue (`#0071e3` light / `#2997ff` dark) | User said "follow Apple"; buy-blue is apple.com canonical |
| Font | System font stack (SF Pro → Inter fallback) | Native rendering on Apple devices, drops next/font weight |
| Hero artifact v1 | Latent Drift (Canvas 2D, <8 hrs) | Most "Apple" of the 4 options — restraint, calm, mathematical |
| Hero artifact v2 | Live Gesture Field (MediaPipe, behind flag) | Ambitious follow-up after v1 ships |
| Motion stack | GSAP+ScrollTrigger for 3 signature moments, Framer Motion elsewhere | Pinned/scrubbed scenes need GSAP; everything else stays in Framer |
| Section padding | 120 / 160 / 200px (mobile / tablet / desktop) | Apple-generous; current 80px is cramped |
| Max-width | 980px (prose) / 1280px (grids) | Apple's two-tier container philosophy |
| About skills | Replaced with stat block + specs block | Tag-pill cloud reads as "developer template" |
| Project layout | Top 3 as full-bleed product pages, rest as quiet list | Apple sells products with hero treatments, not grids |

---

## 9. Open Questions / Future Work

- **Hero copy:** "Intelligence, shipped." is a placeholder. Billy may want something more personal. To finalize during Phase 2.
- **Project case study pages:** Phase 3 builds Apple-style sections on the homepage, but full standalone case study routes (`/projects/[slug]`) are a separate future project.
- **Hero images for top 3 projects:** Need real screenshots, mockups, or commissioned renders. Currently the project cards have no imagery.
- **OG image:** Should be regenerated with the new design system.
- **Theme toggle UX:** Current toggle works but could become a more Apple-style segmented control if we go further.
- **Performance budget:** GSAP + MediaPipe (when v2 ships) adds ~31MB to the bundle. Need to ensure lazy-loading and route-level code splitting work.

---

## 10. References

- apple.com/iphone — pinned hero + scroll choreography reference
- apple.com/intelligence — most relevant Apple page for AI content tone
- apple.com/macbook-pro — long-form product page (model for case studies)
- Apple Human Interface Guidelines: Typography, Color, Materials
- Vercel / Linear — adjacent dev-portfolio benchmarks (good but not the target)
- Rauno Freiberg — editorial dark adjacent reference

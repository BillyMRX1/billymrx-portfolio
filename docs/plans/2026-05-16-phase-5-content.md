# Phase 5 — Content & Featured Projects

**Date:** 2026-05-16
**Subject:** billymrx.com (Brilian Ade Putra)
**Goal:** Curate the right featured projects, write content that lives up to the Apple-direction typography, and surface buried production work.

---

## 1. Why this phase exists

Phase 4 polished the *vessel*. The *content inside the vessel* is still a placeholder. Specifically:

- The current featured top 3 (PDF RAG · Gesture Controller · Amazon Scraper MCP) are all **personal AI projects**. Production work — including a solo-shipped Play Store app and consumer-scale OTT app — is buried in the "More projects" list.
- Featured MDX descriptions are 1–2 sentences with zero metrics. Apple-style 96px typography *magnifies emptiness*; thin copy will look hollow at that scale.
- A solo-shipped production app ("Islam Time") and a new tinker project ("Deskflow") exist outside `content/projects/` entirely.

Two review agents (career-narrative lens + portfolio-storytelling lens) independently flagged the same root cause: **the portfolio undersells Brilian by showing only personal projects in the spotlight slots.** Recruiters and senior peers want to see "this person ships real things to real users."

---

## 2. The new featured top 3

| Rank | Project | Why |
|------|---------|-----|
| 1 | **Islam Time** | Solo-shipped on Google Play. End-to-end ownership signal — the strongest "I ship things" proof in the entire catalog. Recruiters can install it on their phone. |
| 2 | **Vision+** | Production OTT app at consumer scale (MNC distribution). Dolby Vision + Atmos integration, ExoPlayer. The "scale + premium engineering" proof. |
| 3 | **Amazon Scraper MCP** | Frontier-AI relevance (MCP, agentic). Memorable hook ("18 monitors"). The "I'm current in 2025 AI" proof. |

### What this *isn't*

- Not "three AI projects in a row" → that read as junior portfolio
- Not "three mobile production apps" → would erase the AI engineer framing
- Not the current lineup → drops PDF RAG and Gesture Controller to the quiet list

### The arc

**I ship solo · I shipped at scale · I'm working with current AI.** Three altitudes of *shipping*, not three flavors of *AI tutorials*. The AI Engineer framing is already carried by the hero (Latent Drift artifact, "AI Engineer · Tokyo" eyebrow, "Building at the intersection of AI and product" headline) and About section.

---

## 3. Content work — new MDX files

### 3.1 `content/projects/mobile/islam-time.mdx` (NEW)

```yaml
title: Islam Time
description: A solo-shipped Android prayer-time app on Google Play. Designed, built, and released end to end — accurate prayer schedules and Qibla direction for daily use.
link: https://play.google.com/store/apps/details?id=com.mrx.islam_time
category: Mobile
type: personal
tech: Kotlin, Jetpack Compose, MVVM, Google Play
```

**Body content to add (separate from frontmatter):** one tight paragraph on what makes this real product engineering — prayer-time calculation algorithm (Umm al-Qura or similar), location services, offline support, anything else distinguishing.

### 3.2 `content/projects/web/deskflow.mdx` (NEW)

Wait — Deskflow is *not* a web project, it's Python desktop tooling. **Suggested location:** Create a new category `content/projects/tools/` OR put it in `web/` for now since that's where Python scripts live in the current taxonomy. Recommend: **place in `web/`** to avoid creating a new category and reworking the loader.

```yaml
title: Deskflow
description: A laptop-to-Android input bridge — use your Windows keyboard and mouse directly on an Android device over the local network. Python + MIT licensed.
link: https://github.com/BillyMRX1/deskflow
category: Web
type: personal
tech: Python, Networking, Android, HID
```

> Note: "Web" is imperfect; Deskflow is desktop+systems. If you want, Phase 5 can also rename the `web/` directory to `tools/` and update `loadProjects.ts` — but that's a bigger refactor. Defer if you want this phase scoped tight.

### 3.3 Validation

After creating the two MDX files, run `pnpm build` — `loadProjects.ts` uses Zod schema validation; missing required fields fail at build time, not silently.

---

## 4. Content work — MDX rewrites for the new top 3

Apple-style 96px typography *demands* substantial copy. The current featured entries are too thin.

### 4.1 Vision+ — `content/projects/mobile/visionplus.mdx`

**Current:**
> "An OTT application from Indonesia build using native Android that I worked on from 2021 - 2022"

**Rewrite to include:**
- App scale (Google Play downloads if known — MNC distribution numbers)
- Specific role / what Brilian owned (player pipeline? UI layer? Casting?)
- Premium engineering moment (Dolby Vision integration story — what was hard about it?)
- Result / impact (one number if possible: crash rate, retention, install count)

**Example shape (Brilian to fill real numbers):**
```
description: OTT streaming app built natively on Android for MNC's IPTV network — shipped to [N]K+ installs on Google Play. Integrated Dolby Vision HDR and Dolby Atmos via ExoPlayer, led 5-developer team, reduced crash rate by 15%, improved cold-start performance by 75%.
```

### 4.2 Islam Time — flesh out frontmatter

The frontmatter shape above is a draft. Replace with real numbers if known:
- Active installs from Play Store
- Years live
- Any reviews / rating

### 4.3 Amazon Scraper MCP — light polish

Already strong ("18 monitors" hook is the best human line in the portfolio). One sentence on architecture would help:
- Which MCP SDK? (Node + `@modelcontextprotocol/sdk`?)
- How many Amazon domains supported in practice?
- Any unique technique (anti-bot handling, structured extraction)?

### 4.4 Demoted projects — light pass

PDF RAG and Gesture Controller stay in the "More projects" list. They don't need rewrites — but if there's time, one sentence each on what makes them technically real (PDF RAG: chunking strategy + embedding model; Gesture Controller: MediaPipe model + frame-rate target) elevates them above tutorial-tier.

---

## 5. Code change — `Projects.tsx`

Replace the `FEATURED_TITLES` constant:

```ts
// Before
const FEATURED_TITLES = [
  "PDF RAG System",
  "Gesture Controller",
  "Amazon Scraper MCP",
];

// After
const FEATURED_TITLES = [
  "Islam Time",
  "Vision+",
  "Amazon Scraper MCP",
];
```

**That's the only code change.** Project ordering and the typographic treatment from Phase 4 stay as-is.

---

## 6. Optional in this phase

### 6.1 Update the About stats block

The About section currently claims:
- **2M+ users reached**

This number was a guess. With Vision+ + Islam Time + previous Gravel/MMSGI work now properly surfaced, the number should be verified or revised. If actual reach is bigger than 2M, bump it. If smaller, tighten the claim ("100K+" beats an exaggerated "2M+").

### 6.2 Experience tech badges

Phase 1 left the Experience timeline with tech inline as " · " separated text. Verify each role's listed tech is still accurate and trim anything stale.

### 6.3 Blog featured pick

The Blog section auto-features the most recent Medium post. If the most recent post isn't representative, consider:
- Manually pinning a featured post (requires `getMediumPosts.ts` to support a featured slug)
- OR writing a fresh post that's worth featuring

Defer if blog isn't a priority right now.

---

## 7. Decisions to log

| Decision | Choice | Rationale |
|---|---|---|
| Top 3 featured | Islam Time · Vision+ · Amazon Scraper MCP | Solo prod + scale prod + frontier AI — proves shipping, AI framing already covered by hero/About |
| Demote from featured | PDF RAG System, Gesture Controller | Saturated category (RAG) + tutorial-tier (MediaPipe). Stay in "More projects." |
| Add new projects | Islam Time (mobile/), Deskflow (web/ for now) | Two genuinely missing entries; user has 15 projects total worth surfacing |
| Deskflow category | `web/` (defer rename to `tools/`) | Smallest change that gets it on the site. Refactor category taxonomy in a future cleanup. |
| Content depth | Rewrite Vision+ frontmatter with metrics | Apple 96px typography magnifies thin descriptions |

---

## 8. Implementation order

1. **Create new MDX files** (Islam Time + Deskflow) — quick, ~5 min
2. **Rewrite Vision+ MDX** with real metrics — needs Brilian's input on numbers
3. **Update `FEATURED_TITLES`** in `Projects.tsx` — single line change
4. **Run `pnpm build`** — Zod validation catches MDX issues
5. **Visual check at `localhost:3000`** — make sure the new typographic treatment renders cleanly with the new titles (Vision+ and Islam Time both work fine at 96px)
6. **Optional:** About stats block adjustment if needed

**Estimated effort:** 30 minutes (excluding the time to gather real Vision+ / Islam Time metrics from Brilian).

---

## 9. Open questions for Brilian

1. **Vision+ scale numbers** — install count, MAU, anything else verifiable?
2. **Islam Time scale numbers** — install count, ratings?
3. **About stats** — is "2M+ users reached" accurate or should it be revised? Anchor on Vision+ install count.
4. **Deskflow purpose** — is this an active project or a sandbox? If sandbox, do we want it on the public portfolio at all?
5. **Should we promote Vision+ tech stack as honestly mobile-engineering**, or pitch it as "premium consumer media engineering" (Dolby is the differentiator)?

---

## 10. Out of scope (defer to Phase 6+)

- Full case study pages per project (`/projects/[slug]` routes)
- Real screenshots / 3D renders / video clips for featured projects → unlocks horizontal pin-scroll
- Project category taxonomy refactor (`web/` → `tools/`)
- Blog featured-post manual pin support
- OG image regeneration with new featured covers
- Manifest icons

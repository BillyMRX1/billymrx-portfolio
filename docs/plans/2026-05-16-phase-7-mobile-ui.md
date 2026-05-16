# Phase 7 — Mobile UI Optimization

**Date:** 2026-05-16
**Branch:** `mobile-ui-optimization` (off main)
**Subject:** billymrx.com — fixing the mobile experience after Phases 1–5 shipped without an explicit mobile design pass.

---

## 1. Why this phase exists

The Apple-direction redesign (Phases 1–5, now merged on main) was designed and built for desktop. `clamp()` and Tailwind responsive utilities were assumed to "scale down naturally" but didn't. The actual mobile state at 375px:

- Hero H1 forced to 56px minimum (way too large)
- LatentDrift Canvas hardcoded at `600×400px` — overflows the 375px viewport
- Section padding `py-section-y-lg` = 200px top + 200px bottom (= 60% of a 667px viewport before content starts)
- Featured projects `min-h-[80vh]` × 3 = ~1,600px of mostly empty scroll
- Project title minimum 48px wraps awkwardly into 3+ lines
- About specs `grid-cols-[120px_1fr]` leaves <240px for values
- Body `line-height: 1.7` leaked through from before Phase 1 (spec says 1.55)
- Navbar embedded `<style>` block — Phase 1 was supposed to kill these

---

## 2. Brainstormed direction (locked-in decisions)

| Decision | Choice |
|---|---|
| Hero artifact on mobile | **Full-width centerpiece** — sized to viewport with aspect ratio preserved, stays as visual lead |
| Featured projects rhythm | **`min-h-[60vh]` on mobile** — tighter than 80vh, still gives each project its moment |
| Mobile-first authoring | Mobile styles as default, `md:` / `lg:` overrides for tablet and desktop |
| LatentDrift dot count on mobile | Reduce 1200 → 600 dots on width < 768px (perf) |

---

## 3. Design system updates

### 3.1 Section padding (responsive)

Replace `py-section-y-lg` with a responsive stack on every section:

```
py-20 md:py-section-y lg:py-section-y-lg
```

Resolves to: **80 / 120 / 200 px** — Apple-style mobile breathing room without being empty.

### 3.2 Type scale floors

Every clamp() with a too-large mobile floor gets a smaller minimum. The vw values stay the same:

| Element | Was | New |
|---|---|---|
| Hero H1 | `clamp(56px, 9vw, 96px)` | `clamp(40px, 9vw, 96px)` |
| Section H2s | `clamp(40px, 6vw, 72px)` | `clamp(32px, 6vw, 72px)` |
| Project featured title | `clamp(48px, 7vw, 96px)` | `clamp(36px, 7vw, 96px)` |
| About stats numbers | `clamp(40px, 5vw, 56px)` | `clamp(32px, 5vw, 56px)` |
| Blog featured title | `clamp(28px, 3.5vw, 40px)` | `clamp(22px, 3.5vw, 40px)` |
| Hero subtitle | `clamp(18px, 1.6vw, 21px)` | `clamp(16px, 1.6vw, 21px)` |

### 3.3 Body line-height bug

`app/globals.css:92` — currently `line-height: 1.7` — should be `1.55` per design spec.

---

## 4. Section-by-section changes

### 4.1 Hero (`components/sections/Hero.tsx`)

- H1 clamp → 40px floor
- Subtitle clamp → 16px floor
- Section keeps `min-h-screen py-24` (no change — hero fills viewport on mobile correctly)
- Artifact wrapper: `mt-16 w-full max-w-[600px]` stays — width follows container

### 4.2 LatentDrift (`components/hero/LatentDrift.tsx`) — biggest code change

**Make truly responsive:**

1. Drop fixed `width` / `height` props. New API: optional `aspectRatio` (default `3/2`) and `maxWidth` (default `600`).
2. Wrapper div uses CSS `aspect-ratio` + `width: 100%`:
   ```tsx
   <div style={{ position: "relative", width: "100%", aspectRatio: "3/2", maxWidth }}>
   ```
3. Internal Canvas size reads from `getBoundingClientRect()` on mount + on `ResizeObserver` events.
4. Animation buffers (`bx, by, sx, sy`, etc.) re-initialize on resize (since cluster positions are normalized 0–1, they survive resize without re-fetching JSON).
5. **Mobile dot reduction:** if computed width < 768px, scale all cluster `count` values × 0.5 (1200 → 600 dots).

Hero.tsx call site changes from `<LatentDrift width={600} height={400} className="mx-auto w-full" />` to `<LatentDrift className="mx-auto w-full" />` (props now optional).

### 4.3 About (`components/sections/About.tsx`)

- Section padding: responsive scale (see §3.1)
- Stats clamp: 32px floor
- Specs grid mobile fix:
  ```
  grid-cols-1 gap-1 md:grid-cols-[160px_1fr] md:gap-4
  ```
  Label stacks above value on mobile, side-by-side on tablet+.

### 4.4 Experience (`components/sections/Experience.tsx` + `ui/ExperienceItem.tsx`)

- Section padding: responsive scale
- Section H2 clamp: 32px floor
- ExperienceItem card padding: `p-6 md:p-8` (was just `p-8`)
- Timeline rail alignment math verified — no change needed (dot at `-left-[37px]` aligns with rail `left-3` when card has `pl-12`)

### 4.5 Projects (`components/sections/Projects.tsx`)

- Section padding: responsive scale
- Section H2 clamp: 32px floor
- Featured panels: `min-h-[60vh] md:min-h-[80vh]` (was `min-h-screen`)
- Featured title clamp: 36px floor

### 4.6 Blog (`components/sections/Blog.tsx`)

- Section padding: responsive scale
- Section H2 clamp: 32px floor
- Featured post title clamp: 22px floor
- List row: `grid md:grid-cols-[1fr_140px]` already mobile-friendly (date stacks below title via flex order on default — verify reads naturally)

### 4.7 Contact (`components/sections/Contact.tsx`)

- Section padding: responsive scale
- Section H2 clamp: 32px floor
- Glass pills `flex-wrap` already handles mobile — verify no awkward wrap at 375px

### 4.8 Navbar (`components/Navbar.tsx`)

- Drop embedded `<style>` block (lines 100-108)
- Use Tailwind responsive classes: desktop links `hidden md:flex`, mobile trigger `flex md:hidden`
- Bump mobile menu items: `text-base` (was `text-[0.9rem]`) and `py-3` for touch-friendly hit areas

---

## 5. Verification approach

After all changes:

1. `pnpm build` — confirm no type errors
2. `pnpm dev` — visual spot-check at:
   - 375×667 (iPhone SE)
   - 412×915 (Pixel 7)
   - 768×1024 (iPad portrait)
   - 1440×900 (desktop regression)
3. Hand-check:
   - Type wrapping: hero, project titles, blog featured
   - LatentDrift fills container without overflow
   - Section rhythm feels breath-y, not empty
   - About specs stack cleanly on mobile
   - Featured projects feel intentional at 60vh
   - Navbar mobile menu touch targets feel right
4. Dark mode parity check on hero + projects at mobile width

---

## 6. Implementation order

1. **Foundation** (`globals.css`, `tailwind.config.js`) — body line-height fix
2. **Type scale floors** — all 6 clamp() values across sections
3. **Section padding** — responsive `py-20 md: lg:` across 5 section files
4. **LatentDrift responsive** — the biggest code change (`hero/LatentDrift.tsx` + Hero.tsx call site)
5. **About specs grid** — mobile stack
6. **Experience card padding** — `p-6 md:p-8`
7. **Projects featured** — `min-h-[60vh] md:min-h-[80vh]`
8. **Navbar** — `<style>` block migration to Tailwind
9. **Build + visual verification**

Estimated total: **~90–95 minutes** (verification included).

---

## 7. Out of scope

- Horizontal pin-scroll for Projects featured (deferred until real screenshots exist)
- Mobile-specific copy variants (e.g., different About paragraph length)
- Per-device dark-mode tinting
- iOS safari–specific quirks (e.g., 100dvh fallbacks for older Safari versions)
- Real iPhone hardware testing (relies on user)

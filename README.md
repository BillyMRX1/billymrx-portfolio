# BillyMRX Portfolio

This repository powers [billymrx.com](https://billymrx.com), the personal portfolio of **Brilian Ade Putra (Billy)** AI Engineer at Honda Japan. The site is a single-page experience covering my work, background, and contact information.

## Live Site

[billymrx.com](https://billymrx.com)

## Site Structure

All content lives on the root `/` route as scrollable sections:

| Section    | Anchor       | Description                                      |
|------------|--------------|--------------------------------------------------|
| Hero       | (top)        | Introduction, avatar, CTA, and resume download   |
| About      | `#about`     | Background, skills, and personal note            |
| Experience | `#experience`| Professional timeline at Honda and prior roles   |
| Projects   | `#projects`  | Featured projects loaded from MDX content files  |
| Blog       | `#blog`      | Latest posts pulled from Medium via RSS          |
| Contact    | `#contact`   | EmailJS contact form                             |

The Navbar uses smooth-scroll anchor links. The resume button opens `/resume.pdf` directly (no separate page).

## Tech Stack

- **Next.js 15** (App Router) with **React 19** and **TypeScript**
- **Tailwind CSS v3** with a clean light/dark theme system (`data-theme` attribute on `<html>`)
- **Framer Motion** for scroll animations
- **EmailJS** for the contact form
- **RSS Parser** for Medium blog feed ingestion
- **Jest + Testing Library** for component and integration tests

## Component Structure

```
components/
  sections/         # Page sections: Hero, About, Experience, Projects, Blog, Contact
  ui/               # Shared primitives: SectionHeader, SkillTag, ProjectCard, ExperienceItem, BlogItem
  ThemeProvider.tsx # Theme context (light/dark, localStorage persistence)
  ThemeToggle.tsx   # Theme toggle button
  Navbar.tsx        # Fixed nav with smooth-scroll + theme toggle
  Footer.tsx        # Social links footer
  ContactForm.tsx   # EmailJS form with react-hook-form + Zod validation
  FadeInWhenVisible.tsx  # Framer Motion scroll animation wrapper
lib/
  getMediumPosts.ts # Fetches RSS feed from Medium
  loadProjects.ts   # Loads and parses MDX files from content/projects/
  skills.ts         # Skill tag data
content/
  projects/         # MDX files grouped by category (web/, mobile/, machine-learning/)
```

## Local Development

```bash
pnpm install
pnpm dev
```

The Medium RSS fetch runs on the server at build/request time. Offline development falls back to a placeholder post.

Create a `.env` file with EmailJS credentials:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## Deployment

Deployment is Docker-based with a multi-stage build (deps → builder → runner with Next.js standalone output).

```bash
# Build image and run container locally
bash ./scripts/deploy.sh
```

The **GitHub Actions** workflow (`.github/workflows/deploy.yml`) runs on every push to `main`:
1. Lints with `pnpm lint`
2. Runs tests with `pnpm test --coverage`
3. Builds with `pnpm build`
4. SSHes into the VPS, injects EmailJS secrets, and runs `deploy.sh`

---

Connect on [LinkedIn](https://www.linkedin.com/in/brilianap) or reach out via the contact form if you want to talk about AI.

# BillyMRX Portfolio

This repository powers [billymrx.com](https://billymrx.com), the personal site of **Brilian Ade Putra (Billy)** who works as an AI Engineer at Honda Japan. The experience acts as a living portfolio that blends storytelling, machine learning case studies, product thinking, and motion rich interfaces.

## Visit the Site
* Live experience: [billymrx.com](https://billymrx.com)
* Focus areas: AI engineering, intelligent products, full stack delivery from Tokyo, Japan

## Page Overview
* `/`: Hero showcase with featured projects, tech stack highlights, and calls to action
* `/projects`: Category tabs for mobile, machine learning, and web case studies
* `/about`: Animated introduction and skill groups with tilt effects
* `/experience`: Motion timeline of professional roles
* `/blog`: Medium RSS reader (`lib/getMediumPosts.ts`)
* `/resume`: Inline PDF preview plus download link
* `/contact`: EmailJS contact form with success states

## Tech Stack
* Next.js 15 (App Router) with React 19 and TypeScript
* Tailwind CSS with a custom neon inspired theme
* Framer Motion with supporting glitch, parallax, and particle libraries
* EmailJS for inbound messages and RSS Parser for Medium feed ingestion
* Jest and Testing Library for component coverage (`__tests__/`)

## Content and Structure
* `app/`: Route handlers, metadata, and page compositions
* `components/`: Reusable UI, animation hooks, and client only enhancements
* `content/projects/`: Markdown and MDX files that drive the featured and catalogued projects
* `public/`: Static assets including `avatar.jpg`, icon files, and `resume.pdf`
* `scripts/deploy.sh`: Docker helper used locally and in CI

## Local Development (optional)
```bash
pnpm install
pnpm dev
```
Medium RSS fetch runs on the server. Offline development falls back to a placeholder post.

## Deployment Notes
* `scripts/deploy.sh` builds the production image, replaces the running container, and exposes port `3000`
* GitHub Actions workflow (`.github/workflows/deploy.yml`) connects to the VPS, syncs `main`, injects EmailJS environment variables, and runs the same script remotely

## Extending the Portfolio
* Add or reorder project entries by dropping MDX files into the relevant folder under `content/projects/`
* Update experience and skill highlights directly inside `components/ExperienceClient.tsx` and `components/Skills.tsx`
* Customize motion effects or the in browser terminal via the components in `components/`

Thanks for visiting. If you would like to collaborate or chat about applied AI, reach out through the contact form or connect on [LinkedIn](https://www.linkedin.com/in/brilianap).

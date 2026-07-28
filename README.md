# Anchor

<!-- ![Anchor screenshot](./public/screenshot.png) -->
<!-- TODO: add screenshot image at public/screenshot.png showing the builder editor + live preview, then uncomment the line above -->

A resume builder built on TanStack Start, with a section-based editor, live preview, and PDF export powered by a client-side Typst rendering engine. Resume content is structured data (validated by a shared zod schema) that gets compiled to Typst markup and rendered to canvas/PDF entirely in the browser.

## Features

- **Sign in with Google** (better-auth) — each user gets a unique username used in public share links.
- **Dashboard** — create, rename, duplicate-slug, and delete resumes; grid of cards with live thumbnails.
- **Builder** — three-pane layout (Editor / live Preview / Design) with autosave:
  - **Editor**: Basics, Summary, Skills, Experience, Projects, Education, Certifications sections.
  - **Design**: pick a template (Classic / Modern), reorder sections via drag-and-drop, customize colors, and set heading/body typography.
- **Public share pages** at `/{username}/{slug}` — anonymous visitors can view and download the PDF, no login required.
- **Export** as PDF (client-side Typst compile) or raw JSON.

## Quick start

```bash
pnpm install
pnpm dev
```

Requires a `DATABASE_URL` (Neon Postgres) and Google OAuth credentials — see [src/env.ts](./src/env.ts) for the full list of required environment variables.

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19, file-based SSR routing) + TanStack Router/Query/Form
- [Drizzle ORM](https://orm.drizzle.team/) over [Neon](https://neon.tech/) Postgres
- [better-auth](https://www.better-auth.com/) (Google OAuth)
- [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Typst](https://typst.app/), compiled to WASM and run client-side, for resume rendering

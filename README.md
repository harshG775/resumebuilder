# Resume Builder

A resume builder built on TanStack Start, with a section-based editor, live preview, and PDF export powered by a client-side Typst rendering engine. Resume content is structured data (validated by a shared zod schema) that gets compiled to Typst markup and rendered to canvas/PDF entirely in the browser.

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

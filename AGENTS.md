# AGENTS.md

Guidance for AI coding agents working in this repository.

## Commands

```bash
pnpm dev              # start dev server (port 3000)
pnpm build            # production build (Nitro/Node output)
pnpm preview          # preview production build
pnpm test             # run all tests (vitest run)
pnpm vitest run <path/to/file.test.ts>   # run a single test file
pnpm lint             # eslint
pnpm format           # prettier --write . && eslint --fix
pnpm check            # prettier --check . (CI-style, no writes)
pnpm generate-routes  # regenerate src/routeTree.gen.ts (tsr generate)

pnpm db:generate      # generate a drizzle migration from schema changes
pnpm db:migrate       # apply migrations to DATABASE_URL
pnpm db:push          # push schema directly (no migration file)
pnpm db:studio        # open Drizzle Studio
```

There are currently no test files in the repo despite vitest/@testing-library being installed — don't assume test conventions exist; establish them consistent with the stack (vitest + jsdom + Testing Library) if asked to add tests.

## Architecture

This is a TanStack Start app (React 19, file-based SSR routing) with Drizzle ORM over Neon Postgres, better-auth for authentication, Tailwind v4 + shadcn/ui, and a client-side Typst engine that renders resumes to SVG (live preview) and PDF (export). Route access is gated by pathless `_public`/`_authed` layout routes, and all mutations go through validated `createServerFn` handlers. Resume content is defined by a single zod schema shared by forms, the DB column type, and template renderers.

- [docs/architecture.md](docs/architecture.md) — stack overview, path aliases, routing/data-fetching/deployment conventions, forms & UI
- [docs/auth.md](docs/auth.md) — session flow, `_public`/`_authed` gating, `authMiddleware`
- [docs/data-layer.md](docs/data-layer.md) — server functions pattern, DB schema, env var validation
- [docs/resume-domain.md](docs/resume-domain.md) — resume schema, builder UI, template renderer system
- [docs/typst-rendering.md](docs/typst-rendering.md) — client-only Typst loading, preview/export hooks

## Constraints & gotchas

- `src/routeTree.gen.ts` is auto-generated (TanStack Router plugin / `generate-routes`) — never hand-edit it.
- Import via `#/*`, not `@/*` — both resolve to `./src/*` but this repo's convention is `#/`.
- `pnpm install` runs a `postinstall` script that copies Typst WASM binaries into `public/typst/`. If Typst preview/export 404s, re-run `pnpm install`.
- Route files/folders prefixed with `-` (e.g. `-components/`) are excluded from routing — use that prefix for colocated non-route files under `src/routes`.
- New server function mutations must validate input with zod, apply `authMiddleware`, and scope every query by `userId` — see [docs/data-layer.md](docs/data-layer.md).
- Any content interpolated into Typst template strings must be escaped (see `escapeTypst` in `classic.ts`) — Typst treats `*_#$@` etc. as markup.
- Components using the Typst engine must be wrapped in `<ClientOnly>` — `getTypst()` throws on the server.
- Add shadcn primitives via `pnpm dlx shadcn@latest add <component>` — never hand-write shadcn boilerplate.
- New env vars go through `src/env.ts` (`@t3-oss/env-core`), not raw `process.env`/`import.meta.env`. Client vars need a `VITE_` prefix.



<ignore>

```text

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See @AGENTS.md for commands and architecture — this repo uses the open AGENTS.md standard as the single source of truth so guidance stays consistent across coding agents/tools.
S


```
</ignore>
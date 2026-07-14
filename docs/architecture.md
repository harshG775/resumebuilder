# Architecture

## Stack

The app is built on [TanStack Start](https://tanstack.com/start), a full-stack React framework providing file-based, SSR-capable routing on top of React 19. It's paired with:

- **TanStack Router** for file-based routing and route-level data loading
- **TanStack Query** for client-side data fetching/caching, wired into the router via `@tanstack/react-router-ssr-query`
- **TanStack Form** for form state, wrapped in a project-specific hook (see [Forms & UI components](#forms--ui-components) below)
- **Drizzle ORM** over [Neon](https://neon.tech/) serverless Postgres (HTTP driver) — see [data-layer.md](./data-layer.md)
- **better-auth** for authentication — see [auth.md](./auth.md)
- **Tailwind CSS v4** + **shadcn/ui** for styling and components
- **Typst**, compiled to WebAssembly and run entirely client-side, for resume rendering — see [typst-rendering.md](./typst-rendering.md)
- **Nitro** as the server adapter, producing a self-contained Node server for deployment

## Path aliases

`tsconfig.json` and shadcn's `components.json` both define two aliases, `#/*` and `@/*`, pointing at `./src/*`. They're equivalent at the type/bundler level; the codebase consistently uses `#/`.

## Routing conventions

Routes are files under `src/routes/`; the TanStack Router Vite plugin scans this tree and generates `src/routeTree.gen.ts`, which is imported once by `src/router.tsx` to build the router. That generated file is a build artifact, not hand-maintained source.

Layout routes group related pages and share a `component`/`beforeLoad`. Two pathless layout groups drive access control — `_public` and `_authed` — described in [auth.md](./auth.md). Segments prefixed with `-` (e.g. `src/routes/_authed/dashboard/-components/`) are ignored by the router and used for colocating components, hooks, or helpers next to the routes that use them.

Route files export a `Route` object created with `createFileRoute(path)`, optionally defining `beforeLoad` (runs before the route resolves, can redirect or extend context), `loader` (fetches data ahead of render), and `component`.

## Data fetching

Two data-fetching mechanisms are available and are used for different purposes:

- **Router loaders** (`beforeLoad`/`loader` on a route) run before the route renders and can block navigation (e.g. the auth redirects in `_public`/`_authed`, or fetching a resume by slug before rendering the builder).
- **TanStack Query**, integrated with the router via `setupRouterSsrQueryIntegration` in `src/router.tsx`, is used for client-side fetching/mutation flows inside components (e.g. calling the `resume.function.ts` server functions from the dashboard).

## Deployment

`pnpm build` produces a Nitro build; the output is a self-contained Node server startable with `node dist/server/index.mjs`. Because it's a generic Node server, it can run on any Node-compatible host (Render, Fly.io, a VPS, etc.) by shipping the `dist/` directory and running that command. Host-specific presets (Vercel, Netlify, Cloudflare, Lambda, ...) are configured through Nitro; see the [Nitro deploy docs](https://v3.nitro.build/deploy) for preset-specific tuning.

`vite.config.ts` also configures the Nitro plugin to externalize `@sentry/*` packages (`rollupConfig.external`), so an error-tracking integration can be added without bundling issues.

## Styling & tooling

Styling is Tailwind CSS v4, configured via the `@tailwindcss/vite` plugin (no separate `tailwind.config` file — Tailwind v4 is configured through `src/styles.css` and `components.json`). Formatting/linting run through Prettier and ESLint (`@tanstack/eslint-config` as the base config, with a few rules disabled in `eslint.config.js`). Tests run through Vitest, with `jsdom` and Testing Library available for component tests. See `AGENTS.md` for the actual commands.

## Forms & UI components

Forms use TanStack Form via a project-specific hook, `useAppForm` (`src/hooks/form.ts`), built with `createFormHook`. It binds a fixed set of shared field/form components — `TextField`, `TextArea`, `Switch` as field components and `SubscribeButton` as a form component, all defined in `src/components/FormComponents.tsx` — so every form in the app shares the same field rendering, validation display, and submit-button behavior instead of each form re-implementing it.

`src/components/ui/*` holds shadcn/ui primitives (button, dialog, sidebar, etc.), generated via the shadcn CLI rather than hand-written. The project's shadcn configuration (`components.json`) sets the `base-rhea` style, a `neutral` base color, and `lucide` as the icon library, with aliases pointing at the `#/` paths above.

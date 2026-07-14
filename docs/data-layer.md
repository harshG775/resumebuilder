# Data layer

## Server functions

TanStack Start's `createServerFn` defines a function that's callable from client code but always executes on the server — the framework handles serializing the call and its return value across the network boundary. A minimal example:

```ts
const getServerTime = createServerFn({ method: "GET" }).handler(async () => new Date().toISOString())
```

Server functions can declare a request `.validator()` (this project uses zod schemas) and one or more `.middleware([...])` entries that run before the handler and can inject additional `context`. Server functions can also back API routes directly (a route file's `server.handlers` can call the same functions), though this project primarily calls them from client components and from route `beforeLoad`/`loader` hooks rather than exposing separate REST-style endpoints.

## The project's server function pattern

All database access is exposed through `createServerFn` handlers in `src/lib/server/*.function.ts` — currently `auth.function.ts` (see [auth.md](./auth.md)) and `resume.function.ts`. Every mutation/query in `resume.function.ts` follows the same shape:

```ts
export const createResumeFn = createServerFn({ method: "POST" })
    .validator(z.object({ title: z.string() }))
    .middleware([authMiddleware])
    .handler(async ({ data, context }) => {
        // context.session.user.id is available and every query is scoped to it
    })
```

- Input is validated with a zod schema via `.validator()`.
- `authMiddleware` (see [auth.md](./auth.md)) guarantees `context.session.user` exists and rejects unauthenticated calls before the handler runs.
- Every query/mutation filters by `context.session.user.id` (e.g. `eq(resume.userId, context.session.user.id)`), so a user can only read or modify their own rows — there is no separate authorization layer beyond this per-query scoping.

`resume.function.ts` currently implements pagination (`getAllResumeFn`), fetch-by-slug (`getResumeBySlugFn`), create (`createResumeFn`, which also generates a unique slug via `generateUniqueSlug`), update (`updateResumeFn`), and delete (`deleteResumeFn`).

## Database schema

The schema lives under `src/lib/db/schema/`:

- `auth.ts` — `user`, `session`, `account`, `verification` tables (shape driven by better-auth's Drizzle adapter expectations)
- `resume.ts` — the `resume` table: `id`, `userId` (FK to `user`, cascade delete), `title`, `slug`, `content` (`jsonb`, typed as `ResumeValues`, defaulting to `resumeDefaultValues` — see [resume-domain.md](./resume-domain.md)), `createdAt`, `updatedAt` (auto-updated via `$onUpdate`), and an index on `userId`.
- `index.ts` — re-exports both, so other modules import from `#/lib/db/schema` rather than the individual files.

Relations (for Drizzle's relational query API) are defined separately in `src/lib/db/relations/`.

## Client & migrations

`src/lib/db/index.ts` creates the Drizzle client using `drizzle-orm/neon-http` and the `@neondatabase/serverless` HTTP driver — there's no persistent connection/pool, which suits serverless deployment targets.

`drizzle.config.ts` points `drizzle-kit` at the schema (`src/lib/db/schema/index.ts`), a Postgres dialect, and outputs migrations to `src/lib/db/migrations`. It loads `DATABASE_URL` from `.env`/`.env.local` via `dotenv` and throws if it's missing. See `AGENTS.md` for the `db:generate`/`db:migrate`/`db:push`/`db:studio` commands.

## Environment variable validation

All environment variables are declared and validated in one place, `src/env.ts`, using `@t3-oss/env-core`:

- `server` — variables only available server-side (`DATABASE_URL`, `SERVER_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`).
- `client` — variables exposed to the browser, which must be prefixed `VITE_` (enforced both at the type level and at runtime via `clientPrefix`). Currently just `VITE_PROJECT_TITLE`.
- `emptyStringAsUndefined: true` — so an empty-string env var (e.g. an unset `.env` line) is treated as absent rather than failing a type check meant for a non-string value or bypassing a default.

Code reads configuration through `env.<NAME>` from this module rather than `process.env`/`import.meta.env` directly, so misconfiguration fails fast with a validation error instead of surfacing as an obscure runtime bug.

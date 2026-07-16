# Auth & route gating

## Provider

Authentication is handled by [better-auth](https://www.better-auth.com/), configured in `src/lib/auth/auth.ts`. It uses the Drizzle adapter against the app's Postgres database (`provider: "pg"`, schema passed in from `src/lib/db/schema`), Google as the sole social sign-in provider (`env.GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`), and the `tanstackStartCookies()` plugin so session cookies are set correctly under TanStack Start's request/response handling. Sessions are cached in a cookie for 5 minutes (`session.cookieCache`) to avoid a database round-trip on every request.

The corresponding database tables (`user`, `session`, `account`, `verification`) are defined in `src/lib/db/schema/auth.ts` and follow better-auth's expected schema shape.

## Session retrieval

Two server functions in `src/lib/server/auth.function.ts` wrap `auth.api.getSession`:

- `getSessionFn` — returns the session or `null`/`undefined` if there isn't one.
- `ensureSessionFn` — same, but throws if there's no session; intended for call sites that require a signed-in user unconditionally.

Both read headers via `getRequestHeaders()` so they work in the SSR request context.

## Session in the router

The root route (`src/routes/__root.tsx`) calls `getSessionFn` in its `beforeLoad` and returns `{ session }` as router context. Because `beforeLoad` on the root route runs for every navigation, every descendant route can read `context.session` without re-fetching it.

## Route gating: `_public` / `_authed`

Two pathless layout routes use that context to gate entire subtrees:

- `src/routes/_public/route.tsx` — if `context.session?.user` is set, redirects to `/`. Wraps routes only reachable when signed out (e.g. `sign-in`).
- `src/routes/_authed/*/route.tsx` (e.g. `src/routes/_authed/builder/route.tsx`, `src/routes/_authed/dashboard/route.tsx`) — if `context.session?.user` is not set, redirects to `/`. Wraps routes that require a signed-in user (the dashboard, the resume builder).

Being "pathless" (the `_` prefix), these routes contribute no path segment of their own — they exist purely to attach a shared `beforeLoad` guard and `Outlet` to everything nested under them. A new page that should only be visible to signed-in or signed-out users is added under the matching group rather than adding an ad hoc check in the page itself.

## Server-side enforcement

Route-level gating controls navigation and UI, but server functions enforce auth independently via `authMiddleware` (`src/lib/server/auth.middleware.ts`):

```ts
export const authMiddleware = createMiddleware({ type: "function" }).server(async ({ next }) => {
    const session = await getSessionFn()
    if (!session?.user) {
        throw new Error("Unauthorized")
    }
    return await next({ context: { session } })
})
```

Any `createServerFn` that touches user data composes this middleware (`.middleware([authMiddleware])`), which both rejects unauthenticated calls and injects `context.session` into the handler so it can scope queries to `context.session.user.id`. This is what every handler in `src/lib/server/resume.function.ts` does — see [data-layer.md](./data-layer.md).

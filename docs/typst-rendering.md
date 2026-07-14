# Typst rendering

Resumes are rendered to SVG (for live preview) and PDF (for download) using [Typst](https://typst.app/) compiled to WebAssembly, running entirely in the browser rather than on a server. The Typst _source_ for a given resume is produced by a template renderer (see [resume-domain.md](./resume-domain.md#template-renderer-system)); everything in this document is about turning that source string into pixels/bytes.

## Client-only engine

`src/lib/typst/client.ts` wraps `@myriaddreamin/typst.ts`'s `$typst` singleton behind two functions:

- `configureTypst(config)` — optionally overrides the default WASM URLs before first use; throws if called after the engine has already started loading.
- `getTypst()` — lazily `import()`s the Typst package on first call, points its compiler/renderer at the WASM binaries (fetched as `ArrayBuffer`s from `/typst/*.wasm`), and caches the resulting promise so subsequent calls reuse the same initialized instance.

`getTypst()` immediately rejects if `window` is undefined, i.e. it cannot run during SSR. Any component that calls it (directly or via the hooks below) must therefore only render on the client — the builder does this by wrapping `TypstPreview` in TanStack Router's `<ClientOnly>`.

WASM URLs default to `/typst/typst_ts_web_compiler_bg.wasm` and `/typst/typst_ts_renderer_bg.wasm` (`src/lib/typst/config.ts`). Those files aren't checked in; they're copied from `node_modules` into `public/typst/` by `scripts/copy-typst-wasm.mjs`, which runs automatically as the `postinstall` npm script.

## Hooks

`src/lib/typst/useTypstSvg.ts` exposes two hooks used by the builder:

- **`useTypstSvg(source, { debounceMs })`** — debounces changes to `source` (default 250ms), then calls `getTypst()` and `typst.svg({ mainContent: source })`, tracking `status` (`idle` → `loading-engine`/`compiling` → `ready`/`error`) and the resulting SVG string. A monotonically increasing `generationRef` guards against a stale in-flight compile overwriting a newer one if `source` changes again before the previous compile resolves.
- **`useTypstCompileToPdf()`** — returns a `compileToPdf(source)` function that calls `typst.pdf({ mainContent: source })` and returns the resulting `Uint8Array`, plus `isCompiling`/`error` state. Used by the builder's download flow, with the returned bytes handed to `downloadBlob` (`src/lib/download.ts`) to trigger a browser download.

`src/lib/typst/typst-preview.tsx` (`TypstPreview`) is the component that consumes `useTypstSvg` to render the live preview pane.

## Build configuration

`vite.config.ts` lists the three Typst packages (`@myriaddreamin/typst.ts`, `@myriaddreamin/typst-ts-web-compiler`, `@myriaddreamin/typst-ts-renderer`) in both `optimizeDeps.exclude` and `ssr.noExternal`. This keeps Vite from pre-bundling packages that ship their own WASM loading logic (which can break with dependency pre-bundling) while still ensuring they're processed correctly for SSR rather than left as an external `require` that wouldn't resolve in the server bundle.

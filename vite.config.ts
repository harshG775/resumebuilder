import { defineConfig } from "vite"
import { devtools } from "@tanstack/devtools-vite"

import { tanstackStart } from "@tanstack/react-start/plugin/vite"

import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { nitro } from "nitro/vite"

const TYPST_PACKAGES = [
    "@myriaddreamin/typst.ts",
    "@myriaddreamin/typst-ts-web-compiler",
    "@myriaddreamin/typst-ts-renderer",
]

const config = defineConfig({
    resolve: { tsconfigPaths: true },
    plugins: [
        devtools(),
        nitro({ rollupConfig: { external: [/^@sentry\//] } }),
        tailwindcss(),
        tanstackStart(),
        viteReact(),
    ],
    worker: {
        format: "es",
    },
    optimizeDeps: {
        exclude: TYPST_PACKAGES,
    },
    ssr: {
        noExternal: TYPST_PACKAGES,
    },
})

export default config

import type { $typst } from "@myriaddreamin/typst.ts"
import { defaultTypstConfig } from "./config"
import type { TypstConfig } from "./config"

type TypstInstance = typeof $typst

let typstPromise: Promise<TypstInstance> | null = null
let activeConfig: TypstConfig = defaultTypstConfig

async function fetchWasmBinary(url: string): Promise<ArrayBuffer> {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`)
    return res.arrayBuffer()
}

/** Call once at app startup (client-side), before any preview/export runs. */
export function configureTypst(config: Partial<TypstConfig>) {
    if (typstPromise) {
        throw new Error("configureTypst() must be called before the Typst engine is first used")
    }
    activeConfig = { ...defaultTypstConfig, ...config }
}

export function getTypst(): Promise<TypstInstance> {
    if (typeof window === "undefined") {
        return Promise.reject(new Error("getTypst() can only run in the browser"))
    }

    if (!typstPromise) {
        typstPromise = import("@myriaddreamin/typst.ts").then(async ({ $typst, /* loadFonts */ }) => {
            // const fontBeforeBuild = activeConfig.fontUrls?.length ? [loadFonts(activeConfig.fontUrls)] : []

            $typst.setCompilerInitOptions({
                getModule: () => fetchWasmBinary(activeConfig.compilerWasmUrl),
                // beforeBuild: fontBeforeBuild,
            })
            $typst.setRendererInitOptions({
                getModule: () => fetchWasmBinary(activeConfig.rendererWasmUrl),
                // beforeBuild: fontBeforeBuild,
            })

            return $typst
        })
    }
    return typstPromise
}

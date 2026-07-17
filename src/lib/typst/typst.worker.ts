/// <reference lib="webworker" />

import { $typst } from "@myriaddreamin/typst.ts"
import { defaultTypstConfig } from "./config"

export type TypstWorkerRequest = { id: number; method: "svg" | "pdf"; mainContent: string }
export type TypstWorkerResponse = { id: number; ok: true; result: string } | { id: number; ok: false; error: string }

$typst.setCompilerInitOptions({ getModule: () => defaultTypstConfig.compilerWasmUrl })
$typst.setRendererInitOptions({ getModule: () => defaultTypstConfig.rendererWasmUrl })

self.onmessage = async (event: MessageEvent<TypstWorkerRequest>) => {
    const { id, mainContent } = event.data
    try {
        const svg = await $typst.svg({ mainContent })
        postMessage({ id, ok: true, result: svg } satisfies TypstWorkerResponse)
    } catch (err) {
        postMessage({
            id,
            ok: false,
            error: err instanceof Error ? err.message : String(err),
        } satisfies TypstWorkerResponse)
    }
}

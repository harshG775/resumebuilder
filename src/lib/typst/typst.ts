import { $typst } from "@myriaddreamin/typst.ts"
import rendererWasmUrl from "@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm?url"
import compilerWasmUrl from "@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm?url"
import { themeSource } from "./sources/theme"
import { resumeSource } from "./sources/resume"
import { classicSource } from "./sources/classic"

let initialized = false
let sourcesReady: Promise<void> | null = null

async function registerSources() {
    // All four live at the FS root so their bare-filename `#import`s resolve to each other.
    await $typst.addSource("/theme.typ", themeSource)
    await $typst.addSource("/resume.typ", resumeSource)
    await $typst.addSource("/classic.typ", classicSource)
}

export async function getTypst() {
    if (!initialized) {
        $typst.setRendererInitOptions({ getModule: () => rendererWasmUrl })
        $typst.setCompilerInitOptions({ getModule: () => compilerWasmUrl })
        initialized = true
    }
    sourcesReady ??= registerSources()
    await sourcesReady
    return $typst
}

import compilerWasmUrl from "@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm?url"
import rendererWasmUrl from "@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm?url"

export interface TypstConfig {
    compilerWasmUrl: string
    rendererWasmUrl: string
    fontUrls: string[]
}

export const defaultTypstConfig: TypstConfig = {
    compilerWasmUrl,
    rendererWasmUrl,
    fontUrls: [],
}
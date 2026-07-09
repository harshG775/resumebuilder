export interface TypstConfig {
    compilerWasmUrl: string
    rendererWasmUrl: string
    fontUrls?: string[]
}

export const defaultTypstConfig: TypstConfig = {
    compilerWasmUrl: "/typst/typst_ts_web_compiler_bg.wasm",
    rendererWasmUrl: "/typst/typst_ts_renderer_bg.wasm",
    fontUrls: [],
}

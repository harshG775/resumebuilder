import { $typst } from "@myriaddreamin/typst.ts"
import rendererWasmUrl from "@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm?url"
import compilerWasmUrl from "@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm?url"

let initialized = false

export function getTypst() {
    if (!initialized) {
        $typst.setRendererInitOptions({ getModule: () => rendererWasmUrl })
        $typst.setCompilerInitOptions({ getModule: () => compilerWasmUrl })
        initialized = true
    }
    return $typst
}

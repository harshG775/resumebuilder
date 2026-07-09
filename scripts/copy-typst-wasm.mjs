import { copyFileSync, mkdirSync } from "node:fs"
import { join } from "node:path"

const files = [
    ["@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm", "typst_ts_web_compiler_bg.wasm"],
    ["@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm", "typst_ts_renderer_bg.wasm"],
]

const outDir = join(process.cwd(), "public", "typst")
mkdirSync(outDir, { recursive: true })

for (const [src, name] of files) {
    copyFileSync(join(process.cwd(), "node_modules", src), join(outDir, name))
    console.log(`copied ${name}`)
}

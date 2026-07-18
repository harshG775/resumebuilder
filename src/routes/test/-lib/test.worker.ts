/// <reference lib="webworker" />

import type { ResumeValues } from "#/modules/resume/schema/resume.zod-schema"
import { $typst } from "@myriaddreamin/typst.ts"
import compilerWasmUrl from "@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm?url"
import rendererWasmUrl from "@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm?url"
import { classicTemplate } from "#/modules/resume/builder/templates/classic"

$typst.setCompilerInitOptions({ getModule: () => compilerWasmUrl })
$typst.setRendererInitOptions({ getModule: () => rendererWasmUrl })

//

export type TestWorkerRequest = { id: number; payload: ResumeValues }
export type TestWorkerResponse =
    | { id: number; ok: true; result: Uint8Array }
    | { id: number; ok: false; error: string }

self.onmessage = async (event: MessageEvent<TestWorkerRequest>) => {
    const { id, payload } = event.data

    try {
        const typstResumeString = classicTemplate.render(payload)
        const vector = await $typst.vector({ mainContent: typstResumeString })

        if (!vector) throw new Error("failed to compile resume")

        postMessage({ id, ok: true, result: vector } satisfies TestWorkerResponse, { transfer: [vector.buffer] })
    } catch (err) {
        postMessage({
            id,
            ok: false,
            error: err instanceof Error ? err.message : String(err),
        } satisfies TestWorkerResponse)
    }
}

import { ClientOnly, createFileRoute } from "@tanstack/react-router"
import { useEffect, useRef, useState } from "react"
import { UseTestWorker } from "./-lib/use-test-worker"
import { resumeSeedValues } from "#/modules/resume/data/resume-seed-values"
import { getTypst } from "#/lib/typst/client"

export const Route = createFileRoute("/test/")({
    component: RouteComponent,
})

function RouteComponent() {
    const [input, setInput] = useState("")

    return (
        <div className="grid grid-cols-2">
            <div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
            </div>
            <ClientOnly fallback={<div>Loading preview…</div>}>
                <WorkerExample input={input} />
            </ClientOnly>
        </div>
    )
}

function WorkerExample({ input }: { input: string }) {
    const { isLoading, error, result, compile } = UseTestWorker()
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        compile(resumeSeedValues)
    }, [input])

    useEffect(() => {
        const container = containerRef.current
        if (!result || !container) return

        let cancelled = false
        getTypst()
            .then((typst) => typst.canvas(container, { vectorData: result, pixelPerPt: 3 }))
            .catch((err) => {
                if (!cancelled) console.error(err)
            })

        return () => {
            cancelled = true
        }
    }, [result])

    return (
        <div className="aspect-square w-sm flex flex-col">
            <h1>worker</h1>

            <div>
                {isLoading && <span>worker Loading...</span>}
                {error && <pre>{error}</pre>}

                <div ref={containerRef} />
            </div>
        </div>
    )
}

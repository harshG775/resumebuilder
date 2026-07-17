import { useEffect } from "react"
import { useTypstWorker } from "./use-typst-worker"

export function TypstPreview({ source }: { source: string }) {
    const { svg, error, isCompiling, compile } = useTypstWorker()
    useEffect(() => {
        compile(source)
    }, [source])

    return (
        <div>
            {isCompiling && <span>Compiling…</span>}
            {error && <pre>{error}</pre>}
            {svg && <div dangerouslySetInnerHTML={{ __html: svg }} />}
        </div>
    )
}

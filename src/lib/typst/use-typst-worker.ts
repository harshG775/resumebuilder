import { useCallback, useEffect, useRef, useState } from "react"
import type { TypstWorkerRequest, TypstWorkerResponse } from "./typst.worker"

export function useTypstWorker() {
    const workerRef = useRef<Worker | null>(null)
    const requestIdRef = useRef(0)
    const [svg, setSvg] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isCompiling, setIsCompiling] = useState(false)

    useEffect(() => {
        const worker = new Worker(new URL("./typst.worker.ts", import.meta.url), { type: "module" })

        worker.onmessage = (event: MessageEvent<TypstWorkerResponse>) => {
            if (event.data.id !== requestIdRef.current) return
            setIsCompiling(false)
            if (event.data.ok) {
                setSvg(event.data.result)
                setError(null)
            } else {
                setError(event.data.error)
            }
        }

        workerRef.current = worker
        return () => worker.terminate()
    }, [])

    const compile = useCallback((mainContent: string) => {
        const worker = workerRef.current
        if (!worker) return
        const id = ++requestIdRef.current
        setIsCompiling(true)
        const message: TypstWorkerRequest = { id, method: "svg", mainContent }
        worker.postMessage(message)
    }, [])

    return { svg, error, isCompiling, compile }
}

import { useCallback, useEffect, useRef, useState } from "react"
import type { TestWorkerRequest, TestWorkerResponse } from "./test.worker"
import type { ResumeValues } from "#/modules/resume/schema/resume.zod-schema"

export const UseTestWorker = () => {
    const workerRef = useRef<Worker | null>(null)
    const requestIdRef = useRef(0)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<Uint8Array | null>(null)

    useEffect(() => {
        const worker = new Worker(new URL("./test.worker.ts", import.meta.url), { type: "module" })

        worker.onmessage = (event: MessageEvent<TestWorkerResponse>) => {
            if (event.data.id !== requestIdRef.current) return
            setIsLoading(true)
            if (event.data.ok) {
                setResult(event.data.result)
                setError(null)
            } else {
                setError(event.data.error)
            }
            setIsLoading(false)
        }

        workerRef.current = worker
        return () => worker.terminate()
    }, [])

    const compile = useCallback((payload: ResumeValues) => {
        const worker = workerRef.current
        if (!worker) return
        const id = ++requestIdRef.current
        setIsLoading(true)
        const message: TestWorkerRequest = { id, payload }
        worker.postMessage(message)
    }, [])

    return { isLoading, error, compile, result }
}

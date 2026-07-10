import { useCallback, useEffect, useRef, useState } from "react"
import { getTypst } from "./client"

export type TypstStatus = "idle" | "loading-engine" | "compiling" | "ready" | "error"

export interface UseTypstSvgOptions {
    debounceMs?: number
}

export interface UseTypstSvgResult {
    svg: string
    status: TypstStatus
    error: string | null
}

export function useTypstSvg(source: string, options: UseTypstSvgOptions = {}): UseTypstSvgResult {
    const { debounceMs = 250 } = options
    const [svg, setSvg] = useState("")
    const [status, setStatus] = useState<TypstStatus>("idle")
    const [error, setError] = useState<string | null>(null)
    const generationRef = useRef(0)

    useEffect(() => {
        const generation = ++generationRef.current
        const timer = setTimeout(async () => {
            try {
                setStatus((prev) => (prev === "idle" ? "loading-engine" : "compiling"))
                const typst = await getTypst()
                if (generation !== generationRef.current) return

                const result = await typst.svg({ mainContent: source })
                if (generation !== generationRef.current) return

                setSvg(result)
                setStatus("ready")
                setError(null)
            } catch (err) {
                if (generation !== generationRef.current) return
                setStatus("error")
                setError(err instanceof Error ? err.message : String(err))
            }
        }, debounceMs)

        return () => clearTimeout(timer)
    }, [source, debounceMs])

    return { svg, status, error }
}

export interface UseTypstCompileToPdfResult {
    compileToPdf: (source: string) => Promise<Uint8Array>
    isCompiling: boolean
    error: string | null
}

export function useTypstCompileToPdf(): UseTypstCompileToPdfResult {
    const [isCompiling, setIsCompiling] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const compileToPdf = useCallback(async (source: string): Promise<Uint8Array> => {
        setIsCompiling(true)
        setError(null)
        try {
            const typst = await getTypst()
            const result = await typst.pdf({ mainContent: source })
            if (!result) throw new Error("PDF compilation produced no output")
            return result
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err)
            setError(message)
            throw err
        } finally {
            setIsCompiling(false)
        }
    }, [])

    return { compileToPdf, isCompiling, error }
}

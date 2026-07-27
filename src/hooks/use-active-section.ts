import { useCallback, useEffect, useRef, useState } from "react"

const TRIGGER_OFFSET = 100

const THRESHOLDS = [0, 0.25, 0.5, 0.75, 1]
export function useActiveSection(ids: string[]) {
    const [activeId, setActiveId] = useState<string>("")

    const sectionsRef = useRef(new Map<string, HTMLElement>())
    const callbacksRef = useRef(new Map<string, (node: HTMLElement | null) => void>())

    const registerSection = useCallback((id: string) => {
        let callback = callbacksRef.current.get(id)
        if (!callback) {
            callback = (node) => {
                if (node) sectionsRef.current.set(id, node)
                else sectionsRef.current.delete(id)
            }
            callbacksRef.current.set(id, callback)
        }
        return callback
    }, [])

    useEffect(() => {
        const elements = ids.map((id) => sectionsRef.current.get(id)).filter((el): el is HTMLElement => el != null)
        if (elements.length === 0) return
        const updateActiveSection = () => {
            let bestId = ""
            let bestTop = -Infinity

            for (const id of ids) {
                const top = sectionsRef.current.get(id)?.getBoundingClientRect().top
                if (top !== undefined && top <= TRIGGER_OFFSET && top > bestTop) {
                    bestTop = top
                    bestId = id
                }
            }

            setActiveId(bestId)
        }

        updateActiveSection()

        const observer = new IntersectionObserver(updateActiveSection, { threshold: THRESHOLDS })
        elements.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [ids])

    const scrollTo = useCallback((id: string) => {
        sectionsRef.current.get(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, [])

    return { activeId, registerSection, scrollTo }
}

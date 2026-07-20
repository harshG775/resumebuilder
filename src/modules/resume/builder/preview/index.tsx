import { useEffect, useRef, useState } from "react"
import type { ResumeValues } from "../../schema/resume.zod-schema"
import { getTypst } from "#/lib/typst/typst"
import { Spinner } from "#/components/ui/spinner"
import { toast } from "sonner"
import { getTemplate } from "./templates"

export function ResumePreview({ resumeData }: { resumeData: ResumeValues | null }) {
    const containerRef = useRef<HTMLDivElement>(null)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const container = containerRef.current
        if (!resumeData || !container) return
        let cancelled = false
        
        setIsLoading(true)
        const RenderCanvas = () => {
            try {
                const typstResumeString = getTemplate(resumeData.meta.template).render(resumeData)
                const $typst = getTypst()
                $typst.canvas(container, { mainContent: typstResumeString, pixelPerPt: 3 })
            } catch (error) {
                toast.error("Error while rendering ResumePreview")
                console.log(error)
                cancelled = true
            } finally {
                setIsLoading(false)
            }
        }
        RenderCanvas()
        return () => {
            cancelled = true
        }
    }, [resumeData])

    return (
        <div className="min-w-7xl min-h-dvh">
            <style>{`
                .typst-page {
                    margin-bottom: 1.5rem;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 12px rgba(0, 0, 0, 0.08);
                }

                .typst-page:last-child {
                    margin-bottom: 0;
                }
                `}</style>
            {isLoading && <Spinner className="size-15" />}
            <div ref={containerRef} />
        </div>
    )
}

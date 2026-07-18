import { useEffect, useRef, useState } from "react"
import type { ResumeValues } from "../../schema/resume.zod-schema"
import { classicTemplate } from "./templates/classic"
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
        const $typst = getTypst()

        const RenderCanvas = async () => {
            setIsLoading(true)
            try {
                const typstResumeString = getTemplate(resumeData.meta.template).render(resumeData)
                const vector = await $typst.vector({ mainContent: typstResumeString })
                if (vector) {
                    $typst.canvas(container, { vectorData: vector, pixelPerPt: 3 })
                }
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
        <div className="min-w-7xl">
            {isLoading && <Spinner className="size-15" />}
            <div ref={containerRef} />
        </div>
    )
}

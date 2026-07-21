import { useEffect, useRef, useState } from "react"
import type { ResumeValues } from "../../schema/resume.zod-schema"
import { getTypst } from "#/lib/typst/typst"
import { getTemplate } from "./templates"
import { RotateCcwIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react"

import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import { Button } from "#/components/ui/button"
import { Spinner } from "#/components/ui/spinner"

export function ResumePreview({ resumeData }: { resumeData: ResumeValues | null }) {
    const containerRef = useRef<HTMLDivElement>(null)

    const [initRendered, setInitRendered] = useState(false)

    useEffect(() => {
        const container = containerRef.current
        if (!resumeData || !container) return
        getTypst()
            .canvas(container, { mainContent: getTemplate(resumeData.meta.template).render(resumeData), pixelPerPt: 3 })
            .then(() => {
                console.log("rendered")
            })
            .finally(() => {
                setInitRendered(true)
            })
    }, [resumeData])

    return (
        <>
            {!initRendered && (
                <div className="fixed inset-0 h-screen w-screen grid place-content-center">
                    <Spinner className="size-8" />
                </div>
            )}
            <style>{`
                .typst-page {
                    margin-bottom: 1.5rem;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 12px rgba(0, 0, 0, 0.08);
                }

                .typst-page:last-child {
                    margin-bottom: 0;
                }
                `}</style>
            <TransformWrapper initialScale={0.4} minScale={0.1} maxScale={2} centerOnInit limitToBounds={false}>
                {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                        <div className="fixed bottom-4 left-4 right-4 z-10 flex justify-center">
                            <div className="flex items-center gap-1 rounded-lg border bg-sidebar/70 p-1 shadow pointer-events-auto">
                                <Button variant="ghost" size="icon-sm" onClick={() => resetTransform()}>
                                    <RotateCcwIcon className="size-4" />
                                    <span className="sr-only">Reset zoom</span>
                                </Button>
                                <Button variant="ghost" size="icon-sm" onClick={() => zoomOut()}>
                                    <ZoomOutIcon className="size-4" />
                                    <span className="sr-only">Zoom out</span>
                                </Button>
                                <Button variant="ghost" size="icon-sm" onClick={() => zoomIn()}>
                                    <ZoomInIcon className="size-4" />
                                    <span className="sr-only">Zoom in</span>
                                </Button>
                            </div>
                        </div>
                        <TransformComponent
                            wrapperStyle={{
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <div ref={containerRef} className="min-w-[297mm] w-full h-full" />
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
        </>
    )
}

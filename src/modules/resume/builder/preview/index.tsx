import { useCallback, useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import type { ResumeValues } from "../../schema/resume.zod-schema"
import { getTypst } from "#/lib/typst/typst"
import { getTemplate } from "./templates"
import { RotateCcwIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react"
import { useDebouncedCallback } from "@tanstack/react-pacer"

import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import type { ReactZoomPanPinchRef } from "react-zoom-pan-pinch"
import { Button } from "#/components/ui/button"
import { Skeleton } from "#/components/ui/skeleton"

function ResumePreviewArea({ children }: { children: ReactNode }) {
    const ref = useRef<ReactZoomPanPinchRef | null>(null)
    useEffect(() => {
        ref.current?.resetTransform()
    }, [])
    return (
        <TransformWrapper ref={ref} initialScale={0.5} minScale={0.25} maxScale={2} limitToBounds={false} centerOnInit>
            {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                    <div className="fixed bottom-20 left-4 right-4 z-30 flex justify-center md:bottom-4">
                        <div className="pointer-events-auto flex items-center gap-1 rounded-lg border bg-sidebar/70 p-1 shadow">
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
                        {children}
                    </TransformComponent>
                </>
            )}
        </TransformWrapper>
    )
}

function ResumeSkeleton() {
    return (
        <div className="absolute inset-0 space-y-6 bg-white p-10 shadow">
            <div className="space-y-2">
                <Skeleton className="h-6 w-2/5" />
                <Skeleton className="h-3 w-3/5" />
            </div>

            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-11/12" />
                    <Skeleton className="h-3 w-4/5" />
                </div>
            ))}
        </div>
    )
}

const RENDER_DEBOUNCE_MS = 250

export function ResumePreview({ resumeData }: { resumeData: ResumeValues | null }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [initRendered, setInitRendered] = useState(false)

    const isRenderingRef = useRef(false)
    const pendingDataRef = useRef<ResumeValues | null>(null)

    const renderCanvas = useCallback(async (data: ResumeValues) => {
        const container = containerRef.current
        if (!container) return

        if (isRenderingRef.current) {
            pendingDataRef.current = data
            return
        }

        isRenderingRef.current = true
        try {
            const typst = getTypst()
            await typst.canvas(container, {
                mainContent: getTemplate(data.meta.template).render(data),
                pixelPerPt: 4,
            })
        } catch (error) {
            console.error("Failed to render preview:", error)
        } finally {
            isRenderingRef.current = false
            setInitRendered(true)
        }

        const pending = pendingDataRef.current
        if (pending) {
            pendingDataRef.current = null
            renderCanvas(pending)
        }
    }, [])

    const debouncedRenderCanvas = useDebouncedCallback(renderCanvas, { wait: RENDER_DEBOUNCE_MS })

    useEffect(() => {
        if (!resumeData) return
        renderCanvas(resumeData)
    }, [])

    useEffect(() => {
        if (!resumeData || !initRendered) return
        debouncedRenderCanvas(resumeData)
    }, [resumeData, debouncedRenderCanvas])

    return (
        <>
            <style>{`
                .typst-page {
                    margin-bottom: 1.5rem;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15), 0 1px 12px rgba(0, 0, 0, 0.08);
                }

                .typst-page:last-child {
                    margin-bottom: 0;
                }
                `}</style>

            <ResumePreviewArea>
                <div
                    style={{
                        position: "relative",
                        width: "210mm",
                        minHeight: "297mm",
                    }}
                >
                    {!initRendered && <ResumeSkeleton />}
                    <div ref={containerRef} />
                </div>
            </ResumePreviewArea>
        </>
    )
}

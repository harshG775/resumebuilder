import { Button } from "#/components/ui/button"
import { Skeleton } from "#/components/ui/skeleton"
import { to } from "#/lib/await-to"
import { downloadBlob } from "#/lib/download"
import { getResumeByUsernameAndSlugFn } from "#/lib/server/resume.function"
import { getTypst } from "#/lib/typst/typst"
import { getTemplate } from "#/modules/resume/builder/preview/templates"
import { createFileRoute, Link, notFound } from "@tanstack/react-router"
import { DownloadIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"

export const Route = createFileRoute("/$username/$slug")({
    loader: async ({ params }) => {
        const [error, resume] = await to(
            getResumeByUsernameAndSlugFn({ data: { username: params.username, slug: params.slug } }),
        )
        if (error) throw error
        if (!resume?.success) throw notFound()
        return { resume }
    },
    notFoundComponent: () => (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 text-center font-sans">
            <h1 className="text-3xl font-bold text-red-500 mb-2">Resume Not Found</h1>
            <p className="text-gray-500 mb-6">We couldn't find the resume you were looking for.</p>
            <div className="flex flex-wrap gap-2 items-center">
                <Button render={<Link to="/" />} nativeButton={false} variant="secondary">
                    Go Home
                </Button>
            </div>
        </div>
    ),
    head: ({ loaderData }) => ({
        meta: loaderData
            ? [
                  {
                      title: `${loaderData.resume.data.title} · ${loaderData.resume.data.ownerName}`,
                  },
              ]
            : undefined,
    }),
    component: RouteComponent,
})

function RouteComponent() {
    const { resume } = Route.useLoaderData()

    const containerRef = useRef<HTMLDivElement>(null)
    const [isRendered, setIsRendered] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return
        const run = async () => {
            const typst = getTypst()
            const result = await typst.svg({
                mainContent: getTemplate(resume.data.content.meta.template).render(resume.data.content),
            })
            container.innerHTML = result
            setIsRendered(true)
        }
        run()
    }, [])

    async function handleDownloadPdf() {
        setIsDownloading(true)
        try {
            const typst = getTypst()
            const pdfBytes = await typst.pdf({
                mainContent: getTemplate(resume.data.content.meta.template).render(resume.data.content),
            })
            if (pdfBytes) {
                downloadBlob(pdfBytes, `${resume.data.slug || "resume"}.pdf`, "application/pdf")
            }
        } catch (err) {
            console.error(err)
            toast.error("Failed to generate PDF", {
                description: err instanceof Error ? err.message : "Please try again.",
            })
        } finally {
            setIsDownloading(false)
        }
    }

    return (
        <div className="min-h-screen bg-muted">
            <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-sidebar/80 px-4 backdrop-blur">
                <div className="min-w-0 truncate text-sm font-medium">
                    {resume.data.title} <span className="text-muted-foreground">· {resume.data.ownerName}</span>
                </div>
                <Button size="sm" onClick={handleDownloadPdf} disabled={isDownloading}>
                    <DownloadIcon />
                    {isDownloading ? "Downloading…" : "Download PDF"}
                </Button>
            </header>

            <div className="flex justify-center px-4 py-10">
                <div className="relative w-[210mm] max-w-full min-h-[297mm]">
                    {!isRendered && (
                        <div className="absolute inset-0 space-y-6 overflow-hidden rounded bg-white p-10 shadow">
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
                    )}
                    <div
                        ref={containerRef}
                        className="[&_svg]:block [&_svg]:w-full [&_svg]:h-auto [&_svg]:bg-white [&_svg]:shadow-lg"
                    />
                </div>
            </div>
        </div>
    )
}

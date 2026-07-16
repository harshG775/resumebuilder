import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "#/components/ui/breadcrumb"
import { Button } from "#/components/ui/button"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "#/components/ui/resizable"
import { Separator } from "#/components/ui/separator"
import { Link } from "@tanstack/react-router"
import { ChevronDownIcon, DownloadIcon, HomeIcon, RotateCcwIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react"
import type React from "react"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"
import { Spinner } from "#/components/ui/spinner"

type BuilderLayoutProps = {
    title: string
    editor: React.ReactNode
    preview: React.ReactNode
    design: React.ReactNode
    onDownload?: () => void
    isDownloading?: boolean
    isSaving?: boolean
}
export default function BuilderLayout({
    title,
    editor,
    preview,
    design,
    onDownload,
    isDownloading,
    isSaving,
}: BuilderLayoutProps) {
    return (
        <div className="h-screen w-screen bg-muted">
            <div className="fixed inset-0 z-20 pointer-events-none">
                <header className="bg-sidebar shadow flex items-center h-12 gap-2 px-3 pointer-events-auto">
                    <div className="flex-1 flex gap-2 justify-start">
                        <div className="flex items-center gap-1 text-xs">
                            {isSaving ? (
                                <>
                                    <Spinner variant="circle" className="text-primary" /> Saving
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                        <Separator orientation="vertical" className="h-4 my-auto" />
                    </div>
                    <Breadcrumb className=" min-w-0 flex">
                        <BreadcrumbList className="flex-nowrap">
                            <BreadcrumbItem>
                                <BreadcrumbLink render={<Link to="/dashboard/resumes" />} className="flex items-center">
                                    <HomeIcon className="size-4" />
                                    <span className="sr-only">Dashboard</span>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator children={"/"} />
                            <BreadcrumbItem className="min-w-0">
                                <BreadcrumbPage className="truncate">{title}</BreadcrumbPage>
                            </BreadcrumbItem>
                            <Button variant={"ghost"}>
                                <ChevronDownIcon />
                            </Button>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex-1 flex gap-2 justify-end">
                        <Button onClick={onDownload} disabled={!onDownload || isDownloading}>
                            <DownloadIcon />
                            <span className="sr-only sm:not-sr-only">
                                {isDownloading ? "Downloading…" : "Download"}
                            </span>
                        </Button>
                        <Separator orientation="vertical" className="h-4 my-auto" />
                    </div>
                </header>
                <ResizablePanelGroup orientation="horizontal">
                    <ResizablePanel
                        minSize={"16rem"}
                        maxSize={"40%"}
                        className="border pointer-events-auto bg-sidebar flex"
                        aria-label="Editor"
                    >
                        {editor}
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={"60%"}></ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel
                        minSize={"16rem"}
                        maxSize={"40%"}
                        className="border pointer-events-auto bg-sidebar"
                        aria-label="Design"
                    >
                        {design}
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
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
                            {preview}
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
        </div>
    )
}

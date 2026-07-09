import { Button } from "#/components/ui/button"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "#/components/ui/resizable"
import { Link } from "@tanstack/react-router"
import { DownloadIcon, HomeIcon } from "lucide-react"
import type React from "react"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"

type BuilderLayoutProps = {
    editor: React.ReactNode
    preview: React.ReactNode
    design: React.ReactNode
}
export default function BuilderLayout({ editor, preview, design }: BuilderLayoutProps) {
    return (
        <div className="h-screen w-screen bg-muted">
            <div className="fixed inset-0 z-20 pointer-events-none">
                <div className="bg-sidebar shadow flex items-center h-12 pointer-events-auto">
                    <div className="flex-1">|</div>
                    <div className="flex items-center gap-2">
                        <Link to="/dashboard/resumes" className="flex items-center gap-2">
                            <HomeIcon className="size-4" />
                            <span className="sr-only">Dashboard</span>
                        </Link>
                        {" / "}header
                    </div>
                    <div className="flex-1 text-right">
                        <Button>
                            <DownloadIcon /> <span className="sr-only sm:not-sr-only">Download</span>
                        </Button>
                    </div>
                </div>
                <ResizablePanelGroup orientation="horizontal">
                    <ResizablePanel
                        minSize={"16rem"}
                        maxSize={"40%"}
                        className="border pointer-events-auto bg-sidebar flex"
                    >
                        {editor}
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={50}></ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel minSize={"16rem"} maxSize={"40%"} className="border pointer-events-auto bg-sidebar">
                        {design}
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
            <TransformWrapper initialScale={0.3} minScale={0.1} maxScale={2} centerOnInit limitToBounds={false}>
                <TransformComponent
                    wrapperStyle={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {preview}
                </TransformComponent>
            </TransformWrapper>
        </div>
    )
}

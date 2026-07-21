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
import { useIsMobile } from "#/hooks/use-mobile"
import { cn } from "#/lib/utils"
import { Link } from "@tanstack/react-router"
import { ChevronDownIcon, EyeIcon, HomeIcon, PaletteIcon, PanelLeftIcon, PanelRightIcon, SquarePenIcon } from "lucide-react"
import { useState } from "react"
import type React from "react"
import { usePanelRef } from "react-resizable-panels"
import { Spinner } from "#/components/ui/spinner"

type PanelKey = "editor" | "preview" | "design"

const MOBILE_TABS: { key: PanelKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: "editor", label: "Edit", icon: SquarePenIcon },
    { key: "preview", label: "Preview", icon: EyeIcon },
    { key: "design", label: "Design", icon: PaletteIcon },
]

type BuilderLayoutProps = {
    title: string
    editor: React.ReactNode
    preview: React.ReactNode
    design: React.ReactNode
    downloadAction?: React.ReactNode
    isSaving?: boolean
}
export default function BuilderLayout({
    title,
    editor,
    preview,
    design,
    downloadAction,
    isSaving,
}: BuilderLayoutProps) {
    const isMobile = useIsMobile()
    const [activePanel, setActivePanel] = useState<PanelKey>("preview")

    const editorPanelRef = usePanelRef()
    const designPanelRef = usePanelRef()
    const [editorCollapsed, setEditorCollapsed] = useState(false)
    const [designCollapsed, setDesignCollapsed] = useState(false)

    return (
        <>
            <div className="fixed inset-0 z-20 pointer-events-none flex flex-col">
                <header className="bg-sidebar shadow flex items-center h-12 gap-2 px-3 pointer-events-auto shrink-0">
                    <div className="flex-1 flex gap-2 justify-start items-center">
                        {!isMobile && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                    if (editorPanelRef.current?.isCollapsed()) {
                                        editorPanelRef.current.expand()
                                    } else {
                                        editorPanelRef.current?.collapse()
                                    }
                                }}
                            >
                                <PanelLeftIcon />
                                <span className="sr-only">Toggle editor panel</span>
                            </Button>
                        )}
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
                    <div className="flex-1 flex gap-2 justify-end items-center">
                        {downloadAction}
                        <Separator orientation="vertical" className="h-4 my-auto" />
                        {!isMobile && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                    if (designPanelRef.current?.isCollapsed()) {
                                        designPanelRef.current.expand()
                                    } else {
                                        designPanelRef.current?.collapse()
                                    }
                                }}
                            >
                                <PanelRightIcon />
                                <span className="sr-only">Toggle design panel</span>
                            </Button>
                        )}
                    </div>
                </header>
                {isMobile ? (
                    <div className="relative flex-1 min-h-0">
                        <div
                            className={cn(
                                "absolute inset-0 pointer-events-auto bg-sidebar flex overflow-hidden",
                                activePanel !== "editor" && "hidden",
                            )}
                            aria-label="Editor"
                        >
                            {editor}
                        </div>
                        <div
                            className={cn(
                                "absolute inset-0 pointer-events-auto bg-sidebar overflow-hidden",
                                activePanel !== "design" && "hidden",
                            )}
                            aria-label="Design"
                        >
                            {design}
                        </div>
                    </div>
                ) : (
                    <ResizablePanelGroup orientation="horizontal" className="flex-1 min-h-0">
                        <ResizablePanel
                            panelRef={editorPanelRef}
                            collapsible
                            minSize={"20rem"}
                            maxSize={"40%"}
                            groupResizeBehavior="preserve-pixel-size"
                            className={cn(
                                "border pointer-events-auto bg-sidebar flex",
                                editorCollapsed && "border-none",
                            )}
                            aria-label="Editor"
                            onResize={(size) => setEditorCollapsed(size.asPercentage === 0)}
                        >
                            {editor}
                        </ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel defaultSize={"60%"}></ResizablePanel>
                        <ResizableHandle withHandle />
                        <ResizablePanel
                            panelRef={designPanelRef}
                            collapsible
                            minSize={"20rem"}
                            maxSize={"40%"}
                            groupResizeBehavior="preserve-pixel-size"
                            className={cn(
                                "border pointer-events-auto bg-sidebar",
                                designCollapsed && "border-none",
                            )}
                            aria-label="Design"
                            onResize={(size) => setDesignCollapsed(size.asPercentage === 0)}
                        >
                            {design}
                        </ResizablePanel>
                    </ResizablePanelGroup>
                )}
                {isMobile && (
                    <nav className="bg-sidebar border-t shadow flex pointer-events-auto shrink-0">
                        {MOBILE_TABS.map(({ key, label, icon: Icon }) => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => setActivePanel(key)}
                                className={cn(
                                    "flex-1 flex flex-col items-center gap-1 py-2 text-xs",
                                    activePanel === key ? "text-foreground font-medium" : "text-muted-foreground",
                                )}
                                aria-current={activePanel === key}
                            >
                                <Icon className="size-5" />
                                {label}
                            </button>
                        ))}
                    </nav>
                )}
            </div>
            <div className="flex-1 fixed inset-0">{preview}</div>
        </>
    )
}

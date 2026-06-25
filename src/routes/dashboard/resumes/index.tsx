import { createFileRoute } from "@tanstack/react-router"
import { Plus, ChevronDown, FileText } from "lucide-react"

// Import Shadcn UI Components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getAllResume } from "#/lib/server/resume.function"

export type Resume = {
    id: string
    userId: string
    title: string
    content: Record<string, any>
    createdAt: Date
    updatedAt: Date
}

export const Route = createFileRoute("/dashboard/resumes/")({
    beforeLoad: async () => {
        const resume = await getAllResume()
        return { resume }
    },
    pendingComponent: () => <div>Loading user directory...</div>,
    component: RouteComponent,
})

function RouteComponent() {
    const { resume } = Route.useRouteContext()

    // Helper to safely format schema timestamps
    const formatUpdateDate = (date: Date) => {
        return (
            date.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
            }) + ` at ${date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-6 font-sans">
            {/* Header aligned matching image_96877d.jpg */}
            <header className="flex items-center gap-2 mb-6 border-b border-border pb-4">
                <FileText className="w-6 h-6 text-foreground" />
                <h1 className="text-xl font-bold tracking-tight">Resumes</h1>
            </header>

            {/* Action Controls */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Sort by</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            render={<Button variant="outline" size="sm" className="gap-2 font-medium" />}
                        >
                            Last Updated
                            <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem>Last Updated</DropdownMenuItem>
                            <DropdownMenuItem>Date Created</DropdownMenuItem>
                            <DropdownMenuItem>Alphabetical</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Main Grid View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {/* Action Card: Create New */}
                <Card className="group relative flex flex-col justify-between overflow-hidden border-dashed hover:border-primary/50 transition-colors cursor-pointer h-[320px]">
                    <CardContent className="flex flex-col items-center justify-center flex-1 p-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary group-hover:scale-105 transition-transform">
                            <Plus className="h-6 w-6 text-muted-foreground group-hover:text-foreground" />
                        </div>
                    </CardContent>
                    <CardFooter className="bg-secondary/40 p-4 border-t flex flex-col items-start gap-0.5">
                        <h3 className="font-semibold text-sm">Create a new resume</h3>
                        <p className="text-xs text-muted-foreground">Start building your resume from sc...</p>
                    </CardFooter>
                </Card>

                {resume.map((resumeItem) => (
                    <Card
                        key={resumeItem.id}
                        className="group relative flex flex-col justify-between overflow-hidden hover:shadow-md transition-all cursor-pointer h-[320px]"
                    >
                        <CardContent className="flex-1 bg-white p-4 overflow-hidden relative select-none">
                            <ResumeThumbnailMockup
                                template={resumeItem.content.template}
                                color={resumeItem.content.color}
                            />
                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </CardContent>

                        <CardFooter className="bg-secondary/80 backdrop-blur-sm p-4 border-t flex flex-col items-start gap-0.5">
                            <h3 className="font-semibold text-sm truncate text-foreground w-full">
                                {resumeItem.title}
                            </h3>
                            <p className="text-xs text-muted-foreground truncate w-full">
                                Last updated on {formatUpdateDate(resumeItem.updatedAt)}
                            </p>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

function ResumeThumbnailMockup({ template, color }: { template?: string; color?: string }) {
    if (template === "minimal") {
        return (
            <div className="text-[5px] text-zinc-400 space-y-2">
                <div className="h-2 w-12 bg-zinc-800 rounded-sm mb-4" />
                <div className="h-1 w-full bg-zinc-200" />
                <div className="h-1 w-5/6 bg-zinc-200" />
                <div className="h-1 w-4/5 bg-zinc-200" />
            </div>
        )
    }

    if (color === "red") {
        return (
            <div className="absolute inset-0 bg-zinc-50 flex flex-col">
                <div className="h-4 bg-red-600 w-full flex items-center justify-center">
                    <div className="h-1 w-12 bg-white/60" />
                </div>
                <div className="p-2 space-y-2">
                    <div className="h-1 w-1/3 bg-zinc-300" />
                    <div className="h-1 w-full bg-zinc-200" />
                    <div className="h-1 w-5/6 bg-zinc-200" />
                </div>
            </div>
        )
    }

    return (
        <div className="text-[4px] text-zinc-500 scale-100 origin-top-left space-y-3">
            <div className="text-center space-y-1">
                <div className="h-2 w-16 bg-zinc-900 mx-auto rounded-sm" />
                <div className="h-1 w-24 bg-zinc-300 mx-auto" />
            </div>
            <div className="space-y-1.5">
                <div className="h-1.5 w-10 bg-zinc-400 rounded-sm" />
                <div className="h-1 w-full bg-zinc-200" />
                <div className="h-1 w-full bg-zinc-200" />
            </div>
            <div className="space-y-1.5">
                <div className="h-1.5 w-12 bg-zinc-400 rounded-sm" />
                <div className="h-1 w-full bg-zinc-200" />
            </div>
        </div>
    )
}

import { Link } from "@tanstack/react-router"
import { Badge } from "#/components/ui/badge"
import { Button } from "#/components/ui/button"
import { Skeleton } from "#/components/ui/skeleton"
import { ClockIcon, FileTextIcon, FolderIcon, MoreVerticalIcon, PencilIcon, Share2Icon, TrashIcon } from "lucide-react"
import { cn, formatRelativeTime } from "#/lib/utils"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ResumeCardActions = {
    onEdit: () => void
    onDelete: () => void
    onShare: () => void
}

type ResumeCardProps = {
    resume: {
        id: string
        title: string
        slug: string
        thumbnail?: string | null
        createdAt: Date
        updatedAt: Date
    }
    actions: ResumeCardActions
    isLastEdited?: boolean
}

export default function ResumeCard({ resume, actions, isLastEdited }: ResumeCardProps) {
    return (
        <Link
            to={"/builder/resumes/$resume_id"}
            params={{
                resume_id: resume.id,
            }}
            key={resume.id}
            className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-lg",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isLastEdited && "ring-2 ring-primary/40",
            )}
        >
            <div className="relative aspect-9/12 overflow-hidden bg-muted">
                {resume.thumbnail ? (
                    <div
                        className="absolute inset-3 overflow-hidden rounded-lg shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-[1.015] [&_svg]:block [&_svg]:h-auto [&_svg]:w-full [&_svg]:bg-white"
                        dangerouslySetInnerHTML={{ __html: resume.thumbnail }}
                    />
                ) : (
                    <div className="relative flex h-full items-center justify-center">
                        <FileTextIcon className="size-10 text-muted-foreground/30 transition-opacity duration-300 group-hover:opacity-0" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <PencilIcon className="size-5 text-primary" />
                            <span className="text-xs font-medium text-primary">Start editing</span>
                        </div>
                    </div>
                )}
                {isLastEdited && (
                    <>
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-black/35 to-transparent" />
                        <Badge className="absolute left-3 top-3 gap-1 rounded-full px-2.5 py-1 shadow-sm">
                            <PencilIcon className="size-3" />
                            Continue editing
                        </Badge>
                    </>
                )}
            </div>
            <div className="flex items-center justify-between gap-2 px-4 py-3">
                <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold">{resume.title}</h3>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <ClockIcon className="size-3" />
                        {formatRelativeTime(resume.updatedAt)}
                    </p>
                </div>
            </div>
            <div
                className="absolute right-2 top-2"
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                }}
            >
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button
                                size="icon"
                                variant="secondary"
                                className="size-8 rounded-full border border-border/60 bg-background/80 opacity-70 shadow-sm backdrop-blur transition-opacity hover:opacity-100 focus-visible:opacity-100"
                            />
                        }
                    >
                        <MoreVerticalIcon className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                render={
                                    <Link
                                        to={"/builder/resumes/$resume_id"}
                                        params={{
                                            resume_id: resume.id,
                                        }}
                                    />
                                }
                            >
                                <FolderIcon />
                                Open
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={actions.onShare}>
                                <Share2Icon />
                                Share link
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={actions.onEdit}>
                                <PencilIcon />
                                Edit Details
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem variant="destructive" onClick={actions.onDelete}>
                                <TrashIcon />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </Link>
    )
}

export function ResumeCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card text-card-foreground shadow-sm">
            <Skeleton className="aspect-9/12 rounded-none" />
            <div className="px-4 py-3 space-y-2">
                <Skeleton className="h-4 w-2/3 rounded-sm" />
                <Skeleton className="h-3 w-1/2 rounded-sm" />
            </div>
        </div>
    )
}

export type { ResumeCardActions }

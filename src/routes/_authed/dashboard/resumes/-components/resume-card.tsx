import { Link } from "@tanstack/react-router"
import { Badge } from "#/components/ui/badge"
import { Button } from "#/components/ui/button"
import { Skeleton } from "#/components/ui/skeleton"
import { FolderIcon, HistoryIcon, MoreVerticalIcon, PencilIcon, Share2Icon, TrashIcon } from "lucide-react"

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
            className={`relative bg-card text-card-foreground shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] border ${
                isLastEdited ? "ring-2 ring-primary/50" : ""
            }`}
        >
            <div className="relative aspect-9/12 bg-muted">
                {isLastEdited && (
                    <Badge className="absolute left-2 top-2">
                        <HistoryIcon />
                        Last edited
                    </Badge>
                )}
            </div>
            <div className="px-4 py-3">
                <h3>{resume.title}</h3>
                <div className="text-xs text-muted-foreground">Last Updated {resume.updatedAt.toDateString()}</div>
            </div>
            <div
                className="absolute right-2 top-2"
                onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                }}
            >
                <DropdownMenu>
                    <DropdownMenuTrigger render={<Button size="icon" variant="secondary" />}>
                        <MoreVerticalIcon />
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
        <div className="bg-card text-card-foreground shadow-md border">
            <Skeleton className="aspect-9/12 rounded-none" />
            <div className="px-4 py-3 space-y-2">
                <Skeleton className="h-4 w-2/3 rounded-sm" />
                <Skeleton className="h-3 w-1/2 rounded-sm" />
            </div>
        </div>
    )
}

export type { ResumeCardActions }

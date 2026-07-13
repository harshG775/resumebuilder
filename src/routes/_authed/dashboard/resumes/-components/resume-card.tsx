import { Link } from "@tanstack/react-router"
import { Button } from "#/components/ui/button"
import { Skeleton } from "#/components/ui/skeleton"
import { FolderIcon, MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ResumeCardProps = {
    resume: {
        id: string
        title: string
        slug: string
        createdAt: Date
        updatedAt: Date
    }
    onOpenEditDialog: () => void
    onDelete: () => void
}
export default function ResumeCard({ resume, onOpenEditDialog, onDelete }: ResumeCardProps) {
    return (
        <Link
            to={"/builder/resumes/$resume_slug"}
            params={{
                resume_slug: resume.slug,
            }}
            key={resume.id}
            className="relative bg-card text-card-foreground shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] border"
        >
            <div className="aspect-9/12 bg-muted"></div>
            <div className="px-4 py-3">
                <h3>{resume.title}</h3>
                <div className="text-xs text-muted-foreground">Last Updated {resume.updatedAt.toDateString()}</div>
            </div>
            <div className="absolute right-2 top-2">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={<Button size="icon" variant="secondary" />}
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                        }}
                    >
                        <MoreVerticalIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                render={
                                    <Link
                                        to={"/builder/resumes/$resume_slug"}
                                        params={{
                                            resume_slug: resume.slug,
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
                            <DropdownMenuItem
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    onOpenEditDialog()
                                }}
                            >
                                <PencilIcon />
                                Edit Details
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                variant="destructive"
                                onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    onDelete()
                                }}
                            >
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

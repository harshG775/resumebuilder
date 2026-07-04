import { Link } from "@tanstack/react-router"
import { Button } from "#/components/ui/button"
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
    onDelete: () => void
}
export default function ResumeCard({ resume, onDelete }: ResumeCardProps) {
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
                            <DropdownMenuItem>
                                <PencilIcon />
                                Update
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

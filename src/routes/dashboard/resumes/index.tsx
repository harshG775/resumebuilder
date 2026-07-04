import { createFileRoute, Link, useRouter } from "@tanstack/react-router"
import { createResume, deleteResume, getAllResume } from "#/lib/server/resume.function"
import { Button } from "#/components/ui/button"
import { FolderIcon, MoreVerticalIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react"
import { useMutation } from "@tanstack/react-query"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Resume = {
    id: string
    userId: string
    title: string
    content: Record<string, any>
    createdAt: Date
    updatedAt: Date
}

const testUserId = "Q2Uvk1rSyo0gPM6g5hiLac7oOnYEZ1r5"
export const Route = createFileRoute("/dashboard/resumes/")({
    beforeLoad: async () => {
        const { data } = await getAllResume({ data: { userId: testUserId } })
        return { resumes: data }
    },
    pendingComponent: () => <div>Loading user directory...</div>,
    component: RouteComponent,
})

function RouteComponent() {
    const router = useRouter()
    const { resumes } = Route.useRouteContext()
    const deleteMutation = useMutation({
        mutationFn: deleteResume,
        onSuccess: () => {
            router.invalidate()
        },
    })
    const createMutation = useMutation({
        mutationFn: createResume,
        onSuccess: () => {
            router.invalidate()
        },
    })
    return (
        <div className="min-h-screen bg-background text-foreground p-3 sm:p-4 lg:p-6 font-sans">
            <div className="flex justify-between items-center">
                <h1 className="font-semibold">Resumes</h1>
                <Button
                    disabled={createMutation.status === "pending"}
                    onClick={() => {
                        createMutation.mutate({
                            data: {
                                userId: testUserId,
                                title: "test",
                                content: JSON.stringify({}),
                            },
                        })
                    }}
                >
                    <PlusIcon />
                    Add
                </Button>
            </div>
            <section className="mt-4 grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
                {resumes.map((resume) => (
                    <Link
                        to={"/builder/resumes/$resume"}
                        params={{
                            resume: resume.id,
                        }}
                        key={resume.id}
                        className="relative bg-card text-card-foreground shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] border"
                    >
                        <div className="aspect-9/12 bg-muted"></div>
                        <div className="px-4 py-3">
                            <h3>{resume.title}</h3>
                            <div className="text-xs text-muted-foreground">
                                Last Updated {resume.updatedAt.toDateString()}
                            </div>
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
                                                    to={"/builder/resumes/$resume"}
                                                    params={{
                                                        resume: resume.id,
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
                                                deleteMutation.mutate({
                                                    data: { id: resume.id, userId: testUserId },
                                                })
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
                ))}
            </section>
        </div>
    )
}

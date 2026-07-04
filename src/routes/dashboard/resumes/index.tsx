import { createFileRoute, Link } from "@tanstack/react-router"
import { createResume, getAllResume } from "#/lib/server/resume.function"
import { Button } from "#/components/ui/button"
import { FolderIcon, MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
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

export const Route = createFileRoute("/dashboard/resumes/")({
    beforeLoad: async () => {
        const { data } = await getAllResume({ data: { userId: "Q2Uvk1rSyo0gPM6g5hiLac7oOnYEZ1r5" } })
        return { resumes: data }
    },
    pendingComponent: () => <div>Loading user directory...</div>,
    component: RouteComponent,
})

function RouteComponent() {
    const { resumes } = Route.useRouteContext()
    console.log(resumes)

    const handleCreateResume = async () => {
        createResume({
            data: {
                userId: "Q2Uvk1rSyo0gPM6g5hiLac7oOnYEZ1r5",

                title: "test",
                content: JSON.stringify({}),
            },
        })
    }

    const handleDelete = (id: string) => {
        console.log("Delete resume", id)
    }
    return (
        <div className="min-h-screen bg-background text-foreground p-3 sm:p-4 lg:p-6 font-sans">
            <div className="flex justify-between items-center">
                <h1 className="font-semibold">Resumes</h1>
                <Button onClick={() => handleCreateResume()}>Add</Button>
            </div>
            <section className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
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
                                                handleDelete(resume.id)
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

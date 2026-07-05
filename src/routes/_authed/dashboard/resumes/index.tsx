import { createFileRoute, useRouter } from "@tanstack/react-router"
import { createResumeFn, deleteResumeFn, getAllResumeFn } from "#/lib/server/resume.function"
import { Button } from "#/components/ui/button"
import { PlusIcon } from "lucide-react"
import { useMutation } from "@tanstack/react-query"

import ResumeCard from "./-components/resume-card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { useState } from "react"

export type Resume = {
    id: string
    userId: string
    title: string
    content: Record<string, any>
    createdAt: Date
    updatedAt: Date
}
export const Route = createFileRoute("/_authed/dashboard/resumes/")({
    beforeLoad: async () => {
        const { data } = await getAllResumeFn({ data: { page: 1, pageSize: 10 } })
        return { resumes: data }
    },
    pendingComponent: () => <div>Loading user directory...</div>,
    component: RouteComponent,
})

function RouteComponent() {
    const router = useRouter()
    const { resumes } = Route.useRouteContext()
    const [isOpen, setIsOpen] = useState(false)
    const deleteMutation = useMutation({
        mutationFn: deleteResumeFn,
        onSuccess: () => {
            router.invalidate()
        },
    })
    const createMutation = useMutation({
        mutationFn: createResumeFn,
        onSuccess: () => {
            setIsOpen(false)
            router.invalidate()
        },
    })
    return (
        <div className="min-h-screen bg-background text-foreground p-3 sm:p-4 lg:p-6 font-sans">
            <div className="flex justify-between items-center">
                <h1 className="font-semibold">Resumes</h1>
                <Button disabled={createMutation.status === "pending"} onClick={() => setIsOpen(true)}>
                    <PlusIcon />
                    Add
                </Button>
                <Dialog
                    open={isOpen}
                    onOpenChange={(change) => {
                        if (!change) {
                            alert("Are you sure you want to close this dialog?")
                        }
                        setIsOpen(change)
                    }}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className={"flex gap-2 items-center"}>
                                <PlusIcon className="size-5" />
                                Create a new resume
                            </DialogTitle>
                            <DialogDescription>Start building your resume by giving it a name.</DialogDescription>
                        </DialogHeader>
                        <div>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    const formData = new FormData(e.target)
                                    const title = formData.get("title") as string

                                    createMutation.mutate({
                                        data: {
                                            title: title,
                                        },
                                    })
                                }}
                            >
                                <div>
                                    <label htmlFor="title">Title</label>
                                    <input type="text" id="title" name="title" />
                                </div>
                                <button type="submit">add</button>
                            </form>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <section className="mt-4 grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]">
                {resumes.map((resume) => (
                    <ResumeCard
                        key={resume.id}
                        resume={resume}
                        onDelete={() => {
                            deleteMutation.mutate({
                                data: { id: resume.id },
                            })
                        }}
                    />
                ))}
            </section>
        </div>
    )
}

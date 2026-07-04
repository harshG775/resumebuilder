import { createFileRoute, useRouter } from "@tanstack/react-router"
import { createResume, deleteResume, getAllResume } from "#/lib/server/resume.function"
import { Button } from "#/components/ui/button"
import { PlusIcon } from "lucide-react"
import { useMutation } from "@tanstack/react-query"

import ResumeCard from "./-components/resume-card"

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
        const { data } = await getAllResume({ data: { page: 1, pageSize: 10 } })
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

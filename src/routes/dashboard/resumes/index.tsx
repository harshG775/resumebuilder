import { createFileRoute } from "@tanstack/react-router"
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
        const resume = await getAllResume({ data: { id: "Q2Uvk1rSyo0gPM6g5hiLac7oOnYEZ1r5" } })
        return { resume }
    },
    pendingComponent: () => <div>Loading user directory...</div>,
    component: RouteComponent,
})

function RouteComponent() {
    const { resume } = Route.useRouteContext()
    console.log(resume)

    return <div className="min-h-screen bg-background text-foreground p-6 font-sans">All resume</div>
}

import { Button } from "#/components/ui/button"
import { getResumeByIdFn } from "#/lib/server/resume.function"
import Builder from "#/modules/resume/builder"
import { createFileRoute, Link /* notFound */, useRouter } from "@tanstack/react-router"

export const Route = createFileRoute("/_authed/builder/resumes/$resume_id")({
    beforeLoad: async ({ params }) => {
        const resume = await getResumeByIdFn({ data: { id: params.resume_id } })
        return {
            resume,
        }
    },
    // loader({ context }) {
    //     if (!context.resume.success) {
    //         return notFound()
    //     }
    // },
    component: RouteComponent,
})

function RouteComponent() {
    const { resume } = Route.useRouteContext()

    if (!resume.success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 text-center font-sans">
                <h1 className="text-3xl font-bold text-red-500 mb-2">Resume Not Found</h1>
                <p className="text-gray-500 mb-6">We couldn't find the resume you were looking for.</p>
                <div className="flex flex-wrap gap-2 items-center">
                    <Button onClick={() => window.navigation.reload()}>Retry</Button>
                    <Button render={<Link to="/dashboard" />} nativeButton={false} variant={"secondary"}>
                        Go to Dashboard
                    </Button>
                </div>
            </div>
        )
    }

    return <Builder resumeValue={resume.data.content} />
}

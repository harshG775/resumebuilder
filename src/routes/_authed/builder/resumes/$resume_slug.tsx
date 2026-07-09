import { getResumeBySlugFn } from "#/lib/server/resume.function"
import Builder from "#/modules/resume/builder"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/_authed/builder/resumes/$resume_slug")({
    beforeLoad: async ({ params }) => {
        const resume = await getResumeBySlugFn({ data: { slug: params.resume_slug } })
        return {
            resume,
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
    const { resume } = Route.useRouteContext()

    if (!resume.success) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 text-center font-sans">
                <h1 className="text-3xl font-bold text-red-500 mb-2">Resume Not Found</h1>
                <p className="text-gray-500 mb-6">We couldn't find the resume you were looking for.</p>
                <Link to="/" className="text-blue-500 hover:text-blue-600 font-medium underline">
                    Go back home
                </Link>
            </div>
        )
    }

    return <Builder resumeValue={resume.data.content} />
}

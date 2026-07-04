import { getResumeBySlug } from "#/lib/server/resume.function"
import { createFileRoute, Link } from "@tanstack/react-router"

const testUserId = "Q2Uvk1rSyo0gPM6g5hiLac7oOnYEZ1r5"

export const Route = createFileRoute("/builder/resumes/$resume_slug")({
    beforeLoad: async ({ params }) => {
        const resume = await getResumeBySlug({ data: { slug: params.resume_slug, userId: testUserId } })
        return {
            resume,
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
    const { resume } = Route.useRouteContext()

    if (!resume || !resume.success) {
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

    const { title, updatedAt } = resume.data

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
            <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm z-10">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900 tracking-tight">{title}</h1>
                    <span className="text-xs text-gray-400">
                        Last updated: {new Date(updatedAt).toLocaleDateString()}
                    </span>
                </div>
            </header>
        </div>
    )
}

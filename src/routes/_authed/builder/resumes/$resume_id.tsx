import { Button } from "#/components/ui/button"
import { to } from "#/lib/await-to"
import { getResumeByIdFn } from "#/lib/server/resume.function"
import Builder from "#/modules/resume/builder"
import { createFileRoute, Link, notFound } from "@tanstack/react-router"

export const Route = createFileRoute("/_authed/builder/resumes/$resume_id")({
    loader: async ({ params }) => {
        const [error, resume] = await to(getResumeByIdFn({ data: { id: params.resume_id } }))
        if (error) throw error
        if (!resume?.success) throw notFound()
        return { resume }
    },
    notFoundComponent: () => (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 text-center font-sans">
            <h1 className="text-3xl font-bold text-red-500 mb-2">Resume Not Found</h1>
            <p className="text-gray-500 mb-6">We couldn't find the resume you were looking for.</p>
            <div className="flex flex-wrap gap-2 items-center">
                <Button render={<Link to="/dashboard" />} nativeButton={false} variant="secondary">
                    Go to Dashboard
                </Button>
            </div>
        </div>
    ),
    // errorComponent:()=>"ERROR COMPONENT",
    component: RouteComponent,
})

function RouteComponent() {
    const { resume } = Route.useLoaderData()

    return (
        <Builder
            resume={{
                id: resume.data.id,
                slug: resume.data.slug,
                content: resume.data.content,
            }}
        />
    )
}

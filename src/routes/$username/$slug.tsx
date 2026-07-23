import { Button } from "#/components/ui/button"
import { to } from "#/lib/await-to"
import { getResumeByUsernameAndSlugFn } from "#/lib/server/resume.function"
import { ResumePreview } from "#/modules/resume/builder/preview"
import { createFileRoute, Link, notFound } from "@tanstack/react-router"

export const Route = createFileRoute("/$username/$slug")({
    loader: async ({ params }) => {
        const [error, resume] = await to(
            getResumeByUsernameAndSlugFn({ data: { username: params.username, slug: params.slug } }),
        )
        if (error) throw error
        if (!resume?.success) throw notFound()
        return { resume }
    },
    notFoundComponent: () => (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 text-center font-sans">
            <h1 className="text-3xl font-bold text-red-500 mb-2">Resume Not Found</h1>
            <p className="text-gray-500 mb-6">We couldn't find the resume you were looking for.</p>
            <div className="flex flex-wrap gap-2 items-center">
                <Button render={<Link to="/" />} nativeButton={false} variant="secondary">
                    Go Home
                </Button>
            </div>
        </div>
    ),
    head: ({ loaderData }) => ({
        meta: loaderData
            ? [
                  {
                      title: `${loaderData.resume.data.title} · ${loaderData.resume.data.ownerName}`,
                  },
              ]
            : undefined,
    }),
    component: RouteComponent,
})

function RouteComponent() {
    const { resume } = Route.useLoaderData()

    return (
        <div className="h-screen w-screen">
            <ResumePreview resumeData={resume.data.content} />
        </div>
    )
}

import { ResumeSchema } from "#/lib/schemas/resume-schema"
import { createFileRoute } from "@tanstack/react-router"
import { useAppForm } from "#/hooks/form"
import { FieldGroup, FieldSeparator } from "#/components/ui/field"
import { BasicsSection, ProjectsSection, SummarySection } from "@/components/Editor"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { Preview } from "#/components/preview"
import { fetchResumeById } from "#/lib/api"

export const Route = createFileRoute("/resumes/$resume/")({
    loader: ({ params }) => fetchResumeById({ id: params.resume }),
    ssr: false,
    component: RouteComponent,
})

function RouteComponent() {
    const saved = Route.useLoaderData()
    const form = useAppForm({
        defaultValues: saved.data,
        validators: { onChange: ResumeSchema },
    })
    return (
        <div className="h-screen w-screen bg-muted">
            <div className="fixed inset-0 z-10  pointer-events-none">
                <FieldGroup className="p-4 max-w-96 h-full overflow-y-auto border pointer-events-auto bg-sidebar">
                    <BasicsSection form={form} />
                    <FieldSeparator />
                    <SummarySection form={form} />
                    <FieldSeparator />
                    <ProjectsSection form={form} />
                </FieldGroup>
            </div>
            <TransformWrapper initialScale={0.3} minScale={0.1} maxScale={2} centerOnInit limitToBounds={false}>
                <TransformComponent
                    wrapperStyle={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <Preview form={form} />
                </TransformComponent>
            </TransformWrapper>
        </div>
    )
}

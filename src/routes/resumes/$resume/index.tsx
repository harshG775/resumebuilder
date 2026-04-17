import { ResumeSchema, type ResumeValues } from "#/lib/schemas/resume-schema"
import { createFileRoute } from "@tanstack/react-router"
import { useAppForm } from "#/hooks/form"
import { FieldGroup, FieldSeparator } from "#/components/ui/field"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { BasicsSection, ProjectsSection, SummarySection } from "./-components/Editor"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

export const Route = createFileRoute("/resumes/$resume/")({
    ssr: false,
    component: RouteComponent,
})

function RouteComponent() {
    const defaultValues: ResumeValues = {
        basics: {
            name: "",
            headline: "",
            email: "",
            phone: "",
            location: "",
            website: { showLink: false, url: "", label: "" },
            customFields: [],
        },
        sections: {
            summary: {
                title: "Summary",
                hidden: false,
                columns: 1,
                content: "",
            },
            skills: {
                title: "Skills",
                hidden: false,
                columns: 1,
                items: [],
            },
            experience: {
                title: "Experience",
                hidden: false,
                columns: 1,
                items: [],
            },
            projects: {
                title: "Projects",
                hidden: false,
                columns: 1,
                items: [],
            },
            education: {
                title: "Education",
                hidden: false,
                columns: 1,
                items: [],
            },
            certifications: {
                title: "Certifications",
                hidden: false,
                columns: 1,
                items: [],
            },
        },
        order: ["summary", "skills", "experience", "projects", "education", "certifications"],
    }
    const form = useAppForm({
        defaultValues,
        validators: {
            onChange: ResumeSchema,
        },
    })
    console.log(form.state.values)

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
                    <div className="relative w-full h-full bg-white text-black shadow-lg">
                        <main className="p-6 aspect-8.5/11 w-7xl">
                            <h1 className="text-xl font-bold">Resume Preview</h1>
                            <p className="text-sm text-gray-600">This maintains proper 8.5:11 aspect ratio.</p>
                        </main>
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </div>
    )
}

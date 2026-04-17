import { ResumeSchema, type ResumeValues } from "#/lib/schemas/resume-schema"
import { createFileRoute } from "@tanstack/react-router"
import { useAppForm } from "#/hooks/form"
import { FieldGroup, FieldSeparator } from "#/components/ui/field"
import { BasicsSection, ProjectsSection, SummarySection } from "./-components/Editor"

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
        <div className="flex h-screen">
            <div className="w-96 min-w-96 overflow-auto">
                <FieldGroup className="p-4">
                    <BasicsSection form={form} />
                    <FieldSeparator />
                    <SummarySection form={form} />
                    <FieldSeparator />
                    <ProjectsSection form={form} />
                </FieldGroup>
            </div>
            <div className="flex-1 bg-muted">{/* preview */}</div>
        </div>
    )
}

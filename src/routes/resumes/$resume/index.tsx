import { ResumeSchema, type ResumeValues } from "#/lib/schemas/resume-schema"
import { createFileRoute } from "@tanstack/react-router"
import { useAppForm } from "#/hooks/form"
import { FieldGroup, FieldSeparator } from "#/components/ui/field"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { BasicsSection, ProjectsSection, SummarySection } from "./-components/Editor"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import React from "react"

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
                        <form.Subscribe selector={(state) => state.values}>
                            {(values) => (
                                <div className="p-6 aspect-[8.5/11] w-7xl">
                                    <header className="mb-4 flex">
                                        <div className="flex-1">
                                            <h1 className="text-2xl font-bold text-neutral-900">
                                                {values.basics.name || "Name"}
                                            </h1>
                                            <p className="text-sm font-medium text-neutral-700">
                                                {values.basics.headline}
                                            </p>
                                            <div className="text-[11px] mt-1 flex flex-wrap gap-2 text-neutral-600">
                                                {values.basics.email && <span>{values.basics.email}</span>}
                                                {values.basics.phone && <span>| {values.basics.phone}</span>}
                                                {values.basics.location && <span>| {values.basics.location}</span>}
                                                {values.basics.website && (
                                                    <a
                                                        href={values.basics.website.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="underline text-blue-700 hover:text-blue-800 wrap-break-word"
                                                    >
                                                        {values.basics.website.label}
                                                    </a>
                                                )}
                                                {values.basics?.customFields.length > 0 && (
                                                    <>
                                                        {values.basics.customFields.map((link, i) => (
                                                            <React.Fragment key={link.id || i}>
                                                                {i > 0 && <span>|</span>}
                                                                <a
                                                                    key={link.id || i}
                                                                    href={link.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="underline text-blue-700 hover:text-blue-800 wrap-break-word"
                                                                >
                                                                    {link.label}
                                                                </a>
                                                            </React.Fragment>
                                                        ))}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </header>
                                    <main>
                                        <section></section>
                                        <section></section>
                                        <section></section>
                                        <section></section>
                                    </main>
                                </div>
                            )}
                        </form.Subscribe>
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </div>
    )
}

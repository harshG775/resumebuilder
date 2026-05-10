import { ResumeSchema } from "#/lib/schemas/resume-schema"
import { createFileRoute } from "@tanstack/react-router"
import { useAppForm } from "#/hooks/form"
import { FieldGroup, FieldSeparator } from "#/components/ui/field"
import {
    BasicsSection,
    CertificationsSection,
    EducationSection,
    ExperienceSection,
    ProjectsSection,
    SkillsSection,
    SummarySection,
} from "@/components/Editor"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { fetchResumeById } from "#/lib/api"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Button } from "#/components/ui/button"
import { printResumePdf } from "#/lib/resume.client"
import { useRef } from "react"
import { SortableDragItem, SortableDragProvider } from "#/components/sortable-item"
import { DotsSixVerticalIcon } from "@phosphor-icons/react"
import { getTemplate } from "#/features/resume/templates/registry"
// import { generateResumeHtml } from "#/features/resume/generate-pdf"

export const Route = createFileRoute("/resumes/$resume/")({
    loader: ({ params }) => fetchResumeById({ id: params.resume }),
    component: RouteComponent,
})

function RouteComponent() {
    const saved = Route.useLoaderData()
    const previewRef = useRef<HTMLDivElement>(null)
    const form = useAppForm({
        defaultValues: saved.data,
        validators: { onChange: ResumeSchema },
    })

    const handleDownloadPdf = async () => {
        // const pdf = await generateResumeHtml("default", form.state.values)
        const html = previewRef.current?.innerHTML ?? ""

        printResumePdf(html)
    }
    return (
        <div className="h-screen w-screen bg-muted">
            <div className="fixed inset-0 z-10  pointer-events-none">
                <ResizablePanelGroup orientation="horizontal">
                    <ResizablePanel defaultSize={20} className="border pointer-events-auto bg-sidebar flex">
                        {/* resume content editor */}
                        <FieldGroup className="h-full overflow-y-auto scrollbar-thin p-4">
                            <BasicsSection form={form} />
                            <FieldSeparator />
                            <SummarySection form={form} />
                            <FieldSeparator />
                            <SkillsSection form={form} />
                            <FieldSeparator />
                            <ExperienceSection form={form} />
                            <FieldSeparator />
                            <ProjectsSection form={form} />
                            <FieldSeparator />
                            <EducationSection form={form} />
                            <FieldSeparator />
                            <CertificationsSection form={form} />
                        </FieldGroup>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={60}></ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={20} className="border pointer-events-auto bg-sidebar">
                        <div>
                            <FieldGroup className="h-full overflow-y-auto p-4">
                                Resume editor
                                <Button onClick={handleDownloadPdf}>Download PDF</Button>
                            </FieldGroup>
                            <div className="p-4">
                                <section>
                                    <h2>Layout</h2>
                                    <form.AppField
                                        name={`order`}
                                        children={(field) => (
                                            <div>
                                                <SortableDragProvider
                                                    value={field.state.value}
                                                    onChange={field.handleChange}
                                                >
                                                    {form.state.values.order.map((item, idx) => (
                                                        <SortableDragItem
                                                            key={item}
                                                            sortableProps={{
                                                                index: idx,
                                                                id: item,
                                                            }}
                                                            className="flex items-center"
                                                        >
                                                            <div
                                                                role="button"
                                                                tabIndex={0}
                                                                aria-label={`Drag to reorder ${item}`}
                                                                className="flex items-center p-2 mx-1 hover:bg-muted/80 cursor-grab focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                            >
                                                                <DotsSixVerticalIcon aria-hidden="true" />
                                                            </div>
                                                            {item}
                                                        </SortableDragItem>
                                                    ))}
                                                </SortableDragProvider>
                                            </div>
                                        )}
                                    />
                                </section>
                            </div>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
            <TransformWrapper initialScale={0.3} minScale={0.1} maxScale={2} centerOnInit limitToBounds={false}>
                <TransformComponent
                    wrapperStyle={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <div ref={previewRef}>
                        <form.Subscribe selector={(state) => state.values}>
                            {(values) => {
                                const Temp = getTemplate("default")
                                return <Temp.component data={values} />
                            }}
                        </form.Subscribe>
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </div>
    )
}

import { Button } from "#/components/ui/button"
import { FieldGroup, FieldSeparator } from "#/components/ui/field"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "#/components/ui/resizable"
import { useAppForm } from "#/hooks/form"
import { Link } from "@tanstack/react-router"
import { ResumeZodSchema } from "../schema/resume.zod-schema"
import type { ResumeValues } from "../schema/resume.zod-schema"
import { DownloadIcon, HomeIcon } from "lucide-react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

type BuilderProps = {
    resumeValue: ResumeValues
}
export default function Builder({ resumeValue }: BuilderProps) {
    const form = useAppForm({
        defaultValues: resumeValue,
        validators: { onChange: ResumeZodSchema },
    })
    return (
        <div className="h-screen w-screen bg-muted">
            <div className="fixed inset-0 z-20 pointer-events-none">
                <div className="bg-sidebar shadow flex items-center h-12 pointer-events-auto">
                    <div className="flex-1">|</div>
                    <div className="flex items-center gap-2">
                        <Link to="/dashboard/resumes" className="flex items-center gap-2">
                            <HomeIcon className="size-4" />
                            <span className="sr-only">Dashboard</span>
                        </Link>
                        {" / "}header
                    </div>
                    <div className="flex-1 text-right">
                        <Button className={""}>
                            <DownloadIcon /> <span className="sr-only sm:not-sr-only">Download</span>
                        </Button>
                    </div>
                </div>
                <ResizablePanelGroup orientation="horizontal">
                    <ResizablePanel minSize={"16rem"}  maxSize={"40%"} className="border pointer-events-auto bg-sidebar flex">
                        {/* resume content editor */}
                        <FieldGroup className="h-full overflow-y-auto scrollbar-thin p-4">
                            {/* <BasicsSection form={form} /> */}
                            <FieldSeparator />
                            {/* <SummarySection form={form} /> */}
                            <FieldSeparator />
                            {/* <SkillsSection form={form} /> */}
                            <FieldSeparator />
                            {/* <ExperienceSection form={form} /> */}
                            <FieldSeparator />
                            {/* <ProjectsSection form={form} /> */}
                            <FieldSeparator />
                            {/* <EducationSection form={form} /> */}
                            <FieldSeparator />
                            {/* <CertificationsSection form={form} /> */}
                        </FieldGroup>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={50}></ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel minSize={"16rem"}  maxSize={"40%"} className="border pointer-events-auto bg-sidebar"></ResizablePanel>
                </ResizablePanelGroup>
            </div>
            <TransformWrapper initialScale={0.3} minScale={0.1} maxScale={2} centerOnInit limitToBounds={false}>
                <TransformComponent
                    wrapperStyle={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <div className="max-w-3xl w-full">{JSON.stringify(form.state.values)}</div>
                </TransformComponent>
            </TransformWrapper>
        </div>
    )
}

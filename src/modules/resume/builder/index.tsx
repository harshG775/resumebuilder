import { FieldGroup, FieldSeparator } from "#/components/ui/field"
import { useAppForm } from "#/hooks/form"
import { downloadBlob } from "#/lib/download"
import { useTypstCompileToPdf } from "#/lib/typst/useTypstSvg"
import { ClientOnly } from "@tanstack/react-router"
import { ResumeZodSchema } from "../schema/resume.zod-schema"
import type { ResumeValues } from "../schema/resume.zod-schema"
import BuilderLayout from "./components/builder-layout"
import {
    BasicsSection,
    CertificationsSection,
    EducationSection,
    ExperienceSection,
    ProjectsSection,
    SkillsSection,
    SummarySection,
} from "./Editor"
import { getTemplate } from "./templates"
import { toast } from "sonner"
import { TypstPreview } from "#/lib/typst/typst-preview"

type BuilderProps = {
    resumeValue: ResumeValues
}
export default function Builder({ resumeValue }: BuilderProps) {
    const { compileToPdf, isCompiling } = useTypstCompileToPdf()

    const form = useAppForm({
        defaultValues: resumeValue,
        validators: { onChange: ResumeZodSchema },
    })
    const template = getTemplate("classic")

    async function handleDownload() {
        try {
            const values = form.state.values
            const pdfBytes = await compileToPdf(template.render(values))
            downloadBlob(pdfBytes, `${values.basics.name || "resume"}.pdf`, "application/pdf")
        } catch (err) {
            console.error(err)
            toast.error("Failed to generate PDF", {
                description: err instanceof Error ? err.message : "Please try again.",
            })
        }
    }

    return (
        <BuilderLayout
            isDownloading={isCompiling}
            onDownload={handleDownload}
            title={form.state.values.basics.name || "Untitled resume"}
            editor={
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
            }
            design={<FieldGroup className="h-full overflow-y-auto scrollbar-thin p-4">design</FieldGroup>}
            preview={
                <form.Subscribe selector={(state) => state.values}>
                    {(values) => (
                        <ClientOnly fallback={<div>Loading preview…</div>}>
                            <TypstPreview source={template.render(values)} />
                        </ClientOnly>
                    )}
                </form.Subscribe>
            }
        />
    )
}

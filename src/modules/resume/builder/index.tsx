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
import { updateResumeContentFn } from "#/lib/server/resume.function"
import { useMutation } from "@tanstack/react-query"
import { resumeSeedValues } from "../data/resume-seed-values"

type BuilderProps = {
    resume: { id: string; slug: string; content: ResumeValues }
}
export default function Builder({ resume }: BuilderProps) {
    const { compileToPdf, isCompiling } = useTypstCompileToPdf()

    const updateMutation = useMutation({
        mutationFn: updateResumeContentFn,
        scope: { id: `resume-${resume.id}` },
    })

    const template = getTemplate("classic")
    const form = useAppForm({
        defaultValues: resume.content,
        validators: { onChange: ResumeZodSchema },
        listeners: {
            onChange: ({ formApi }) => {
                if (formApi.state.isValid && formApi.state.isDirty) {
                    updateMutation.mutate({
                        data: { id: resume.id, updatePayload: { content: formApi.state.values } },
                    })
                }
            },
            onChangeDebounceMs: 800,
        },
    })

    async function handleDownload() {
        try {
            const pdfBytes = await compileToPdf(template.render(form.state.values))
            downloadBlob(pdfBytes, `${resume.slug || "resume"}.pdf`, "application/pdf")
        } catch (err) {
            console.error(err)
            toast.error("Failed to generate PDF", {
                description: err instanceof Error ? err.message : "Please try again.",
            })
        }
    }

    return (
        <BuilderLayout
            isSaving={updateMutation.isPending}
            isDownloading={isCompiling}
            onDownload={handleDownload}
            title={resume.slug || "Untitled resume"}
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
            design={
                <FieldGroup className="h-full overflow-y-auto scrollbar-thin p-4">
                    <button
                        onClick={() =>
                            updateMutation.mutate({
                                data: { id: resume.id, updatePayload: { content: resumeSeedValues } },
                            })
                        }
                    >
                        resumeSeedValues
                    </button>
                    design
                </FieldGroup>
            }
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

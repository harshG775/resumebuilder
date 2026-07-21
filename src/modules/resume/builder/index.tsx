import { FieldGroup, FieldSeparator } from "#/components/ui/field"
import { useAppForm } from "#/hooks/form"
import { ResumeZodSchema } from "../schema/resume.zod-schema"
import type { ResumeValues } from "../schema/resume.zod-schema"
import BuilderLayout from "./components/builder-layout"
import { DownloadDialog } from "./components/download-dialog"
import {
    BasicsSection,
    CertificationsSection,
    EducationSection,
    ExperienceSection,
    ProjectsSection,
    SkillsSection,
    SummarySection,
} from "./Editor"
import { FileJsonIcon, FileTextIcon } from "lucide-react"
import { toast } from "sonner"
import { updateResumeContentFn } from "#/lib/server/resume.function"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { resumeSeedValues } from "../data/resume-seed-values"
import { ResumePreview } from "./preview"
import { getTypst } from "#/lib/typst/typst"
import { getTemplate } from "./preview/templates"
import { downloadBlob } from "#/lib/download"

type BuilderProps = {
    resume: { id: string; slug: string; content: ResumeValues }
}
export default function Builder({ resume }: BuilderProps) {
    const updateMutation = useMutation({
        mutationFn: updateResumeContentFn,
        scope: { id: `resume-${resume.id}` },
    })

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

    const [isDownloadingPdf, setIsDownloadingPdf] = useState(false)

    async function handleDownloadPdf() {
        setIsDownloadingPdf(true)
        try {
            const $typst = getTypst()
            const pdfBytes = await $typst.pdf({
                mainContent: getTemplate(form.state.values.meta.template).render(form.state.values),
            })
            if (pdfBytes) {
                downloadBlob(pdfBytes, `${resume.slug || "resume"}.pdf`, "application/pdf")
            }
        } catch (err) {
            console.error(err)
            toast.error("Failed to generate PDF", {
                description: err instanceof Error ? err.message : "Please try again.",
            })
        } finally {
            setIsDownloadingPdf(false)
        }
    }

    function handleDownloadJson() {
        const jsonBytes = new TextEncoder().encode(JSON.stringify(form.state.values, null, 2))
        downloadBlob(jsonBytes, `${resume.slug || "resume"}.json`, "application/json")
    }

    return (
        <BuilderLayout
            isSaving={updateMutation.isPending}
            downloadAction={
                <DownloadDialog
                    isDownloading={isDownloadingPdf}
                    formats={[
                        {
                            key: "pdf",
                            icon: <FileTextIcon />,
                            title: "PDF",
                            description: "Best for applications, sharing, and printing.",
                            onDownload: handleDownloadPdf,
                            isDownloading: isDownloadingPdf,
                        },
                        {
                            key: "json",
                            icon: <FileJsonIcon />,
                            title: "JSON",
                            description: "Full resume data for backup or import.",
                            onDownload: handleDownloadJson,
                        },
                    ]}
                />
            }
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
                    {(values) => <ResumePreview resumeData={values} />}
                </form.Subscribe>
            }
        />
    )
}

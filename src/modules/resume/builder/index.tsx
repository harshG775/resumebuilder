import { Button } from "#/components/ui/button"
import { FieldGroup, FieldSeparator } from "#/components/ui/field"
import { useAppForm } from "#/hooks/form"
import { useHost } from "#/hooks/use-host"
import { authClient } from "#/lib/auth/auth-client"
import { ResumeZodSchema } from "../schema/resume.zod-schema"
import type { ResumeValues } from "../schema/resume.zod-schema"
import BuilderLayout from "./components/builder-layout"
import { DownloadDialog } from "./components/download-dialog"
import { EditResumeDialog } from "./components/edit-resume-dialog"
import {
    BasicsSection,
    CertificationsSection,
    EducationSection,
    ExperienceSection,
    ProjectsSection,
    SkillsSection,
    SummarySection,
} from "./Editor"
import { FileJsonIcon, FileTextIcon, Share2Icon } from "lucide-react"
import { toast } from "sonner"
import { updateResumeContentFn } from "#/lib/server/resume.function"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { ResumePreview } from "./preview"
import { getTypst } from "#/lib/typst/typst"
import { getTemplate } from "./preview/templates"
import { downloadBlob } from "#/lib/download"
import { TemplatesSection } from "./design"

type BuilderProps = {
    resume: { id: string; title: string; slug: string; content: ResumeValues }
}
export default function Builder({ resume }: BuilderProps) {
    const host = useHost()
    const { data: session } = authClient.useSession()
    const username = session?.user.username ?? ""
    const [isEditingTitle, setIsEditingTitle] = useState(false)

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

    async function handleShare() {
        if (!username) {
            toast.error("Add a username in your profile to get a shareable link.")
            return
        }
        const url = `${window.location.origin}/${username}/${resume.slug}`
        try {
            await navigator.clipboard.writeText(url)
            toast.success("Link copied to clipboard", { description: url })
        } catch (err) {
            toast.error("Couldn't copy link", {
                description: err instanceof Error ? err.message : "Please try again.",
            })
        }
    }

    return (
        <>
            <BuilderLayout
                isSaving={updateMutation.isPending}
                onEditTitle={() => setIsEditingTitle(true)}
                shareAction={
                    <Button variant="outline" size="sm" onClick={handleShare}>
                        <Share2Icon />
                        <span className="sr-only sm:not-sr-only">Share</span>
                    </Button>
                }
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
                title={resume.title || "Untitled resume"}
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
                        <TemplatesSection form={form} />
                    </FieldGroup>
                }
                preview={
                    <form.Subscribe selector={(state) => state.values}>
                        {(values) => <ResumePreview resumeData={values} />}
                    </form.Subscribe>
                }
            />
            {isEditingTitle && (
                <EditResumeDialog
                    resume={{ id: resume.id, title: resume.title, slug: resume.slug }}
                    host={host}
                    username={username}
                    open
                    onOpenChange={(open) => {
                        if (!open) setIsEditingTitle(false)
                    }}
                />
            )}
        </>
    )
}

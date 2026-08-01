import { Button } from "#/components/ui/button"
import { getTypst } from "#/lib/typst/typst"
import { saveTemplatePreviewFn } from "#/lib/server/dev.function"
import { resumeShowcaseValues } from "#/modules/resume/data/resume-seed-values"
import { ArrowsClockwiseIcon } from "@phosphor-icons/react"
import { useState } from "react"
import { toast } from "sonner"
import { templateList } from "../../templates"

// Dev-only: renders every template with the showcase resume data and writes
// the resulting SVGs to public/templates/, so thumbnails can be regenerated
// after a template edit without a manual screenshot.
export function DevGenerateTemplatePreviews({ onSeed }: { onSeed: () => void }) {
    const [isGenerating, setIsGenerating] = useState(false)

    if (!import.meta.env.DEV) return null

    async function handleGenerate() {
        setIsGenerating(true)
        try {
            const $typst = await getTypst()

            for (const template of templateList) {
                const values = {
                    ...resumeShowcaseValues,
                    meta: { ...resumeShowcaseValues.meta, template: template.meta.id },
                }
                const svg = await $typst.svg({
                    mainFilePath: template.mainFilePath,
                    inputs: template.buildInputs(values),
                    data_selection: { body: true, defs: true, css: true, js: false },
                })
                await saveTemplatePreviewFn({ data: { id: template.meta.id, svg } })
            }

            toast.success("Template previews generated", {
                description: "Saved to public/templates/. Reload to see updated thumbnails.",
            })
        } catch (err) {
            console.error("Failed to generate template previews", err)
            toast.error("Failed to generate template previews")
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <div className="flex gap-2 items-center">
            <Button type="button" size="sm" onClick={onSeed}>
                Seed
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={handleGenerate} disabled={isGenerating}>
                <ArrowsClockwiseIcon className={isGenerating ? "animate-spin" : undefined} />
                {isGenerating ? "Generating previews…" : "Generate previews (dev)"}
            </Button>
        </div>
    )
}

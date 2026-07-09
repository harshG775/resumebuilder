import { useTypstSvg } from "#/lib/typst/useTypstSvg"
import { ClientOnly } from "@tanstack/react-router"
import { getTemplate } from "./templates"
import type { TemplateId } from "./templates"
import type { ResumeValues } from "../../schema/resume.zod-schema"

export function TypstPreview({ source }: { source: string }) {
    const { svg, error, status } = useTypstSvg(source)

    if (error) {
        return <pre className="text-sm text-red-500">{error}</pre>
    }

    if (status === "loading-engine" || !svg) {
        return <div className="text-sm text-muted-foreground">Rendering preview…</div>
    }

    return <div dangerouslySetInnerHTML={{ __html: svg }} />
}
export default function Preview({ values, templateId }: { values: ResumeValues; templateId?: TemplateId }) {
    const template = getTemplate(templateId ?? "classic")
    return (
        <ClientOnly fallback={<div>Loading preview…</div>}>
            <TypstPreview source={template.render(values)} />
        </ClientOnly>
    )
}

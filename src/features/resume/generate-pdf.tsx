// src/features/resume/generate-pdf.tsx (Simplified Logic)
import { renderToStaticMarkup } from "react-dom/server"
import type { ResumeValues } from "#/lib/schemas/resume-schema"
import { getTemplate } from "./templates/registry"
import type { TemplateId } from "./types"

export async function generateResumeHtml(templateId: TemplateId, data: ResumeValues) {
    const Template = getTemplate(templateId)

    const html = renderToStaticMarkup(<Template.component data={data} />)
    return `
    <html>
      <head>
        <style>${Template.styles}</style>
      </head>
      <body>${html}</body>
    </html>
  `
}

// https://www.greatfrontend.com/blog/how-to-write-frontend-developer-resume
// index.ts
import { classicTemplate } from "./classic"
import type { ResumeTemplate, TemplateId } from "./template.type"

export const templateRegistry: Record<TemplateId, ResumeTemplate> = {
    classic: classicTemplate,
    modern: classicTemplate,
}

// `templateRegistry` maps every `TemplateId` to a template, but distinct ids can currently
// point at the same underlying template (e.g. "modern" is an alias for "classic" until it
// gets its own implementation) — dedupe by the template's own id so the picker doesn't show it twice.
export const templateList: ResumeTemplate[] = Array.from(
    new Map(Object.values(templateRegistry).map((template) => [template.meta.id, template])).values(),
)

export function getTemplate(id: TemplateId): ResumeTemplate {
    return templateRegistry[id]
}

export type { ResumeTemplate, TemplateId } from "./template.type"

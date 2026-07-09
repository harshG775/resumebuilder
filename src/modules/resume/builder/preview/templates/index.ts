// index.ts
import { classicTemplate } from "./classic"
import type { ResumeTemplate, TemplateId } from "./template.type"

export const templateRegistry: Record<TemplateId, ResumeTemplate> = {
    classic: classicTemplate,
}

export const templateList: ResumeTemplate[] = Object.values(templateRegistry)

export function getTemplate(id: TemplateId): ResumeTemplate {
    return templateRegistry[id]
}

export type { ResumeTemplate, TemplateId } from "./template.type"

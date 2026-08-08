import type { ResumeValues } from "#/modules/resume/schema/resume.zod-schema"

export type TemplateId = ResumeValues["meta"]["templateId"]

export type TemplateMeta = {
    id: TemplateId
    label: string
    thumbnail?: string
}

export type ResumeTemplate = {
    meta: TemplateMeta
    buildSource: (values: ResumeValues) => string
}

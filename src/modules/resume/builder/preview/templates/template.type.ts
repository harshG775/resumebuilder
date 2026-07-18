import type { ResumeValues } from "#/modules/resume/schema/resume.zod-schema"

export type TemplateId = "classic"

export type TemplateMeta = {
    id: TemplateId
    label: string
    thumbnail?: string
}

export type ResumeTemplate = {
    meta: TemplateMeta
    render: (values: ResumeValues) => string
}

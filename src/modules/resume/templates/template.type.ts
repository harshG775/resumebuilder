import type { ResumeValues } from "#/modules/resume/schema/resume.zod-schema"

export type TemplateId = ResumeValues["meta"]["template"]

export type TemplateMeta = {
    id: TemplateId
    label: string
    thumbnail?: string
}

export type ResumeTemplate = {
    meta: TemplateMeta
    mainFilePath: string
    buildInputs: (values: ResumeValues) => Record<string, string>
}

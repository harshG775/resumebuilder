import { themeForTypst } from "#/modules/resume/templates/theme-wire"
import type { ResumeValues } from "#/modules/resume/schema/resume.zod-schema"
import type { ResumeTemplate } from "../template.type"

export const classicTemplate: ResumeTemplate = {
    meta: {
        id: "classic",
        label: "Classic",
        thumbnail: "/templates/classic.svg",
    },
    mainFilePath: "/classic.typ",
    buildInputs: (values: ResumeValues) => ({
        theme: JSON.stringify(themeForTypst(values.meta.theme)),
        data: JSON.stringify(values),
    }),
}

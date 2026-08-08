import type { ResumeTemplate } from "../template.type"
import { buildClassicSource } from "./build-source"

export const classicTemplate: ResumeTemplate = {
    meta: {
        id: "classic",
        label: "Classic",
        thumbnail: "/templates/classic.svg",
    },
    buildSource: buildClassicSource,
}

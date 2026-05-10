import type { TemplateDefinition } from "#/features/resume/types"
import component from "./component"

const template: TemplateDefinition = {
    meta: {
        id: "default",
        name: "Default",
        description: "Clean, professional, ATS-friendly layout. Perfect for most roles.",
        thumbnail: "/templates/thumbnails/default.png",
    },
    config: {
        supportsPhoto: false,
        supportsSidebar: false,
        maxPages: 2,
    },
    component: component,
}

export default template

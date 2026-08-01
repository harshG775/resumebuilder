import type { ResumeValues } from "#/modules/resume/schema/resume.zod-schema"

type ResumeTheme = ResumeValues["meta"]["theme"]

/**
 * Typst source (theme.typ) uses kebab-case keys (text-muted, item-gap)
 * while the TS/DB side uses camelCase (ResumeTheme). This is the one place that
 * translation happens, right before the value is sent through `sys.inputs`.
 */
export function themeForTypst(theme: ResumeTheme) {
    return {
        version: theme.version,
        color: {
            text: theme.color.text,
            "text-muted": theme.color.textMuted,
            primary: theme.color.primary,
            background: theme.color.background,
            border: theme.color.border,
        },
        font: {
            body: theme.font.body,
            heading: theme.font.heading,
        },
        size: {
            name: theme.size.name,
            heading: theme.size.heading,
            subheading: theme.size.subheading,
            body: theme.size.body,
            meta: theme.size.meta,
        },
        weight: {
            heading: theme.weight.heading,
            subheading: theme.weight.subheading,
        },
        space: {
            "item-gap": theme.space.itemGap,
        },
        border: {
            thickness: theme.border.thickness,
        },
        layout: {
            paper: theme.layout.paper,
            margin: {
                x: theme.layout.margin.x,
                y: theme.layout.margin.y,
            },
        },
        lang: theme.lang,
        leading: theme.leading,
    }
}

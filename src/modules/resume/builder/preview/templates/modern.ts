import type { ResumeValues } from "#/modules/resume/schema/resume.zod-schema"
import type { ResumeTemplate } from "./template.type"
import {
    localeToLang,
    round2,
    safeFontFamily,
    safeFontWeight,
    safeHex,
    safeNumber,
    safePaperFormat,
} from "./template-style"

type SectionKey = ResumeValues["meta"]["layout"]["pages"][number]["main"][number]

const DEFAULT_SECTION_ORDER: SectionKey[] = ["summary", "skill", "experience", "project", "education", "certification"]

const getGapX = (values: ResumeValues): number => safeNumber(values.meta.page.gapX, 4, 0, 40)
const getGapY = (values: ResumeValues): number => safeNumber(values.meta.page.gapY, 6, 0, 40)

const mutedSeparator = (gapMm: number) => ` #h(${gapMm}mm) #text(fill: color-muted)[•] #h(${gapMm}mm) `

const linkMarkup = (url: string, label: string, underline: boolean) => {
    const styledLabel = `#text(fill: color-accent, weight: 600)[${escapeTypst(label)}]`
    const body = underline ? `#underline(stroke: 0.5pt + color-accent, evade: true)[${styledLabel}]` : styledLabel
    return `#link("${url}")[${body}]`
}

const withScheme = (url: string, scheme = "https://") => (/^[a-z][a-z0-9+.-]*:/i.test(url) ? url : `${scheme}${url}`)

const template = {
    basics(values: ResumeValues): string {
        const { basics, meta } = values
        const showUnderline = !meta.page.hideLinkUnderline
        const separator = mutedSeparator(getGapX(values))

        const contactParts = [
            !basics.email.hidden && basics.email.value
                ? `#link("mailto:${basics.email.value}")[${escapeTypst(basics.email.label || basics.email.value)}]`
                : "",
            !basics.phone.hidden && basics.phone.value
                ? `#link("tel:${basics.phone.value}")[${escapeTypst(basics.phone.label || basics.phone.value)}]`
                : "",
            basics.location ? escapeTypst(basics.location) : "",
            !basics.website.hidden && basics.website.value
                ? linkMarkup(
                      withScheme(basics.website.value),
                      basics.website.label || basics.website.value,
                      showUnderline,
                  )
                : "",
            ...basics.customFields.filter((f) => f.value).map((f) => linkMarkup(f.value, f.label, showUnderline)),
        ].filter(Boolean)

        const contactLine = contactParts.join(separator)

        return `
= ${escapeTypst(basics.name)}
${
    basics.headline
        ? `#text(size: 11pt, fill: color-accent, weight: 600)[${escapeTypst(basics.headline)}] \\
#v(-2pt)`
        : ""
}
${
    contactLine
        ? `#text(fill: color-text)[
    ${contactLine}
]`
        : ""
}
#v(2pt)
#line(length: 100%, stroke: 2pt + color-accent)
`
    },

    summary(values: ResumeValues): string {
        const { sections } = values
        const showSummary = !sections.summary.hidden && sections.summary.content.trim() !== ""
        if (!showSummary) return ""

        return `
== ${sections.summary.title}

${sections.summary.content}
`
    },

    skill(values: ResumeValues): string {
        const { sections } = values
        const visibleSkills = sections.skill.items.filter((s) => !s.hidden)
        const showSkill = !sections.skill.hidden && visibleSkills.length > 0
        if (!showSkill) return ""

        return `
== ${sections.skill.title}

${visibleSkills
    .map(
        (skill) =>
            `#text(weight: 700, fill: color-accent)[${escapeTypst(skill.name)}:] ${skill.keywords.map(escapeTypst).join(", ")}\n#v(-3pt)`,
    )
    .join("\n")}
`
    },

    experience(values: ResumeValues): string {
        const { sections } = values
        const visibleExperience = sections.experience.items.filter((e) => !e.hidden)
        const showExperience = !sections.experience.hidden && visibleExperience.length > 0
        if (!showExperience) return ""

        const gapY = getGapY(values)

        return `
== ${sections.experience.title}

${visibleExperience
    .map(
        (e) => `
#block(breakable: false, width: 100%)[
    === ${escapeTypst(e.position)} #h(1fr) #date-range[${escapeTypst(e.startDate)}][${escapeTypst(e.endDate)}]
    #text(fill: color-accent, weight: 600)[${escapeTypst(e.company)}]${
        e.location ? ` #text(fill: color-muted)[| #text(style: "italic")[${escapeTypst(e.location)}]]` : ""
    }
    ${e.content}
]
#v(${gapY}mm)
`,
    )
    .join("\n")}
`
    },

    project(values: ResumeValues): string {
        const { sections } = values
        const visibleProjects = sections.project.items.filter((p) => !p.hidden)
        const showProject = !sections.project.hidden && visibleProjects.length > 0
        if (!showProject) return ""

        const gapY = getGapY(values)
        const separator = mutedSeparator(getGapX(values))

        return `
== ${sections.project.title}

${visibleProjects
    .map((p) => {
        const links = p.links.filter((l) => l.value).map((l) => `#link("${l.value}")[${escapeTypst(l.label)}]`)
        const linkHeader = links.length ? ` #h(1fr) #text(size: 8.5pt, weight: 400)[${links.join(separator)}]` : ""
        const tech = p.keywords.filter(Boolean).map(escapeTypst).join(" • ")

        return `
#block(breakable: false, width: 100%)[
    === ${escapeTypst(p.name)}${linkHeader}
    ${tech ? `#text(fill: color-accent, style: "italic")[${tech}]` : ""}
    ${p.content}
]
#v(${gapY}mm)
`
    })
    .join("\n")}
`
    },

    education(values: ResumeValues): string {
        const { sections } = values
        const visibleEducation = sections.education.items.filter((e) => !e.hidden)
        const showEducation = !sections.education.hidden && visibleEducation.length > 0
        if (!showEducation) return ""

        const gapY = getGapY(values)

        return `
== ${sections.education.title}

${visibleEducation
    .map(
        (e) => `
#block(breakable: false, width: 100%)[
    === ${escapeTypst(e.degree)}${e.area ? `, ${escapeTypst(e.area)}` : ""} #h(1fr) #date-range[${escapeTypst(e.startDate)}][${escapeTypst(e.endDate)}]
    #text(fill: color-accent, style: "italic")[${escapeTypst(e.school)}]
    ${e.grade ? `#text(size: 8.5pt, fill: color-muted)[Grade: ${escapeTypst(e.grade)}]` : ""}
    ${e.content}
]
#v(${gapY}mm)
`,
    )
    .join("\n")}
`
    },

    certification(values: ResumeValues): string {
        const { sections } = values
        const visibleCertifications = sections.certification.items.filter((c) => !c.hidden)
        const showCertification = !sections.certification.hidden && visibleCertifications.length > 0
        if (!showCertification) return ""

        const gapY = getGapY(values)

        return `
== ${sections.certification.title}

${visibleCertifications
    .map(
        (c) => `
#block(breakable: false, width: 100%)[
    === ${escapeTypst(c.title)} #h(1fr) #text(size: 9pt, fill: color-date)[${escapeTypst(c.date)}]
    #text(fill: color-accent, style: "italic")[${escapeTypst(c.issuer)}]
    ${c.content}
]
#v(${gapY}mm)
`,
    )
    .join("\n")}
`
    },
} satisfies Record<SectionKey | "basics", (values: ResumeValues) => string>

export const modernTemplate: ResumeTemplate = {
    meta: {
        id: "modern",
        label: "Modern",
        thumbnail: "/templates/modern.svg",
    },

    render: (values) => {
        const { basics, meta } = values
        const pages = values.meta.layout.pages.length > 0 ? values.meta.layout.pages : [{ main: DEFAULT_SECTION_ORDER }]

        const pagesMarkup = pages
            .map((page) => page.main.map((key) => template[key](values)).join("\n"))
            .join("\n#pagebreak()\n")

        const primaryColor = safeHex(meta.design.colors.primary, "#0d9488")
        const textColor = safeHex(meta.design.colors.text, "#1f2937")
        const backgroundColor = safeHex(meta.design.colors.background, "#ffffff")

        const headingFont = safeFontFamily(meta.typography.heading.fontFamily, "Arial")
        const headingWeight = safeFontWeight(meta.typography.heading.fontWeight, "800")
        const bodyFont = safeFontFamily(meta.typography.body.fontFamily, "Arial")
        const bodyWeight = safeFontWeight(meta.typography.body.fontWeight, "400")

        const headingFontSize = safeNumber(meta.typography.heading.fontSize, 10.5, 6, 24)
        const bodyFontSize = safeNumber(meta.typography.body.fontSize, 10.5, 6, 24)
        const bodyLineHeight = safeNumber(meta.typography.body.lineHeight, 1.5, 1, 3)

        // Heading levels keep their original relative hierarchy — this scale is anchored so
        // the schema default (10.5) reproduces the template's original fixed sizes exactly.
        const headingScale = headingFontSize / 10.5
        const nameFontSize = round2(21 * headingScale)
        const sectionTitleFontSize = round2(10.5 * headingScale)
        const jobTitleFontSize = round2(9.8 * headingScale)
        // Anchored the same way against the original hardcoded 0.70em leading at the
        // schema's default lineHeight of 1.5.
        const bodyLeading = round2(0.7 * (bodyLineHeight / 1.5))

        const format = safePaperFormat(meta.page.format, "a4")
        const marginX = safeNumber(meta.page.marginX, 16, 0, 50)
        const marginY = safeNumber(meta.page.marginY, 16, 0, 50)
        const lang = localeToLang(meta.page.locale)

        return `
#set document(author: "${escapeTypst(basics.name)}", title: "${escapeTypst(basics.name)}")
#set page(
    paper: "${format}",
    margin: (x: ${marginX}mm, y: ${marginY}mm),
    fill: rgb("${backgroundColor}"),
)

#let color-heading = rgb("#111827")
#let color-accent = rgb("${primaryColor}")
#let color-text = rgb("${textColor}")
#let color-muted = rgb("#6b7280")
#let color-date = rgb("#6b7280")

#let font-heading = "${headingFont}"
#let font-sans = "${bodyFont}"

#set text(font: font-sans, size: ${bodyFontSize}pt, weight: ${bodyWeight}, fill: color-text, ligatures: false, lang: "${lang}")
#set par(leading: ${bodyLeading}em, justify: false)
#set list(spacing: 0.45em)

#show link: set text(fill: color-accent)

#show heading.where(level: 1): it => block(below: 4pt)[
    #set text(font: font-heading, size: ${nameFontSize}pt, weight: ${headingWeight}, fill: color-heading)
    #it.body
]

#show heading.where(level: 2): it => block(above: 10pt, below: 4pt)[
    #text(font: font-heading, size: ${sectionTitleFontSize}pt, weight: ${headingWeight}, fill: color-accent)[#upper(it.body)]
    #v(-6pt)
    #line(length: 100%, stroke: 0.6pt + color-accent.transparentize(50%))
]

#show heading.where(level: 3): it => [
    #set text(size: ${jobTitleFontSize}pt, weight: 700, fill: color-heading)
    #block(width: 100%, it.body)
]

#let date-range(s, e) = text(size: 9pt, fill: color-date)[ #s – #e ]

// ── HEADER ──────────────────────────────────────────────────────────────
${template.basics(values)}
${pagesMarkup}
`
    },
}

function escapeTypst(value: unknown): string {
    if (typeof value !== "string") {
        console.error("escapeTypst received:", value)
        return ""
    }

    return value.replace(/([\\*_#$@`<>\\[\]])/g, "\\$1")
}

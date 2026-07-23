import type { ResumeValues } from "#/modules/resume/schema/resume.zod-schema"
import type { ResumeTemplate } from "./template.type"

type SectionKey = ResumeValues["meta"]["layout"]["pages"][number]["main"][number]

const DEFAULT_SECTION_ORDER: SectionKey[] = ["summary", "skill", "experience", "project", "education", "certification"]

const mutedSeparator = ` #text(fill: color-muted)[ • ] `

const linkMarkup = (url: string, label: string) =>
    `#link("${url}")[#text(fill: color-accent, weight: 600)[${escapeTypst(label)}]]`

// `basics.website.value` is stored without a scheme (the editor UI shows "https://" as a
// fixed prefix). Add it back here, unless the value already carries one from older data.
const withScheme = (url: string, scheme = "https://") => (/^[a-z][a-z0-9+.-]*:/i.test(url) ? url : `${scheme}${url}`)

// ── SECTIONS ────────────────────────────────────────────────────────────
// Same shape as the classic template: each section is a standalone function of
// the full resume values, looked up and reordered by key via `meta.layout.pages[].main`.
// `basics` is the only section not driven by that list — it's always rendered first.
const template = {
    basics(values: ResumeValues): string {
        const { basics } = values

        const contactParts = [
            !basics.email.hidden && basics.email.value
                ? `#link("mailto:${basics.email.value}")[${escapeTypst(basics.email.label || basics.email.value)}]`
                : "",
            !basics.phone.hidden && basics.phone.value
                ? `#link("tel:${basics.phone.value}")[${escapeTypst(basics.phone.label || basics.phone.value)}]`
                : "",
            basics.location ? escapeTypst(basics.location) : "",
            !basics.website.hidden && basics.website.value
                ? linkMarkup(withScheme(basics.website.value), basics.website.label || basics.website.value)
                : "",
            ...basics.customFields.filter((f) => f.value).map((f) => linkMarkup(f.value, f.label)),
        ].filter(Boolean)

        const contactLine = contactParts.join(mutedSeparator)

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
#v(0.4em)
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

        return `
== ${sections.project.title}

${visibleProjects
    .map((p) => {
        const links = p.links.filter((l) => l.value).map((l) => `#link("${l.value}")[${escapeTypst(l.label)}]`)
        const linkHeader = links.length ? ` #h(1fr) #text(size: 8.5pt, weight: 400)[${links.join(mutedSeparator)}]` : ""
        const tech = p.keywords.filter(Boolean).map(escapeTypst).join(" • ")

        return `
#block(breakable: false, width: 100%)[
    === ${escapeTypst(p.name)}${linkHeader}
    ${tech ? `#text(fill: color-accent, style: "italic")[${tech}]` : ""}
    ${p.content}
]
#v(0.4em)
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
#v(0.4em)
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
#v(0.4em)
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
    },

    render: (values) => {
        const { basics } = values
        const pages = values.meta.layout.pages.length > 0 ? values.meta.layout.pages : [{ main: DEFAULT_SECTION_ORDER }]

        const pagesMarkup = pages
            .map((page) => page.main.map((key) => template[key](values)).join("\n"))
            .join("\n#pagebreak()\n")

        return `
#set document(author: "${escapeTypst(basics.name)}", title: "${escapeTypst(basics.name)}")
#set page(
    paper: "a4",
    margin: 0.4in,
    fill: white,
)

#let color-heading = rgb("#111827")
#let color-accent = rgb("#0d9488")
#let color-text = rgb("#1f2937")
#let color-muted = rgb("#6b7280")
#let color-date = rgb("#6b7280")

#let font-sans = "Arial"

#set text(font: font-sans, size: 9.4pt, fill: color-text, ligatures: false)
#set par(leading: 0.70em, justify: false)

#show link: set text(fill: color-accent)

#show heading.where(level: 1): it => block(below: 4pt)[
    #set text(font: font-sans, size: 21pt, weight: 800, fill: color-heading)
    #it.body
]

#show heading.where(level: 2): it => block(above: 10pt, below: 4pt)[
    #text(font: font-sans, size: 10.5pt, weight: 800, fill: color-accent)[#upper(it.body)]
    #v(-6pt)
    #line(length: 100%, stroke: 0.6pt + color-accent.transparentize(50%))
]

#show heading.where(level: 3): it => [
    #set text(size: 9.8pt, weight: 700, fill: color-heading)
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

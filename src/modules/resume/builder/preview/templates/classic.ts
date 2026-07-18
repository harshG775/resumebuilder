import type { ResumeTemplate } from "./template.type"

export const classicTemplate: ResumeTemplate = {
    meta: {
        id: "classic",
        label: "Classic",
    },

    render: (values) => {
        const { basics, sections } = values

        const visibleSkills = sections.skill.items.filter((s) => !s.hidden)
        const visibleExperience = sections.experience.items.filter((e) => !e.hidden)
        const visibleProjects = sections.project.items.filter((p) => !p.hidden)
        const visibleEducation = sections.education.items.filter((e) => !e.hidden)
        const visibleCertifications = sections.certification.items.filter((c) => !c.hidden)

        const showSummary = !sections.summary.hidden && sections.summary.content.trim() !== ""
        const showSkill = !sections.skill.hidden && visibleSkills.length > 0
        const showExperience = !sections.experience.hidden && visibleExperience.length > 0
        const showProject = !sections.project.hidden && visibleProjects.length > 0
        const showEducation = !sections.education.hidden && visibleEducation.length > 0
        const showCertification = !sections.certification.hidden && visibleCertifications.length > 0

        const mutedSeparator = ` #text(fill: color-muted)[ | ] `

        const linkMarkup = (url: string, label: string) =>
            `#link("${url}")[#underline(stroke: 0.5pt + color-muted, evade: true)[#text(fill: color-muted)[${escapeTypst(label)}]]]`

        const contactParts = [
            !basics.email.hidden && basics.email.value
                ? `#link("mailto:${basics.email.value}")[${escapeTypst(basics.email.label)}]`
                : "",
            !basics.phone.hidden && basics.phone.value
                ? `#link("tel:${basics.phone.value}")[${escapeTypst(basics.phone.label)}]`
                : "",
            basics.location ? escapeTypst(basics.location) : "",
            !basics.website.hidden && basics.website.value ? linkMarkup(basics.website.value, basics.website.label) : "",
            ...basics.customFields.filter((f) => f.value).map((f) => linkMarkup(f.value, f.label)),
        ].filter(Boolean)

        const contactLine = contactParts.join(mutedSeparator)

        return `
#set document(author: "${escapeTypst(basics.name)}", title: "${escapeTypst(basics.name)}")
#set page(
    paper: "a4",
    margin: 0.25in,
    fill: white,
)

#let color-heading = rgb("#1e3a8a")
#let color-text = rgb("#111827")
#let color-muted = rgb("#374151")
#let color-date = rgb("#6b7280")

#let font-serif = "Georgia"
#let font-sans = "Arial"

#set text(font: font-sans, size: 9.4pt, fill: color-text, ligatures: false)
#set par(leading: 0.70em, justify: false)

#show link: set text(fill: color-muted)

#show heading.where(level: 1): it => block(below: 6pt)[
    #set text(font: font-serif, size: 20pt, weight: 800, fill: color-heading)
    #it.body
]

#show heading.where(level: 2): it => block(above: 8pt)[
    #pad(top: 0.6em, bottom: -8pt)[ #text(font: font-serif, weight: 800, fill: color-heading)[#upper(it.body)] ]
    #line(length: 100%, stroke: 0.8pt + luma(30%).transparentize(30%))
    #v(-2pt)
]

#show heading.where(level: 3): it => [
    #set text(size: 9.8pt, weight: 700, fill: color-text)
    #block(width: 100%, it.body)
]

#let date-range(s, e) = text(size: 9pt, fill: color-date)[ #s - #e ]

// ── HEADER ──────────────────────────────────────────────────────────────
= ${escapeTypst(basics.name)}
${
    basics.headline
        ? `#text(size: 11pt, weight: 600)[${escapeTypst(basics.headline)}] \\
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

${
    !showSummary
        ? ""
        : `
== ${sections.summary.title}

${sections.summary.content}
`
}

${
    !showSkill
        ? ""
        : `
== ${sections.skill.title}

${visibleSkills
    .map((skill) => `#text(weight: 700)[${escapeTypst(skill.name)}:] ${skill.keywords.map(escapeTypst).join(", ")}\n#v(-3pt)`)
    .join("\n")}
`
}

${
    !showExperience
        ? ""
        : `
== ${sections.experience.title}

${visibleExperience
    .map(
        (e) => `
#block(breakable: false, width: 100%)[
    === ${escapeTypst(e.position)} #h(1fr) #date-range[${escapeTypst(e.startDate)}][${escapeTypst(e.endDate)}]
    #text(fill: color-text)[${escapeTypst(e.company)}]${
        e.location ? ` #text(fill: color-muted)[| #text(style: "italic")[${escapeTypst(e.location)}]]` : ""
    }
    ${e.content}
]
#v(0.4em)
`,
    )
    .join("\n")}
`
}

${
    !showProject
        ? ""
        : `
== ${sections.project.title}

${visibleProjects
    .map((p) => {
        const links = p.links.filter((l) => l.value).map((l) => `#link("${l.value}")[${escapeTypst(l.label)}]`)
        const linkHeader = links.length
            ? ` #h(1fr) #text(size: 8.5pt, weight: 400)[${links.join(mutedSeparator)}]`
            : ""
        const tech = p.keywords.filter(Boolean).map(escapeTypst).join(" • ")

        return `
#block(breakable: false, width: 100%)[
    === ${escapeTypst(p.name)}${linkHeader}
    ${tech ? `#text(fill: color-muted, style: "italic")[${tech}]` : ""}
    ${p.content}
]
#v(0.4em)
`
    })
    .join("\n")}
`
}

${
    !showEducation
        ? ""
        : `
== ${sections.education.title}

${visibleEducation
    .map(
        (e) => `
#block(breakable: false, width: 100%)[
    === ${escapeTypst(e.degree)}${e.area ? `, ${escapeTypst(e.area)}` : ""} #h(1fr) #date-range[${escapeTypst(e.startDate)}][${escapeTypst(e.endDate)}]
    #text(fill: color-muted, style: "italic")[${escapeTypst(e.school)}]
    ${e.grade ? `#text(size: 8.5pt, fill: color-muted)[Grade: ${escapeTypst(e.grade)}]` : ""}
    ${e.content}
]
#v(0.4em)
`,
    )
    .join("\n")}
`
}

${
    !showCertification
        ? ""
        : `
== ${sections.certification.title}

${visibleCertifications
    .map(
        (c) => `
#block(breakable: false, width: 100%)[
    === ${escapeTypst(c.title)} #h(1fr) #text(size: 9pt, fill: color-date)[${escapeTypst(c.date)}]
    #text(fill: color-muted, style: "italic")[${escapeTypst(c.issuer)}]
    ${c.content}
]
#v(0.4em)
`,
    )
    .join("\n")}
`
}
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

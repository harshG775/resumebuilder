import type { ResumeTemplate } from "./template.type"

export const classicTemplate: ResumeTemplate = {
    meta: {
        id: "classic",
        label: "Classic",
    },

    render: (values) => {
        const { basics, sections } = values

        const links = [basics.website.value && basics.website.label, ...basics.customFields.map((l) => l.label)].filter(
            Boolean,
        )

        return `
#set page(
    paper: "a4",
    margin: 16mm,
    fill: white,
)

#set text(
    font: "Inter",
    size: 10pt,
)

#set par(
    justify: true,
    leading: 0.6em,
)

#show heading.where(level: 1): it => {
    v(0.9em)
    text(
        weight: "bold",
        size: 11pt,
        fill: rgb("#1e3a8a"),
        upper(it.body),
    )
    line(length: 100%, stroke: 0.5pt + rgb("#1e3a8a"))
    v(0.4em)
}

= ${escapeTypst(basics.name)}

#set align(center)

#text(
    size: 10pt,
    weight: "medium",
)[${escapeTypst(basics.headline)}]

#text(size: 9pt)[
${[
    !basics.email.hidden ? escapeTypst(basics.email.label) : "",
    !basics.phone.hidden ? escapeTypst(basics.phone.label) : "",
    escapeTypst(basics.location),
    ...links.map(escapeTypst),
]
    .filter(Boolean)
    .join("  •  ")}
]

#set align(left)

${
    sections.summary.hidden
        ? ""
        : `
= ${sections.summary.title}

${sections.summary.content}
`
}

${
    sections.skill.hidden
        ? ""
        : `
= ${sections.skill.title}

${sections.skill.items
    .filter((s) => !s.hidden)
    .map((skill) => `#strong[${escapeTypst(skill.name)}:] ${skill.keywords.map(escapeTypst).join(", ")}`)
    .join("\n\n")}
`
}

${
    sections.experience.hidden
        ? ""
        : `
= ${sections.experience.title}

${sections.experience.items
    .filter((e) => !e.hidden)
    .map(
        (e) => `
#grid(
    columns: (1fr, auto),
    [
        #strong[${escapeTypst(e.position)}]

        ${escapeTypst(e.company)}
    ],
    [
        ${escapeTypst(e.startDate)} – ${escapeTypst(e.endDate)}
    ],
)

#text(size:9pt)[${escapeTypst(e.location)}]

${e.content}
`,
    )
    .join("\n")}
`
}

${
    sections.project.hidden
        ? ""
        : `
= ${sections.project.title}

${sections.project.items
    .filter((p) => !p.hidden)
    .map(
        (p) => `
#strong[${escapeTypst(p.name)}]

#emph[${p.keywords.map(escapeTypst).join(" • ")}]

${p.content}
`,
    )
    .join("\n")}
`
}

${
    sections.education.hidden
        ? ""
        : `
= ${sections.education.title}

${sections.education.items
    .filter((e) => !e.hidden)
    .map(
        (e) => `
#grid(
    columns: (1fr, auto),
    [
        #strong[${escapeTypst(e.degree)}]

        ${escapeTypst(e.school)}
    ],
    [
        ${escapeTypst(e.startDate)} – ${escapeTypst(e.endDate)}
    ],
)
`,
    )
    .join("\n")}
`
}

${
    sections.certification.hidden || sections.certification.items.length === 0
        ? ""
        : `
= ${sections.certification.title}

${sections.certification.items
    .filter((c) => !c.hidden)
    .map(
        (c) => `
#strong[${escapeTypst(c.title)}]

${escapeTypst(c.issuer)} • ${escapeTypst(c.date)}

${c.content}
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

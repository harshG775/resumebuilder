import type { ResumeTemplate } from "./template.type"

export const classicTemplate: ResumeTemplate = {
    meta: { id: "classic", label: "Classic" },
    render: (values) => {
        const {
            basics,
            sections: { summary, skills },
        } = values

        return `
            #set page(fill: rgb("#ffffff"), margin: 0.5in, paper: "us-letter")
            #set text(font: "New Computer Modern", size: 10pt)

            = ${escapeTypst(basics.name)}
            ${basics.email ? `#link("mailto:${basics.email}")[${escapeTypst(basics.email)}]` : ""}
            
            ${summary.content ? `== Summary\n${escapeTypst(summary.content)}` : ""}

            ${skills.items.length ? `== Skills\n${skills.items.map((s) => escapeTypst(s.name)).join(", ")}` : ""}
        `
    },
}

// Escape characters that are special in Typst markup (*, _, #, $, etc.)
function escapeTypst(input: string): string {
    return input.replace(/([\\*_#$@`<>[\]])/g, "\\$1")
}

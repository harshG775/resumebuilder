export const resumeSource = `
#import "theme.typ": theme

// The wrapper only owns what classic.typ and modern.typ render identically today:
// page/body-text/paragraph setup and the job-title (heading level 3) treatment.
// Heading levels 1 and 2, link color, and section bodies are template-specific and
// stay local to each template file.
#let resume(title: "", author: "", body) = {
    set document(title: title, author: author)

    set page(fill: theme.color.background, paper: theme.layout.paper, margin: theme.layout.margin, numbering: none)

    set text(
        font: theme.font.body,
        size: theme.size.body,
        fill: theme.color.text,
        lang: theme.lang,
        ligatures: false,
        hyphenate: false,
    )

    // Anchored so the schema default (leading: 1.5) reproduces the original
    // hardcoded 0.7em leading exactly, matching the pre-migration templates.
    set par(justify: false, leading: (0.7 * (theme.leading / 1.5)) * 1em)

    show heading.where(level: 3): it => {
        set text(size: theme.size.subheading, weight: 700, fill: theme.color.text)
        block(width: 100%, it.body)
    }

    body
}

#let date-range(start: "", end: "", sep: "-") = start + " " + sep + " " + end

#let meta-text(body) = text(size: theme.size.meta, fill: theme.color.text-muted)[#body]
`

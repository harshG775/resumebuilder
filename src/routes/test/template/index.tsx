import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useRef, useState } from "react"
import { getTypst } from "#/lib/typst/typst"
import { harshGaurResumeSeedValues } from "#/modules/resume/data/resume-seed-values"

export const Route = createFileRoute("/test/template/")({
    component: RouteComponent,
})

const typstTheme = `
#let default-theme = (
    color: (
        text: rgb("#1a1a1a"),
        text-muted: rgb("#595959"),
        primary: rgb("#1e3a5f"),
        background: rgb("#ffffff"),
    ),
    font: (
        body: "Libertinus Serif",
        heading: "Libertinus Serif",
    ),
    size: (
        name: 20pt,
        heading: 11pt,
        subheading: 10.5pt,
        body: 10pt,
        meta: 9pt,
    ),
    weight: (heading: 700, subheading: 600),
    space: (section-gap: 8pt, section-gap-after: 2pt, item-gap: 4pt),
    rule: (thickness: 0.5pt),
    lang: "en",
    paper: "us-letter",
    margin: (x: 0.55in, y: 0.5in),
)

#let merge-theme(overrides: (:)) = {
    let merged = default-theme
    for (section, values) in overrides {
        if section in merged and type(merged.at(section)) == dictionary and type(values) == dictionary {
            merged.insert(section, merged.at(section) + values)
        } else {
            merged.insert(section, values)
        }
    }
    merged
}

#let theme = {
    let raw = sys.inputs.at("theme", default: none)
    if raw == none { default-theme } else { merge-theme(json(bytes(raw))) }
}
`

const typstResume = `
#let resume(title: "", author: "", body) = {
    set document(title: title, author: author)

    set page(fill: theme.color.background, paper: theme.paper, margin: theme.margin, numbering: none)

    set text(
        font: theme.font.body,
        size: theme.size.body,
        fill: theme.color.text,
        lang: theme.lang,
        ligatures: false,
        hyphenate: false,
    )

    set par(justify: false, leading: 0.55em)

    show link: underline
    show link: set text(fill: theme.color.primary)

    show heading.where(level: 1): it => {
        set text(font: theme.font.heading, size: theme.size.name, weight: theme.weight.heading, fill: theme.color.text)
        it.body
    }

    show heading.where(level: 2): it => {
        set text(
            font: theme.font.heading,
            size: theme.size.heading,
            weight: theme.weight.heading,
            fill: theme.color.primary,
        )
        pad(top: theme.space.section-gap, bottom: theme.space.section-gap-after)[#smallcaps(it.body)]
        line(length: 100%, stroke: theme.rule.thickness + theme.color.text-muted)
    }

    body
}


#let row(left-content: none, right-content: none) = [#left-content #h(1fr) #right-content]

#let dash = "-"
#let daterange(start: "", end: "") = start + " " + dash + " " + end

#let meta-text(body) = text(size: theme.size.meta, fill: theme.color.text-muted)[#body]
#let subheading-text(body) = text(size: theme.size.subheading, weight: theme.weight.subheading)[#body]

#let contact-line(items: ()) = pad(top: 4pt)[#meta-text(items.filter(x => x != none and x != "").join("  |  "))]
#let link-item(label, url) = link(url)[#label]
#let email-item(address) = link("mailto:" + address)[#address]

#let work(title: "", company: "", location: "", start: "", end: "") = {
    row(left-content: subheading-text(title), right-content: meta-text(daterange(start: start, end: end)))
    linebreak()
    row(left-content: emph(company), right-content: meta-text(location))
}

#let edu(institution: "", degree: "", location: "", start: "", end: "") = {
    row(left-content: subheading-text(institution), right-content: meta-text(daterange(start: start, end: end)))
    linebreak()
    row(left-content: emph(degree), right-content: meta-text(location))
}

#let project(name: "", url: "", dates: "") = {
    row(
        left-content: [#subheading-text(name) #if url != "" [ (#link-item(url, "https://" + url))]],
        right-content: meta-text(dates),
    )
}

#let skills(items: ()) = par(items.join("  •  "))
`

const typstTemplate = `
#let data = json(bytes(sys.inputs.at("data")))

#show: resume.with(title: data.basics.name, author: data.basics.name)

= #data.basics.name
#text(size: theme.size.subheading, weight: theme.weight.subheading, fill: theme.color.primary)[#data.basics.headline]

#contact-line(items: (
    data.basics.location,
    if not data.basics.email.hidden and data.basics.email.value != "" { email-item(data.basics.email.value) },
    if not data.basics.phone.hidden and data.basics.phone.value != "" { link("tel:" + data.basics.phone.value)[#data.basics.phone.label] },
    if not data.basics.website.hidden and data.basics.website.value != "" { link-item(data.basics.website.label, data.basics.website.value) },
    ..data.basics.customFields.filter(cf => cf.value != "").map(cf => link-item(cf.label, cf.value)),
))

#if not data.sections.summary.hidden and data.sections.summary.content != "" [
    == #data.sections.summary.title
    #eval(data.sections.summary.content, mode: "markup")
]

#if not data.sections.experience.hidden [
    == #data.sections.experience.title
    #for item in data.sections.experience.items [
        #if not item.hidden [
            #work(
                title: item.position,
                company: item.company,
                location: item.location,
                start: item.startDate,
                end: item.endDate,
            )
            #eval(item.content, mode: "markup")
            #v(theme.space.item-gap)
        ]
    ]
]

#if not data.sections.project.hidden [
    == #data.sections.project.title
    #for item in data.sections.project.items [
        #if not item.hidden [
            #row(
                left-content: [
                    #subheading-text(item.name)
                    #if item.links.len() > 0 [
                        (#for (i, l) in item.links.enumerate() [#if i > 0 [, ]#link-item(l.label, l.value)])
                    ]
                ],
                right-content: meta-text(daterange(start: item.startDate, end: item.endDate)),
            )
            #if item.keywords.len() > 0 [#meta-text(item.keywords.join(", "))]
            #eval(item.content, mode: "markup")
            #v(theme.space.item-gap)
        ]
    ]
]

#if not data.sections.skill.hidden [
    == #data.sections.skill.title
    #for item in data.sections.skill.items [
        #if not item.hidden [
            #text(weight: theme.weight.subheading)[#item.name:] #skills(items: item.keywords)
        ]
    ]
]

#if not data.sections.education.hidden [
    == #data.sections.education.title
    #for item in data.sections.education.items [
        #if not item.hidden [
            #edu(
                institution: item.school,
                degree: item.degree,
                location: item.location,
                start: item.startDate,
                end: item.endDate,
            )
            #v(theme.space.item-gap)
        ]
    ]
]

#if not data.sections.certification.hidden and data.sections.certification.items.len() > 0 [
    == #data.sections.certification.title
    #for item in data.sections.certification.items [
        #if not item.hidden [
            #row(left-content: subheading-text(item.title), right-content: meta-text(item.date))
            #emph(item.issuer)
            #v(theme.space.item-gap)
        ]
    ]
]
`

const DEFAULT_SOURCE = `
// --- theme ---
${typstTheme}
// --- resume ---
${typstResume}
// --- template ---
${typstTemplate}
`

function RouteComponent() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isRendered, setIsRendered] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const render = async (mainContent: string) => {
        const container = containerRef.current
        if (!container) return

        try {
            const typst = getTypst()
            const result = await typst.svg({
                mainContent,
                inputs: { data: JSON.stringify(harshGaurResumeSeedValues) },
            })
            container.innerHTML = result
            setError(null)
        } catch (err) {
            console.error("Failed to render Typst preview:", err)
            setError(err instanceof Error ? err.message : "Failed to render")
        } finally {
            setIsRendered(true)
        }
    }

    useEffect(() => {
        render(DEFAULT_SOURCE)
    }, [])

    return (
        <div>
            <div className="sticky top-0 border-b bg-sidebar/80 px-4 py-2 text-sm font-medium backdrop-blur">
                Preview {!isRendered && <span className="text-muted-foreground">· rendering…</span>}
            </div>
            {error && (
                <div className="m-4 rounded border border-destructive/50 bg-destructive/10 p-3 text-xs text-destructive whitespace-pre-wrap">
                    {error}
                </div>
            )}
            <div className="flex justify-center p-6">
                <div
                    ref={containerRef}
                    className="[&_svg]:block [&_svg]:w-full [&_svg]:h-auto [&_svg]:bg-white [&_svg]:shadow-lg"
                />
            </div>
        </div>
    )
}

// Static Typst source for the "classic" template — reads the `#let content = (...)` dict
// produced by `buildClassicSource` (build-source.ts), which is prepended before this string
// is compiled. Nothing here is JS-templated; all iteration/conditionals are native Typst.
export const classicTypstSource = `
// ---------------------------------------------------------------------------------------------------------------------
#let theme = (
    color: (
        text: rgb(content.meta.theme.color.text),
        text-muted: rgb(content.meta.theme.color.text-muted),
        primary: rgb(content.meta.theme.color.primary),
        background: rgb(content.meta.theme.color.background),
        border: rgb(content.meta.theme.color.border),
    ),
    font: (
        body: content.meta.theme.font.body,
        heading: content.meta.theme.font.heading,
    ),
    size: (
        name: content.meta.theme.size.name * 1pt,
        heading: content.meta.theme.size.heading * 1pt,
        subheading: content.meta.theme.size.subheading * 1pt,
        body: content.meta.theme.size.body * 1pt,
        meta: content.meta.theme.size.meta * 1pt,
    ),
    weight: (
        heading: content.meta.theme.weight.heading,
        subheading: content.meta.theme.weight.subheading,
    ),
    space: (
        section-gap: content.meta.theme.space.section-gap * 1pt,
        section-gap-after: content.meta.theme.space.section-gap-after * 1pt,
        item-gap: content.meta.theme.space.item-gap * 1pt,
    ),
    border: (thickness: content.meta.theme.border.thickness * 1pt),
    layout: (
        paper: content.meta.theme.layout.paper,
        margin: (x: content.meta.theme.layout.margin.x * 1in, y: content.meta.theme.layout.margin.y * 1in),
    ),
    lang: content.meta.theme.lang,
    leading: content.meta.theme.leading,
)
// ---------------------------------------------------------------------------------------------------------------------
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
    set par(justify: false, leading: theme.leading * 1em)

    show link: underline
    show link: set text(fill: theme.color.primary)

    show heading.where(level: 1): it => {
        set text(font: theme.font.heading, size: theme.size.name, weight: theme.weight.heading, fill: theme.color.text)
        block(it.body)
    }

    show heading.where(level: 2): it => {
        set text(font: theme.font.heading, size: theme.size.heading, weight: theme.weight.heading, fill: theme.color.primary)
        pad(top: theme.space.section-gap, bottom: theme.space.section-gap-after)[#smallcaps(it.body)]
        line(length: 100%, stroke: theme.border.thickness + theme.color.border)
    }

    body
}
// ---------------------------------------------------------------------------------------------------------------------

#let row(left-content: none, right-content: none) = [#left-content #h(1fr) #right-content]

#let dash = "-"
#let date-range(start: "", end: "") = start + " " + dash + " " + end

#let meta-text(body) = text(size: theme.size.meta, fill: theme.color.text-muted)[#body]
#let subheading-text(body) = text(size: theme.size.subheading, weight: theme.weight.subheading)[#body]

#let contact-line(items: ()) = pad(top: 4pt)[#meta-text(items.filter(x => x != none).join("  |  "))]
#let link-item(label, url) = link(url)[#label]
#let email-item(address) = link("mailto:" + address)[#address]

#let work(title: "", company: "", location: "", start: "", end: "") = block(breakable: false, width: 100%)[
    #row(left-content: subheading-text(title), right-content: meta-text(date-range(start: start, end: end)))
    #linebreak()
    #row(left-content: emph(company), right-content: meta-text(location))
]

#let edu(institution: "", degree: "", location: "", start: "", end: "") = block(breakable: false, width: 100%)[
    #row(left-content: subheading-text(institution), right-content: meta-text(date-range(start: start, end: end)))
    #linebreak()
    #row(left-content: emph(degree), right-content: meta-text(location))
]

#let skills(items: ()) = items.join("  •  ")

#let render-content(items) = for item in items [
    #if item.is-active [
        #item.value
        #parbreak()
    ]
]
// ---------------------------------------------------------------------------------------------------------------------
// Section renderers — each takes the matching \`content.data.sections.*\` entry, returns none if skipped.
// "contact-info" and "target-title" are rendered separately, right under the name — they are excluded
// from this dict and from the section-order loop below.

#let render-professional-summary(section) = if section.is-active and section.attributes.len() > 0 [
    == #section.title
    #render-content(section.attributes)
]

#let render-work-experience(section) = if section.is-active and section.attributes.len() > 0 [
    == #section.title
    #for item in section.attributes [
        #if item.is-active [
            #work(
                title: item.position,
                company: item.company,
                location: item.location,
                start: item.start-date,
                end: item.end-date,
            )
            #if item.website.is-active and item.website.value != "" [
                #meta-text(link-item(item.website.label, item.website.value))
            ]
            #render-content(item.content)
            #v(theme.space.item-gap)
        ]
    ]
]

#let render-education(section) = if section.is-active and section.attributes.len() > 0 [
    == #section.title
    #for item in section.attributes [
        #if item.is-active [
            #edu(
                institution: item.school,
                degree: item.degree,
                location: item.location,
                start: item.start-date,
                end: if item.date-label != "" { item.date-label + " " + item.end-date } else { item.end-date },
            )
            #render-content(item.content)
            #v(theme.space.item-gap)
        ]
    ]
]

#let render-skills(section) = if section.is-active and section.attributes.len() > 0 [
    == #section.title
    #for item in section.attributes [
        #if item.is-active [
            #let names = item.skill.filter(s => s.is-active and s.name != "").map(s => s.name)
            #block(width: 100%)[#text(weight: theme.weight.subheading)[#item.category:] #skills(items: names)]
        ]
    ]
]

#let render-certifications(section) = if section.is-active and section.attributes.len() > 0 [
    == #section.title
    #for item in section.attributes [
        #if item.is-active [
            #let date-text = if item.start-date != "" or item.end-date != "" {
                meta-text(date-range(start: item.start-date, end: item.end-date))
            } else { none }
            #block(breakable: false, width: 100%)[
                #row(
                    left-content: [
                        #subheading-text(item.name)
                        #if item.provider != "" [ #text(fill: theme.color.text-muted)[· #item.provider]]
                    ],
                    right-content: date-text,
                )
            ]
            #v(theme.space.item-gap)
        ]
    ]
]

#let render-awards-scholarships(section) = if section.is-active and section.attributes.len() > 0 [
    == #section.title
    #for item in section.attributes [
        #if item.is-active [
            #block(breakable: false, width: 100%)[
                #row(
                    left-content: [
                        #subheading-text(item.title)
                        #if item.organization != "" [ #text(fill: theme.color.text-muted)[· #item.organization]]
                    ],
                    right-content: if item.date != "" { meta-text(item.date) } else { none },
                )
            ]
            #v(theme.space.item-gap)
        ]
    ]
]

#let render-projects(section) = if section.is-active and section.attributes.len() > 0 [
    == #section.title
    #for item in section.attributes [
        #if item.is-active [
            #let links = item.links.filter(l => l.is-active and l.value != "")
            #let keywords = item.keywords.filter(k => k != "")
            #let date-text = if item.start-date != "" or item.end-date != "" {
                meta-text(date-range(start: item.start-date, end: item.end-date))
            } else { none }
            #block(breakable: false, width: 100%)[
                #row(
                    left-content: [
                        #subheading-text(item.name)
                        #if item.organization != "" [ #text(fill: theme.color.text-muted)[· #item.organization]]
                        #if links.len() > 0 [
                            (#for (i, l) in links.enumerate() [#if i > 0 [, ]#link-item(l.label, l.value)])
                        ]
                    ],
                    right-content: date-text,
                )
            ]
            #if keywords.len() > 0 [#meta-text(keywords.join(", "))]
            #render-content(item.content)
            #v(theme.space.item-gap)
        ]
    ]
]

#let render-volunteering-leadership(section) = if section.is-active and section.attributes.len() > 0 [
    == #section.title
    #for item in section.attributes [
        #if item.is-active [
            #work(
                title: item.involvement,
                company: item.organization,
                location: item.location,
                start: item.start-date,
                end: item.end-date,
            )
            #render-content(item.content)
            #v(theme.space.item-gap)
        ]
    ]
]

#let render-publications(section) = if section.is-active and section.attributes.len() > 0 [
    == #section.title
    #for item in section.attributes [
        #if item.is-active [
            #block(breakable: false, width: 100%)[
                #row(
                    left-content: [
                        #subheading-text(item.title)
                        #if item.publisher != "" [ #text(fill: theme.color.text-muted)[· #item.publisher]]
                    ],
                    right-content: if item.date != "" { meta-text(item.date) } else { none },
                )
            ]
            #render-content(item.content)
            #v(theme.space.item-gap)
        ]
    ]
]

#let section-renderers = (
    professional-summary: render-professional-summary,
    work-experience: render-work-experience,
    education: render-education,
    skills: render-skills,
    certifications: render-certifications,
    awards-scholarships: render-awards-scholarships,
    projects: render-projects,
    volunteering-leadership: render-volunteering-leadership,
    publications: render-publications,
)
// ---------------------------------------------------------------------------------------------------------------------
#let ci = content.data.contact-info.attributes
#let target-title = content.data.sections.target-title

#show: resume.with(title: ci.name.value, author: ci.name.value)

= #ci.name.value
#if target-title.is-active and target-title.attributes.is-active and target-title.attributes.name != "" [
    #text(size: theme.size.subheading, weight: theme.weight.subheading, fill: theme.color.primary)[#target-title.attributes.name]
]

#contact-line(items: (
    if ci.location.is-active and ci.location.value != "" { ci.location.value } else { none },
    if ci.email.is-active and ci.email.value != "" { email-item(ci.email.value) } else { none },
    if ci.phone.is-active and ci.phone.value != "" { link("tel:" + ci.phone.value)[#ci.phone.value] } else { none },
    ..ci.custom-fields.filter(f => f.is-active and f.value != "").map(f => link-item(f.label, f.value)),
))

#for key in content.meta.section-order.filter(k => k != "contact-info" and k != "target-title") {
    (section-renderers.at(key))(content.data.sections.at(key))
}
// ---------------------------------------------------------------------------------------------------------------------
`

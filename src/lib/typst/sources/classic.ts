export const classicSource = `
#import "theme.typ": theme
#import "resume.typ": resume, date-range, meta-text

#let data = json(bytes(sys.inputs.at("data")))

#let sep = "  |  "
#let underlined = not data.meta.display.hideLinkUnderline

#let with-scheme(url) = if url.contains("://") { url } else { "https://" + url }

#let link-item(label, url) = {
    let styled = text(fill: theme.color.text-muted)[#label]
    link(url)[#if underlined { underline(stroke: 0.5pt + theme.color.text-muted, evade: true)[#styled] } else { styled }]
}

#let contact-line(items) = pad(top: 4pt)[
    #text(fill: theme.color.text)[#items.filter(x => x != none and x != "").join(sep)]
]

#show: resume.with(title: data.basics.name, author: data.basics.name)

#show heading.where(level: 1): it => block(below: 6pt)[
    #set text(font: theme.font.heading, size: theme.size.name, weight: theme.weight.heading, fill: theme.color.primary)
    #it.body
]

#show heading.where(level: 2): it => block(above: 8pt)[
    #pad(top: 0.6em, bottom: -8pt)[
        #text(font: theme.font.heading, weight: theme.weight.heading, fill: theme.color.primary)[#upper(it.body)]
    ]
    #line(length: 100%, stroke: theme.border.thickness + theme.color.border)
    #v(-2pt)
]

#show link: set text(fill: theme.color.text-muted)

= #data.basics.name
#if data.basics.headline != "" [
    #text(size: theme.size.subheading, weight: theme.weight.subheading)[#data.basics.headline] \\
    #v(-2pt)
]
#contact-line((
    if not data.basics.email.hidden and data.basics.email.value != "" { link-item(data.basics.email.label, "mailto:" + data.basics.email.value) },
    if not data.basics.phone.hidden and data.basics.phone.value != "" { link-item(data.basics.phone.label, "tel:" + data.basics.phone.value) },
    data.basics.location,
    if not data.basics.website.hidden and data.basics.website.value != "" { link-item(data.basics.website.label, with-scheme(data.basics.website.value)) },
    ..data.basics.customFields.filter(f => f.value != "").map(f => link-item(f.label, with-scheme(f.value))),
))

#let render-summary() = [
    #if not data.sections.summary.hidden and data.sections.summary.content != "" [
        == #data.sections.summary.title

        #eval(data.sections.summary.content, mode: "markup")
    ]
]

#let render-skill() = [
    #if not data.sections.skill.hidden and data.sections.skill.items.filter(i => not i.hidden).len() > 0 [
        == #data.sections.skill.title

        #for item in data.sections.skill.items.filter(i => not i.hidden) [
            #text(weight: 700)[#item.name:] #item.keywords.join(", ")
            #v(-3pt)
        ]
    ]
]

#let render-experience() = [
    #if not data.sections.experience.hidden and data.sections.experience.items.filter(i => not i.hidden).len() > 0 [
        == #data.sections.experience.title

        #for item in data.sections.experience.items.filter(i => not i.hidden) [
            #block(breakable: false, width: 100%)[
                === #item.position #h(1fr) #meta-text(date-range(start: item.startDate, end: item.endDate))
                #text(fill: theme.color.text)[#item.company]#if item.location != "" [ #text(fill: theme.color.text-muted)[| #text(style: "italic")[#item.location]]]
                #eval(item.content, mode: "markup")
            ]
            #v(theme.space.item-gap)
        ]
    ]
]

#let render-project() = [
    #if not data.sections.project.hidden and data.sections.project.items.filter(i => not i.hidden).len() > 0 [
        == #data.sections.project.title

        #for item in data.sections.project.items.filter(i => not i.hidden) [
            #let links = item.links.filter(l => l.value != "")
            #block(breakable: false, width: 100%)[
                === #item.name#if links.len() > 0 [ #h(1fr) #text(size: 8.5pt)[#links.map(l => link-item(l.label, with-scheme(l.value))).join(sep)]]
                #if item.keywords.filter(k => k != "").len() > 0 [#meta-text(item.keywords.filter(k => k != "").join(" \u{2022} "))]
                #eval(item.content, mode: "markup")
            ]
            #v(theme.space.item-gap)
        ]
    ]
]

#let render-education() = [
    #if not data.sections.education.hidden and data.sections.education.items.filter(i => not i.hidden).len() > 0 [
        == #data.sections.education.title

        #for item in data.sections.education.items.filter(i => not i.hidden) [
            #block(breakable: false, width: 100%)[
                === #item.degree#if item.area != "" [, #item.area] #h(1fr) #meta-text(date-range(start: item.startDate, end: item.endDate))
                #text(fill: theme.color.text-muted, style: "italic")[#item.school]
                #if item.grade != "" [#text(size: 8.5pt, fill: theme.color.text-muted)[Grade: #item.grade]]
                #eval(item.content, mode: "markup")
            ]
            #v(theme.space.item-gap)
        ]
    ]
]

#let render-certification() = [
    #if not data.sections.certification.hidden and data.sections.certification.items.filter(i => not i.hidden).len() > 0 [
        == #data.sections.certification.title

        #for item in data.sections.certification.items.filter(i => not i.hidden) [
            #block(breakable: false, width: 100%)[
                === #item.title #h(1fr) #meta-text(item.date)
                #text(fill: theme.color.text-muted, style: "italic")[#item.issuer]
                #eval(item.content, mode: "markup")
            ]
            #v(theme.space.item-gap)
        ]
    ]
]

#let sections = (
    summary: render-summary,
    skill: render-skill,
    experience: render-experience,
    project: render-project,
    education: render-education,
    certification: render-certification,
)

#let default-order = ("summary", "skill", "experience", "project", "education", "certification")
#let pages = if data.meta.layout.pages.len() > 0 { data.meta.layout.pages } else { ((main: default-order),) }

#for (i, page) in pages.enumerate() [
    #if i > 0 [#pagebreak()]
    #for key in page.main [#sections.at(key)()]
]
`

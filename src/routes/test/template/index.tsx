import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useRef, useState } from "react"
import { $typst } from "@myriaddreamin/typst.ts"
import type { TypstSnippet } from "@myriaddreamin/typst.ts/dist/esm/contrib/snippet.mjs"
import rendererWasmUrl from "@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm?url"
import compilerWasmUrl from "@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm?url"
import { useQuery } from "@tanstack/react-query"
import { getResumeDefaults, ResumeZodSchema } from "#/modules/resume/schema/resume-v1.zod-schema"
import type { ResumeValues } from "#/modules/resume/schema/resume-v1.zod-schema"

export const Route = createFileRoute("/test/template/")({
    component: RouteComponent,
})

// ---------------------------------------------------------------------------------------------------------------------

function escapeTypstString(text: string): string {
    return text.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
}

// Maps the schema's camelCase section keys to the kebab-case keys used on the Typst side.
const SECTION_KEY_TO_TYPST: Record<ResumeValues["meta"]["sectionOrder"][number], string> = {
    contactInfo: "contact-info",
    targetTitle: "target-title",
    professionalSummary: "professional-summary",
    workExperience: "work-experience",
    education: "education",
    skills: "skills",
    certifications: "certifications",
    awardsScholarships: "awards-scholarships",
    projects: "projects",
    volunteeringLeadership: "volunteering-leadership",
    publications: "publications",
}

// Static Typst source — reads the `#let content = (...)` dict produced by `convertJSObjectToTypst`.
// Nothing here is JS-templated; all iteration/conditionals are native Typst.
const TYPST_TEMPLATE = `
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

// ---------------------------------------------------------------------------------------------------------------------

const SAMPLE_RESUME: ResumeValues = {
    data: {
        contactInfo: {
            type: "contactInfo",
            title: "Contact",
            icon: "",
            isActive: true,
            attributes: {
                name: { isActive: true, value: "Harsh Gaur" },
                email: { isActive: true, value: "hgaur491@gmail.com" },
                phone: { isActive: true, value: "+919310745921" },
                location: { isActive: true, value: "Delhi, India" },
                customFields: [
                    {
                        id: crypto.randomUUID(),
                        isActive: true,
                        variant: "website",
                        icon: "website",
                        label: "harshgaur.in",
                        value: "https://harshgaur.in",
                    },
                    {
                        id: crypto.randomUUID(),
                        isActive: true,
                        variant: "github",
                        icon: "github",
                        label: "github.com/harshG775",
                        value: "https://github.com/harshG775",
                    },
                    {
                        id: crypto.randomUUID(),
                        isActive: true,
                        variant: "linkedin",
                        icon: "linkedin",
                        label: "linkedin.com/in/harshg775",
                        value: "https://linkedin.com/in/harshg775",
                    },
                ],
            },
        },
        sections: {
            targetTitle: {
                type: "targetTitle",
                title: "Target Title",
                icon: "",
                isActive: true,
                attributes: {
                    isActive: true,
                    name: "Frontend Engineer | React • Next.js • TypeScript • TanStack",
                },
            },

            professionalSummary: {
                type: "professionalSummary",
                title: "Summary",
                icon: "",
                isActive: true,
                attributes: [
                    {
                        id: crypto.randomUUID(),
                        isActive: true,
                        value: `Frontend Engineer with #strong[2+ years of experience] building production SaaS applications using #strong[React], #strong[Next.js], #strong[TypeScript], and modern #strong[TanStack] libraries. Worked on #strong[multi-tenant platforms], #strong[AI-powered products], and #strong[real-time applications], focusing on reusable component architecture, application performance, and scalable frontend systems.`,
                    },
                ],
            },

            workExperience: {
                type: "workExperience",
                title: "Experience",
                icon: "",
                isActive: true,
                attributes: [
                    {
                        id: crypto.randomUUID(),
                        isActive: true,
                        company: "Prabhubhakti Pvt. Ltd.",
                        position: "Frontend Engineer",
                        location: "Gurugram",
                        type: "Full-time",
                        startDate: "Jun 2025",
                        endDate: "Present",
                        website: {
                            id: "",
                            isActive: false,
                            variant: "website",
                            icon: "website",
                            label: "",
                            value: "",
                        },
                        content: [
                            {
                                id: crypto.randomUUID(),
                                isActive: true,
                                value: `- Architected and developed #strong[three multi-tenant SaaS platforms] (#emph[Astrologer], #emph[Temple Management], and #emph[Ebook]) using #strong[Next.js] and #strong[TanStack Start], supporting #strong[30+ live tenant clients] and #strong[2,000+ end users] with domain/subdomain-based tenant isolation and per-tenant UI theming.`,
                            },
                            {
                                id: crypto.randomUUID(),
                                isActive: true,
                                value: `- Built reusable #strong[React/TypeScript] booking and payment components, integrating a centralized #strong[PhonePe payment gateway] across tenant platforms and reducing new tenant onboarding time by #strong[~70%].`,
                            },
                            {
                                id: crypto.randomUUID(),
                                isActive: true,
                                value: `- Standardized onboarding templates and routing architecture across tenant applications, reducing duplicate implementation and accelerating new tenant feature delivery.`,
                            },
                        ],
                    },

                    {
                        id: crypto.randomUUID(),
                        isActive: true,
                        company: "Metis Eduventures Pvt. Ltd. (Adda247)",
                        position: "Frontend Engineer (SDE Trainee)",
                        location: "Gurugram",
                        type: "Full-time",
                        startDate: "Aug 2024",
                        endDate: "Feb 2025",
                        website: {
                            id: "",
                            isActive: false,
                            variant: "website",
                            icon: "website",
                            label: "",
                            value: "",
                        },
                        content: [
                            {
                                id: crypto.randomUUID(),
                                isActive: true,
                                value: `- Built #strong[SupportDesk], an #strong[AI-powered customer support platform] with real-time agent handover using #strong[WebSockets] and the #strong[OpenAI API], replacing a third-party vendor and saving #strong[~₹2L/year].`,
                            },
                            {
                                id: crypto.randomUUID(),
                                isActive: true,
                                value: `- Developed a #strong[voice-enabled AI academic assistant] using #strong[Whisper API] and #strong[SSE streaming], integrating AI services while supporting #strong[150+ concurrent users].`,
                            },
                            {
                                id: crypto.randomUUID(),
                                isActive: true,
                                value: `- Improved React application performance by #strong[~25%] using #strong[bundle analysis], #strong[code splitting], #strong[React.memo], and #strong[lazy loading].`,
                            },
                        ],
                    },

                    {
                        id: crypto.randomUUID(),
                        isActive: true,
                        company: "ItaxEasy",
                        position: "Frontend Developer Internship",
                        location: "Gwalior (Remote)",
                        type: "Internship",
                        startDate: "Nov 2023",
                        endDate: "May 2024",
                        website: {
                            id: "",
                            isActive: false,
                            variant: "website",
                            icon: "website",
                            label: "",
                            value: "",
                        },
                        content: [
                            {
                                id: crypto.randomUUID(),
                                isActive: true,
                                value: `- Migrated a legacy #strong[React.js] tax platform to #strong[Next.js App Router with SSR], improving #strong[SEO indexing] and reducing initial page load time.`,
                            },
                            {
                                id: crypto.randomUUID(),
                                isActive: true,
                                value: `- Implemented #strong[route-based code splitting] and #strong[lazy loading] to reduce JavaScript payload and improve navigation performance.`,
                            },
                        ],
                    },
                ],
            },

            education: {
                type: "education",
                title: "Education",
                icon: "",
                isActive: true,
                attributes: [
                    {
                        id: crypto.randomUUID(),
                        isActive: true,
                        school: "Indira Gandhi National Open University (IGNOU)",
                        degree: "Master of Computer Applications (MCA)",
                        area: "",
                        grade: "",
                        location: "",
                        startDate: "2026",
                        endDate: "2028",
                        dateLabel: "Expected",
                        content: [],
                    },

                    {
                        id: crypto.randomUUID(),
                        isActive: true,
                        school: "Prof. Rajendra Singh University",
                        degree: "Bachelor of Arts",
                        area: "",
                        grade: "",
                        location: "",
                        startDate: "2020",
                        endDate: "2023",
                        dateLabel: "",
                        content: [],
                    },
                ],
            },

            skills: {
                type: "skills",
                title: "Skills",
                icon: "",
                isActive: true,
                columns: 2,
                attributes: [
                    {
                        isActive: true,
                        id: crypto.randomUUID(),
                        category: "Languages",
                        skill: [
                            { id: crypto.randomUUID(), isActive: true, name: "TypeScript" },
                            { id: crypto.randomUUID(), isActive: true, name: "JavaScript (ES2022+)" },
                            { id: crypto.randomUUID(), isActive: true, name: "Python" },
                        ],
                    },
                    {
                        isActive: true,
                        id: crypto.randomUUID(),
                        category: "Frontend",
                        skill: [
                            { id: crypto.randomUUID(), isActive: true, name: "React.js" },
                            { id: crypto.randomUUID(), isActive: true, name: "Next.js" },
                            { id: crypto.randomUUID(), isActive: true, name: "HTML5" },
                            { id: crypto.randomUUID(), isActive: true, name: "CSS3" },
                            { id: crypto.randomUUID(), isActive: true, name: "Tailwind CSS" },
                        ],
                    },
                    {
                        isActive: true,
                        id: crypto.randomUUID(),
                        category: "React Ecosystem",
                        skill: [
                            { id: crypto.randomUUID(), isActive: true, name: "TanStack Router" },
                            { id: crypto.randomUUID(), isActive: true, name: "TanStack Query" },
                            { id: crypto.randomUUID(), isActive: true, name: "TanStack Form" },
                            { id: crypto.randomUUID(), isActive: true, name: "Zustand" },
                        ],
                    },
                    {
                        isActive: true,
                        id: crypto.randomUUID(),
                        category: "Backend & APIs",
                        skill: [
                            { id: crypto.randomUUID(), isActive: true, name: "Node.js" },
                            { id: crypto.randomUUID(), isActive: true, name: "Express.js" },
                            { id: crypto.randomUUID(), isActive: true, name: "Flask" },
                            { id: crypto.randomUUID(), isActive: true, name: "REST APIs" },
                            { id: crypto.randomUUID(), isActive: true, name: "WebSockets" },
                        ],
                    },
                    {
                        isActive: true,
                        id: crypto.randomUUID(),
                        category: "Data & Authentication",
                        skill: [
                            { id: crypto.randomUUID(), isActive: true, name: "PostgreSQL" },
                            { id: crypto.randomUUID(), isActive: true, name: "MongoDB" },
                            { id: crypto.randomUUID(), isActive: true, name: "Drizzle ORM" },
                            { id: crypto.randomUUID(), isActive: true, name: "Better Auth" },
                        ],
                    },
                    {
                        isActive: true,
                        id: crypto.randomUUID(),
                        category: "Developer Tools",
                        skill: [
                            { id: crypto.randomUUID(), isActive: true, name: "Git" },
                            { id: crypto.randomUUID(), isActive: true, name: "GitHub" },
                            { id: crypto.randomUUID(), isActive: true, name: "Docker" },
                        ],
                    },
                ],
            },

            certifications: {
                type: "certifications",
                title: "Certifications",
                icon: "",
                isActive: true,
                attributes: [],
            },

            awardsScholarships: {
                type: "awardsScholarships",
                title: "Awards & Scholarships",
                icon: "",
                isActive: true,
                attributes: [],
            },

            projects: {
                type: "projects",
                title: "Projects",
                icon: "",
                isActive: true,
                attributes: [
                    {
                        isActive: true,
                        id: crypto.randomUUID(),
                        name: "Resume Builder Platform",
                        organization: "Personal",
                        keywords: ["TanStack Start", "TanStack Form", "Zod", "dnd-kit", "Typst (WASM)", "Tiptap"],
                        startDate: "",
                        endDate: "",
                        links: [
                            {
                                id: crypto.randomUUID(),
                                isActive: true,
                                variant: "website",
                                icon: "website",
                                label: "anchor.harshgaur.in",
                                value: "https://anchor.harshgaur.in",
                            },
                        ],
                        content: [
                            {
                                id: crypto.randomUUID(),
                                isActive: true,
                                value: `- Built a browser-based #strong[Resume Builder] supporting #strong[drag-and-drop section management], #strong[live PDF preview], and #strong[client-side PDF generation] using #strong[Typst WASM].`,
                            },
                            {
                                id: crypto.randomUUID(),
                                isActive: true,
                                value: `- Designed a #strong[schema-driven form system] using #strong[TanStack Form] and #strong[Zod] for dynamic resume validation.`,
                            },
                            {
                                id: crypto.randomUUID(),
                                isActive: true,
                                value: `- Integrated #strong[Typst WASM] and #strong[Tiptap] to enable instant PDF generation and rich-text editing entirely in the browser.`,
                            },
                        ],
                    },

                    {
                        isActive: true,
                        id: crypto.randomUUID(),
                        name: "Multi-Tenant Architecture",
                        organization: "Open Source",
                        keywords: ["TanStack Start", "TanStack Router", "TypeScript", "Tailwind CSS"],
                        startDate: "",
                        endDate: "",
                        links: [
                            {
                                id: crypto.randomUUID(),
                                isActive: true,
                                variant: "github",
                                icon: "github",
                                label: "github.com/harshG775/multi-tenant-saas",
                                value: "https://github.com/harshG775/multi-tenant-saas",
                            },
                        ],
                        content: [
                            {
                                id: crypto.randomUUID(),
                                isActive: true,
                                value: `- Implemented #strong[domain-based tenant resolution], isolated routing, and theme management for #strong[multi-tenant React applications].`,
                            },
                            {
                                id: crypto.randomUUID(),
                                isActive: true,
                                value: `- Published an #strong[open-source proof of concept] demonstrating scalable tenant separation using #strong[TanStack Start].`,
                            },
                        ],
                    },
                ],
            },

            volunteeringLeadership: {
                type: "volunteeringLeadership",
                title: "Volunteering & Leadership",
                icon: "",
                isActive: true,
                attributes: [],
            },

            publications: {
                type: "publications",
                title: "Publications",
                icon: "",
                isActive: true,
                attributes: [],
            },
        },
    },
    meta: {
        templateId: "classic",
        theme: {
            color: {
                text: "#1a1a1a",
                textMuted: "#595959",
                primary: "#1e3a5f",
                background: "#ffffff",
                border: "#595959",
            },
            font: {
                body: "Libertinus Serif",
                heading: "Libertinus Serif",
            },
            size: {
                name: 20,
                heading: 14,
                subheading: 12,
                body: 9,
                meta: 9.5,
            },
            weight: {
                heading: 800,
                subheading: 700,
            },
            space: {
                sectionGap: -5,
                sectionGapAfter: -10,
                itemGap: 0,
            },
            border: {
                thickness: 0.5,
            },
            layout: {
                paper: "a4",
                margin: { x: 0.4, y: 0.4 },
            },
            lang: "en",
            leading: 1,
        },
        display: {
            hideLinkUnderline: false,
            hideIcons: false,
            hideSectionIcons: true,
        },
        sectionOrder: [
            "contactInfo",
            "targetTitle",
            "professionalSummary",
            "workExperience",
            "skills",
            "education",
            "certifications",
            "awardsScholarships",
            "projects",
            "volunteeringLeadership",
            "publications",
        ],
    },
}

function RouteComponent() {
    const initializedRef = useRef(false)
    const { data, error } = useQuery({
        queryKey: ["typst-init"],
        queryFn: () => {
            if (!initializedRef.current) {
                $typst.setRendererInitOptions({ getModule: () => rendererWasmUrl })
                $typst.setCompilerInitOptions({ getModule: () => compilerWasmUrl })
                initializedRef.current = true
            }
            return $typst
        },
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
    return (
        <div>
            <div>{error && error.message}</div>
            {data && <Test typst={data} />}
        </div>
    )
}

function Test({ typst }: { typst: TypstSnippet }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isRendered, setIsRendered] = useState(false)
    const [error, setError] = useState<string | null>(null)

    console.log(JSON.stringify(getResumeDefaults(),null,4));
    
    const render = async () => {
        const container = containerRef.current
        if (!container) return

        try {
            const result = await typst.svg({
                mainContent: buildTypstSource({ content: SAMPLE_RESUME }),
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
        render()
    })

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

type CustomField = ResumeValues["data"]["contactInfo"]["attributes"]["customFields"][number]

const customFieldDict = (f: CustomField) => `(
                id: "${escapeTypstString(f.id)}",
                is-active: ${f.isActive},
                label: "${escapeTypstString(f.label)}",
                value: "${escapeTypstString(f.value)}",
            )`

const customFieldListTypst = (fields: CustomField[]) => fields.map((f) => `\n            ${customFieldDict(f)},`).join("")

type ContentItem = ResumeValues["data"]["sections"]["workExperience"]["attributes"][number]["content"][number]

const contentItemsTypst = (items: ContentItem[]) =>
    items.map((c) => `\n            (is-active: ${c.isActive}, value: [${c.value}]),`).join("")

const typstStringArray = (values: string[]) =>
    `(${values.map((v) => `"${escapeTypstString(v)}"`).join(", ")}${values.length === 1 ? "," : ""})`

const convertJSObjectToTypst = ({ content }: { content: ResumeValues }) => {
    const parsed = ResumeZodSchema.safeParse(content)
    if (!parsed.success) {
        const issues = parsed.error.issues
            .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
            .join("\n")
        throw new Error(`Invalid resume data, cannot generate Typst source:\n${issues}`)
    }
    const { data, meta } = parsed.data
    const { contactInfo, sections } = data

    const sectionOrder = typstStringArray(meta.sectionOrder.map((key) => SECTION_KEY_TO_TYPST[key]))

    const workExperienceItems = sections.workExperience.attributes
        .map(
            (item) => `
            (
                is-active: ${item.isActive},
                company: "${escapeTypstString(item.company)}",
                position: "${escapeTypstString(item.position)}",
                location: "${escapeTypstString(item.location)}",
                start-date: "${escapeTypstString(item.startDate)}",
                end-date: "${escapeTypstString(item.endDate)}",
                website: ${customFieldDict(item.website)},
                content: (${contentItemsTypst(item.content)}
                ),
            ),`,
        )
        .join("")

    const educationItems = sections.education.attributes
        .map(
            (item) => `
            (
                is-active: ${item.isActive},
                school: "${escapeTypstString(item.school)}",
                degree: "${escapeTypstString(item.degree)}",
                location: "${escapeTypstString(item.location)}",
                start-date: "${escapeTypstString(item.startDate)}",
                end-date: "${escapeTypstString(item.endDate)}",
                date-label: "${escapeTypstString(item.dateLabel)}",
                content: (${contentItemsTypst(item.content)}
                ),
            ),`,
        )
        .join("")

    const skillsItems = sections.skills.attributes
        .map(
            (item) => `
            (
                is-active: ${item.isActive},
                category: "${escapeTypstString(item.category)}",
                skill: (${item.skill
                    .map(
                        (s) => `
                    (is-active: ${s.isActive}, name: "${escapeTypstString(s.name)}"),`,
                    )
                    .join("")}
                ),
            ),`,
        )
        .join("")

    const certificationItems = sections.certifications.attributes
        .map(
            (item) => `
            (
                is-active: ${item.isActive},
                name: "${escapeTypstString(item.name)}",
                provider: "${escapeTypstString(item.provider)}",
                start-date: "${escapeTypstString(item.startDate)}",
                end-date: "${escapeTypstString(item.endDate)}",
            ),`,
        )
        .join("")

    const awardsScholarshipsItems = sections.awardsScholarships.attributes
        .map(
            (item) => `
            (
                is-active: ${item.isActive},
                title: "${escapeTypstString(item.title)}",
                organization: "${escapeTypstString(item.organization)}",
                date: "${escapeTypstString(item.date)}",
            ),`,
        )
        .join("")

    const projectItems = sections.projects.attributes
        .map(
            (item) => `
            (
                is-active: ${item.isActive},
                name: "${escapeTypstString(item.name)}",
                organization: "${escapeTypstString(item.organization)}",
                keywords: ${typstStringArray(item.keywords)},
                start-date: "${escapeTypstString(item.startDate)}",
                end-date: "${escapeTypstString(item.endDate)}",
                links: (${customFieldListTypst(item.links)}
                ),
                content: (${contentItemsTypst(item.content)}
                ),
            ),`,
        )
        .join("")

    const volunteeringLeadershipItems = sections.volunteeringLeadership.attributes
        .map(
            (item) => `
            (
                is-active: ${item.isActive},
                organization: "${escapeTypstString(item.organization)}",
                involvement: "${escapeTypstString(item.involvement)}",
                location: "${escapeTypstString(item.location)}",
                start-date: "${escapeTypstString(item.startDate)}",
                end-date: "${escapeTypstString(item.endDate)}",
                content: (${contentItemsTypst(item.content)}
                ),
            ),`,
        )
        .join("")

    const publicationsItems = sections.publications.attributes
        .map(
            (item) => `
            (
                is-active: ${item.isActive},
                title: "${escapeTypstString(item.title)}",
                publisher: "${escapeTypstString(item.publisher)}",
                date: "${escapeTypstString(item.date)}",
                content: (${contentItemsTypst(item.content)}
                ),
            ),`,
        )
        .join("")

    return `
#let content = (
    data: (
        contact-info: (
            attributes: (
                name: (is-active: ${contactInfo.attributes.name.isActive}, value: "${escapeTypstString(contactInfo.attributes.name.value)}"),
                email: (is-active: ${contactInfo.attributes.email.isActive}, value: "${escapeTypstString(contactInfo.attributes.email.value)}"),
                phone: (is-active: ${contactInfo.attributes.phone.isActive}, value: "${escapeTypstString(contactInfo.attributes.phone.value)}"),
                location: (is-active: ${contactInfo.attributes.location.isActive}, value: "${escapeTypstString(contactInfo.attributes.location.value)}"),
                custom-fields: (${customFieldListTypst(contactInfo.attributes.customFields)}
                ),
            ),
        ),
        sections: (
            target-title: (
                is-active: ${sections.targetTitle.isActive},
                attributes: (
                    is-active: ${sections.targetTitle.attributes.isActive},
                    name: "${escapeTypstString(sections.targetTitle.attributes.name)}",
                ),
            ),
            professional-summary: (
                is-active: ${sections.professionalSummary.isActive},
                title: "${escapeTypstString(sections.professionalSummary.title)}",
                attributes: (${sections.professionalSummary.attributes
                    .map((attr) => `\n                    (is-active: ${attr.isActive}, value: [${attr.value}]),`)
                    .join("")}
                ),
            ),
            work-experience: (
                is-active: ${sections.workExperience.isActive},
                title: "${escapeTypstString(sections.workExperience.title)}",
                attributes: (${workExperienceItems}
                ),
            ),
            education: (
                is-active: ${sections.education.isActive},
                title: "${escapeTypstString(sections.education.title)}",
                attributes: (${educationItems}
                ),
            ),
            skills: (
                is-active: ${sections.skills.isActive},
                title: "${escapeTypstString(sections.skills.title)}",
                attributes: (${skillsItems}
                ),
            ),
            certifications: (
                is-active: ${sections.certifications.isActive},
                title: "${escapeTypstString(sections.certifications.title)}",
                attributes: (${certificationItems}
                ),
            ),
            awards-scholarships: (
                is-active: ${sections.awardsScholarships.isActive},
                title: "${escapeTypstString(sections.awardsScholarships.title)}",
                attributes: (${awardsScholarshipsItems}
                ),
            ),
            projects: (
                is-active: ${sections.projects.isActive},
                title: "${escapeTypstString(sections.projects.title)}",
                attributes: (${projectItems}
                ),
            ),
            volunteering-leadership: (
                is-active: ${sections.volunteeringLeadership.isActive},
                title: "${escapeTypstString(sections.volunteeringLeadership.title)}",
                attributes: (${volunteeringLeadershipItems}
                ),
            ),
            publications: (
                is-active: ${sections.publications.isActive},
                title: "${escapeTypstString(sections.publications.title)}",
                attributes: (${publicationsItems}
                ),
            ),
        ),
    ),
    meta: (
        theme: (
            color: (
                text: "${escapeTypstString(meta.theme.color.text)}",
                text-muted: "${escapeTypstString(meta.theme.color.textMuted)}",
                primary: "${escapeTypstString(meta.theme.color.primary)}",
                background: "${escapeTypstString(meta.theme.color.background)}",
                border: "${escapeTypstString(meta.theme.color.border)}",
            ),
            font: (
                body: "${escapeTypstString(meta.theme.font.body)}",
                heading: "${escapeTypstString(meta.theme.font.heading)}",
            ),
            size: (
                name: ${meta.theme.size.name},
                heading: ${meta.theme.size.heading},
                subheading: ${meta.theme.size.subheading},
                body: ${meta.theme.size.body},
                meta: ${meta.theme.size.meta},
            ),
            weight: (
                heading: ${meta.theme.weight.heading},
                subheading: ${meta.theme.weight.subheading},
            ),
            space: (
                section-gap: ${meta.theme.space.sectionGap},
                section-gap-after: ${meta.theme.space.sectionGapAfter},
                item-gap: ${meta.theme.space.itemGap},
            ),
            border: (thickness: ${meta.theme.border.thickness}),
            layout: (
                paper: "${escapeTypstString(meta.theme.layout.paper)}",
                margin: (x: ${meta.theme.layout.margin.x}, y: ${meta.theme.layout.margin.y}),
            ),
            lang: "${escapeTypstString(meta.theme.lang)}",
            leading: ${meta.theme.leading},
        ),
        display: (
            hide-link-underline: ${meta.display.hideLinkUnderline},
            hide-icons: ${meta.display.hideIcons},
            hide-section-icons: ${meta.display.hideSectionIcons},
        ),
        section-order: ${sectionOrder},
    ),
)
`
}

const buildTypstSource = ({ content }: { content: ResumeValues }) =>
    `${convertJSObjectToTypst({ content })}\n${TYPST_TEMPLATE}`

import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useRef, useState } from "react"
import { $typst } from "@myriaddreamin/typst.ts"
import type { TypstSnippet } from "@myriaddreamin/typst.ts/dist/esm/contrib/snippet.mjs"
import rendererWasmUrl from "@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm?url"
import compilerWasmUrl from "@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm?url"
import { useQuery } from "@tanstack/react-query"
import { z } from "zod"
import {
    CertificationsItemSchema,
    EducationItemSchema,
    ExperienceItemSchema,
    LinkSchema,
    ProjectsItemSchema,
    ResumeZodSchema,
    SkillsItemSchema,
} from "#/modules/resume/schema/resume.zod-schema"
import type { ResumeValues } from "#/modules/resume/schema/resume.zod-schema"

export const Route = createFileRoute("/test/template/")({
    component: RouteComponent,
})

// ---------------------------------------------------------------------------------------------------------------------

function escapeTypstString(text: string): string {
    return text.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
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
// ---------------------------------------------------------------------------------------------------------------------
// Section renderers — each takes the matching \`content.sections.*\` entry, returns none if skipped.

#let render-summary(section) = if not section.hidden and section.has-content [
    == #section.title
    #section.content
]

#let render-experience(section) = if not section.hidden and section.items.len() > 0 [
    == #section.title
    #for item in section.items [
        #if not item.hidden [
            #work(
                title: item.position,
                company: item.company,
                location: item.location,
                start: item.start-date,
                end: item.end-date,
            )
            #item.content
            #v(theme.space.item-gap)
        ]
    ]
]

#let render-project(section) = if not section.hidden and section.items.len() > 0 [
    == #section.title
    #for item in section.items [
        #if not item.hidden [
            #let links = item.links.filter(l => l.value != "")
            #let keywords = item.keywords.filter(k => k != "")
            #let date-text = if item.start-date != "" or item.end-date != "" {
                meta-text(date-range(start: item.start-date, end: item.end-date))
            } else { none }
            #block(breakable: false, width: 100%)[
                #row(
                    left-content: [
                        #subheading-text(item.name)
                        #if links.len() > 0 [
                            (#for (i, l) in links.enumerate() [#if i > 0 [, ]#link-item(l.label, l.value)])
                        ]
                    ],
                    right-content: date-text,
                )
            ]
            #if keywords.len() > 0 [#meta-text(keywords.join(", "))]
            #item.content
            #v(theme.space.item-gap)
        ]
    ]
]

#let render-skill(section) = if not section.hidden and section.items.len() > 0 [
    == #section.title
    #for item in section.items [
        #if not item.hidden [
            #block(width: 100%)[#text(weight: theme.weight.subheading)[#item.name:] #skills(items: item.keywords.filter(k => k != ""))]
        ]
    ]
]

#let render-education(section) = if not section.hidden and section.items.len() > 0 [
    == #section.title
    #for item in section.items [
        #if not item.hidden [
            #edu(
                institution: item.school,
                degree: item.degree,
                location: item.location,
                start: item.start-date,
                end: item.end-date,
            )
            #item.content
            #v(theme.space.item-gap)
        ]
    ]
]

#let render-certification(section) = if not section.hidden and section.items.len() > 0 [
    == #section.title
    #for item in section.items [
        #if not item.hidden [
            #let date-text = if item.date != "" { meta-text(item.date) } else { none }
            #block(breakable: false, width: 100%)[
                #row(
                    left-content: [
                        #subheading-text(item.title)
                        #if item.issuer != "" [ #text(fill: theme.color.text-muted)[· #item.issuer]]
                    ],
                    right-content: date-text,
                )
            ]
            #item.content
            #v(theme.space.item-gap)
        ]
    ]
]

#let section-renderers = (
    summary: render-summary,
    experience: render-experience,
    project: render-project,
    skill: render-skill,
    education: render-education,
    certification: render-certification,
)
// ---------------------------------------------------------------------------------------------------------------------
#show: resume.with(title: content.basics.name, author: content.basics.name)

= #content.basics.name
#if content.basics.headline != "" [
    #text(size: theme.size.subheading, weight: theme.weight.subheading, fill: theme.color.primary)[#content.basics.headline]
]

#contact-line(items: (
    if content.basics.location != "" { content.basics.location } else { none },
    if not content.basics.email.hidden and content.basics.email.value != "" { email-item(content.basics.email.value) } else { none },
    if not content.basics.phone.hidden and content.basics.phone.value != "" { link("tel:" + content.basics.phone.value)[#content.basics.phone.label] } else { none },
    if not content.basics.website.hidden and content.basics.website.value != "" { link-item(content.basics.website.label, content.basics.website.value) } else { none },
    ..content.basics.custom-fields.filter(f => f.value != "").map(f => link-item(f.label, f.value)),
))

#for page in content.meta.layout.pages [
    #for key in page.main {
        (section-renderers.at(key))(content.sections.at(key))
    }
]
// ---------------------------------------------------------------------------------------------------------------------
`

// ---------------------------------------------------------------------------------------------------------------------

const SAMPLE_RESUME: ResumeValues = {
    basics: {
        name: "Harsh Gaur",
        headline: "Frontend Engineer | React • Next.js • TypeScript • TanStack",

        email: {
            hidden: false,
            label: "hgaur491@gmail.com",
            value: "hgaur491@gmail.com",
        },

        phone: {
            hidden: false,
            label: "(+91) 9310745921",
            value: "+919310745921",
        },

        location: "Delhi, India",

        website: {
            hidden: false,
            label: "harshgaur.in",
            value: "https://harshgaur.in",
        },

        customFields: [
            {
                id: crypto.randomUUID(),
                label: "github.com/harshG775",
                value: "https://github.com/harshG775",
            },
            {
                id: crypto.randomUUID(),
                label: "linkedin.com/in/harshg775",
                value: "https://linkedin.com/in/harshg775",
            },
        ],
    },

    sections: {
        summary: {
            title: "Summary",
            hidden: false,
            columns: 1,
            icon: "",
            content: `Frontend Engineer with #strong[2+ years of experience] building production SaaS applications using #strong[React], #strong[Next.js], #strong[TypeScript], and modern #strong[TanStack] libraries. Worked on #strong[multi-tenant platforms], #strong[AI-powered products], and #strong[real-time applications], focusing on reusable component architecture, application performance, and scalable frontend systems.`,
        },

        skill: {
            title: "Skills",
            hidden: false,
            columns: 2,
            icon: "",

            items: [
                {
                    id: crypto.randomUUID(),
                    hidden: false,
                    icon: "",
                    name: "Languages",
                    proficiency: "",
                    level: 5,
                    keywords: ["TypeScript", "JavaScript (ES2022+)", "Python"],
                },
                {
                    id: crypto.randomUUID(),
                    hidden: false,
                    icon: "",
                    name: "Frontend",
                    proficiency: "",
                    level: 5,
                    keywords: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
                },
                {
                    id: crypto.randomUUID(),
                    hidden: false,
                    icon: "",
                    name: "React Ecosystem",
                    proficiency: "",
                    level: 5,
                    keywords: ["TanStack Router", "TanStack Query", "TanStack Form", "Zustand"],
                },
                {
                    id: crypto.randomUUID(),
                    hidden: false,
                    icon: "",
                    name: "Backend & APIs",
                    proficiency: "",
                    level: 4,
                    keywords: ["Node.js", "Express.js", "Flask", "REST APIs", "WebSockets"],
                },
                {
                    id: crypto.randomUUID(),
                    hidden: false,
                    icon: "",
                    name: "Data & Authentication",
                    proficiency: "",
                    level: 4,
                    keywords: ["PostgreSQL", "MongoDB", "Drizzle ORM", "Better Auth"],
                },
                {
                    id: crypto.randomUUID(),
                    hidden: false,
                    icon: "",
                    name: "Developer Tools",
                    proficiency: "",
                    level: 4,
                    keywords: ["Git", "GitHub", "Docker"],
                },
            ],
        },
        experience: {
            title: "Experience",
            hidden: false,
            columns: 1,
            icon: "",

            items: [
                {
                    id: crypto.randomUUID(),
                    hidden: false,
                    company: "Prabhubhakti Pvt. Ltd.",
                    position: "Frontend Engineer",
                    location: "Gurugram",
                    startDate: "Jun 2025",
                    endDate: "Present",
                    website: {
                        hidden: true,
                        label: "",
                        value: "",
                    },
                    content: `- Architected and developed #strong[three multi-tenant SaaS platforms] (#emph[Astrologer], #emph[Temple Management], and #emph[Ebook]) using #strong[Next.js] and #strong[TanStack Start], supporting #strong[30+ live tenant clients] and #strong[2,000+ end users] with domain/subdomain-based tenant isolation and per-tenant UI theming.

- Built reusable #strong[React/TypeScript] booking and payment components, integrating a centralized #strong[PhonePe payment gateway] across tenant platforms and reducing new tenant onboarding time by #strong[~70%].

- Standardized onboarding templates and routing architecture across tenant applications, reducing duplicate implementation and accelerating new tenant feature delivery.`,
                },

                {
                    id: crypto.randomUUID(),
                    hidden: false,
                    company: "Metis Eduventures Pvt. Ltd. (Adda247)",
                    position: "Frontend Engineer (SDE Trainee)",
                    location: "Gurugram",
                    startDate: "Aug 2024",
                    endDate: "Feb 2025",
                    website: {
                        hidden: true,
                        label: "",
                        value: "",
                    },
                    content: `- Built #strong[SupportDesk], an #strong[AI-powered customer support platform] with real-time agent handover using #strong[WebSockets] and the #strong[OpenAI API], replacing a third-party vendor and saving #strong[~₹2L/year].

- Developed a #strong[voice-enabled AI academic assistant] using #strong[Whisper API] and #strong[SSE streaming], integrating AI services while supporting #strong[150+ concurrent users].

- Improved React application performance by #strong[~25%] using #strong[bundle analysis], #strong[code splitting], #strong[React.memo], and #strong[lazy loading].`,
                },

                {
                    id: crypto.randomUUID(),
                    hidden: false,
                    company: "ItaxEasy",
                    position: "Frontend Developer Internship",
                    location: "Gwalior (Remote)",
                    startDate: "Nov 2023",
                    endDate: "May 2024",
                    website: {
                        hidden: true,
                        label: "",
                        value: "",
                    },
                    content: `- Migrated a legacy #strong[React.js] tax platform to #strong[Next.js App Router with SSR], improving #strong[SEO indexing] and reducing initial page load time.

- Implemented #strong[route-based code splitting] and #strong[lazy loading] to reduce JavaScript payload and improve navigation performance.`,
                },
            ],
        },

        project: {
            title: "Projects",
            hidden: false,
            columns: 1,
            icon: "",

            items: [
                {
                    id: crypto.randomUUID(),
                    hidden: false,
                    name: "Resume Builder Platform",
                    type: "personal",
                    links: [
                        {
                            id: crypto.randomUUID(),
                            label: "anchor.harshgaur.in",
                            value: "https://anchor.harshgaur.in",
                        },
                    ],
                    keywords: ["TanStack Start", "TanStack Form", "Zod", "dnd-kit", "Typst (WASM)", "Tiptap"],
                    startDate: "",
                    endDate: "",
                    content: `- Built a browser-based #strong[Resume Builder] supporting #strong[drag-and-drop section management], #strong[live PDF preview], and #strong[client-side PDF generation] using #strong[Typst WASM].

- Designed a #strong[schema-driven form system] using #strong[TanStack Form] and #strong[Zod] for dynamic resume validation.

- Integrated #strong[Typst WASM] and #strong[Tiptap] to enable instant PDF generation and rich-text editing entirely in the browser.`,
                },

                {
                    id: crypto.randomUUID(),
                    hidden: false,
                    name: "Multi-Tenant Architecture",
                    type: "open-source",
                    links: [
                        {
                            id: crypto.randomUUID(),
                            label: "github.com/harshG775/multi-tenant-saas",
                            value: "https://github.com/harshG775/multi-tenant-saas",
                        },
                    ],
                    keywords: ["TanStack Start", "TanStack Router", "TypeScript", "Tailwind CSS"],
                    startDate: "",
                    endDate: "",
                    content: `- Implemented #strong[domain-based tenant resolution], isolated routing, and theme management for #strong[multi-tenant React applications].

- Published an #strong[open-source proof of concept] demonstrating scalable tenant separation using #strong[TanStack Start].`,
                },
            ],
        },

        education: {
            title: "Education",
            hidden: false,
            columns: 1,
            icon: "",

            items: [
                {
                    id: crypto.randomUUID(),
                    hidden: false,
                    school: "Indira Gandhi National Open University (IGNOU)",
                    degree: "Master of Computer Applications (MCA)",
                    area: "",
                    grade: "",
                    location: "",
                    startDate: "2026",
                    endDate: "Expected 2028",
                    website: {
                        hidden: true,
                        label: "",
                        value: "",
                    },
                    content: "",
                },

                {
                    id: crypto.randomUUID(),
                    hidden: false,
                    school: "Prof. Rajendra Singh University",
                    degree: "Bachelor of Arts",
                    area: "",
                    grade: "",
                    location: "",
                    startDate: "2020",
                    endDate: "2023",
                    website: {
                        hidden: true,
                        label: "",
                        value: "",
                    },
                    content: "",
                },
            ],
        },

        certification: {
            title: "Certifications",
            hidden: false,
            columns: 1,
            icon: "",
            items: [],
        },
    },
    meta: {
        template: "classic",
        theme: {
            version: 1,
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
                subheading: 10.5,
                body: 10,
                meta: 9,
            },
            weight: {
                heading: 800,
                subheading: 700,
            },
            space: {
                sectionGap: 0,
                sectionGapAfter: 0,
                itemGap: 6,
            },
            border: {
                thickness: 0.5,
            },
            layout: {
                paper: "a4",
                margin: { x: 0.45, y: 0.4 },
            },
            lang: "en",
            leading: 1.5,
        },
        display: {
            hideLinkUnderline: false,
            hideIcons: false,
            hideSectionIcons: true,
        },
        layout: {
            pages: [
                {
                    main: ["summary", "experience", "project", "skill", "education", "certification"],
                },
            ],
        },
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

function filterValidItems<T extends z.ZodTypeAny>(schema: T, items: unknown[]): z.infer<T>[] {
    return items
        .map((item) => schema.safeParse(item))
        .filter((result) => result.success)
        .map((result) => result.data)
}

const convertJSObjectToTypst = ({ content }: { content: ResumeValues }) => {
    const projectItemsWithCleanLinks = content.sections.project.items.map((item) => ({
        ...item,
        links: filterValidItems(LinkSchema, item.links),
    }))

    const cleaned: ResumeValues = {
        ...content,
        basics: {
            ...content.basics,
            email: {
                ...content.basics.email,
                value: z.email().safeParse(content.basics.email.value).success ? content.basics.email.value : "",
            },
            customFields: filterValidItems(LinkSchema, content.basics.customFields),
        },
        sections: {
            ...content.sections,
            skill: {
                ...content.sections.skill,
                items: filterValidItems(SkillsItemSchema, content.sections.skill.items),
            },
            experience: {
                ...content.sections.experience,
                items: filterValidItems(ExperienceItemSchema, content.sections.experience.items),
            },
            project: {
                ...content.sections.project,
                items: filterValidItems(ProjectsItemSchema, projectItemsWithCleanLinks),
            },
            education: {
                ...content.sections.education,
                items: filterValidItems(EducationItemSchema, content.sections.education.items),
            },
            certification: {
                ...content.sections.certification,
                items: filterValidItems(CertificationsItemSchema, content.sections.certification.items),
            },
        },
    }

    const parsed = ResumeZodSchema.safeParse(cleaned)
    if (!parsed.success) {
        const issues = parsed.error.issues
            .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
            .join("\n")
        throw new Error(`Invalid resume data, cannot generate Typst source:\n${issues}`)
    }
    const { basics, sections, meta } = parsed.data

    const typstStringArray = (values: string[]) =>
        `(${values.map((v) => `"${escapeTypstString(v)}"`).join(", ")}${values.length === 1 ? "," : ""})`

    const pages = meta.layout.pages
        .map(
            (page) => `
            (
                main: ${typstStringArray(page.main)},
            ),`,
        )
        .join("")

    const customFields = basics.customFields
        .map(
            (field) => `
            (
                id: "${escapeTypstString(field.id)}",
                label: "${escapeTypstString(field.label)}",
                value: "${escapeTypstString(field.value)}",
            ),`,
        )
        .join("")

    const skillItems = sections.skill.items
        .map(
            (item) => `
            (
                id: "${escapeTypstString(item.id)}",
                hidden: ${item.hidden},
                icon: "${escapeTypstString(item.icon)}",
                name: "${escapeTypstString(item.name)}",
                proficiency: "${escapeTypstString(item.proficiency)}",
                level: ${item.level},
                keywords: ${typstStringArray(item.keywords)},
            ),`,
        )
        .join("")

    const experienceItems = sections.experience.items
        .map(
            (item) => `
            (
                id: "${escapeTypstString(item.id)}",
                hidden: ${item.hidden},
                company: "${escapeTypstString(item.company)}",
                position: "${escapeTypstString(item.position)}",
                location: "${escapeTypstString(item.location)}",
                start-date: "${escapeTypstString(item.startDate)}",
                end-date: "${escapeTypstString(item.endDate)}",
                website: (
                    hidden: ${item.website.hidden},
                    label: "${escapeTypstString(item.website.label)}",
                    value: "${escapeTypstString(item.website.value)}",
                ),
                content: [${item.content}],
            ),`,
        )
        .join("")

    const projectItems = sections.project.items
        .map(
            (item) => `
            (
                id: "${escapeTypstString(item.id)}",
                hidden: ${item.hidden},
                name: "${escapeTypstString(item.name)}",
                type: "${escapeTypstString(item.type)}",
                links: (${item.links
                    .map(
                        (link) => `
                    (
                        id: "${escapeTypstString(link.id)}",
                        label: "${escapeTypstString(link.label)}",
                        value: "${escapeTypstString(link.value)}",
                    ),`,
                    )
                    .join("")}
                ),
                keywords: ${typstStringArray(item.keywords)},
                start-date: "${escapeTypstString(item.startDate)}",
                end-date: "${escapeTypstString(item.endDate)}",
                content: [${item.content}],
            ),`,
        )
        .join("")

    const educationItems = sections.education.items
        .map(
            (item) => `
            (
                id: "${escapeTypstString(item.id)}",
                hidden: ${item.hidden},
                school: "${escapeTypstString(item.school)}",
                degree: "${escapeTypstString(item.degree)}",
                area: "${escapeTypstString(item.area)}",
                grade: "${escapeTypstString(item.grade)}",
                location: "${escapeTypstString(item.location)}",
                start-date: "${escapeTypstString(item.startDate)}",
                end-date: "${escapeTypstString(item.endDate)}",
                website: (
                    hidden: ${item.website.hidden},
                    label: "${escapeTypstString(item.website.label)}",
                    value: "${escapeTypstString(item.website.value)}",
                ),
                content: [${item.content}],
            ),`,
        )
        .join("")

    const certificationItems = sections.certification.items
        .map(
            (item) => `
            (
                id: "${escapeTypstString(item.id)}",
                hidden: ${item.hidden},
                title: "${escapeTypstString(item.title)}",
                issuer: "${escapeTypstString(item.issuer)}",
                date: "${escapeTypstString(item.date)}",
                website: (
                    hidden: ${item.website.hidden},
                    label: "${escapeTypstString(item.website.label)}",
                    value: "${escapeTypstString(item.website.value)}",
                ),
                content: [${item.content}],
            ),`,
        )
        .join("")

    return `
#let content = (
    basics: (
        name: "${escapeTypstString(basics.name)}",
        headline: "${escapeTypstString(basics.headline)}",
        email: (
            hidden: ${basics.email.hidden},
            label: "${escapeTypstString(basics.email.label)}",
            value: "${escapeTypstString(basics.email.value)}",
        ),
        phone: (
            hidden: ${basics.phone.hidden},
            label: "${escapeTypstString(basics.phone.label)}",
            value: "${escapeTypstString(basics.phone.value)}",
        ),
        location: "${escapeTypstString(basics.location)}",
        website: (
            hidden: ${basics.website.hidden},
            label: "${escapeTypstString(basics.website.label)}",
            value: "${escapeTypstString(basics.website.value)}",
        ),
        custom-fields: (${customFields}
        ),
    ),
    sections: (
        summary: (
            title: "${escapeTypstString(sections.summary.title)}",
            hidden: ${sections.summary.hidden},
            columns: ${sections.summary.columns},
            icon: "${escapeTypstString(sections.summary.icon)}",
            has-content: ${Boolean(sections.summary.content)},
            content: [${sections.summary.content}],
        ),
        skill: (
            title: "${escapeTypstString(sections.skill.title)}",
            hidden: ${sections.skill.hidden},
            columns: ${sections.skill.columns},
            icon: "${escapeTypstString(sections.skill.icon)}",
            items: (${skillItems}
            ),
        ),
        experience: (
            title: "${escapeTypstString(sections.experience.title)}",
            hidden: ${sections.experience.hidden},
            columns: ${sections.experience.columns},
            icon: "${escapeTypstString(sections.experience.icon)}",
            items: (${experienceItems}
            ),
        ),
        project: (
            title: "${escapeTypstString(sections.project.title)}",
            hidden: ${sections.project.hidden},
            columns: ${sections.project.columns},
            icon: "${escapeTypstString(sections.project.icon)}",
            items: (${projectItems}
            ),
        ),
        education: (
            title: "${escapeTypstString(sections.education.title)}",
            hidden: ${sections.education.hidden},
            columns: ${sections.education.columns},
            icon: "${escapeTypstString(sections.education.icon)}",
            items: (${educationItems}
            ),
        ),
        certification: (
            title: "${escapeTypstString(sections.certification.title)}",
            hidden: ${sections.certification.hidden},
            columns: ${sections.certification.columns},
            icon: "${escapeTypstString(sections.certification.icon)}",
            items: (${certificationItems}
            ),
        ),
    ),
    meta: (
        template: "${escapeTypstString(meta.template)}",
        theme: (
            version: ${meta.theme.version},
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
        layout: (
            pages: (${pages}
            ),
        ),
    ),
)
`
}

const buildTypstSource = ({ content }: { content: ResumeValues }) =>
    `${convertJSObjectToTypst({ content })}\n${TYPST_TEMPLATE}`

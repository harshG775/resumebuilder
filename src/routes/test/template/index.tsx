import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useRef, useState } from "react"
import { $typst } from "@myriaddreamin/typst.ts"
import type { TypstSnippet } from "@myriaddreamin/typst.ts/dist/esm/contrib/snippet.mjs"
import rendererWasmUrl from "@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm?url"
import compilerWasmUrl from "@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm?url"
import { useQuery } from "@tanstack/react-query"
import type { ResumeValues } from "#/modules/resume/schema/resume.zod-schema"

export const Route = createFileRoute("/test/template/")({
    component: RouteComponent,
})

// ---------------------------------------------------------------------------------------------------------------------

function escapeTypstMarkup(text: string): string {
    return text.replace(/[\\#*_$`<>@[\]]/g, (ch) => `\\${ch}`)
}

function escapeTypstString(text: string): string {
    return text.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
}

const createResume = ({ content }: { content: ResumeValues }) => {
    const resume = `
#let theme = (
    color: (
        text: rgb("${content.meta.theme.color.text}"),
        text-muted: rgb("${content.meta.theme.color.textMuted}"),
        primary: rgb("${content.meta.theme.color.primary}"),
        background: rgb("${content.meta.theme.color.background}"),
        border: rgb("${content.meta.theme.color.border}"),
    ),
    font: (
        body: "${escapeTypstString(content.meta.theme.font.body)}",
        heading: "${escapeTypstString(content.meta.theme.font.heading)}",
    ),
    size: (
        name: ${content.meta.theme.size.name}pt,
        heading: ${content.meta.theme.size.heading}pt,
        subheading: ${content.meta.theme.size.subheading}pt,
        body: ${content.meta.theme.size.body}pt,
        meta: ${content.meta.theme.size.meta}pt,
    ),
    weight: (
        heading: ${content.meta.theme.weight.heading},
        subheading: ${content.meta.theme.weight.subheading},
    ),
    space: (section-gap: ${content.meta.theme.space.sectionGap}pt, section-gap-after: ${content.meta.theme.space.sectionGapAfter}pt, item-gap: ${content.meta.theme.space.itemGap}pt),
    border: (thickness: ${content.meta.theme.border.thickness}pt),
    layout: (
        paper: "${content.meta.theme.layout.paper}",
        margin: (x: ${content.meta.theme.layout.margin.x}in, y: ${content.meta.theme.layout.margin.y}in),
    ),
    lang: "${escapeTypstString(content.meta.theme.lang)}",
    leading: ${content.meta.theme.leading},
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

    body
}


#let row(left-content: none, right-content: none) = [#left-content #h(1fr) #right-content]

#let dash = "-"
#let date-range(start: "", end: "", sep: "-") = start + " " + sep + " " + end

#let meta-text(body) = text(size: theme.size.meta, fill: theme.color.text-muted)[#body]
#let subheading-text(body) = text(size: theme.size.subheading, weight: theme.weight.subheading)[#body]

#let contact-line(items: ()) = pad(top: 4pt)[#meta-text(items.filter(x => x != none and x != "").join("  |  "))]
#let link-item(label, url) = link(url)[#label]
#let email-item(address) = link("mailto:" + address)[#address]

#let work(title: "", company: "", location: "", start: "", end: "") = block(breakable: false, width: 100%)[
    #row(
        left-content: [
            #subheading-text(title)
            #if company != "" [ #text(fill: theme.color.text-muted)[· #company]]
            #if location != "" [ #text(fill: theme.color.text-muted)[· #location]]
        ],
        right-content: meta-text(date-range(start: start, end: end)),
    )
]

#let edu(institution: "", degree: "", location: "", start: "", end: "") = block(breakable: false, width: 100%)[
    #row(
        left-content: [
            #subheading-text(degree)
            #if institution != "" [ #text(fill: theme.color.text-muted)[· #institution]]
            #if location != "" [ #text(fill: theme.color.text-muted)[· #location]]
        ],
        right-content: meta-text(date-range(start: start, end: end)),
    )
]

#let skills(items: ()) = items.join(", ")


`
    const contactItems: string[] = []
    if (content.basics.location) {
        contactItems.push(`"${escapeTypstString(content.basics.location)}"`)
    }
    if (!content.basics.email.hidden && content.basics.email.value) {
        contactItems.push(`email-item("${escapeTypstString(content.basics.email.value)}")`)
    }
    if (!content.basics.phone.hidden && content.basics.phone.value) {
        contactItems.push(
            `link("tel:${escapeTypstString(content.basics.phone.value)}")[${escapeTypstMarkup(content.basics.phone.label)}]`,
        )
    }
    if (!content.basics.website.hidden && content.basics.website.value) {
        contactItems.push(
            `link-item("${escapeTypstString(content.basics.website.label)}", "${escapeTypstString(content.basics.website.value)}")`,
        )
    }
    for (const cf of content.basics.customFields) {
        if (cf.value) {
            contactItems.push(`link-item("${escapeTypstString(cf.label)}", "${escapeTypstString(cf.value)}")`)
        }
    }

    const basics = `
= ${escapeTypstMarkup(content.basics.name)}
${
    content.basics.headline
        ? `#text(size: theme.size.subheading, weight: theme.weight.subheading, fill: theme.color.primary)[${escapeTypstMarkup(content.basics.headline)}]`
        : ""
}

#contact-line(items: (
    ${contactItems.join(",\n    ")}${contactItems.length > 0 ? "," : ""}
))
    `

    const summary =
        content.sections.summary.hidden || !content.sections.summary.content
            ? ""
            : `
== ${escapeTypstMarkup(content.sections.summary.title)}
${content.sections.summary.content}
    `

    const experience =
        content.sections.experience.hidden || content.sections.experience.items.length === 0
            ? ""
            : `
== ${escapeTypstMarkup(content.sections.experience.title)}
${content.sections.experience.items
    .filter((item) => !item.hidden)
    .map(
        (item) => `
#work(
    title: "${escapeTypstString(item.position)}",
    company: "${escapeTypstString(item.company)}",
    location: "${escapeTypstString(item.location)}",
    start: "${escapeTypstString(item.startDate)}",
    end: "${escapeTypstString(item.endDate)}",
)
${item.content}
#v(theme.space.item-gap)
    `,
    )
    .join("\n")}
    `

    const project =
        content.sections.project.hidden || content.sections.project.items.length === 0
            ? ""
            : `
== ${escapeTypstMarkup(content.sections.project.title)}
${content.sections.project.items
    .filter((item) => !item.hidden)
    .map((item) => {
        const links = item.links.filter((l) => l.value)
        const linksTypst =
            links.length > 0
                ? `(${links.map((l) => `#link-item("${escapeTypstString(l.label)}", "${escapeTypstString(l.value)}")`).join(", ")})`
                : ""
        const keywords = item.keywords.filter((k) => k)
        return `
#row(
    left-content: [
        #subheading-text("${escapeTypstString(item.name)}")
        ${linksTypst}
    ],
    right-content: meta-text(date-range(start: "${escapeTypstString(item.startDate)}", end: "${escapeTypstString(item.endDate)}")),
)
${keywords.length > 0 ? `#meta-text("${escapeTypstString(keywords.join(", "))}")` : ""}
${item.content}
#v(theme.space.item-gap)
    `
    })
    .join("\n")}
    `

    const skill =
        content.sections.skill.hidden || content.sections.skill.items.length === 0
            ? ""
            : `
== ${escapeTypstMarkup(content.sections.skill.title)}
${content.sections.skill.items
    .filter((item) => !item.hidden)
    .map(
        (item) =>
            `#text(weight: theme.weight.subheading)[${escapeTypstMarkup(item.name)}:] #skills(items: (${item.keywords.map((k) => `"${escapeTypstString(k)}"`).join(", ")}))`,
    )
    .join("\n")}
    `

    const education =
        content.sections.education.hidden || content.sections.education.items.length === 0
            ? ""
            : `
== ${escapeTypstMarkup(content.sections.education.title)}
${content.sections.education.items
    .filter((item) => !item.hidden)
    .map(
        (item) => `
#edu(
    institution: "${escapeTypstString(item.school)}",
    degree: "${escapeTypstString(item.degree)}",
    location: "${escapeTypstString(item.location)}",
    start: "${escapeTypstString(item.startDate)}",
    end: "${escapeTypstString(item.endDate)}",
)
${item.content}
#v(theme.space.item-gap)
    `,
    )
    .join("\n")}
    `

    const certification =
        content.sections.certification.hidden || content.sections.certification.items.length === 0
            ? ""
            : `
== ${escapeTypstMarkup(content.sections.certification.title)}
${content.sections.certification.items
    .filter((item) => !item.hidden)
    .map(
        (item) => `
#row(
    left-content: [#subheading-text("${escapeTypstString(item.title)}")${item.issuer ? ` #text(fill: theme.color.text-muted)[· ${escapeTypstMarkup(item.issuer)}]` : ""}],
    right-content: meta-text("${escapeTypstString(item.date)}"),
)
${item.content}
#v(theme.space.item-gap)
    `,
    )
    .join("\n")}
    `

    return `
${resume}
// ---------------------------------------------------------------------------------------------------------------------
#show: resume.with(title: "${escapeTypstString(content.basics.name)}", author: "${escapeTypstString(content.basics.name)}")

${basics}
${summary}
${experience}
${project}
${skill}
${education}
${certification}
    `
}

// ---------------------------------------------------------------------------------------------------------------------

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
                mainContent: createResume({
                    content: {
                        basics: {
                            name: "Alex Morgan",
                            headline: "Senior Software Engineer",

                            email: {
                                hidden: false,
                                label: "alex@example.com",
                                value: "alex@example.com",
                            },

                            phone: {
                                hidden: false,
                                label: "(555) 123-4567",
                                value: "+15551234567",
                            },

                            location: "San Francisco, CA",

                            website: {
                                hidden: false,
                                label: "",
                                value: "",
                            },

                            customFields: [
                                {
                                    id: crypto.randomUUID(),
                                    label: "github.com/alexmorgan",
                                    value: "https://github.com/alexmorgan",
                                },
                                {
                                    id: crypto.randomUUID(),
                                    label: "linkedin.com/in/alexmorgan",
                                    value: "https://linkedin.com/in/alexmorgan",
                                },
                            ],
                        },

                        sections: {
                            summary: {
                                title: "Summary",
                                hidden: false,
                                columns: 1,
                                icon: "",
                                content: `Software engineer with #strong[6+ years of experience] designing and shipping #strong[web applications] used by millions of people. Specializes in #strong[React], #strong[TypeScript], and #strong[distributed systems], with a track record of leading small teams from idea to production. Passionate about #strong[developer experience], #strong[performance], and building products people enjoy using.`,
                            },

                            skill: {
                                title: "Skills",
                                hidden: false,
                                columns: 1,
                                icon: "",

                                items: [
                                    {
                                        id: crypto.randomUUID(),
                                        hidden: false,
                                        icon: "",
                                        name: "Languages",
                                        proficiency: "",
                                        level: 5,
                                        keywords: ["TypeScript", "JavaScript", "Python", "Go"],
                                    },
                                    {
                                        id: crypto.randomUUID(),
                                        hidden: false,
                                        icon: "",
                                        name: "Frontend",
                                        proficiency: "",
                                        level: 5,
                                        keywords: ["React", "Next.js", "Redux", "Tailwind CSS", "GraphQL"],
                                    },
                                    {
                                        id: crypto.randomUUID(),
                                        hidden: false,
                                        icon: "",
                                        name: "Backend",
                                        proficiency: "",
                                        level: 4,
                                        keywords: ["Node.js", "PostgreSQL", "Redis", "REST APIs"],
                                    },
                                    {
                                        id: crypto.randomUUID(),
                                        hidden: false,
                                        icon: "",
                                        name: "Infrastructure",
                                        proficiency: "",
                                        level: 4,
                                        keywords: ["AWS", "Docker", "Kubernetes", "CI/CD"],
                                    },
                                    {
                                        id: crypto.randomUUID(),
                                        hidden: false,
                                        icon: "",
                                        name: "Practices",
                                        proficiency: "",
                                        level: 4,
                                        keywords: ["Agile", "Code Review", "Mentoring", "System Design"],
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
                                        company: "Nimbus Cloud",
                                        position: "Senior Software Engineer",
                                        location: "San Francisco, CA",
                                        startDate: "Mar 2022",
                                        endDate: "Present",
                                        website: {
                                            hidden: true,
                                            label: "",
                                            value: "",
                                        },
                                        content: `- Led the rebuild of the #strong[customer dashboard] in #strong[Next.js] and #strong[TypeScript], improving page load times by #strong[45%] and cutting bug reports by #strong[30%].

- Designed and shipped a #strong[real-time collaboration feature] used by over #strong[200,000 monthly active users], built on #strong[WebSockets] and #strong[CRDTs].

- Mentored #strong[4 junior engineers] and introduced a peer code-review process that raised release confidence across the team.`,
                                    },

                                    {
                                        id: crypto.randomUUID(),
                                        hidden: false,
                                        company: "Brightline Labs",
                                        position: "Software Engineer",
                                        location: "Austin, TX",
                                        startDate: "Jul 2019",
                                        endDate: "Feb 2022",
                                        website: {
                                            hidden: true,
                                            label: "",
                                            value: "",
                                        },
                                        content: `- Built and maintained #strong[core billing infrastructure] processing #strong[\\$2M+ in monthly transactions] with #strong[99.99% uptime].

- Migrated a monolithic #strong[Express] API to a #strong[microservices architecture], reducing average response time by #strong[35%].

- Partnered with design to launch a #strong[self-serve onboarding flow], increasing trial-to-paid conversion by #strong[18%].`,
                                    },

                                    {
                                        id: crypto.randomUUID(),
                                        hidden: false,
                                        company: "Fieldstone Digital",
                                        position: "Junior Developer",
                                        location: "Remote",
                                        startDate: "Jun 2018",
                                        endDate: "Jun 2019",
                                        website: {
                                            hidden: true,
                                            label: "",
                                            value: "",
                                        },
                                        content: `- Developed responsive marketing sites for #strong[10+ clients] using #strong[React] and #strong[Sass].

- Set up automated #strong[testing] and #strong[deployment pipelines], cutting release time from days to hours.`,
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
                                        name: "OpenBoard",
                                        type: "open-source",
                                        links: [],
                                        keywords: ["React", "TypeScript", "WebRTC", "Node.js"],
                                        startDate: "",
                                        endDate: "",
                                        content: `- Built an #strong[open-source collaborative whiteboard] with real-time cursors and drawing sync, used by #strong[1,200+ stars] on GitHub.

- Implemented #strong[conflict-free replicated data types (CRDTs)] to support offline editing and multi-user sync.`,
                                    },

                                    {
                                        id: crypto.randomUUID(),
                                        hidden: false,
                                        name: "Recipe Vault",
                                        type: "personal",
                                        links: [],
                                        keywords: ["Next.js", "PostgreSQL", "Tailwind CSS"],
                                        startDate: "",
                                        endDate: "",
                                        content: `- Designed and built a #strong[personal recipe manager] with search, tagging, and meal planning.

- Deployed on #strong[Vercel] with a #strong[Postgres] backend, supporting image uploads and full-text search.`,
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
                                        school: "University of Texas at Austin",
                                        degree: "B.S. Computer Science",
                                        area: "",
                                        grade: "",
                                        location: "",
                                        startDate: "2014",
                                        endDate: "2018",
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
                                items: [
                                    {
                                        id: crypto.randomUUID(),
                                        hidden: false,
                                        title: "AWS Certified Solutions Architect – Associate",
                                        issuer: "Amazon Web Services",
                                        date: "2023",
                                        website: {
                                            hidden: true,
                                            label: "",
                                            value: "",
                                        },
                                        content: "",
                                    },
                                ],
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
                                    sectionGap: 12,
                                    sectionGapAfter: 2,
                                    itemGap: 6,
                                },
                                border: {
                                    thickness: 0.5,
                                },
                                layout: {
                                    paper: "a4",
                                    margin: { x: 0.5, y: 0.4 },
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
                                        main: [
                                            "summary",
                                            "experience",
                                            "project",
                                            "skill",
                                            "education",
                                            "certification",
                                        ],
                                    },
                                ],
                            },
                        },
                    },
                }),
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

import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useRef, useState } from "react"
import { $typst } from "@myriaddreamin/typst.ts"
import type { TypstSnippet } from "@myriaddreamin/typst.ts/dist/esm/contrib/snippet.mjs"
import rendererWasmUrl from "@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm?url"
import compilerWasmUrl from "@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm?url"
import { useQuery } from "@tanstack/react-query"
import { ResumeZodSchema } from "#/modules/resume/schema/resume.zod-schema"
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
    set par(justify: false, leading: theme.leading)

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


`
    const basics = `

    `
    const summary = `

    `
    const skill = `

    `
    const experience = `

    `
    const project = `

    `
    const education = `

    `
    const certification = `

    `
    return `
${resume}
// ---------------------------------------------------------------------------------------------------------------------
${basics}
    
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
                            name: "",
                            headline: "",
                            email: { hidden: false, label: "", value: "" },
                            phone: { hidden: false, label: "", value: "" },
                            location: "",
                            website: { hidden: false, value: "", label: "" },
                            customFields: [],
                        },
                        sections: {
                            summary: { title: "Summary", hidden: false, columns: 1, icon: "", content: "" },
                            skill: { title: "Skills", hidden: false, columns: 1, icon: "", items: [] },
                            experience: { title: "Experience", hidden: false, columns: 1, icon: "", items: [] },
                            project: { title: "Projects", hidden: false, columns: 1, icon: "", items: [] },
                            education: { title: "Education", hidden: false, columns: 1, icon: "", items: [] },
                            certification: { title: "Certifications", hidden: false, columns: 1, icon: "", items: [] },
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
                                    heading: "New Computer Modern",
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
                                    margin: { x: 40, y: 34 },
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

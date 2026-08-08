import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useRef, useState } from "react"
import { $typst } from "@myriaddreamin/typst.ts"
import type { TypstSnippet } from "@myriaddreamin/typst.ts/dist/esm/contrib/snippet.mjs"
import rendererWasmUrl from "@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm?url"
import compilerWasmUrl from "@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm?url"
import { useQuery } from "@tanstack/react-query"
import type { ResumeValues } from "#/modules/resume/schema/resume.zod-schema"
import { getResumeDefaults } from "#/modules/resume/data/resume-default-values"
import { buildClassicSource } from "#/modules/resume/templates/classic/build-source"

export const Route = createFileRoute("/test/template/")({
    component: RouteComponent,
})

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

    console.log(JSON.stringify(getResumeDefaults(), null, 4))

    const render = async () => {
        const container = containerRef.current
        if (!container) return

        try {
            const result = await typst.svg({
                mainContent: buildClassicSource(SAMPLE_RESUME),
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

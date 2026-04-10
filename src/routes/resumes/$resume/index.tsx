import { createFileRoute } from "@tanstack/react-router"
import { basicConfig } from "./-components/configs/basic"
import { Render, type Data } from "./-components/render"

export const Route = createFileRoute("/resumes/$resume/")({
    ssr: false,
    component: RouteComponent,
})

const resumeData: Data = {
    head: {
        props: {
            title: "Harsh_Gaur_Software_Engineer_Resume",
            description: "Harsh Gaur - Software Engineer specializing in React, Next.js, TanStack, and SaaS platforms.",
        },
    },

    content: [
        {
            id: "basics",
            type: "basics",
            order: 0,
            props: {
                name: "Harsh Gaur",
                headline: "Software Engineer | React, Next.js, Tanstack, TypeScript | SaaS Platforms",
                email: "hgaur491@gmail.com",
                phone: "(+91) 9310745921",
                location: "Delhi, India",
                links: [
                    {
                        id: "link-1",
                        order: 0,
                        label: "github.com/harshG775",
                        url: "https://github.com/harshG775",
                    },
                    {
                        id: "link-2",
                        order: 1,
                        label: "linkedin.com/in/harshg775",
                        url: "https://linkedin.com/in/harshg775",
                    },
                    {
                        id: "link-3",
                        order: 1,
                        label: "harshgaur.in",
                        url: "https://www.harshgaur.in",
                    },
                ],
            },
        },

        {
            id: "summary",
            type: "summary",
            order: 1,
            props: {
                points: [
                    `Software Engineer with 2+ years building production web applications and multi-tenant SaaS platforms using React, Next.js, TypeScript, and Node.js. Proven track record: reduced tenant onboarding time by ~70%, architected AI-powered customer support platform, and eliminated third-party tooling costs (~₹2L/year savings). Expert in component architecture, real-time API integration, and full-stack TypeScript workflows.`,
                ],
            },
        },

        {
            id: "skills",
            type: "skills",
            order: 2,
            props: {
                groups: [
                    {
                        id: "skill-group-1",
                        order: 1,
                        title: "Languages",
                        items: ["TypeScript", "Javascript (ES2022+)", "Python"],
                    },
                    {
                        id: "skill-group-2",
                        order: 2,
                        title: "Frontend",
                        items: [
                            "React",
                            "Next.js",
                            "TanStack (Query, Router, Start)",
                            "Zustand",
                            "Tailwind CSS",
                            "ShadCN UI",
                        ],
                    },
                    {
                        id: "skill-group-3",
                        order: 3,
                        title: "Backend",
                        items: ["Node.js", "Express.js", "Flask", "OpenAI API"],
                    },
                    {
                        id: "skill-group-4",
                        order: 4,
                        title: "Database",
                        items: ["MongoDB", "PostgreSQL", "Prisma"],
                    },
                    {
                        id: "skill-group-5",
                        order: 5,
                        title: "Tools & Systems",
                        items: ["Git", "Docker", "Linux", "Postman"],
                    },
                ],
            },
        },

        {
            id: "experience",
            type: "experience",
            order: 3,
            props: {
                items: [
                    {
                        id: "exp-1",
                        order: 0,
                        title: "Senior Frontend Engineer",
                        organization: "Prabhubhakti Pvt. Ltd.",
                        location: "Gurugram",
                        startDate: "2025-06-01",
                        endDate: null,
                        links: [
                            {
                                id: "exp-link-1",
                                label: "learn.prabhubhakti.io",
                                url: "https://learn.prabhubhakti.io",
                            },
                        ],
                        points: [
                            "Architected three multi-tenant SaaS platforms (Astrologer, Temple Management, Ebook) with domain/subdomain-based tenant isolation, per-tenant UI theming, and Next.js middleware routing.",
                            "Built reusable React/TypeScript components for booking and payment flows with unified payment gateway (prabhubhakti.io) integrated via Razorpay—deployed across all tenant platforms, reducing per-tenant integration time by ~70%.",
                            "Standardized tenant onboarding templates in Next.js with TanStack Router, enabling rapid feature rollout across tenants.",
                        ],
                    },
                    {
                        id: "exp-2",
                        order: 1,
                        title: "Frontend Engineer (SDE Trainee)",
                        organization: "Metis Eduventures Pvt. Ltd. (Adda247)",
                        location: "Gurugram",
                        startDate: "2024-08-01",
                        endDate: "2025-02-01",
                        links: [
                            {
                                id: "exp-link-3",
                                label: "adda247.com",
                                url: "https://adda247.com",
                            },
                        ],
                        points: [
                            "Built SupportDesk, an AI customer support platform with real-time agent-to-human handover using WebSockets and OpenAI API integration, eliminating third-party tooling and saving ~₹2L/year.",
                            "Developed AiDoubtSolver, an academic AI chatbot with voice-to-voice chat using Whisper API, browser Camera API, and real-time streaming responses via SSE, supporting 150+ concurrent users with optimized state management and minimal re-renders.",
                            "Improved application performance by ~25% through bundle analysis, route-based code splitting, and memoization strategies.",
                        ],
                    },
                    {
                        id: "exp-3",
                        order: 2,
                        title: "Frontend Developer Internship",
                        organization: "ItaxEasy",
                        location: "Gwalior (Remote)",
                        startDate: "2023-11-01",
                        endDate: "2024-05-01",
                        links: [
                            {
                                id: "exp-link-4",
                                label: "itaxeasy.com",
                                url: "https://itaxeasy.com",
                            },
                        ],
                        points: [
                            "Migrated legacy tax-filing platform from React.js to Next.js App Router, enabling SSR for improved SEO and faster content delivery.",
                            "Optimized performance through route-based code splitting and lazy loading strategies.",
                        ],
                    },
                ],
            },
        },

        {
            id: "projects",
            type: "projects",
            order: 4,
            props: {
                items: [
                    {
                        id: "proj-3",
                        order: 0,
                        title: "Astrologer SaaS Platform",
                        organization: "Prabhubhakti",
                        stack: ["Next.js", "TypeScript", "TanStack Start", "TanStack Router", "Node.js", "Razorpay"],
                        links: [
                            {
                                id: "proj-link-1",
                                label: "demo.prabhubhakti.io",
                                url: "https://demo.prabhubhakti.io",
                            },

                            {
                                id: "proj-link-2",
                                label: "github.com/harshG775/tanstack-start-multi-tenant-example",
                                url: "https://github.com/harshG775/tanstack-start-multi-tenant-example",
                            },
                        ],
                        points: [
                            "Architected multi-tenant platform supporting domain/subdomain-based tenant isolation with per-tenant UI and routing.",
                            "Built reusable booking and Razorpay payment flows with unified payment gateway (prabhubhakti.io) for all tenant platforms, reducing per-tenant integration time by ~70%.",
                            "Standardized tenant onboarding templates in Next.js with TanStack Router, enabling rapid feature rollout across tenants.",
                        ],
                    },
                    {
                        id: "proj-2",
                        order: 1,
                        title: "SupportDesk - AI Customer Support Platform",
                        organization: "Adda247",
                        stack: ["React", "Zustand", "Flask", "WebSockets", "OpenAI API"],
                        links: [
                            {
                                id: "proj-link-1",
                                label: "supportdesk.adda247.com",
                                url: "https://supportdesk.adda247.com/",
                            },
                        ],
                        points: [
                            "Built real-time chat system with seamless AI-to-human handover using React, WebSockets, and OpenAI API integration.",
                            "Eliminated third-party support platform dependency, saving ~₹2L/year in licensing costs.",
                        ],
                    },
                    {
                        id: "proj-1",
                        order: 2,
                        title: "AiDoubtSolver - Voice AI Chatbot",
                        organization: "Adda247",
                        stack: ["React", "SSE", "Whisper API"],
                        links: [
                            {
                                id: "proj-link-2",
                                label: "aidoubtsolverdev.adda247.com",
                                url: "https://aidoubtsolverdev.adda247.com/",
                            },
                        ],
                        points: [
                            "Implemented voice-to-voice doubt solving pipeline using Whisper API with real-time streaming responses via SSE.",
                            "Supported 150+ concurrent users with optimized state management and minimal re-renders.",
                            "Designed stateful conversation flow in React with optimistic UI updates for perceived responsiveness.",
                        ],
                    },
                ],
            },
        },

        {
            id: "education",
            type: "education",
            order: 5,
            props: {
                items: [
                    {
                        id: "edu-1",
                        order: 0,
                        title: "Master of Computer Applications (MCA)",
                        organization: "Indira Gandhi National Open University (IGNOU)",
                        startDate: "2025",
                        endDate: null,
                    },
                    {
                        id: "edu-2",
                        order: 1,
                        title: "Bachelor of Arts (English Honours)",
                        organization: "Prof. Rajendra Singh University",
                        startDate: "2020",
                        endDate: "2023",
                    },
                ],
            },
        },
    ],
}
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { Button } from "#/components/ui/button"
import { useRef } from "react"
import Editor from "./-components/Editor"

function RouteComponent() {
    const ref = useRef<HTMLDivElement | null>(null)
    const handlePrint = () => {
        const content = ref.current
        if (!content) return

        const printWindow = window.open("/", "_blank")
        if (!printWindow) return

        const styles = Array.from(document.styleSheets)
            .map((sheet) => {
                try {
                    return Array.from(sheet.cssRules)
                        .map((rule) => rule.cssText)
                        .join("\n")
                } catch {
                    return ""
                }
            })
            .join("\n")

        printWindow.document.write(`
        <html>
            <head>
                <title>Harsh_Gaur_Resume</title>
                <style>${styles}</style>
            </head>
            <body>
                ${content.innerHTML}
            </body>
        </html>
    `)
        printWindow.document.close()
        printWindow.focus()
        printWindow.print()
        printWindow.close()
    }
    return (
        <div className="flex h-screen">
            <div className="w-96 min-w-96 overflow-auto">
                <Editor />
            </div>
            <TransformWrapper initialScale={1} minScale={0.5} maxScale={2} limitToBounds={false} centerOnInit={true}>
                <TransformComponent>
                    <div className=" h-screen w-screen">
                        <div className="relative w-[8.5in]  mx-auto  bg-white text-black ">
                            <div className="w-[8.5in] h-[11in] absolute left-0 top-0 border-2 border-dashed pointer-events-none"></div>
                            <div ref={ref}>
                                <main
                                    className="bg-zinc-50 text-zinc-950 p-4"
                                    style={{ fontFamily: `'Inter', sans-serif` }}
                                >
                                    <Render config={basicConfig} data={resumeData} />
                                </main>
                            </div>
                        </div>
                    </div>
                </TransformComponent>
            </TransformWrapper>
            <div className="fixed bottom-4 right-4 ring-4">
                <Button onClick={handlePrint}>handlePrint</Button>
            </div>
        </div>
    )
}

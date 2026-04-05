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
            title: "Harsh_Gaur_Frontend_Engineer_Resume",
            description: "Harsh Gaur - Frontend Engineer specializing in React, Next.js, TanStack, and SaaS platforms.",
        },
    },

    content: [
        {
            id: "basics",
            type: "basics",
            order: 0,
            props: {
                name: "Harsh Gaur",
                headline: "Frontend Engineer | React · Next.js ·Tanstack · TypeScript | SaaS Platforms",
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
                    "Frontend Engineer with 2+ years building multi-tenant SaaS platforms and AI-powered apps using React, Next.js, TypeScript, and TanStack. Focused on performance, clean architecture, and scalable UI systems.",
                ],
            },
        },

        {
            id: "experience",
            type: "experience",
            order: 2,
            props: {
                items: [
                    {
                        id: "exp-1",
                        order: 0,
                        title: "Frontend Developer",
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
                            "Developed and maintained multi-tenant SaaS platforms (Astrologer, Temple, Ebook systems) with domain/subdomain routing",
                            "Built high-performance UI using Next.js, TypeScript, Tailwind CSS, and ShadCN with focus on scalability and reusability.",
                            "Implemented booking, payment (Razorpay), and wallet systems on Frontend used across multiple tenant platforms.",
                            "Reduced onboarding time by ~70%",
                        ],
                    },
                    {
                        id: "exp-2",
                        order: 1,
                        title: "Frontend Developer SDE Trainee",
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
                            "Built AI-powered chatbot features using React, Zustand, and OpenAI APIs.",
                            "Developed real-time communication features using SSE/WebSockets.",
                            "Improved application performance resulting in ~25% faster load times.",
                        ],
                    },
                    {
                        id: "exp-3",
                        order: 2,
                        title: "Frontend Developer",
                        organization: "ItaxEasy",
                        location: "Remote",
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
                            "Migrated from React.js to Next.js adding better SEO and Revamped UI of a legacy tax-filing platform using React.js and Tailwind CSS",
                            "Implemented route-based code splitting and lazy loading for performance optimization.",
                        ],
                    },
                ],
            },
        },

        {
            id: "projects",
            type: "projects",
            order: 3,
            props: {
                items: [
                    {
                        id: "proj-3",
                        order: 0,
                        title: "Astrologer SaaS Platform",
                        organization: "Prabhubhakti",
                        stack: [
                            "Next.js",
                            "TypeScript",
                            "TanStack Start",
                            "TanStack Router",
                            "Node.js",
                            "Razorpay",
                        ],
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
                            "Architected a multi-tenant astrologer platform supporting domain/subdomain-based tenant isolation with per-tenant UI and routing.",
                            "Built end-to-end booking and Razorpay payment flows reused across multiple tenant platforms, reducing per-tenant dev time by ~70%.",
                            "Standardized tenant onboarding templates in Next.js with TanStack Router, enabling faster feature rollout across tenants.",
                        ],
                    },
                    {
                        id: "proj-1",
                        order: 1,
                        title: "SupportDesk - AI Customer Support Platform",
                        organization: "Adda247",
                        stack: [
                            "React",
                            "Zustand",
                            "Flask",
                            "WebSockets",
                            "OpenAI API",
                        ],
                        links: [
                            {
                                id: "proj-link-1",
                                label: "supportdesk.adda247.com",
                                url: "https://supportdesk.adda247.com/",
                            },
                        ],
                        points: [
                            "Built a real-time chat system with seamless AI-to-human handover using WebSockets and OpenAI API.",
                            "Replaced third-party support tooling entirely, saving ~₹2L/year in licensing costs.",
                            "Managed global chat state with Zustand across agent dashboard, user widget, and admin panel.",
                        ],
                    },
                    {
                        id: "proj-2",
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
                            "Implemented voice-to-voice doubt solving pipeline using Whisper API with streaming responses over SSE.",
                            "Handled 150+ concurrent sessions with low-latency UI updates and minimal re-renders.",
                            "Designed stateful conversation flow in React with optimistic UI for perceived responsiveness.",
                        ],
                    },
                ],
            },
        },

        {
            id: "skills",
            type: "skills",
            order: 4,
            props: {
                groups: [
                    {
                        id: "skill-group-1",
                        order: 0,
                        title: "Frontend",
                        items: [
                            "React",
                            "Next.js",
                            "TypeScript",
                            "TanStack (Query, Router)",
                            "Zustand",
                            "Tailwind CSS",
                            "ShadCN UI",
                        ],
                    },
                    {
                        id: "skill-group-2",
                        order: 1,
                        title: "Backend",
                        items: ["Node.js", "Express.js", "Flask"],
                    },
                    {
                        id: "skill-group-3",
                        order: 2,
                        title: "Database",
                        items: ["MongoDB", "PostgreSQL", "Prisma"],
                    },
                    {
                        id: "skill-group-4",
                        order: 3,
                        title: "Tools & Systems",
                        items: ["Git", "Docker", "Postman", "Linux", "pnpm"],
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
                        organization:
                            "Indira Gandhi National Open University (IGNOU)",
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

        const printWindow = window.open("", "_blank")
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
            <TransformWrapper
                initialScale={1}
                minScale={0.5}
                maxScale={2}
                limitToBounds={false}
                centerOnInit={true}
            >
                <TransformComponent>
                    <div className=" h-screen w-screen">
                        <div className="relative w-[8.5in]  mx-auto  bg-white text-black ">
                            <div className="w-[8.5in] h-[11in] absolute left-0 top-0 border-2 border-dashed pointer-events-none"></div>
                            <div ref={ref}>
                                <main className="bg-zinc-50 text-zinc-950 p-4">
                                    <Render
                                        config={basicConfig}
                                        data={resumeData}
                                    />
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

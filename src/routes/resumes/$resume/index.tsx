import { createFileRoute } from "@tanstack/react-router"
import { basicConfig, type ResumeDataType } from "./-components/configs/basic"

export const Route = createFileRoute("/resumes/$resume/")({
    component: RouteComponent,
})

const resumeData: ResumeDataType = {
    metadata: {
        title: "Harsh_Gaur_Frontend_Engineer_Resume",
        description:
            "ATS-optimized resume of Harsh Gaur - Frontend Engineer specializing in React, Next.js, TanStack, and SaaS platforms.",
    },

    components: [
        {
            id: "basics",
            type: "basics",
            order: 0,
            content: {
                name: "Harsh Gaur",
                headline: "Frontend Engneer | React.js | Next.js | MERN Stack",
                email: "hgaur491@gmail.com",
                phone: "+91 9310745921",
                location: "Delhi, India",
                links: [
                    {
                        label: "github.com/harshG775",
                        url: "https://github.com/harshG775",
                    },
                    {
                        label: "linkedin.com/in/harshg775",
                        url: "https://linkedin.com/in/harshg775",
                    },
                ],
            },
        },

        {
            id: "summary",
            type: "summary",
            order: 1,
            content: {
                text: `Frontend Engineer with 2+ years of experience building scalable SaaS platforms and AI-powered applications using React, Next.js, TypeScript, and TanStack ecosystem. Strong focus on performance, maintainability, and clean architecture. Experienced in multi-tenant systems, real-time features, and production-grade UI systems. Comfortable working across frontend and backend (Node.js, Express, Flask).`,
            },
        },

        {
            id: "experience",
            type: "experience",
            order: 2,
            content: {
                items: [
                    {
                        order: 1,
                        role: "Frontend Developer",
                        company: "Prabhubhakti Pvt. Ltd.",
                        location: "Gurugram",
                        startDate: "2025-06",
                        endDate: null,
                        links: [
                            {
                                label: "learn.prabhubhakti.io",
                                url: "https://learn.prabhubhakti.io",
                            },
                            {
                                label: "prabhubhakti.io",
                                url: "https://prabhubhakti.io",
                            },
                        ],
                        points: [
                            "Developed and maintained multi-tenant SaaS platforms (Astrologer, Temple, Ebook systems) with domain/subdomain routing and tenant isolation.",
                            "Built high-performance UI using Next.js, TypeScript, Tailwind CSS, and ShadCN with focus on scalability and reusability.",
                            "Implemented booking, payment (Razorpay), and wallet systems used across multiple tenant platforms.",
                            "Improved SEO and performance (95+ Lighthouse scores) leading to increased organic traffic.",
                            "Reduced onboarding time for new tenants by ~70% by standardizing tenant templates.",
                            "Mentored and guided 2 frontend interns, ensuring code quality and best practices.",
                        ],
                    },

                    {
                        order: 3,
                        role: "Frontend Developer SDE Trainee",
                        company: "Metis Eduventures Pvt. Ltd. (Adda247)",
                        location: "Gurugram",
                        startDate: "2024-08",
                        endDate: "2025-02",
                        links: [
                            {
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
                        order: 4,
                        role: "Frontend Developer",
                        company: "ItaxEasy",
                        location: "Remote",
                        startDate: "2023-10",
                        endDate: "2024-05",
                        links: [
                            {
                                label: "itaxeasy.com",
                                url: "https://itaxeasy.com",
                            },
                        ],
                        points: [
                            "Revamped UI/UX leading to ~22% reduction in bounce rate.",
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
            content: {
                items: [
                    {
                        name: "SupportDesk - AI Customer Support Platform",
                        stack: ["React", "Zustand", "Flask", "WebSockets", "OpenAI API"],
                        links: [
                            {
                                label: "Live Demo",
                                url: "https://supportdesk.adda247.com/",
                            },
                        ],
                        points: [
                            "Built real-time chat system with AI + human handover.",
                            "Reduced dependency on third-party tools, saving ~₹2L/year.",
                        ],
                    },

                    {
                        name: "AiDoubtSolver - Voice AI Chatbot",
                        stack: ["React", "SSE", "Whisper API"],
                        links: [
                            {
                                label: "Live Demo",
                                url: "https://aidoubtsolverdev.adda247.com/",
                            },
                        ],
                        points: [
                            "Implemented voice-to-voice AI doubt solving using Whisper.",
                            "Handled 150+ concurrent sessions with streaming responses.",
                        ],
                    },

                    {
                        name: "Astrologer SaaS Platform",
                        stack: ["Next.js", "TypeScript", "TanStack", "Node.js", "Razorpay"],
                        links: [],
                        points: [
                            "Built multi-tenant astrologer platform with booking and payment flows.",
                            "Implemented tenant-specific UI and routing system.",
                        ],
                    },
                ],
            },
        },

        {
            id: "skills",
            type: "skills",
            order: 4,
            content: {
                groups: [
                    {
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
                        title: "Backend",
                        items: ["Node.js", "Express.js", "Flask"],
                    },
                    {
                        title: "Database",
                        items: ["MongoDB", "PostgreSQL", "Prisma"],
                    },
                    {
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
            content: {
                items: [
                    {
                        degree: "Master of Computer Applications (MCA)",
                        institution: "Indira Gandhi National Open University (IGNOU)",
                        startDate: "2025",
                        endDate: "Present",
                    },
                    {
                        degree: "Bachelor of Arts (English Honours)",
                        institution: "Prof. Rajendra Singh University",
                        startDate: "2020",
                        endDate: "2023",
                    },
                ],
            },
        },

        {
            id: "certifications",
            type: "custom",
            order: 6,
            content: {
                title: "Certifications",
                items: ["Web Development Certification - MyCodeLearning (2023)"],
            },
        },
    ],
}

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

function RouteComponent() {
    const components = [...resumeData.components].filter((s) => s.visible !== false).sort((a, b) => a.order - b.order)

    return (
        <div className="flex">
            <div className="bg-red-100 w-96"></div>
            <TransformWrapper initialScale={1} minScale={0.5} maxScale={2} limitToBounds={false} centerOnInit={true}>
                <TransformComponent>
                    <div className="h-screen w-screen">
                        <div className="relative w-[8.5in]  mx-auto p-4 bg-white text-black ">
                            <div className="w-[8.5in] h-[11in] absolute left-0 top-0 border-2 border-dashed pointer-events-none"></div>
                            <main className="bg-zinc-50 text-zinc-950">
                                {components.map((component) => {
                                    const renderer = basicConfig.components[component.type]
                                    if (!renderer) return null

                                    return <div key={component.id}>{renderer(component.content)}</div>
                                })}
                            </main>
                        </div>
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </div>
    )
}

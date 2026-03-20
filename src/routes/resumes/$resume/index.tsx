import { createFileRoute } from "@tanstack/react-router"
import type { JSX } from "react"

export const Route = createFileRoute("/resumes/$resume/")({
    component: RouteComponent,
})

type SectionType =
    | "basics"
    | "summary"
    | "experience"
    | "education"
    | "projects"
    | "skills"
    | "custom"

type Section<T = any> = {
    id: string
    type: SectionType
    order: number
    visible?: boolean
    content: T
}

type Resume = {
    metadata: {
        title: string
        description: string
    }
    sections: Section[]
}

const resumeData: Resume = {
    metadata: {
        title: "Harsh_Gaur_Frontend_Engineer_Resume",
        description:
            "ATS-optimized resume of Harsh Gaur - Frontend Engineer specializing in React, Next.js, TanStack, and SaaS platforms.",
    },

    sections: [
        {
            id: "basics",
            type: "basics",
            order: 0,
            content: {
                name: "Harsh Gaur",
                headline:
                    "Frontend Engineer (Full Stack Capable) - React, Next.js, TypeScript, TanStack",
                email: "hgaur491@gmail.com",
                phone: "+91 9310745921",
                location: "Delhi, India",
                links: [
                    { label: "GitHub", url: "https://github.com/harshG775" },
                    {
                        label: "LinkedIn",
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
                        role: "Frontend Developer",
                        company: "Prabhubhakti Pvt. Ltd.",
                        location: "Gurugram",
                        startDate: "2025-06",
                        endDate: null,
                        links: [
                            "https://prabhubhakti.io",
                            "https://prabhubhakti.com",
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
                        role: "Freelance Frontend Developer",
                        company: "Kalpi Capital",
                        location: "Remote",
                        startDate: "2025-05",
                        endDate: "2025-06",
                        links: ["https://kalpicapital.com"],
                        points: [
                            "Built SEO-optimized landing page using Next.js, Tailwind CSS, and ShadCN.",
                            "Improved Lighthouse SEO score from 68 to 97.",
                        ],
                    },

                    {
                        role: "Frontend Developer SDE Trainee",
                        company: "Metis Eduventures Pvt. Ltd. (Adda247)",
                        location: "Gurugram",
                        startDate: "2024-08",
                        endDate: "2025-02",
                        links: ["https://adda247.com"],
                        points: [
                            "Built AI-powered chatbot features using React, Zustand, and OpenAI APIs.",
                            "Developed real-time communication features using SSE/WebSockets.",
                            "Improved application performance resulting in ~25% faster load times.",
                        ],
                    },

                    {
                        role: "Frontend Developer",
                        company: "ItaxEasy",
                        location: "Remote",
                        startDate: "2023-10",
                        endDate: "2024-05",
                        links: ["https://itaxeasy.com"],
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
                        stack: [
                            "React",
                            "Zustand",
                            "Flask",
                            "WebSockets",
                            "OpenAI API",
                        ],
                        links: ["https://supportdesk.adda247.com/"],
                        points: [
                            "Built real-time chat system with AI + human handover.",
                            "Reduced dependency on third-party tools, saving ~₹2L/year.",
                        ],
                    },

                    {
                        name: "AiDoubtSolver - Voice AI Chatbot",
                        stack: ["React", "SSE", "Whisper API"],
                        links: ["https://aidoubtsolverdev.adda247.com/"],
                        points: [
                            "Implemented voice-to-voice AI doubt solving using Whisper.",
                            "Handled 150+ concurrent sessions with streaming responses.",
                        ],
                    },

                    {
                        name: "Astrologer SaaS Platform",
                        stack: [
                            "Next.js",
                            "TypeScript",
                            "TanStack",
                            "Node.js",
                            "Razorpay",
                        ],
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
                        institution:
                            "Indira Gandhi National Open University (IGNOU)",
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
                items: [
                    "Web Development Certification - MyCodeLearning (2023)",
                ],
            },
        },
    ],
}

const sectionRenderers: Record<SectionType, (content: any) => JSX.Element> = {
    basics: (data) => (
        <header className="mb-6">
            <h1 className="text-2xl font-bold">{data.name}</h1>

            <p className="text-sm text-muted-foreground">{data.headline}</p>

            <div className="text-xs mt-2 flex flex-wrap gap-2 text-muted-foreground">
                {data.email && <span>{data.email}</span>}
                {data.phone && <span>• {data.phone}</span>}
                {data.location && <span>• {data.location}</span>}
            </div>

            {data.links?.length > 0 && (
                <div className="text-xs mt-2 flex flex-wrap gap-3">
                    {data.links.map((link: any, i: number) => (
                        <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-primary"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            )}
        </header>
    ),

    summary: (data) => (
        <section className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Summary</h2>
            <p className="text-sm leading-relaxed">{data.text}</p>
        </section>
    ),

    experience: (data) => (
        <section className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Experience</h2>

            <div className="space-y-4">
                {data.items?.map((item: any, i: number) => (
                    <div key={i} className="border-l-2 pl-3">
                        <div className="flex justify-between flex-wrap text-sm">
                            <div>
                                <span className="font-semibold">
                                    {item.role}
                                </span>{" "}
                                at {item.company}
                            </div>

                            <div className="text-xs text-muted-foreground">
                                {item.startDate} - {item.endDate || "Present"}
                            </div>
                        </div>

                        {item.location && (
                            <div className="text-xs text-muted-foreground">
                                {item.location}
                            </div>
                        )}

                        {item.links?.length > 0 && (
                            <div className="text-xs mt-1">
                                {item.links.map((link: string, idx: number) => (
                                    <a
                                        key={idx}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline text-primary mr-2"
                                    >
                                        Link
                                    </a>
                                ))}
                            </div>
                        )}

                        <ul className="list-disc ml-5 text-sm mt-1 space-y-0.5">
                            {item.points?.map((p: string, idx: number) => (
                                <li key={idx}>{p}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    ),

    education: (data) => (
        <section className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Education</h2>

            <div className="space-y-3">
                {data.items?.map((item: any, i: number) => (
                    <div key={i} className="text-sm">
                        <div className="flex justify-between flex-wrap">
                            <span className="font-medium">{item.degree}</span>

                            <span className="text-xs text-muted-foreground">
                                {item.startDate} - {item.endDate}
                            </span>
                        </div>

                        <div className="text-xs text-muted-foreground">
                            {item.institution}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    ),

    projects: (data) => (
        <section className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Projects</h2>

            <div className="space-y-4">
                {data.items?.map((item: any, i: number) => (
                    <div key={i} className="border-l-2 pl-3 text-sm">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold">{item.name}</span>

                            {item.links?.[0] && (
                                <a
                                    href={item.links[0]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary underline text-xs"
                                >
                                    Live
                                </a>
                            )}
                        </div>

                        {item.stack?.length > 0 && (
                            <div className="text-xs text-muted-foreground">
                                <span className="font-medium">Tech:</span>{" "}
                                {item.stack.join(", ")}
                            </div>
                        )}

                        <ul className="list-disc ml-4 mt-1 space-y-0.5">
                            {item.points?.map((point: string, idx: number) => (
                                <li key={idx}>{point}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    ),

    skills: (data) => (
        <section className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Skills</h2>

            <div className="space-y-2 text-sm">
                {data.groups?.map((group: any, i: number) => (
                    <div key={i}>
                        <span className="font-medium">{group.title}:</span>{" "}
                        <span className="text-muted-foreground">
                            {group.items.join(", ")}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    ),

    custom: (data) => (
        <section className="mb-4">
            <h2 className="text-lg font-semibold mb-2">{data.title}</h2>

            <ul className="list-disc ml-5 text-sm space-y-0.5">
                {data.items?.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
        </section>
    ),
}

function RouteComponent() {
    const sections = [...resumeData.sections]
        .filter((s) => s.visible !== false)
        .sort((a, b) => a.order - b.order)

    return (
        <div className="min-h-screen bg-muted py-6">
            <div className="mx-auto w-full max-w-3xl bg-background text-foreground shadow-sm p-6 print:shadow-none print:p-4">
                <main>
                    {sections.map((section) => {
                        const renderer = sectionRenderers[section.type]
                        if (!renderer) return null

                        return (
                            <div key={section.id}>
                                {renderer(section.content)}
                            </div>
                        )
                    })}
                </main>
            </div>
        </div>
    )
}

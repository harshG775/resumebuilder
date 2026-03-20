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
        title: "Harsh_WebDeveloper_Resume",
        description:
            "ATS-optimized resume of Harsh Gaur for Frontend / Full Stack Developer roles.",
    },

    sections: [
        {
            id: "basics",
            type: "basics",
            order: 0,
            content: {
                name: "Harsh Gaur",
                headline:
                    "Frontend / Full Stack Developer - React.js | Next.js | MERN Stack",
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
                text: `Frontend-focused Full Stack Developer with 2+ years of hands-on experience building scalable, high-performing SaaS and AI-powered platforms using Next.js, React.js, and the MERN stack. Skilled in UI development, performance optimization, and building accessible, maintainable interfaces. Also experienced in guiding and mentoring two frontend interns.`,
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
                        company: "Prabhubhakti (Spiritual SaaS Platform)",
                        location: "Gurugram",
                        startDate: "2025-06",
                        endDate: null,
                        links: [
                            "http://prabhubhakti.io",
                            "http://prabhubhakti.com",
                        ],
                        points: [
                            "Built Prabhubhakti's landing and SaaS website using Next.js, Tailwind CSS, and Framer Motion, achieving 95+ SEO scores and a 40% increase in organic traffic.",
                            "Contributed to a multi-tenant SaaS platform with domain/subdomain routing, wallet system, and Razorpay integration.",
                            "Launched 2 astrologer storefronts within 2 months, reducing onboarding time by 70%.",
                            "Guided and supported two frontend interns to maintain code quality.",
                        ],
                    },

                    {
                        role: "Freelance Frontend Developer",
                        company: "Kalpi Capital",
                        location: "Freelance",
                        startDate: "2025-05",
                        endDate: "2025-06",
                        links: ["https://kalpicapital.com"],
                        points: [
                            "Delivered SEO-first landing page using Next.js, ShadCN, Tailwind CSS.",
                            "Improved Lighthouse SEO score from 68 to 97.",
                        ],
                    },

                    {
                        role: "Frontend Developer SDE",
                        company: "Metis Eduventures Pvt. Ltd (Adda247)",
                        location: "Gurugram",
                        startDate: "2024-08",
                        endDate: "2025-02",
                        links: ["https://adda247.com"],
                        points: [
                            "Built 5+ AI chatbot features using React.js, Zustand, OpenAI APIs.",
                            "Improved page load speed by 25%.",
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
                            "Revamped UI reducing bounce rate by 22%.",
                            "Implemented route-based lazy loading.",
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
                        name: "SupportDesk - AI-Powered Customer Support Tool",
                        stack: [
                            "React.js",
                            "Zustand",
                            "Flask",
                            "OpenAI API",
                            "WebSockets",
                        ],
                        links: ["https://supportdesk.adda247.com/"],
                        points: [
                            "Saved ₹2L+/year by replacing third-party tools.",
                            "Built real-time fallback chat system.",
                        ],
                    },

                    {
                        name: "AiDoubtSolver - EdTech Voice Chatbot",
                        stack: ["React.js", "SSE", "Whisper API"],
                        links: ["https://aidoubtsolverdev.adda247.com/"],
                        points: [
                            "Voice-based AI chatbot using Whisper.",
                            "Handled 150+ concurrent sessions.",
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
                            "React.js",
                            "Next.js",
                            "TypeScript",
                            "Zustand",
                            "Tailwind CSS",
                            "ShadCN",
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
                        title: "Tools",
                        items: ["Git", "Docker", "Postman"],
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
                        degree: "Master of Computer Applications",
                        institution:
                            "Indra Gandhi National Open University (IGNOU)",
                        startDate: "2025",
                        endDate: "present",
                    },
                    {
                        degree: "Bachelor of Arts - English Honours",
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
            <p className="text-sm text-gray-600">{data.headline}</p>

            <div className="text-xs mt-2 flex flex-wrap gap-2">
                <span>{data.email}</span>
                <span>•</span>
                <span>{data.phone}</span>
                <span>•</span>
                <span>{data.location}</span>
            </div>

            <div className="text-xs mt-1 flex gap-3">
                {data.links?.map((link: any, i: number) => (
                    <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        className="underline"
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </header>
    ),

    summary: (data) => (
        <section className="mb-4">
            <h2 className="text-lg font-semibold mb-1">Summary</h2>
            <p className="text-sm">{data.text}</p>
        </section>
    ),

    experience: (data) => (
        <section className="mb-4">
            <h2 className="text-lg font-semibold mb-1">Experience</h2>

            {data.items?.map((item: any, i: number) => (
                <div key={i} className="mb-3">
                    <h3 className="font-medium">{item.role}</h3>
                    <p className="text-sm text-gray-600">{item.company}</p>

                    <ul className="list-disc ml-5 text-sm mt-1">
                        {item.points?.map((p: string, idx: number) => (
                            <li key={idx}>{p}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </section>
    ),

    education: (data) => (
        <section className="mb-4">
            <h2 className="text-lg font-semibold mb-1">Education</h2>

            {data.items?.map((item: any, i: number) => (
                <div key={i} className="text-sm">
                    {item.degree} - {item.institution}
                </div>
            ))}
        </section>
    ),

    projects: (data) => (
        <section className="mb-4">
            <h2 className="text-lg font-semibold mb-1">Projects</h2>

            {data.items?.map((item: any, i: number) => (
                <div key={i} className="text-sm">
                    <strong>{item.name}</strong> - {item.description}
                </div>
            ))}
        </section>
    ),

    skills: (data) => (
        <section className="mb-4">
            <h2 className="text-lg font-semibold mb-1">Skills</h2>

            {data.groups?.map((group: any, i: number) => (
                <div key={i} className="text-sm">
                    <strong>{group.title}:</strong> {group.items.join(", ")}
                </div>
            ))}
        </section>
    ),

    custom: (data) => (
        <section className="mb-4">
            <h2 className="text-lg font-semibold mb-1">{data.title}</h2>
            {data.items?.map((item: string, i: number) => (
                <div key={i} className="text-sm">
                    {item}
                </div>
            ))}
        </section>
    ),
}

// ----------------------
// MAIN COMPONENT
// ----------------------

function RouteComponent() {
    const sections = [...resumeData.sections]
        .filter((s) => s.visible !== false)
        .sort((a, b) => a.order - b.order)

    return (
        <div className="p-4 bg-gray-200 min-h-screen">
            <div className="aspect-8.5/11 w-full max-w-200 mx-auto bg-white shadow p-6">
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

import { createFileRoute } from "@tanstack/react-router"
import { basicConfig } from "./-components/configs/basic"
import { Render, type Data } from "./-components/render"

export const Route = createFileRoute("/resumes/$resume/")({
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
                headline: "Frontend Engineer | React.js | Next.js | MERN Stack",
                email: "hgaur491@gmail.com",
                phone: "+91 9310745921",
                location: "Delhi, India",
                links: [
                    { id: "link-1", order: 0, label: "github.com/harshG775", url: "https://github.com/harshG775" },
                    {
                        id: "link-2",
                        order: 1,
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
            props: {
                text: "Frontend Engineer with 2+ years of experience building scalable SaaS platforms and AI-powered applications using React, Next.js, TypeScript, and TanStack ecosystem. Strong focus on performance, maintainability, and clean architecture. Experienced in multi-tenant systems, real-time features, and production-grade UI systems. Comfortable working across frontend and backend (Node.js, Express, Flask).",
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
                        startDate: "2025-06",
                        endDate: null,
                        links: [
                            { id: "exp-link-1", label: "learn.prabhubhakti.io", url: "https://learn.prabhubhakti.io" },
                            { id: "exp-link-2", label: "prabhubhakti.io", url: "https://prabhubhakti.io" },
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
                        id: "exp-2",
                        order: 1,
                        title: "Frontend Developer SDE Trainee",
                        organization: "Metis Eduventures Pvt. Ltd. (Adda247)",
                        location: "Gurugram",
                        startDate: "2024-08",
                        endDate: "2025-02",
                        links: [{ id: "exp-link-3", label: "adda247.com", url: "https://adda247.com" }],
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
                        startDate: "2023-10",
                        endDate: "2024-05",
                        links: [{ id: "exp-link-4", label: "itaxeasy.com", url: "https://itaxeasy.com" }],
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
            props: {
                items: [
                    {
                        id: "proj-1",
                        order: 0,
                        title: "SupportDesk - AI Customer Support Platform",
                        organization: "Adda247",
                        stack: ["React", "Zustand", "Flask", "WebSockets", "OpenAI API"],
                        links: [{ id: "proj-link-1", label: "Live Demo", url: "https://supportdesk.adda247.com/" }],
                        points: [
                            "Built real-time chat system with AI + human handover.",
                            "Reduced dependency on third-party tools, saving ~₹2L/year.",
                        ],
                    },
                    {
                        id: "proj-2",
                        order: 1,
                        title: "AiDoubtSolver - Voice AI Chatbot",
                        organization: "Adda247",
                        stack: ["React", "SSE", "Whisper API"],
                        links: [
                            { id: "proj-link-2", label: "Live Demo", url: "https://aidoubtsolverdev.adda247.com/" },
                        ],
                        points: [
                            "Implemented voice-to-voice AI doubt solving using Whisper.",
                            "Handled 150+ concurrent sessions with streaming responses.",
                        ],
                    },
                    {
                        id: "proj-3",
                        order: 2,
                        title: "Astrologer SaaS Platform",
                        organization: "Prabhubhakti",
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

        {
            id: "certifications",
            type: "certifications",
            order: 6,
            props: {
                items: [
                    {
                        id: "cert-1",
                        order: 0,
                        title: "Web Development Certification",
                        organization: "MyCodeLearning",
                        startDate: "2023",
                        endDate: "2023",
                    },
                ],
            },
        },
    ],
}

function RouteComponent() {
    // const components = [...resumeData.components].filter((s) => s.visible !== false).sort((a, b) => a.order - b.order)

    return (
        <div>
            {/* <div className="bg-red-100 w-96"></div> */}
            <Render config={basicConfig} data={resumeData} />
        </div>
    )
}

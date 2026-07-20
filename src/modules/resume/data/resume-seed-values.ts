import type { ResumeValues } from "../schema/resume.zod-schema"

export const resumeSeedValues: ResumeValues = {
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
                    keywords: ["TypeScript", "JavaScript (ES2022+)", "Python"],
                },
                {
                    id: crypto.randomUUID(),
                    hidden: false,
                    icon: "",
                    name: "Frontend",
                    proficiency: "",
                    level: 5,
                    keywords: [
                        "React.js",
                        "Next.js",
                        "HTML5",
                        "CSS3",
                        "Tailwind CSS",
                        "TanStack Router",
                        "TanStack Query",
                        "TanStack Form",
                        "Zustand",
                    ],
                },
                {
                    id: crypto.randomUUID(),
                    hidden: false,
                    icon: "",
                    name: "Backend",
                    proficiency: "",
                    level: 4,
                    keywords: ["Node.js", "Express.js", "Flask", "REST APIs", "WebSockets"],
                },
                {
                    id: crypto.randomUUID(),
                    hidden: false,
                    icon: "",
                    name: "Databases",
                    proficiency: "",
                    level: 4,
                    keywords: ["PostgreSQL", "MongoDB"],
                },
                {
                    id: crypto.randomUUID(),
                    hidden: false,
                    icon: "",
                    name: "Tools",
                    proficiency: "",
                    level: 4,
                    keywords: ["Git", "GitHub", "Docker", "Drizzle ORM", "Better Auth"],
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
                    links: [],
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
                    name: "Multi-Tenant Architecture Boilerplate",
                    type: "open-source",
                    links: [],
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

        layout: {
            pages: [
                {
                    main: ["summary", "skill", "experience", "project", "education", "certification"],
                },
            ],
        },

        design: {
            colors: {
                primary: "#1e3a8a",
                text: "#111827",
                background: "#ffffff",
            },
        },

        typography: {
            heading: {
                fontFamily: "Cal Sans",
                fontWeight: "700",
            },
            body: {
                fontFamily: "Inter",
                fontWeight: "400",
            },
        },
    },
}

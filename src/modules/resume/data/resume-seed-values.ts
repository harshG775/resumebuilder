import type { ResumeValues } from "../schema/resume.zod-schema"

export const resumeShowcaseValues: ResumeValues = {
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
        layout: {
            pages: [
                {
                    main: ["summary", "skill", "experience", "project", "education", "certification"],
                },
            ],
        },
        page: {
            gapX: 1,
            gapY: 1,
            marginX: 12,
            marginY: 10,
            format: "a4",
            locale: "en-US",
            hideLinkUnderline: false,
            hideIcons: false,
            hideSectionIcons: true,
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
                fontFamily: "New Computer Modern",
                fontWeight: "800",
                fontSize: 14,
                lineHeight: 1.5,
            },
            body: {
                fontFamily: "Libertinus Serif",
                fontWeight: "400",
                fontSize: 10,
                lineHeight: 1.5,
            },
        },
    },
}

export const harshGaurResumeSeedValues: ResumeValues = {
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
                    keywords: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
                },
                {
                    id: crypto.randomUUID(),
                    hidden: false,
                    icon: "",
                    name: "React Ecosystem",
                    proficiency: "",
                    level: 5,
                    keywords: ["TanStack Router", "TanStack Query", "TanStack Form", "Zustand"],
                },
                {
                    id: crypto.randomUUID(),
                    hidden: false,
                    icon: "",
                    name: "Backend & APIs",
                    proficiency: "",
                    level: 4,
                    keywords: ["Node.js", "Express.js", "Flask", "REST APIs", "WebSockets"],
                },
                {
                    id: crypto.randomUUID(),
                    hidden: false,
                    icon: "",
                    name: "Data & Authentication",
                    proficiency: "",
                    level: 4,
                    keywords: ["PostgreSQL", "MongoDB", "Drizzle ORM", "Better Auth"],
                },
                {
                    id: crypto.randomUUID(),
                    hidden: false,
                    icon: "",
                    name: "Developer Tools",
                    proficiency: "",
                    level: 4,
                    keywords: ["Git", "GitHub", "Docker"],
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
                    links: [
                        {
                            id: crypto.randomUUID(),
                            label: "anchor.harshgaur.in",
                            value: "https://anchor.harshgaur.in",
                        },
                    ],
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
                    links: [
                        {
                            id: crypto.randomUUID(),
                            label: "github.com/harshG775/multi-tenant-saas",
                            value: "https://github.com/harshG775/multi-tenant-saas",
                        },
                    ],
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
                    main: ["summary", "experience", "project", "skill", "education", "certification"],
                },
            ],
        },
        page: {
            gapX: 4,
            gapY: 4,
            marginX: 14,
            marginY: 12,
            format: "a4",
            locale: "en-US",
            hideLinkUnderline: false,
            hideIcons: false,
            hideSectionIcons: true,
        },
        design: {
            colors: {
                primary: "oklch(35%, 0.08, 250deg)",
                text: "oklch(20%, 0.01, 250deg)",
                background: "oklch(100%, 0, 0deg)",
            },
        },
        typography: {
            heading: {
                fontFamily: "New Computer Modern",
                fontWeight: "800",
                fontSize: 14,
                lineHeight: 1.5,
            },
            body: {
                fontFamily: "Libertinus Serif",
                fontWeight: "400",
                fontSize: 10,
                lineHeight: 1.5,
            },
        },
    },
}

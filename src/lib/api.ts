import type { ResumeValues } from "./schemas/resume-schema"

const defaultValues: ResumeValues = {
    basics: {
        name: "",
        headline: "",
        email: "",
        phone: "",
        location: "",
        website: { showLink: false, url: "", label: "" },
        customFields: [],
    },
    sections: {
        summary: {
            title: "Summary",
            hidden: false,
            columns: 1,
            content: "",
        },
        skills: {
            title: "Skills",
            hidden: false,
            columns: 1,
            items: [],
        },
        experience: {
            title: "Experience",
            hidden: false,
            columns: 1,
            items: [],
        },
        projects: {
            title: "Projects",
            hidden: false,
            columns: 1,
            items: [],
        },
        education: {
            title: "Education",
            hidden: false,
            columns: 1,
            items: [],
        },
        certifications: {
            title: "Certifications",
            hidden: false,
            columns: 1,
            items: [],
        },
    },
    order: ["summary", "skills", "experience", "projects", "education", "certifications"],
}

const userSampleValue: ResumeValues = {
    basics: {
        name: "Harsh Gaur",
        headline: "Software Engineer | React, Next.js, Tanstack, TypeScript | SaaS Platforms",
        email: "hgaur491@gmail.com",
        phone: "(+91) 9310745921",
        location: "Delhi, India",
        website: { showLink: false, url: "https://www.harshgaur.in", label: "harshgaur.in" },
        customFields: [
            {
                id: "link-1",
                label: "github.com/harshG775",
                url: "https://github.com/harshG775",
            },
            {
                id: "link-2",
                label: "linkedin.com/in/harshg775",
                url: "https://linkedin.com/in/harshg775",
            },
        ],
    },
    sections: {
        summary: {
            title: "Summary",
            hidden: false,
            columns: 1,
            content:
                "Software Engineer with 2+ years building production web applications and multi-tenant SaaS platforms using React, Next.js, TypeScript, and Node.js. Proven track record: reduced tenant onboarding time by ~70%, architected AI-powered customer support platform, and eliminated third-party tooling costs (~₹2L/year savings). Expert in component architecture, real-time API integration, and full-stack TypeScript workflows.",
        },
        skills: {
            title: "Skills",
            hidden: false,
            columns: 1,
            items: [
                {
                    id: "skill-group-1",
                    name: "Languages",
                    hidden: false,
                    keywords: ["TypeScript", "Javascript (ES2022+)", "Python"],
                    level: null,
                    icon: "",
                    proficiency: "",
                },
                {
                    id: "skill-group-2",
                    name: "Frontend",
                    hidden: false,
                    keywords: [
                        "React",
                        "Next.js",
                        "TanStack (Query, Router, Start)",
                        "Zustand",
                        "Tailwind CSS",
                        "ShadCN UI",
                    ],
                    level: null,
                    icon: "",
                    proficiency: "",
                },
                {
                    id: "skill-group-3",
                    name: "Backend",
                    hidden: false,
                    keywords: ["Node.js", "Express.js", "Flask", "OpenAI API"],
                    level: null,
                    icon: "",
                    proficiency: "",
                },
                {
                    id: "skill-group-4",
                    name: "Database",
                    hidden: false,
                    keywords: ["MongoDB", "PostgreSQL", "Prisma"],
                    level: null,
                    icon: "",
                    proficiency: "",
                },
                {
                    id: "skill-group-5",
                    name: "Tools & Systems",
                    hidden: false,
                    keywords: ["Git", "Docker", "Linux", "Postman"],
                    level: null,
                    icon: "",
                    proficiency: "",
                },
            ],
        },
        experience: {
            title: "Experience",
            hidden: false,
            columns: 1,
            items: [
                {
                    id: "exp-1",
                    hidden: false,
                    company: "Prabhubhakti Pvt. Ltd.",
                    position: "Senior Frontend Engineer",
                    location: "Gurugram",
                    period: "Jun 2025 - Present",
                    website: {
                        showLink: true,
                        url: "https://learn.prabhubhakti.io",
                        label: "learn.prabhubhakti.io",
                    },
                    roles: [
                        "Architected three multi-tenant SaaS platforms (Astrologer, Temple Management, Ebook) with domain/subdomain-based tenant isolation, per-tenant UI theming, and Next.js middleware routing.",
                        "Built reusable React/TypeScript components for booking and payment flows with unified payment gateway (prabhubhakti.io) integrated via Razorpay—deployed across all tenant platforms, reducing per-tenant integration time by ~70%.",
                        "Standardized tenant onboarding templates in Next.js with TanStack Router, enabling rapid feature rollout across tenants.",
                    ],
                    description: [
                        "Architected three multi-tenant SaaS platforms (Astrologer, Temple Management, Ebook) with domain/subdomain-based tenant isolation, per-tenant UI theming, and Next.js middleware routing.",
                        "Built reusable React/TypeScript components for booking and payment flows with unified payment gateway (prabhubhakti.io) integrated via Razorpay—deployed across all tenant platforms, reducing per-tenant integration time by ~70%.",
                        "Standardized tenant onboarding templates in Next.js with TanStack Router, enabling rapid feature rollout across tenants.",
                    ]
                        .map((p) => `• ${p}`)
                        .join("\n"),
                },
                {
                    id: "exp-2",
                    hidden: false,
                    company: "Metis Eduventures Pvt. Ltd. (Adda247)",
                    position: "Frontend Engineer (SDE Trainee)",
                    location: "Gurugram",
                    period: "Aug 2024 - Feb 2025",
                    website: {
                        showLink: true,
                        url: "https://adda247.com",
                        label: "adda247.com",
                    },
                    roles: [
                        "Built SupportDesk, an AI customer support platform with real-time agent-to-human handover using WebSockets and OpenAI API integration, eliminating third-party tooling and saving ~₹2L/year.",
                        "Developed AiDoubtSolver, an academic AI chatbot with voice-to-voice chat using Whisper API, browser Camera API, and real-time streaming responses via SSE, supporting 150+ concurrent users with optimized state management and minimal re-renders.",
                        "Improved application performance by ~25% through bundle analysis, route-based code splitting, and memoization strategies.",
                    ],
                    description: [
                        "Built SupportDesk, an AI customer support platform with real-time agent-to-human handover using WebSockets and OpenAI API integration, eliminating third-party tooling and saving ~₹2L/year.",
                        "Developed AiDoubtSolver, an academic AI chatbot with voice-to-voice chat using Whisper API, browser Camera API, and real-time streaming responses via SSE, supporting 150+ concurrent users with optimized state management and minimal re-renders.",
                        "Improved application performance by ~25% through bundle analysis, route-based code splitting, and memoization strategies.",
                    ]
                        .map((p) => `• ${p}`)
                        .join("\n"),
                },
                {
                    id: "exp-3",
                    hidden: false,
                    company: "ItaxEasy",
                    position: "Frontend Developer Internship",
                    location: "Gwalior (Remote)",
                    period: "Nov 2023 - May 2024",
                    website: {
                        showLink: true,
                        url: "https://itaxeasy.com",
                        label: "itaxeasy.com",
                    },
                    roles: [
                        "Migrated legacy tax-filing platform from React.js to Next.js App Router, enabling SSR for improved SEO and faster content delivery.",
                        "Optimized performance through route-based code splitting and lazy loading strategies.",
                    ],
                    description: [
                        "Migrated legacy tax-filing platform from React.js to Next.js App Router, enabling SSR for improved SEO and faster content delivery.",
                        "Optimized performance through route-based code splitting and lazy loading strategies.",
                    ]
                        .map((p) => `• ${p}`)
                        .join("\n"),
                },
            ],
        },
        projects: {
            title: "Projects",
            hidden: false,
            columns: 1,
            items: [
                {
                    id: "proj-3",
                    hidden: false,
                    name: "Astrologer SaaS Platform",
                    type: "professional",
                    source: "Prabhubhakti",
                    keywords: ["Next.js", "TypeScript", "TanStack Start", "TanStack Router", "Node.js", "Razorpay"],
                    period: "",
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
                    description: [
                        "Architected multi-tenant platform supporting domain/subdomain-based tenant isolation with per-tenant UI and routing.",
                        "Built reusable booking and Razorpay payment flows with unified payment gateway (prabhubhakti.io) for all tenant platforms, reducing per-tenant integration time by ~70%.",
                        "Standardized tenant onboarding templates in Next.js with TanStack Router, enabling rapid feature rollout across tenants.",
                    ]
                        .map((p) => `• ${p}`)
                        .join("\n"),
                },
                {
                    id: "proj-2",
                    hidden: false,
                    name: "SupportDesk - AI Customer Support Platform",
                    type: "professional",
                    source: "Adda247",
                    keywords: ["React", "Zustand", "Flask", "WebSockets", "OpenAI API"],
                    period: "",
                    links: [
                        {
                            id: "proj-link-1",
                            label: "supportdesk.adda247.com",
                            url: "https://supportdesk.adda247.com/",
                        },
                    ],
                    description: [
                        "Built real-time chat system with seamless AI-to-human handover using React, WebSockets, and OpenAI API integration.",
                        "Eliminated third-party support platform dependency, saving ~₹2L/year in licensing costs.",
                    ]
                        .map((p) => `• ${p}`)
                        .join("\n"),
                },
                {
                    id: "proj-1",
                    hidden: false,
                    name: "AiDoubtSolver - Voice AI Chatbot",
                    type: "professional",
                    source: "Adda247",
                    keywords: ["React", "SSE", "Whisper API"],
                    period: "",
                    links: [
                        {
                            id: "proj-link-2",
                            label: "aidoubtsolverdev.adda247.com",
                            url: "https://aidoubtsolverdev.adda247.com/",
                        },
                    ],
                    description: [
                        "Implemented voice-to-voice doubt solving pipeline using Whisper API with real-time streaming responses via SSE.",
                        "Supported 150+ concurrent users with optimized state management and minimal re-renders.",
                        "Designed stateful conversation flow in React with optimistic UI updates for perceived responsiveness.",
                    ]
                        .map((p) => `• ${p}`)
                        .join("\n"),
                },
            ],
        },
        education: {
            title: "Education",
            hidden: false,
            columns: 1,
            items: [
                {
                    id: "edu-1",
                    hidden: false,
                    school: "Indira Gandhi National Open University (IGNOU)",
                    degree: "Master of Computer Applications (MCA)",
                    area: "",
                    grade: "",
                    location: "",
                    period: "2025 - Present",
                    website: {
                        showLink: false,
                        url: "",
                        label: "",
                    },
                    description: "",
                },
                {
                    id: "edu-2",
                    hidden: false,
                    school: "Prof. Rajendra Singh University",
                    degree: "Bachelor of Arts (English Honours)",
                    area: "",
                    grade: "",
                    location: "",
                    period: "2020 - 2023",
                    website: {
                        showLink: false,
                        url: "",
                        label: "",
                    },
                    description: "",
                },
            ],
        },
        certifications: {
            title: "Certifications",
            hidden: false,
            columns: 1,
            items: [
                {
                    id: "cert-1",
                    title: "web Development Certification",
                    website: {
                        label: "",
                        showLink: false,
                        url: "",
                    },
                    issuer: "MyCodeLearning",
                    hidden: false,
                    description: "",
                    date: "2023",
                },
            ],
        },
    },
    order: ["summary", "skills", "experience", "projects", "education", "certifications"],
}

const khushbuResume: ResumeValues = {
    basics: {
        name: "Khushbu Gaur",
        headline: "Frontend Developer & AI/ML Enthusiast",
        email: "khushbu9625@gmail.com",
        phone: "+91 9625099976",
        location: "Delhi, India",
        website: {
            showLink: true,
            url: "https://linkedin.com/in/khush03",
            label: "LinkedIn",
        },
        customFields: [
            {
                id: "github",
                url: "https://github.com/Khushh03",
                label: "GitHub",
            },
        ],
    },

    sections: {
        summary: {
            title: "Summary",
            hidden: false,
            columns: 1,
            content:
                "Frontend Developer with hands-on experience building responsive, SEO-optimized web applications using React.js and WordPress. Backed by a Data Science & AI/ML certification with working knowledge of Python and machine learning fundamentals. Pursuing MCA while actively contributing to real-world products. Looking for opportunities to grow at the intersection of frontend and AI.",
        },

        skills: {
            title: "Skills",
            hidden: false,
            columns: 2,
            items: [
                {
                    id: "skill-react",
                    hidden: false,
                    icon: "",
                    name: "React.js",
                    proficiency: "Intermediate",
                    level: 70,
                    keywords: ["SPA", "React Router", "Component Architecture"],
                },
                {
                    id: "skill-tailwind",
                    hidden: false,
                    icon: "",
                    name: "Tailwind CSS & ShadCN UI",
                    proficiency: "Intermediate",
                    level: 65,
                    keywords: ["Utility-first CSS", "Design Systems"],
                },
                {
                    id: "skill-wordpress",
                    hidden: false,
                    icon: "",
                    name: "WordPress",
                    proficiency: "Intermediate",
                    level: 65,
                    keywords: ["Theme Customization", "SEO", "PHP"],
                },
                {
                    id: "skill-python",
                    hidden: false,
                    icon: "",
                    name: "Python",
                    proficiency: "Beginner-Intermediate",
                    level: 45,
                    keywords: ["Data Preprocessing", "ML Basics"],
                },
                {
                    id: "skill-aiml",
                    hidden: false,
                    icon: "",
                    name: "AI/ML Fundamentals",
                    proficiency: "Beginner",
                    level: 40,
                    keywords: ["Machine Learning", "OpenAI API", "Data Science"],
                },
                {
                    id: "skill-js",
                    hidden: false,
                    icon: "",
                    name: "JavaScript (ES6+)",
                    proficiency: "Intermediate",
                    level: 65,
                    keywords: ["ES6+", "DOM", "Async/Await"],
                },
                {
                    id: "skill-db",
                    hidden: false,
                    icon: "",
                    name: "PostgreSQL",
                    proficiency: "Beginner",
                    level: 30,
                    keywords: ["SQL", "Relational Databases"],
                },
                {
                    id: "skill-tools",
                    hidden: false,
                    icon: "",
                    name: "Dev Tools",
                    proficiency: "Intermediate",
                    level: 60,
                    keywords: ["Git", "GitHub", "VS Code", "Postman"],
                },
            ],
        },

        experience: {
            title: "Experience",
            hidden: false,
            columns: 1,
            items: [
                {
                    id: "exp-quickipedia",
                    hidden: false,
                    company: "Quickipedia",
                    position: "Frontend Developer",
                    location: "Remote",
                    period: "May 2025 - Present",
                    website: {
                        showLink: true,
                        url: "https://quickipedia.com",
                        label: "quickipedia.com",
                    },
                    description:
                        "Working on frontend development and WordPress-based web solutions for clients across domains.",
                    roles: [
                        "Developed and maintained responsive web applications using React.js, improving UI performance and user experience.",
                        "Built reusable React components and implemented client-side routing for scalable frontend architecture.",
                        "Customized and optimized WordPress-based websites to enhance performance, security, and SEO rankings.",
                        "Integrated Tailwind CSS and Bootstrap for consistent design systems across multiple projects.",
                        "Ensured cross-browser compatibility, mobile responsiveness, and accessibility best practices.",
                    ],
                },
            ],
        },

        projects: {
            title: "Projects",
            hidden: false,
            columns: 1,
            items: [
                {
                    id: "proj-quixgrow",
                    hidden: false,
                    name: "QuixGrow",
                    type: "professional",
                    source: "https://github.com/Khushh03",
                    keywords: ["React.js", "Vite", "Tailwind CSS", "ShadCN UI"],
                    period: "2025",
                    links: [
                        {
                            id: "quixgrow-live",
                            url: "https://quixgrow.vercel.app",
                            label: "Live",
                        },
                    ],
                    description:
                        "Modern responsive marketing website built with React.js and Vite. Implemented reusable UI components using Tailwind CSS and ShadCN UI, with a focus on performance, mobile-first responsiveness, and clean user interactions.",
                },
                {
                    id: "proj-alepaa",
                    hidden: false,
                    name: "Alepaa",
                    type: "personal",
                    source: "https://github.com/Khushh03",
                    keywords: ["React.js", "React Router", "Tailwind CSS", "ShadCN"],
                    period: "2025",
                    links: [
                        {
                            id: "alepaa-live",
                            url: "https://alepaa.vercel.app",
                            label: "Live",
                        },
                    ],
                    description:
                        "Single-page application with dynamic routing via React Router. Features a clean, consistent UI built with Tailwind CSS and ShadCN components.",
                },
                {
                    id: "proj-birgunj",
                    hidden: false,
                    name: "Improving Birgunj",
                    type: "freelance",
                    source: "",
                    keywords: ["WordPress", "PHP", "HTML5", "CSS3"],
                    period: "2024",
                    links: [
                        {
                            id: "birgunj-live",
                            url: "https://improvingbirgunj.org",
                            label: "Live",
                        },
                    ],
                    description:
                        "Responsive nonprofit website focused on healthcare, education, and child welfare. Customized WordPress themes to highlight campaigns including Roti Bank and Feeding Nepal.",
                },
                {
                    id: "proj-kamal",
                    hidden: false,
                    name: "Kamal Hospital (Delhi NCR)",
                    type: "freelance",
                    source: "",
                    keywords: ["WordPress", "HTML5", "CSS3"],
                    period: "2024",
                    links: [
                        {
                            id: "kamal-live",
                            url: "https://kamalhospitalncr.com",
                            label: "Live",
                        },
                    ],
                    description:
                        "Healthcare website designed to improve accessibility and online visibility. Customized layouts for real-time health packages and service updates.",
                },
            ],
        },

        education: {
            title: "Education",
            hidden: false,
            columns: 1,
            items: [
                {
                    id: "edu-mca",
                    hidden: false,
                    school: "Indira Gandhi National Open University (IGNOU)",
                    degree: "Master of Computer Applications",
                    area: "Computer Applications",
                    grade: "",
                    location: "India",
                    period: "2025 – Present",
                    website: {
                        showLink: false,
                        url: "https://ignou.ac.in",
                        label: "IGNOU",
                    },
                    description: "Currently pursuing MCA (Distance Learning).",
                },
                {
                    id: "edu-bcom",
                    hidden: false,
                    school: "Prof. Rajendra Singh University",
                    degree: "Bachelor of Commerce",
                    area: "Accounts",
                    grade: "",
                    location: "India",
                    period: "2020 – 2023",
                    website: {
                        showLink: false,
                        url: "",
                        label: "",
                    },
                    description: "",
                },
            ],
        },

        certifications: {
            title: "Certifications",
            hidden: false,
            columns: 1,
            items: [
                {
                    id: "cert-aiml",
                    hidden: false,
                    title: "Data Science & AI/ML",
                    issuer: "F1Macro Technologies",
                    date: "2025",
                    website: {
                        showLink: false,
                        url: "",
                        label: "",
                    },
                    description:
                        "Covered machine learning fundamentals, data preprocessing, Python for data science, and applied AI concepts.",
                },
                {
                    id: "cert-webdev",
                    hidden: false,
                    title: "Web Development",
                    issuer: "MyCodeLearning",
                    date: "2023",
                    website: {
                        showLink: false,
                        url: "",
                        label: "",
                    },
                    description: "Fundamentals of HTML, CSS, JavaScript, and responsive web design.",
                },
            ],
        },
    },

    order: ["summary", "experience", "projects", "skills", "education", "certifications"],
}
export const fetchResumeById = ({ id }: { id: string }) => {
    if (id == "harsh-resume") {
        return {
            id: id,
            data: userSampleValue,
        }
    }
    if (id == "khushbu-resume") {
        return {
            id: id,
            data: khushbuResume,
        }
    }
    return {
        id: id,
        data: defaultValues,
    }
}

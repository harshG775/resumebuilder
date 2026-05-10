import { Button } from "#/components/ui/button"
import { createFileRoute } from "@tanstack/react-router"
import { useRef, useState } from "react"

export const Route = createFileRoute("/test/")({
    component: RouteComponent,
})

const formatDate = (date?: string | null) => {
    if (!date) return ""
    const d = new Date(date)
    return d.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    })
}

const userSampleValue = {
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

const printResumePdf = ({ html, style }: { html: string; style: string }) => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>
${style}
</style>
</head>
${html}
</html>
`

    const blob = new Blob([fullHtml], { type: "text/html" })
    const url = URL.createObjectURL(blob)

    const win = window.open(url, "_blank")
    if (!win) return

    win.focus()
    win.onload = () => {
        win.print()
        win.addEventListener("afterprint", () => {
            win.close()
            URL.revokeObjectURL(url)
        })
    }
}

function RouteComponent() {
    const { basics, sections } = userSampleValue
    const ref = useRef<HTMLDivElement>(null)
    const [style] = useState(`
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
    color: #000;
    background: #fff;
    -webkit-print-color-adjust: exact;
}

@page {
    size: A4;
    margin: 20mm;
}

.page {
    width: 210mm;
    margin: 0 auto;
    font-size: 14px;
}

header {
    margin-bottom: 12px;
}

h1 {
    font-size: 22px;
    margin: 0;
}

h2 {
    font-size: 16px;
    margin-bottom: 6px;
    border-bottom: 1px solid #000;
}

.meta {
    font-size: 13px;
    margin-top: 4px;
}

.row {
    display: flex;
    justify-content: space-between;
}

section {
    margin-bottom: 12px;
    page-break-inside: avoid;
}

ul {
    margin: 4px 0 8px 16px;
}

li {
    margin-bottom: 2px;
    page-break-inside: avoid;
}

a {
    color: inherit;
    text-decoration: none;
}

`)
    const handlePrint = () => {
        const html = ref.current?.innerHTML ?? ""
        printResumePdf({
            style: style,
            html,
        })
    }
    return (
        <>
            {/* Preview (same styles applied) */}
            <style>{style}</style>

            <div ref={ref} className="page">
                {/* HEADER */}
                <header>
                    <h1>{basics.name}</h1>
                    <p>{basics.headline}</p>

                    <div className="meta">
                        {basics.email} | {basics.phone} | {basics.location}
                        {basics.customFields?.map((link: any) => (
                            <span key={link.id}>
                                {" | "}
                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                    {link.label}
                                </a>
                            </span>
                        ))}
                        {basics.website?.showLink && (
                            <span>
                                {" | "}
                                <a href={basics.website.url} target="_blank" rel="noopener noreferrer">
                                    {basics.website.label}
                                </a>
                            </span>
                        )}
                    </div>
                </header>

                {/* SUMMARY */}
                {!sections.summary.hidden && (
                    <section>
                        <h2>{sections.summary.title.toUpperCase()}</h2>
                        <p>{sections.summary.content}</p>
                    </section>
                )}

                {/* EXPERIENCE */}
                {!sections.experience.hidden && (
                    <section>
                        <h2>{sections.experience.title.toUpperCase()}</h2>

                        {sections.experience.items.map((exp: any) => (
                            <div key={exp.id}>
                                <div className="row">
                                    <strong>
                                        {exp.position} | {exp.company}
                                    </strong>
                                    <span>{exp.period}</span>
                                </div>

                                <div>{exp.location}</div>

                                <ul>
                                    {exp.roles.map((role: string, i: number) => (
                                        <li key={i}>{role}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                )}

                {/* PROJECTS */}
                {!sections.projects.hidden && (
                    <section>
                        <h2>{sections.projects.title.toUpperCase()}</h2>

                        {sections.projects.items.map((proj: any) => (
                            <div key={proj.id}>
                                <strong>
                                    {proj.name} {proj.source && `@ ${proj.source}`}
                                </strong>

                                <div>
                                    {proj.links.map((link: any) => (
                                        <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer">
                                            {link.label}
                                        </a>
                                    ))}
                                </div>

                                <div>{proj.keywords.join(", ")}</div>

                                <ul>
                                    {proj.description.split("\n").map((line: string, i: number) => (
                                        <li key={i}>{line.replace("• ", "")}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                )}

                {/* SKILLS */}
                {!sections.skills.hidden && (
                    <section>
                        <h2>{sections.skills.title.toUpperCase()}</h2>

                        {sections.skills.items.map((group: any) => (
                            <div key={group.id}>
                                <strong>{group.name}:</strong> {group.keywords.join(", ")}
                            </div>
                        ))}
                    </section>
                )}

                {/* EDUCATION */}
                {!sections.education.hidden && (
                    <section>
                        <h2>{sections.education.title.toUpperCase()}</h2>

                        {sections.education.items.map((edu: any) => (
                            <div key={edu.id}>
                                <div className="row">
                                    <strong>{edu.degree}</strong>
                                    <span>{edu.period}</span>
                                </div>
                                <div>{edu.school}</div>
                            </div>
                        ))}
                    </section>
                )}

                {/* CERTIFICATIONS */}
                {!sections.certifications.hidden && (
                    <section>
                        <h2>{sections.certifications.title.toUpperCase()}</h2>

                        {sections.certifications.items.map((cert: any) => (
                            <div key={cert.id}>
                                <strong>{cert.title}</strong> — {cert.issuer} ({cert.date})
                            </div>
                        ))}
                    </section>
                )}
            </div>

            {/* PRINT BUTTON */}
            <div style={{ position: "fixed", top: 20, right: 20 }}>
                <button onClick={handlePrint}>Print</button>
            </div>
        </>
    )
}

import { getResumeDefaults } from "./resume-default-values"
import type { ResumeValues } from "../schema/resume.zod-schema"

type ContentItem = ResumeValues["data"]["sections"]["professionalSummary"]["attributes"][number]

function toContent(text: string): ContentItem[] {
    return text
        .split("\n\n")
        .map((value) => value.trim())
        .filter(Boolean)
        .map((value) => ({ id: crypto.randomUUID(), isActive: true, value }))
}

export const resumeShowcaseValues: ResumeValues = (() => {
    const base = getResumeDefaults()

    return {
        ...base,
        data: {
            contactInfo: {
                ...base.data.contactInfo,
                attributes: {
                    name: { isActive: true, value: "Alex Morgan" },
                    email: { isActive: true, value: "alex@example.com" },
                    phone: { isActive: true, value: "+15551234567" },
                    location: { isActive: true, value: "San Francisco, CA" },
                    customFields: [
                        {
                            id: crypto.randomUUID(),
                            isActive: true,
                            variant: "github",
                            icon: "github",
                            label: "GitHub",
                            value: "https://github.com/alexmorgan",
                        },
                        {
                            id: crypto.randomUUID(),
                            isActive: true,
                            variant: "linkedin",
                            icon: "linkedin",
                            label: "LinkedIn",
                            value: "https://linkedin.com/in/alexmorgan",
                        },
                    ],
                },
            },
            sections: {
                targetTitle: {
                    ...base.data.sections.targetTitle,
                    attributes: { isActive: true, name: "Senior Software Engineer" },
                },
                professionalSummary: {
                    ...base.data.sections.professionalSummary,
                    attributes: toContent(
                        `Software engineer with #strong[6+ years of experience] designing and shipping #strong[web applications] used by millions of people. Specializes in #strong[React], #strong[TypeScript], and #strong[distributed systems], with a track record of leading small teams from idea to production. Passionate about #strong[developer experience], #strong[performance], and building products people enjoy using.`,
                    ),
                },
                workExperience: {
                    ...base.data.sections.workExperience,
                    attributes: [
                        {
                            id: crypto.randomUUID(),
                            isActive: true,
                            company: "Nimbus Cloud",
                            position: "Senior Software Engineer",
                            location: "San Francisco, CA",
                            type: "Full-time",
                            startDate: "Mar 2022",
                            endDate: "Present",
                            website: {
                                id: "",
                                isActive: false,
                                variant: "website",
                                icon: "website",
                                label: "",
                                value: "",
                            },
                            content: toContent(`- Led the rebuild of the #strong[customer dashboard] in #strong[Next.js] and #strong[TypeScript], improving page load times by #strong[45%] and cutting bug reports by #strong[30%].

- Designed and shipped a #strong[real-time collaboration feature] used by over #strong[200,000 monthly active users], built on #strong[WebSockets] and #strong[CRDTs].

- Mentored #strong[4 junior engineers] and introduced a peer code-review process that raised release confidence across the team.`),
                        },
                        {
                            id: crypto.randomUUID(),
                            isActive: true,
                            company: "Brightline Labs",
                            position: "Software Engineer",
                            location: "Austin, TX",
                            type: "Full-time",
                            startDate: "Jul 2019",
                            endDate: "Feb 2022",
                            website: {
                                id: "",
                                isActive: false,
                                variant: "website",
                                icon: "website",
                                label: "",
                                value: "",
                            },
                            content: toContent(`- Built and maintained #strong[core billing infrastructure] processing #strong[\\$2M+ in monthly transactions] with #strong[99.99% uptime].

- Migrated a monolithic #strong[Express] API to a #strong[microservices architecture], reducing average response time by #strong[35%].

- Partnered with design to launch a #strong[self-serve onboarding flow], increasing trial-to-paid conversion by #strong[18%].`),
                        },
                        {
                            id: crypto.randomUUID(),
                            isActive: true,
                            company: "Fieldstone Digital",
                            position: "Junior Developer",
                            location: "Remote",
                            type: "Full-time",
                            startDate: "Jun 2018",
                            endDate: "Jun 2019",
                            website: {
                                id: "",
                                isActive: false,
                                variant: "website",
                                icon: "website",
                                label: "",
                                value: "",
                            },
                            content: toContent(`- Developed responsive marketing sites for #strong[10+ clients] using #strong[React] and #strong[Sass].

- Set up automated #strong[testing] and #strong[deployment pipelines], cutting release time from days to hours.`),
                        },
                    ],
                },
                education: {
                    ...base.data.sections.education,
                    attributes: [
                        {
                            id: crypto.randomUUID(),
                            isActive: true,
                            school: "University of Texas at Austin",
                            degree: "B.S. Computer Science",
                            area: "",
                            grade: "",
                            location: "",
                            startDate: "2014",
                            endDate: "2018",
                            dateLabel: "",
                            content: [],
                        },
                    ],
                },
                skills: {
                    ...base.data.sections.skills,
                    columns: 2,
                    attributes: [
                        {
                            id: crypto.randomUUID(),
                            isActive: true,
                            category: "Languages",
                            skill: ["TypeScript", "JavaScript", "Python", "Go"].map((name) => ({
                                id: crypto.randomUUID(),
                                isActive: true,
                                name,
                            })),
                        },
                        {
                            id: crypto.randomUUID(),
                            isActive: true,
                            category: "Frontend",
                            skill: ["React", "Next.js", "Redux", "Tailwind CSS", "GraphQL"].map((name) => ({
                                id: crypto.randomUUID(),
                                isActive: true,
                                name,
                            })),
                        },
                        {
                            id: crypto.randomUUID(),
                            isActive: true,
                            category: "Backend",
                            skill: ["Node.js", "PostgreSQL", "Redis", "REST APIs"].map((name) => ({
                                id: crypto.randomUUID(),
                                isActive: true,
                                name,
                            })),
                        },
                        {
                            id: crypto.randomUUID(),
                            isActive: true,
                            category: "Infrastructure",
                            skill: ["AWS", "Docker", "Kubernetes", "CI/CD"].map((name) => ({
                                id: crypto.randomUUID(),
                                isActive: true,
                                name,
                            })),
                        },
                        {
                            id: crypto.randomUUID(),
                            isActive: true,
                            category: "Practices",
                            skill: ["Agile", "Code Review", "Mentoring", "System Design"].map((name) => ({
                                id: crypto.randomUUID(),
                                isActive: true,
                                name,
                            })),
                        },
                    ],
                },
                certifications: {
                    ...base.data.sections.certifications,
                    attributes: [
                        {
                            id: crypto.randomUUID(),
                            isActive: true,
                            name: "AWS Certified Solutions Architect – Associate",
                            provider: "Amazon Web Services",
                            startDate: "2023",
                            endDate: "",
                        },
                    ],
                },
                awardsScholarships: {
                    ...base.data.sections.awardsScholarships,
                    attributes: [
                        {
                            id: crypto.randomUUID(),
                            isActive: true,
                            title: "Engineering Excellence Award",
                            organization: "Nimbus Cloud",
                            date: "2023",
                        },
                    ],
                },
                projects: {
                    ...base.data.sections.projects,
                    attributes: [
                        {
                            id: crypto.randomUUID(),
                            isActive: true,
                            name: "OpenBoard",
                            organization: "Open Source",
                            links: [],
                            keywords: ["React", "TypeScript", "WebRTC", "Node.js"],
                            startDate: "",
                            endDate: "",
                            content: toContent(`- Built an #strong[open-source collaborative whiteboard] with real-time cursors and drawing sync, used by #strong[1,200+ stars] on GitHub.

- Implemented #strong[conflict-free replicated data types (CRDTs)] to support offline editing and multi-user sync.`),
                        },
                        {
                            id: crypto.randomUUID(),
                            isActive: true,
                            name: "Recipe Vault",
                            organization: "Personal",
                            links: [],
                            keywords: ["Next.js", "PostgreSQL", "Tailwind CSS"],
                            startDate: "",
                            endDate: "",
                            content: toContent(`- Designed and built a #strong[personal recipe manager] with search, tagging, and meal planning.

- Deployed on #strong[Vercel] with a #strong[Postgres] backend, supporting image uploads and full-text search.`),
                        },
                    ],
                },
                volunteeringLeadership: {
                    ...base.data.sections.volunteeringLeadership,
                    attributes: [
                        {
                            id: crypto.randomUUID(),
                            isActive: true,
                            organization: "Code for SF",
                            involvement: "Volunteer Mentor",
                            location: "San Francisco, CA",
                            startDate: "2021",
                            endDate: "Present",
                            content: toContent(
                                `- Mentored #strong[10+ early-career developers] through pair-programming and code review sessions.`,
                            ),
                        },
                    ],
                },
                publications: {
                    ...base.data.sections.publications,
                    attributes: [],
                },
            },
        },
    }
})()
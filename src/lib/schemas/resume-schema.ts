import z from "zod"

const WebsiteSchema = z.object({
    showLink: z.boolean().default(false),
    url: z.string(),
    label: z.string(),
})
const LinkSchema = z.object({
    id: z.string(),
    url: z.string(),
    label: z.string(),
})

const SectionBaseSchema = z.object({
    title: z.string(),
    hidden: z.boolean().default(false),
    columns: z.number().default(1),
})

//
const BasicsSchema = z.object({
    name: z.string(),
    headline: z.string(),
    email: z.string(),
    phone: z.string(),
    location: z.string(),
    website: WebsiteSchema,
    customFields: z.array(LinkSchema),
})
const SummarySchema = z.object({
    title: z.string(),
    hidden: z.boolean().default(false),
    content: z.string(),
})
const ExperienceItemsSchema = z.object({
    id: z.string(),
    hidden: z.boolean().default(false),
    company: z.string(),
    position: z.string(),
    location: z.string(),
    period: z.string(),
    website: LinkSchema,
    description: z.string(),
    roles: z.array(z.string()),
})

const ProjectsItemsSchema = z.object({
    id: z.string(),
    hidden: z.boolean().default(false),
    name: z.string(),
    period: z.string(),
    website: z.array(LinkSchema),
    description: z.string(),
})

const SkillsItemsSchema = z.object({
    id: z.string(),
    hidden: z.boolean().default(false),
    icon: z.string(),
    name: z.string(),
    proficiency: z.string(),
    level: z.number().min(0).max(100),
    keywords: z.array(z.string()),
})

const EducationItemsSchema = z.object({
    id: z.string(),
    hidden: z.boolean().default(false),
    school: z.string(),
    degree: z.string(),
    area: z.string(),
    grade: z.string(),
    location: z.string(),
    period: z.string(),
    website: WebsiteSchema,
    description: z.string(),
})

const CertificationsItemsSchema = z.object({
    id: z.string(),
    hidden: z.boolean().default(false),
    title: z.string(),
    issuer: z.string(),
    date: z.string(),
    website: WebsiteSchema,
    description: z.string(),
})

export const ResumeSchema = z.object({
    basics: BasicsSchema,
    sections: z.object({
        summary: SummarySchema,
        experience: SectionBaseSchema.extend({ items: z.array(ExperienceItemsSchema) }),
        projects: SectionBaseSchema.extend({ items: z.array(ProjectsItemsSchema) }),
        skills: SectionBaseSchema.extend({ items: z.array(SkillsItemsSchema) }),
        education: SectionBaseSchema.extend({ items: z.array(EducationItemsSchema) }),
        certifications: SectionBaseSchema.extend({ items: z.array(CertificationsItemsSchema) }),
    }),
})

export type ResumeValues = z.infer<typeof ResumeSchema>

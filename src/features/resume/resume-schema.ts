import z from "zod"

export const TemplateIdSchema = z.enum(["default"])

// resume sectionns
const WebsiteSchema = z.object({
    showLink: z.boolean(),
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
    hidden: z.boolean(),
    columns: z.number(),
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
    hidden: z.boolean(),
    columns: z.number(),
    content: z.string(),
})
export const SkillsItemSchema = z.object({
    id: z.string(),
    hidden: z.boolean(),
    icon: z.string(),
    name: z.string(),
    proficiency: z.string(),
    level: z.number().min(0).max(100).nullable(),
    keywords: z.array(z.string()),
})
const ExperienceItemSchema = z.object({
    id: z.string(),
    hidden: z.boolean(),
    company: z.string(),
    position: z.string(),
    location: z.string(),
    period: z.string(),
    website: WebsiteSchema,
    description: z.string(),
    roles: z.array(z.string()),
})
const ProjectsItemSchema = z.object({
    id: z.string(),
    hidden: z.boolean(),
    name: z.string(),
    type: z.enum(["personal", "professional", "open-source", "freelance"]),
    source: z.string(),
    keywords: z.array(z.string()),
    period: z.string(),
    links: z.array(LinkSchema),
    description: z.string(),
})

const EducationItemSchema = z.object({
    id: z.string(),
    hidden: z.boolean(),
    school: z.string(),
    degree: z.string(),
    area: z.string(),
    grade: z.string(),
    location: z.string(),
    period: z.string(),
    website: WebsiteSchema,
    description: z.string(),
})

const CertificationsItemSchema = z.object({
    id: z.string(),
    hidden: z.boolean(),
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
        skills: SectionBaseSchema.extend({ items: z.array(SkillsItemSchema) }),
        experience: SectionBaseSchema.extend({ items: z.array(ExperienceItemSchema) }),
        projects: SectionBaseSchema.extend({ items: z.array(ProjectsItemSchema) }),
        education: SectionBaseSchema.extend({ items: z.array(EducationItemSchema) }),
        certifications: SectionBaseSchema.extend({ items: z.array(CertificationsItemSchema) }),
    }),
    // 
    order: z.array(z.string()),
    meta: z.object({
        template: z.object({ id: TemplateIdSchema }),
    }),
})


export type ResumeValues = z.infer<typeof ResumeSchema>

import z from "zod"

const linkSchema = z.object({
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
    website: z.object({
        url: z.string(),
        label: z.string(),
    }),
    customFields: z.array(linkSchema),
})
const SummarySchema = z.object({
    title: z.string(),
    hidden: z.boolean(),
    content: z.string(),
})
const ExperienceItemsSchema = z.object({
    id: z.string(),
    hidden: z.boolean(),
    company: z.string(),
    position: z.string(),
    location: z.string(),
    period: z.string(),
    website: z.object({
        showLink: z.boolean(),
        url: z.string(),
        label: z.string(),
    }),
    description: z.string(),
    roles: z.array(z.string()),
})
const ProjectsItemsSchema = z.object({
    id: z.string(),
    hidden: z.boolean(),
    name: z.string(),
    period: z.string(),
    website: z.array(linkSchema),
    description: z.string(),
})

const SkillsItemsSchema = z.object({
    id: z.string(),
    hidden: z.boolean(),
    icon: z.string(),
    name: z.string(),
    proficiency: z.string(),
    level: z.number().min(0).max(100),
    keywords: z.array(z.string()),
})

const EducationItemsSchema = z.object({
    id: z.string(),
    hidden: z.boolean(),
    school: z.string(),
    degree: z.string(),
    area: z.string(),
    grade: z.string(),
    location: z.string(),
    period: z.string(),
    website: linkSchema,
    description: z.string(),
})

const CertificationsItemsSchema = z.object({
    id: z.string(),
    hidden: z.boolean(),
    title: z.string(),
    issuer: z.string(),
    date: z.string(),
    website: linkSchema,
    description: z.string(),
})

export const ResumeSchema = z.object({
    basics: BasicsSchema,
    summary: SummarySchema,
    sections: z.object({
        experience: SectionBaseSchema.extend({ items: z.array(ExperienceItemsSchema) }),
        projects: SectionBaseSchema.extend({ items: z.array(ProjectsItemsSchema) }),
        skills: SectionBaseSchema.extend({ items: z.array(SkillsItemsSchema) }),
        education: SectionBaseSchema.extend({ items: z.array(EducationItemsSchema) }),
        certifications: SectionBaseSchema.extend({ items: z.array(CertificationsItemsSchema) }),
    }),
    order: z.array(z.string()),
})

export type ResumeValues = z.infer<typeof ResumeSchema>

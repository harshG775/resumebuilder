import { z } from "zod"

const WebsiteSchema = z.object({
    showLink: z.boolean(),
    url: z.url().or(z.literal("")),
    label: z.string(),
})
const LinkSchema = z.object({
    id: z.string(),
    url: z.url().or(z.literal("")),
    label: z.string(),
})

const SectionBaseSchema = z.object({
    title: z.string(),
    hidden: z.boolean(),
    columns: z.number().int().min(1).max(5),
})

//
const BasicsSchema = z.object({
    name: z.string(),
    headline: z.string(),
    email: z.email().or(z.literal("")),
    phone: z.string(),
    location: z.string(),
    website: WebsiteSchema,
    customFields: z.array(LinkSchema),
})

const SummarySchema = z.object({
    title: z.string(),
    hidden: z.boolean(),
    columns: z.number().int().min(1).max(5),
    content: z.string(),
})

export const SkillsItemSchema = z.object({
    id: z.string(),
    hidden: z.boolean(),
    icon: z.string(),
    name: z.string(),
    proficiency: z.string(),
    level: z.number().min(0).max(5),
    keywords: z.array(z.string()),
})

const ExperienceItemSchema = z
    .object({
        id: z.string(),
        hidden: z.boolean(),
        company: z.string(),
        position: z.string(),
        location: z.string(),
        startDate: z.iso.date(),
        endDate: z.iso.date().nullable(),
        website: WebsiteSchema,
        description: z.string(),
        roles: z.array(z.string()),
    })
    .refine((data) => !data.endDate || data.startDate <= data.endDate, {
        message: "End date must be after the start date",
        path: ["endDate"],
    })

const ProjectsItemSchema = z
    .object({
        id: z.string(),
        hidden: z.boolean(),
        name: z.string(),
        type: z.enum(["personal", "professional", "open-source", "freelance"]),
        source: z.string(),
        keywords: z.array(z.string()),
        startDate: z.iso.date(),
        endDate: z.iso.date().nullable(),
        links: z.array(LinkSchema),
        description: z.string(),
    })
    .refine((data) => !data.endDate || data.startDate <= data.endDate, {
        message: "End date must be after the start date",
        path: ["endDate"],
    })

const EducationItemSchema = z
    .object({
        id: z.string(),
        hidden: z.boolean(),
        school: z.string(),
        degree: z.string(),
        area: z.string(),
        grade: z.string(),
        location: z.string(),
        startDate: z.iso.date(),
        endDate: z.iso.date().nullable(),
        website: WebsiteSchema,
        description: z.string(),
    })
    .refine((data) => !data.endDate || data.startDate <= data.endDate, {
        message: "End date must be after the start date",
        path: ["endDate"],
    })

const CertificationsItemSchema = z.object({
    id: z.string(),
    hidden: z.boolean(),
    title: z.string(),
    issuer: z.string(),
    date: z.iso.date(),
    website: WebsiteSchema,
    description: z.string(),
})

export const ResumeZodSchema = z.object({
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
})

export type ResumeValues = z.infer<typeof ResumeZodSchema>

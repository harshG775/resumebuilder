import { z } from "zod"

//
const TemplateZodSchema = z.enum(["classic", "modern"])

export const RESUME_THEME_VERSION = 1

const ThemeColorSchema = z.string().regex(/^#[0-9a-fA-F]{6}$/)

const ResumeThemeZodSchema = z.object({
    version: z.literal(RESUME_THEME_VERSION),
    color: z.object({
        text: ThemeColorSchema,
        textMuted: ThemeColorSchema,
        primary: ThemeColorSchema,
        background: ThemeColorSchema,
        border: ThemeColorSchema,
    }),
    font: z.object({
        body: z.string(),
        heading: z.string(),
    }),
    size: z.object({
        name: z.number(),
        heading: z.number(),
        subheading: z.number(),
        body: z.number(),
        meta: z.number(),
    }),
    weight: z.object({
        heading: z.number(),
        subheading: z.number(),
    }),
    space: z.object({
        sectionGap: z.number().nonnegative(),
        sectionGapAfter: z.number().nonnegative(),
        itemGap: z.number(),
    }),
    border: z.object({
        thickness: z.number(),
    }),
    layout: z.object({
        paper: z.enum(["us-letter", "a4", "us-legal"]),
        margin: z.object({
            x: z.number(),
            y: z.number(),
        }),
    }),
    lang: z.string(),
    leading: z.number(),
})

//
const WebsiteSchema = z.object({
    hidden: z.boolean(),
    value: z.string(),
    label: z.string(),
})

const LinkSchema = z.object({
    id: z.string(),
    value: z.url().or(z.literal("")),
    label: z.string(),
})

const DisplaySchema = z.object({
    hideLinkUnderline: z.boolean(),
    hideIcons: z.boolean(),
    hideSectionIcons: z.boolean(),
})

const SectionBaseSchema = z.object({
    title: z.string(),
    hidden: z.boolean(),
    icon: z.string(),
    columns: z.number().int().min(1).max(5),
})
const SectionKeySchema = z.enum(["summary", "skill", "experience", "project", "education", "certification"])

//
const BasicsSchema = z.object({
    name: z.string(),
    headline: z.string(),
    email: z.object({
        label: z.string(),
        hidden: z.boolean(),
        value: z.email().or(z.literal("")),
    }),
    phone: z.object({
        label: z.string(),
        hidden: z.boolean(),
        value: z.string(),
    }),
    location: z.string(),
    website: WebsiteSchema,
    customFields: z.array(LinkSchema),
})

export const SkillsItemSchema = z.object({
    id: z.string(),
    hidden: z.boolean(),
    icon: z.string(),
    name: z.string(),
    proficiency: z.string(),
    level: z.number().int().min(1).max(5),
    keywords: z.array(z.string()),
})

const ExperienceItemSchema = z.object({
    id: z.string(),
    hidden: z.boolean(),
    company: z.string(),
    position: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    website: WebsiteSchema,
    content: z.string(),
})

const ProjectsItemSchema = z.object({
    id: z.string(),
    hidden: z.boolean(),
    name: z.string(),
    type: z.enum(["personal", "professional", "open-source", "freelance"]),
    links: z.array(LinkSchema),
    keywords: z.array(z.string()),
    startDate: z.string(),
    endDate: z.string(),
    content: z.string(),
})

const EducationItemSchema = z.object({
    id: z.string(),
    hidden: z.boolean(),
    school: z.string(),
    degree: z.string(),
    area: z.string(),
    grade: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    website: WebsiteSchema,
    content: z.string(),
})

const CertificationsItemSchema = z.object({
    id: z.string(),
    hidden: z.boolean(),
    title: z.string(),
    issuer: z.string(),
    date: z.string(),
    website: WebsiteSchema,
    content: z.string(),
})

export const ResumeZodSchema = z.object({
    basics: BasicsSchema,
    sections: z.object({
        summary: SectionBaseSchema.extend({ content: z.string() }),
        skill: SectionBaseSchema.extend({ items: z.array(SkillsItemSchema) }),
        experience: SectionBaseSchema.extend({ items: z.array(ExperienceItemSchema) }),
        project: SectionBaseSchema.extend({ items: z.array(ProjectsItemSchema) }),
        education: SectionBaseSchema.extend({ items: z.array(EducationItemSchema) }),
        certification: SectionBaseSchema.extend({ items: z.array(CertificationsItemSchema) }),
    }),
    //
    meta: z.object({
        template: TemplateZodSchema,
        theme: ResumeThemeZodSchema,
        display: DisplaySchema,
        layout: z.object({
            pages: z.array(z.object({ main: z.array(SectionKeySchema) })),
        }),
    }),
})

export type ResumeValues = z.infer<typeof ResumeZodSchema>

// version 2
import { z } from "zod"

export const CustomFieldVariantSchema = z.enum(["linkedin", "github", "twitter", "website", "portfolio", "text"])

export const CustomFieldSchema = z.object({
    id: z.string(),
    isActive: z.boolean(),
    variant: CustomFieldVariantSchema,
    icon: z.string(),
    label: z.string(),
    value: z.string(),
})

// ── Sections ──────────────────────────────────────

const ContactInfoSchema = z.object({
    type: z.literal("contactInfo"),
    title: z.string(),
    icon: z.string(),
    isActive: z.boolean(),
    attributes: z.object({
        name: z.object({
            isActive: z.boolean(),
            value: z.string(),
        }),
        email: z.object({
            isActive: z.boolean(),
            value: z.string(),
        }),
        phone: z.object({
            isActive: z.boolean(),
            value: z.string(),
        }),
        location: z.object({
            isActive: z.boolean(),
            value: z.string(),
        }), // in the frontend location will be split in address-city-state
        customFields: z.array(CustomFieldSchema), // will add default two items linkedin,website already created
    }),
})

// TargetTitleSchema previously was headline inside the BasicsSchema
const TargetTitleSchema = z.object({
    type: z.literal("targetTitle"),
    title: z.string(),
    icon: z.string(),
    isActive: z.boolean(),
    attributes: z.object({
        isActive: z.boolean(),
        name: z.string(),
    }),
})

const ProfessionalSummarySchema = z.object({
    type: z.literal("professionalSummary"),
    title: z.string(),
    icon: z.string(),
    isActive: z.boolean(),
    attributes: z.array(
        z.object({
            content: z.string(), // string literal typst
        }),
    ),
})

const WorkExperienceSchema = z.object({
    type: z.literal("workExperience"),
    title: z.string(),
    icon: z.string(),
    isActive: z.boolean(),
    attributes: z.array(
        z.object({
            id: z.string(),
            isActive: z.boolean(),
            company: z.string(),
            position: z.string(),
            location: z.string(),
            type: z.enum(["Full-time", "Part-time", "Internship", "Teaching", "Board", "Contractor", "Freelancer"]),
            startDate: z.string(),
            endDate: z.string(),
            website: CustomFieldSchema,
            content: z.string(), // string literal typst
        }),
    ),
})

const EducationSchema = z.object({
    type: z.literal("education"),
    title: z.string(),
    icon: z.string(),
    isActive: z.boolean(),
    attributes: z.array(
        z.object({
            id: z.string(),
            isActive: z.boolean(),
            school: z.string(),
            degree: z.string(),
            area: z.string(),
            grade: z.string(),
            location: z.string(),
            startDate: z.string(),
            endDate: z.string(),
            dateLabel: z.enum(["", "Expected", "Anticipated", "Exp."]),
            content: z.string(),
        }),
    ),
})

const SkillsSchema = z.object({
    type: z.literal("skills"),
    title: z.string(),
    icon: z.string(),
    isActive: z.boolean(),
    columns: z.number().int().min(1).max(5),
    attributes: z.array(
        z.object({
            isActive: z.boolean(),
            id: z.string(),
            category: z.string(), // Languages
            skill: z.array(
                z.object({
                    isActive: z.boolean(),
                    name: z.string(),
                }),
            ), // javascript, typescript, python
        }),
    ),
})

const CertificationsSchema = z.object({
    type: z.literal("certifications"),
    title: z.string(),
    icon: z.string(),
    isActive: z.boolean(),
    attributes: z.array(
        z.object({
            isActive: z.boolean(),
            id: z.string(),
            name: z.string(),
            provider: z.string(),
            startDate: z.string(),
            endDate: z.string(),
        }),
    ),
})

const AwardsScholarshipsSchema = z.object({
    type: z.literal("awardsScholarships"),
    title: z.string(),
    icon: z.string(),
    isActive: z.boolean(),
    attributes: z.array(
        z.object({
            isActive: z.boolean(),
            id: z.string(),
            title: z.string(),
            organization: z.string(),
            date: z.string(),
        }),
    ),
})

const ProjectsSchema = z.object({
    type: z.literal("projects"),
    title: z.string(),
    icon: z.string(),
    isActive: z.boolean(),
    attributes: z.array(
        z.object({
            isActive: z.boolean(),
            id: z.string(),
            name: z.string(),
            organization: z.string(),
            keywords: z.array(z.string()),
            startDate: z.string(),
            endDate: z.string(),
            links: z.array(CustomFieldSchema),
            content: z.string(), // string literal typst
        }),
    ),
})

const VolunteeringLeadershipSchema = z.object({
    type: z.literal("volunteeringLeadership"),
    title: z.string(),
    icon: z.string(),
    isActive: z.boolean(),
    attributes: z.array(
        z.object({
            isActive: z.boolean(),
            id: z.string(),
            organization: z.string(),
            involvement: z.string(),
            location: z.string(), // in the frontend location will be split in address-city-state
            startDate: z.string(),
            endDate: z.string(),
            content: z.string(), // string literal typst
        }),
    ),
})

const PublicationsSchema = z.object({
    type: z.literal("publications"),
    title: z.string(),
    icon: z.string(),
    isActive: z.boolean(),
    attributes: z.array(
        z.object({
            isActive: z.boolean(),
            id: z.string(),
            title: z.string(),
            publisher: z.string(),
            date: z.string(),
            content: z.string(), // string literal typst
        }),
    ),
})

// ── Section key enum ────────────────────────────────────────
const SectionKeySchema = z.enum([
    "contactInfo",
    "targetTitle",
    "professionalSummary",
    "workExperience",
    "education",
    "skills",
    "certifications",
    "awardsScholarships",
    "projects",
    "volunteeringLeadership",
    "publications",
])

// ── Meta schema ──────────────────────────────────────
const TemplateZodSchema = z.enum(["classic", "modern"])

const ThemeColorSchema = z.string().regex(/^#[0-9a-fA-F]{6}$/)

const ResumeThemeZodSchema = z.object({
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

export const ResumeZodSchema = z.object({
    data: z.object({
        contactInfo: ContactInfoSchema,
        sections: z.object({
            targetTitle: TargetTitleSchema,
            professionalSummary: ProfessionalSummarySchema,
            workExperience: WorkExperienceSchema,
            education: EducationSchema,
            skills: SkillsSchema,
            certifications: CertificationsSchema,
            awardsScholarships: AwardsScholarshipsSchema,
            projects: ProjectsSchema,
            volunteeringLeadership: VolunteeringLeadershipSchema,
            publications: PublicationsSchema,
        }),
    }),
    meta: z.object({
        templateId: TemplateZodSchema,
        theme: ResumeThemeZodSchema,
        display: z.object({
            hideLinkUnderline: z.boolean(),
            hideIcons: z.boolean(),
            hideSectionIcons: z.boolean(),
        }),
        sectionOrder: z.array(SectionKeySchema),
    }),
})

export type ResumeValues = z.infer<typeof ResumeZodSchema>

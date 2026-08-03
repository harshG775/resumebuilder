// version 2
import { z } from "zod"

export const CustomFieldVariantSchema = z.enum(["linkedin", "github", "twitter", "website", "portfolio", "text"])

export const CustomFieldSchema = z.object({
    id: z.string().default(""),
    isActive: z.boolean().default(true),
    variant: CustomFieldVariantSchema.default("text"),
    icon: z.string().default(""),
    label: z.string().default(""),
    value: z.string().default(""),
})

// ── Sections ──────────────────────────────────────

const ContactInfoSchema = z.object({
    type: z.literal("contactInfo").default("contactInfo"),
    title: z.string().default("Contact"),
    icon: z.string().default(""),
    isActive: z.boolean().default(true),
    attributes: z.object({
        name: z.object({
            isActive: z.boolean().default(true),
            value: z.string().default(""),
        }),
        email: z.object({
            isActive: z.boolean().default(true),
            value: z.string().default(""),
        }),
        phone: z.object({
            isActive: z.boolean().default(true),
            value: z.string().default(""),
        }),
        location: z.object({
            isActive: z.boolean().default(true),
            value: z.string().default(""),
        }), // in the frontend location will be split in address-city-state
        customFields: z.array(CustomFieldSchema).default([
            { id: "linkedin", isActive: true, variant: "linkedin", icon: "linkedin", label: "LinkedIn", value: "" },
            { id: "website", isActive: true, variant: "website", icon: "website", label: "Website", value: "" },
        ]),
    }),
})

// TargetTitleSchema previously was headline inside the BasicsSchema
const TargetTitleSchema = z.object({
    type: z.literal("targetTitle").default("targetTitle"),
    title: z.string().default("Target Title"),
    icon: z.string().default(""),
    isActive: z.boolean().default(true),
    attributes: z.object({
        isActive: z.boolean().default(true),
        name: z.string().default(""),
    }),
})

const ProfessionalSummarySchema = z.object({
    type: z.literal("professionalSummary").default("professionalSummary"),
    title: z.string().default("Professional Summary"),
    icon: z.string().default(""),
    isActive: z.boolean().default(true),
    attributes: z
        .array(
            z.object({
                content: z.string().default(""), // string literal typst
            }),
        )
        .default([]),
})

const WorkExperienceSchema = z.object({
    type: z.literal("workExperience").default("workExperience"),
    title: z.string().default("Work Experience"),
    icon: z.string().default(""),
    isActive: z.boolean().default(true),
    attributes: z
        .array(
            z.object({
                id: z.string().default(""),
                isActive: z.boolean().default(true),
                company: z.string().default(""),
                position: z.string().default(""),
                location: z.string().default(""),
                type: z
                    .enum(["Full-time", "Part-time", "Internship", "Teaching", "Board", "Contractor", "Freelancer"])
                    .default("Full-time"),
                startDate: z.string().default(""),
                endDate: z.string().default(""),
                website: CustomFieldSchema.default({
                    id: "",
                    isActive: true,
                    variant: "website",
                    icon: "website",
                    label: "Website",
                    value: "",
                }),
                content: z.string().default(""), // string literal typst
            }),
        )
        .default([]),
})

const EducationSchema = z.object({
    type: z.literal("education").default("education"),
    title: z.string().default("Education"),
    icon: z.string().default(""),
    isActive: z.boolean().default(true),
    attributes: z
        .array(
            z.object({
                id: z.string().default(""),
                isActive: z.boolean().default(true),
                school: z.string().default(""),
                degree: z.string().default(""),
                area: z.string().default(""),
                grade: z.string().default(""),
                location: z.string().default(""),
                startDate: z.string().default(""),
                endDate: z.string().default(""),
                dateLabel: z.enum(["", "Expected", "Anticipated", "Exp."]).default(""),
                content: z.string().default(""),
            }),
        )
        .default([]),
})

const SkillsSchema = z.object({
    type: z.literal("skills").default("skills"),
    title: z.string().default("Skills"),
    icon: z.string().default(""),
    isActive: z.boolean().default(true),
    columns: z.number().int().min(1).max(5).default(2),
    attributes: z
        .array(
            z.object({
                isActive: z.boolean().default(true),
                id: z.string().default(""),
                category: z.string().default(""), // Languages
                skill: z
                    .array(
                        z.object({
                            isActive: z.boolean().default(true),
                            name: z.string().default(""),
                        }),
                    )
                    .default([]), // javascript, typescript, python
            }),
        )
        .default([]),
})

const CertificationsSchema = z.object({
    type: z.literal("certifications").default("certifications"),
    title: z.string().default("Certifications"),
    icon: z.string().default(""),
    isActive: z.boolean().default(true),
    attributes: z
        .array(
            z.object({
                isActive: z.boolean().default(true),
                id: z.string().default(""),
                name: z.string().default(""),
                provider: z.string().default(""),
                startDate: z.string().default(""),
                endDate: z.string().default(""),
            }),
        )
        .default([]),
})

const AwardsScholarshipsSchema = z.object({
    type: z.literal("awardsScholarships").default("awardsScholarships"),
    title: z.string().default("Awards & Scholarships"),
    icon: z.string().default(""),
    isActive: z.boolean().default(true),
    attributes: z
        .array(
            z.object({
                isActive: z.boolean().default(true),
                id: z.string().default(""),
                title: z.string().default(""),
                organization: z.string().default(""),
                date: z.string().default(""),
            }),
        )
        .default([]),
})

const ProjectsSchema = z.object({
    type: z.literal("projects").default("projects"),
    title: z.string().default("Projects"),
    icon: z.string().default(""),
    isActive: z.boolean().default(true),
    attributes: z
        .array(
            z.object({
                isActive: z.boolean().default(true),
                id: z.string().default(""),
                name: z.string().default(""),
                organization: z.string().default(""),
                keywords: z.array(z.string()).default([]),
                startDate: z.string().default(""),
                endDate: z.string().default(""),
                links: z.array(CustomFieldSchema).default([]),
                content: z.string().default(""), // string literal typst
            }),
        )
        .default([]),
})

const VolunteeringLeadershipSchema = z.object({
    type: z.literal("volunteeringLeadership").default("volunteeringLeadership"),
    title: z.string().default("Volunteering & Leadership"),
    icon: z.string().default(""),
    isActive: z.boolean().default(true),
    attributes: z
        .array(
            z.object({
                isActive: z.boolean().default(true),
                id: z.string().default(""),
                organization: z.string().default(""),
                involvement: z.string().default(""),
                location: z.string().default(""), // in the frontend location will be split in address-city-state
                startDate: z.string().default(""),
                endDate: z.string().default(""),
                content: z.string().default(""), // string literal typst
            }),
        )
        .default([]),
})

const PublicationsSchema = z.object({
    type: z.literal("publications").default("publications"),
    title: z.string().default("Publications"),
    icon: z.string().default(""),
    isActive: z.boolean().default(true),
    attributes: z
        .array(
            z.object({
                isActive: z.boolean().default(true),
                id: z.string().default(""),
                title: z.string().default(""),
                publisher: z.string().default(""),
                date: z.string().default(""),
                content: z.string().default(""), // string literal typst
            }),
        )
        .default([]),
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
        text: ThemeColorSchema.default("#111111"),
        textMuted: ThemeColorSchema.default("#6b7280"),
        primary: ThemeColorSchema.default("#2563eb"),
        background: ThemeColorSchema.default("#ffffff"),
        border: ThemeColorSchema.default("#e5e7eb"),
    }),
    font: z.object({
        body: z.string().default("Inter"),
        heading: z.string().default("Inter"),
    }),
    size: z.object({
        name: z.number().default(20),
        heading: z.number().default(14),
        subheading: z.number().default(12),
        body: z.number().default(10),
        meta: z.number().default(9),
    }),
    weight: z.object({
        heading: z.number().default(700),
        subheading: z.number().default(600),
    }),
    space: z.object({
        sectionGap: z.number().nonnegative().default(12),
        sectionGapAfter: z.number().nonnegative().default(6),
        itemGap: z.number().default(4),
    }),
    border: z.object({
        thickness: z.number().default(1),
    }),
    layout: z.object({
        paper: z.enum(["us-letter", "a4", "us-legal"]).default("us-letter"),
        margin: z.object({
            x: z.number().default(36),
            y: z.number().default(36),
        }),
    }),
    lang: z.string().default("en"),
    leading: z.number().default(1.4),
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
        templateId: TemplateZodSchema.default("classic"),
        theme: ResumeThemeZodSchema,
        display: z.object({
            hideLinkUnderline: z.boolean().default(false),
            hideIcons: z.boolean().default(false),
            hideSectionIcons: z.boolean().default(false),
        }),
        sectionOrder: z
            .array(SectionKeySchema)
            .default([
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
            ]),
    }),
})

export type ResumeValues = z.infer<typeof ResumeZodSchema>

// ── Default value generation ──────────────────────────────────────
// Walks the schema tree directly (rather than relying on `.parse({})` cascading,
// which would require every nested z.object() to also be wrapped in `.default({})`)
// so only leaf fields need a `.default(...)` above.
function getDefaults(schema: z.ZodType): unknown {
    if (schema instanceof z.ZodDefault) {
        return schema.parse(undefined)
    }

    if (schema instanceof z.ZodObject) {
        const shape = schema.shape as Record<string, z.ZodType>
        return Object.fromEntries(Object.entries(shape).map(([key, value]) => [key, getDefaults(value)]))
    }

    if (schema instanceof z.ZodArray) {
        return []
    }

    return undefined
}

export function getResumeDefaults(): ResumeValues {
    return getDefaults(ResumeZodSchema) as ResumeValues
}
console.log(JSON.stringify(getResumeDefaults(), null, 2))

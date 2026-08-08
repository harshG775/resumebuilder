import { ResumeZodSchema } from "../../schema/resume.zod-schema"
import type { ResumeValues } from "../../schema/resume.zod-schema"
import { classicTypstSource } from "./typst-source"

function escapeTypstString(text: string): string {
    return text.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
}

// Maps the schema's camelCase section keys to the kebab-case keys used on the Typst side.
const SECTION_KEY_TO_TYPST: Record<ResumeValues["meta"]["sectionOrder"][number], string> = {
    contactInfo: "contact-info",
    targetTitle: "target-title",
    professionalSummary: "professional-summary",
    workExperience: "work-experience",
    education: "education",
    skills: "skills",
    certifications: "certifications",
    awardsScholarships: "awards-scholarships",
    projects: "projects",
    volunteeringLeadership: "volunteering-leadership",
    publications: "publications",
}

type CustomField = ResumeValues["data"]["contactInfo"]["attributes"]["customFields"][number]

const customFieldDict = (f: CustomField) => `(
                id: "${escapeTypstString(f.id)}",
                is-active: ${f.isActive},
                label: "${escapeTypstString(f.label)}",
                value: "${escapeTypstString(f.value)}",
            )`

const customFieldListTypst = (fields: CustomField[]) => fields.map((f) => `\n            ${customFieldDict(f)},`).join("")

type ContentItem = ResumeValues["data"]["sections"]["workExperience"]["attributes"][number]["content"][number]

const contentItemsTypst = (items: ContentItem[]) =>
    items.map((c) => `\n            (is-active: ${c.isActive}, value: [${c.value}]),`).join("")

const typstStringArray = (values: string[]) =>
    `(${values.map((v) => `"${escapeTypstString(v)}"`).join(", ")}${values.length === 1 ? "," : ""})`

// Converts validated resume data into a Typst `#let content = (...)` literal, prepended to
// `classicTypstSource` to form the full compilable document (see `buildClassicSource`).
function convertToTypstContent(values: ResumeValues): string {
    const parsed = ResumeZodSchema.safeParse(values)
    if (!parsed.success) {
        const issues = parsed.error.issues
            .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
            .join("\n")
        throw new Error(`Invalid resume data, cannot generate Typst source:\n${issues}`)
    }
    const { data, meta } = parsed.data
    const { contactInfo, sections } = data

    const sectionOrder = typstStringArray(meta.sectionOrder.map((key) => SECTION_KEY_TO_TYPST[key]))

    const workExperienceItems = sections.workExperience.attributes
        .map(
            (item) => `
            (
                is-active: ${item.isActive},
                company: "${escapeTypstString(item.company)}",
                position: "${escapeTypstString(item.position)}",
                location: "${escapeTypstString(item.location)}",
                start-date: "${escapeTypstString(item.startDate)}",
                end-date: "${escapeTypstString(item.endDate)}",
                website: ${customFieldDict(item.website)},
                content: (${contentItemsTypst(item.content)}
                ),
            ),`,
        )
        .join("")

    const educationItems = sections.education.attributes
        .map(
            (item) => `
            (
                is-active: ${item.isActive},
                school: "${escapeTypstString(item.school)}",
                degree: "${escapeTypstString(item.degree)}",
                location: "${escapeTypstString(item.location)}",
                start-date: "${escapeTypstString(item.startDate)}",
                end-date: "${escapeTypstString(item.endDate)}",
                date-label: "${escapeTypstString(item.dateLabel)}",
                content: (${contentItemsTypst(item.content)}
                ),
            ),`,
        )
        .join("")

    const skillsItems = sections.skills.attributes
        .map(
            (item) => `
            (
                is-active: ${item.isActive},
                category: "${escapeTypstString(item.category)}",
                skill: (${item.skill
                    .map(
                        (s) => `
                    (is-active: ${s.isActive}, name: "${escapeTypstString(s.name)}"),`,
                    )
                    .join("")}
                ),
            ),`,
        )
        .join("")

    const certificationItems = sections.certifications.attributes
        .map(
            (item) => `
            (
                is-active: ${item.isActive},
                name: "${escapeTypstString(item.name)}",
                provider: "${escapeTypstString(item.provider)}",
                start-date: "${escapeTypstString(item.startDate)}",
                end-date: "${escapeTypstString(item.endDate)}",
            ),`,
        )
        .join("")

    const awardsScholarshipsItems = sections.awardsScholarships.attributes
        .map(
            (item) => `
            (
                is-active: ${item.isActive},
                title: "${escapeTypstString(item.title)}",
                organization: "${escapeTypstString(item.organization)}",
                date: "${escapeTypstString(item.date)}",
            ),`,
        )
        .join("")

    const projectItems = sections.projects.attributes
        .map(
            (item) => `
            (
                is-active: ${item.isActive},
                name: "${escapeTypstString(item.name)}",
                organization: "${escapeTypstString(item.organization)}",
                keywords: ${typstStringArray(item.keywords)},
                start-date: "${escapeTypstString(item.startDate)}",
                end-date: "${escapeTypstString(item.endDate)}",
                links: (${customFieldListTypst(item.links)}
                ),
                content: (${contentItemsTypst(item.content)}
                ),
            ),`,
        )
        .join("")

    const volunteeringLeadershipItems = sections.volunteeringLeadership.attributes
        .map(
            (item) => `
            (
                is-active: ${item.isActive},
                organization: "${escapeTypstString(item.organization)}",
                involvement: "${escapeTypstString(item.involvement)}",
                location: "${escapeTypstString(item.location)}",
                start-date: "${escapeTypstString(item.startDate)}",
                end-date: "${escapeTypstString(item.endDate)}",
                content: (${contentItemsTypst(item.content)}
                ),
            ),`,
        )
        .join("")

    const publicationsItems = sections.publications.attributes
        .map(
            (item) => `
            (
                is-active: ${item.isActive},
                title: "${escapeTypstString(item.title)}",
                publisher: "${escapeTypstString(item.publisher)}",
                date: "${escapeTypstString(item.date)}",
                content: (${contentItemsTypst(item.content)}
                ),
            ),`,
        )
        .join("")

    return `
#let content = (
    data: (
        contact-info: (
            attributes: (
                name: (is-active: ${contactInfo.attributes.name.isActive}, value: "${escapeTypstString(contactInfo.attributes.name.value)}"),
                email: (is-active: ${contactInfo.attributes.email.isActive}, value: "${escapeTypstString(contactInfo.attributes.email.value)}"),
                phone: (is-active: ${contactInfo.attributes.phone.isActive}, value: "${escapeTypstString(contactInfo.attributes.phone.value)}"),
                location: (is-active: ${contactInfo.attributes.location.isActive}, value: "${escapeTypstString(contactInfo.attributes.location.value)}"),
                custom-fields: (${customFieldListTypst(contactInfo.attributes.customFields)}
                ),
            ),
        ),
        sections: (
            target-title: (
                is-active: ${sections.targetTitle.isActive},
                attributes: (
                    is-active: ${sections.targetTitle.attributes.isActive},
                    name: "${escapeTypstString(sections.targetTitle.attributes.name)}",
                ),
            ),
            professional-summary: (
                is-active: ${sections.professionalSummary.isActive},
                title: "${escapeTypstString(sections.professionalSummary.title)}",
                attributes: (${sections.professionalSummary.attributes
                    .map((attr) => `\n                    (is-active: ${attr.isActive}, value: [${attr.value}]),`)
                    .join("")}
                ),
            ),
            work-experience: (
                is-active: ${sections.workExperience.isActive},
                title: "${escapeTypstString(sections.workExperience.title)}",
                attributes: (${workExperienceItems}
                ),
            ),
            education: (
                is-active: ${sections.education.isActive},
                title: "${escapeTypstString(sections.education.title)}",
                attributes: (${educationItems}
                ),
            ),
            skills: (
                is-active: ${sections.skills.isActive},
                title: "${escapeTypstString(sections.skills.title)}",
                attributes: (${skillsItems}
                ),
            ),
            certifications: (
                is-active: ${sections.certifications.isActive},
                title: "${escapeTypstString(sections.certifications.title)}",
                attributes: (${certificationItems}
                ),
            ),
            awards-scholarships: (
                is-active: ${sections.awardsScholarships.isActive},
                title: "${escapeTypstString(sections.awardsScholarships.title)}",
                attributes: (${awardsScholarshipsItems}
                ),
            ),
            projects: (
                is-active: ${sections.projects.isActive},
                title: "${escapeTypstString(sections.projects.title)}",
                attributes: (${projectItems}
                ),
            ),
            volunteering-leadership: (
                is-active: ${sections.volunteeringLeadership.isActive},
                title: "${escapeTypstString(sections.volunteeringLeadership.title)}",
                attributes: (${volunteeringLeadershipItems}
                ),
            ),
            publications: (
                is-active: ${sections.publications.isActive},
                title: "${escapeTypstString(sections.publications.title)}",
                attributes: (${publicationsItems}
                ),
            ),
        ),
    ),
    meta: (
        theme: (
            color: (
                text: "${escapeTypstString(meta.theme.color.text)}",
                text-muted: "${escapeTypstString(meta.theme.color.textMuted)}",
                primary: "${escapeTypstString(meta.theme.color.primary)}",
                background: "${escapeTypstString(meta.theme.color.background)}",
                border: "${escapeTypstString(meta.theme.color.border)}",
            ),
            font: (
                body: "${escapeTypstString(meta.theme.font.body)}",
                heading: "${escapeTypstString(meta.theme.font.heading)}",
            ),
            size: (
                name: ${meta.theme.size.name},
                heading: ${meta.theme.size.heading},
                subheading: ${meta.theme.size.subheading},
                body: ${meta.theme.size.body},
                meta: ${meta.theme.size.meta},
            ),
            weight: (
                heading: ${meta.theme.weight.heading},
                subheading: ${meta.theme.weight.subheading},
            ),
            space: (
                section-gap: ${meta.theme.space.sectionGap},
                section-gap-after: ${meta.theme.space.sectionGapAfter},
                item-gap: ${meta.theme.space.itemGap},
            ),
            border: (thickness: ${meta.theme.border.thickness}),
            layout: (
                paper: "${escapeTypstString(meta.theme.layout.paper)}",
                margin: (x: ${meta.theme.layout.margin.x}, y: ${meta.theme.layout.margin.y}),
            ),
            lang: "${escapeTypstString(meta.theme.lang)}",
            leading: ${meta.theme.leading},
        ),
        display: (
            hide-link-underline: ${meta.display.hideLinkUnderline},
            hide-icons: ${meta.display.hideIcons},
            hide-section-icons: ${meta.display.hideSectionIcons},
        ),
        section-order: ${sectionOrder},
    ),
)
`
}

export function buildClassicSource(values: ResumeValues): string {
    return `${convertToTypstContent(values)}\n${classicTypstSource}`
}

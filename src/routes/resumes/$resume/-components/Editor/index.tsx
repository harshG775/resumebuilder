import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field"
import { useForm } from "@tanstack/react-form"
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"

import { z } from "zod"
import { Input } from "#/components/ui/input"
import { Textarea } from "#/components/ui/textarea"
import { Button } from "#/components/ui/button"
import { Tag } from "lucide-react"

const SectionUnionSchema = z.union([
    z.literal("basics"),
    z.literal("summary"),
    z.literal("experience"),
    z.literal("projects"),
    z.literal("skills"),
    z.literal("education"),
    z.literal("certifications"),
])
type SectionUnionType = z.infer<typeof SectionUnionSchema>

const BasicsSectionSchema = z.object({
    name: z.string(),
    headline: z.string(),
    email: z.email(),
    phone: z.string(),
    location: z.string(),

    website: z.object({
        url: z.url().or(z.literal("")),
        label: z.string(),
    }),

    links: z.array(
        z.object({
            id: z.string(),
            url: z.url().or(z.literal("")),
            label: z.string(),
        }),
    ),
})
type BasicsSection = {
    id: string
    type: "basics"
    order: number
    content: z.infer<typeof BasicsSectionSchema>
}

type SummarySection = {
    id: string
    type: "summary"
    order: number
    content: Record<string, never>
}
type ExperienceSection = {
    id: string
    type: "experience"
    order: number
    content: Record<string, never>
}
type ProjectsSection = {
    id: string
    type: "projects"
    order: number
    content: Record<string, never>
}
type SkillsSection = {
    id: string
    type: "skills"
    order: number
    content: Record<string, never>
}
type EducationSection = {
    id: string
    type: "education"
    order: number
    content: Record<string, never>
}
type CertificationsSection = {
    id: string
    type: "certifications"
    order: number
    content: Record<string, never>
}

type Section =
    | BasicsSection
    | SummarySection
    | ExperienceSection
    | ProjectsSection
    | SkillsSection
    | EducationSection
    | CertificationsSection

const sectionData: Section[] = [
    {
        id: "basics-id",
        type: "basics",
        order: 0,
        content: {
            name: "",
            headline: "",
            email: "",
            phone: "",
            location: "",
            website: { url: "", label: "" },
            links: [{ id: crypto.randomUUID(), url: "", label: "" }],
        },
    },
    {
        id: "summary-id",
        type: "summary",
        order: 1,
        content: {},
    },
    {
        id: "experience-id",
        type: "experience",
        order: 1,
        content: {},
    },
    {
        id: "projects-id",
        type: "projects",
        order: 2,
        content: {},
    },
    {
        id: "skills-id",
        type: "skills",
        order: 3,
        content: {},
    },
    {
        id: "education-id",
        type: "education",
        order: 4,
        content: {},
    },
    {
        id: "certifications-id",
        type: "certifications",
        order: 5,
        content: {},
    },
]

export default function Editor() {
    const form = useForm({
        defaultValues: {
            sections: sectionData,
        },
    })
    console.log(form.state.values)

    return (
        <div className="p-4 mx-auto max-w-lg">
            <FieldGroup>
                <form.Field
                    name="sections"
                    mode="array"
                    children={(field) => (
                        <>
                            {field.state.value.map((section, idx) => {
                                switch (section.type) {
                                    case "basics": {
                                        const base = `sections[${idx}].content` as const

                                        return (
                                            <FieldSet key={idx}>
                                                <FieldLegend className="font-bold text-2xl!">Basics</FieldLegend>
                                                <FieldGroup>
                                                    <form.Field
                                                        name={`${base}.name`}
                                                        children={(field) => (
                                                            <Field>
                                                                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                                                <Input
                                                                    id={field.name}
                                                                    value={field.state.value}
                                                                    onBlur={field.handleBlur}
                                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                                    autoComplete="off"
                                                                />
                                                            </Field>
                                                        )}
                                                    />

                                                    <form.Field
                                                        name={`${base}.headline`}
                                                        children={(field) => (
                                                            <Field>
                                                                <FieldLabel htmlFor={field.name}>Headline</FieldLabel>
                                                                <Input
                                                                    id={field.name}
                                                                    value={field.state.value}
                                                                    onBlur={field.handleBlur}
                                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                                    autoComplete="off"
                                                                />
                                                            </Field>
                                                        )}
                                                    />

                                                    <form.Field
                                                        name={`${base}.email`}
                                                        children={(field) => (
                                                            <Field>
                                                                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                                                <Input
                                                                    type="email"
                                                                    id={field.name}
                                                                    value={field.state.value}
                                                                    onBlur={field.handleBlur}
                                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                                    autoComplete="off"
                                                                />
                                                            </Field>
                                                        )}
                                                    />
                                                    <form.Field
                                                        name={`${base}.phone`}
                                                        children={(field) => (
                                                            <Field>
                                                                <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                                                                <Input
                                                                    type="tel"
                                                                    id={field.name}
                                                                    value={field.state.value}
                                                                    onBlur={field.handleBlur}
                                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                                    autoComplete="off"
                                                                />
                                                            </Field>
                                                        )}
                                                    />

                                                    <form.Field
                                                        name={`${base}.location`}
                                                        children={(field) => (
                                                            <Field>
                                                                <FieldLabel htmlFor={field.name}>Location</FieldLabel>
                                                                <Input
                                                                    id={field.name}
                                                                    value={field.state.value}
                                                                    onBlur={field.handleBlur}
                                                                    onChange={(e) => field.handleChange(e.target.value)}
                                                                    autoComplete="off"
                                                                />
                                                            </Field>
                                                        )}
                                                    />
                                                    <div className="flex gap-2 items-end">
                                                        <form.Field name={`${base}.website.url`}>
                                                            {(field) => (
                                                                <Field>
                                                                    <FieldLabel htmlFor={field.name}>
                                                                        Website
                                                                    </FieldLabel>
                                                                    <Input
                                                                        value={field.state.value}
                                                                        onBlur={field.handleBlur}
                                                                        onChange={(e) =>
                                                                            field.handleChange(e.target.value)
                                                                        }
                                                                        placeholder="https://"
                                                                    />
                                                                </Field>
                                                            )}
                                                        </form.Field>

                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <Button variant="outline">
                                                                    <Tag />
                                                                </Button>
                                                            </PopoverTrigger>

                                                            <PopoverContent>
                                                                <FieldLabel>Label</FieldLabel>

                                                                <form.Field name={`${base}.website.label`}>
                                                                    {(field) => (
                                                                        <Input
                                                                            value={field.state.value}
                                                                            onChange={(e) =>
                                                                                field.handleChange(e.target.value)
                                                                            }
                                                                        />
                                                                    )}
                                                                </form.Field>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                    <form.Field
                                                        name={`${base}.links`}
                                                        mode="array"
                                                        children={(field) => (
                                                            <Field>
                                                                <FieldLabel>Links</FieldLabel>

                                                                {field.state.value.map((item: any, idx: number) => (
                                                                    <div key={item.id} className="flex gap-2 mb-2">
                                                                        <form.Field name={`${base}.links[${idx}].url`}>
                                                                            {(field) => (
                                                                                <Input
                                                                                    value={field.state.value}
                                                                                    onChange={(e) =>
                                                                                        field.handleChange(
                                                                                            e.target.value,
                                                                                        )
                                                                                    }
                                                                                    placeholder="https://"
                                                                                />
                                                                            )}
                                                                        </form.Field>

                                                                        <form.Field
                                                                            name={`${base}.links[${idx}].label`}
                                                                        >
                                                                            {(field) => (
                                                                                <Input
                                                                                    value={field.state.value}
                                                                                    onChange={(e) =>
                                                                                        field.handleChange(
                                                                                            e.target.value,
                                                                                        )
                                                                                    }
                                                                                    placeholder="Label"
                                                                                />
                                                                            )}
                                                                        </form.Field>

                                                                        <Button
                                                                            type="button"
                                                                            variant="outline"
                                                                            onClick={() => field.removeValue(idx)}
                                                                        >
                                                                            Remove
                                                                        </Button>
                                                                    </div>
                                                                ))}

                                                                <Button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        field.pushValue({
                                                                            id: crypto.randomUUID(),
                                                                            url: "",
                                                                            label: "",
                                                                        })
                                                                    }
                                                                >
                                                                    Add Link
                                                                </Button>
                                                            </Field>
                                                        )}
                                                    />
                                                </FieldGroup>
                                            </FieldSet>
                                        )
                                    }
                                    default: {
                                        return <div key={idx}></div>
                                    }
                                }
                            })}
                        </>
                    )}
                />
            </FieldGroup>
        </div>
    )
}

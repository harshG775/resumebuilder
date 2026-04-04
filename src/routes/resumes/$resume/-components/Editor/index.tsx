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

type Section = {
    id: string
    type: SectionUnionType
    order: number
    content: any
}

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
        defaultValues: sectionData[0].content,
    })
    console.log(form.state.values)

    return (
        <div className="p-4 mx-auto max-w-lg">
            <FieldGroup>
                <FieldSet>
                    <FieldLegend className="font-bold text-2xl!">Basics</FieldLegend>
                    <FieldGroup>
                        <form.Field
                            name="name"
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
                            name="headline"
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
                            name="email"
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
                            name="phone"
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
                            name="location"
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
                            <form.Field name="website.url">
                                {(field) => (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Website</FieldLabel>
                                        <Input
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
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

                                    <form.Field name="website.label">
                                        {(field) => (
                                            <Input
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                            />
                                        )}
                                    </form.Field>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <form.Field
                            name="links"
                            mode="array"
                            children={(field) => (
                                <Field>
                                    <FieldLabel>Links</FieldLabel>

                                    {field.state.value.map((item: any, idx: number) => (
                                        <div key={item.id} className="flex gap-2 mb-2">
                                            <form.Field name={`links[${idx}].url`}>
                                                {(field) => (
                                                    <Input
                                                        value={field.state.value}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                        placeholder="https://"
                                                    />
                                                )}
                                            </form.Field>

                                            <form.Field name={`links[${idx}].label`}>
                                                {(field) => (
                                                    <Input
                                                        value={field.state.value}
                                                        onChange={(e) => field.handleChange(e.target.value)}
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
                                        onClick={() => field.pushValue({ id: crypto.randomUUID(), url: "", label: "" })}
                                    >
                                        Add Link
                                    </Button>
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </FieldSet>

                <FieldSeparator />

                <FieldSet>
                    <FieldLegend className="font-bold text-2xl!">Summary</FieldLegend>
                    <FieldGroup>
                        <form.Field
                            name="summary"
                            children={(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Summary</FieldLabel>
                                    <Textarea
                                        id={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(JSON.stringify(e.target.value))}
                                        autoComplete="off"
                                    />
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </FieldSet>
            </FieldGroup>
        </div>
    )
}

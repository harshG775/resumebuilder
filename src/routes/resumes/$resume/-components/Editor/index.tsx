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
            website: "",
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
                        <form.Field
                            name="website"
                            children={(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Website</FieldLabel>
                                    <div className="flex gap-2">
                                        <Input
                                            id={field.name}
                                            value={field.state.value.url}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="https://"
                                            autoComplete="off"
                                        />
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline">
                                                    <Tag />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <PopoverHeader>
                                                    {/* <PopoverTitle>Title</PopoverTitle>
                                                    <PopoverDescription>Description text here.</PopoverDescription> */}
                                                    <FieldLabel>Label</FieldLabel>
                                                    <Input autoComplete="off" />
                                                </PopoverHeader>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
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

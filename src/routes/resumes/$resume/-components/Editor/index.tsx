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

import { Input } from "#/components/ui/input"
import { Textarea } from "#/components/ui/textarea"
import { Button } from "#/components/ui/button"
import { LinkIcon, Tag, X } from "lucide-react"
import { ResumeSchema } from "#/lib/schemas/resume-schema"

export default function Editor() {
    const form = useForm({
        defaultValues: {
            basics: {
                name: "",
                headline: "",
                email: "",
                phone: "",
                location: "",
                website: {
                    url: "",
                    label: "",
                },
                customFields: [
                    {
                        id: "custom-field-1",
                        url: "",
                        label: "",
                    },
                ],
            },
            summary: {
                title: "Summary",
                hidden: false,
                content: "",
            },
            sections: {
                experience: {
                    title: "Experience",
                    hidden: false,
                    columns: 1,
                    items: [
                        {
                            id: "exp-1",
                            hidden: false,
                            company: "",
                            position: "",
                            location: "",
                            period: "",
                            website: { showLink: false, url: "", label: "" },
                            description: "",
                            roles: [],
                        },
                    ],
                },
                projects: {
                    title: "Projects",
                    hidden: false,
                    columns: 1,
                    items: [
                        {
                            id: "pro-1",
                            hidden: false,
                            name: "",
                            period: "",
                            website: [{ id: "w-1", url: "", label: "" }],
                            description: "",
                        },
                    ],
                },
                skills: {
                    title: "Skills",
                    hidden: false,
                    columns: 1,
                    items: [
                        {
                            id: "skill-1",
                            hidden: false,
                            icon: "",
                            name: "",
                            proficiency: "",
                            level: 0,
                            keywords: [],
                        },
                    ],
                },
                education: {
                    title: "Education",
                    hidden: false,
                    columns: 1,
                    items: [
                        {
                            id: "edu-1",
                            hidden: false,
                            school: "",
                            degree: "",
                            area: "",
                            grade: "",
                            location: "",
                            period: "",
                            website: { url: "", label: "" },
                            description: "",
                        },
                    ],
                },
                certifications: {
                    title: "Certifications",
                    hidden: false,
                    columns: 1,
                    items: [
                        {
                            id: "cert-1",
                            hidden: false,
                            title: "",
                            issuer: "",
                            date: "",
                            website: { url: "", label: "" },
                            description: "",
                        },
                    ],
                },
            },
            order: ["experience", "projects", "skills", "education", "certifications"],
        },
        validators: {
            onChange: ResumeSchema,
        },
    })
    console.log(form.state.values)

    return (
        <div className="p-4 mx-auto max-w-lg">
            <FieldGroup>
                <FieldSet>
                    <FieldLegend className="font-bold text-2xl!">Basics</FieldLegend>
                    <FieldDescription>{/*  */}</FieldDescription>
                    <FieldGroup>
                        <form.Field
                            name={`basics.name`}
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
                            name={`basics.headline`}
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
                            name={`basics.email`}
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
                            name={`basics.phone`}
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
                            name={`basics.location`}
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
                            <form.Field name={`basics.website.url`}>
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
                                    <Button variant="ghost">
                                        <Tag />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent>
                                    <FieldLabel>Label</FieldLabel>

                                    <form.Field name={`basics.website.label`}>
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
                            name={`basics.customFields`}
                            mode="array"
                            children={(field) => (
                                <Field>
                                    <FieldLabel>Custom Fields</FieldLabel>

                                    {field.state.value.map((item: any, idx: number) => (
                                        <div key={`${idx}-${item.id}`} className="flex gap-2 mb-2">
                                            <form.Field name={`basics.customFields[${idx}].label`}>
                                                {(field) => (
                                                    <Input
                                                        value={field.state.value}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                    />
                                                )}
                                            </form.Field>

                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="ghost">
                                                        <LinkIcon />
                                                    </Button>
                                                </PopoverTrigger>

                                                <PopoverContent>
                                                    <FieldLabel>Enter The URL to link to</FieldLabel>

                                                    <form.Field name={`basics.customFields[${idx}].url`}>
                                                        {(field) => (
                                                            <Input
                                                                value={field.state.value}
                                                                onChange={(e) => field.handleChange(e.target.value)}
                                                            />
                                                        )}
                                                    </form.Field>
                                                </PopoverContent>
                                            </Popover>

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                onClick={() => field.removeValue(idx)}
                                            >
                                                <X />
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
                <FieldSeparator />
                <FieldSet>
                    <FieldLegend className="font-bold text-2xl!">Summary</FieldLegend>
                    <FieldDescription>{/*  */}</FieldDescription>
                    <FieldGroup>
                        <form.Field
                            name={`summary.content`}
                            children={(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Summary</FieldLabel>
                                    <Textarea
                                        id={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        autoComplete="off"
                                        className="min-h-32"
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

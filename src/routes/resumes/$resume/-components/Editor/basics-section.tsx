import { Button } from "#/components/ui/button"
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "#/components/ui/field"
import { Input } from "#/components/ui/input"
import { withForm } from "#/hooks/form"
import { resumeFormOptions } from "#/lib/resume-form-options"
import {
    Popover,
    PopoverContent,
    // PopoverDescription,
    // PopoverHeader,
    // PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import { LinkIcon, Tag, X } from "lucide-react"
export const BasicsSection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => (
        <FieldSet>
            <FieldLegend className="font-bold text-2xl!">Basics</FieldLegend>
            <FieldGroup>
                <form.AppField
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

                <form.AppField
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

                <form.AppField
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
                <form.AppField
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

                <form.AppField
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
                    <form.AppField name={`basics.website.url`}>
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
                    </form.AppField>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost">
                                <Tag />
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent>
                            <FieldLabel>Label</FieldLabel>
                            <form.AppField name={`basics.website.label`}>
                                {(field) => (
                                    <Input
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                )}
                            </form.AppField>
                        </PopoverContent>
                    </Popover>
                </div>
                <form.AppField
                    name={`basics.customFields`}
                    mode="array"
                    children={(field) => (
                        <Field>
                            <FieldLabel>Custom Fields</FieldLabel>

                            {field.state.value.map((item: any, idx: number) => (
                                <div key={`${idx}-${item.id}`} className="flex gap-2 mb-2">
                                    <form.AppField name={`basics.customFields[${idx}].label`}>
                                        {(field) => (
                                            <Input
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                            />
                                        )}
                                    </form.AppField>

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost">
                                                <LinkIcon />
                                            </Button>
                                        </PopoverTrigger>

                                        <PopoverContent>
                                            <FieldLabel>Enter The URL to link to</FieldLabel>
                                            <form.AppField name={`basics.customFields[${idx}].url`}>
                                                {(field) => (
                                                    <Input
                                                        value={field.state.value}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                    />
                                                )}
                                            </form.AppField>
                                        </PopoverContent>
                                    </Popover>

                                    <Button type="button" variant="ghost" onClick={() => field.removeValue(idx)}>
                                        <X />
                                    </Button>
                                </div>
                            ))}

                            <Button
                                type="button"
                                variant="outline"
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
    ),
})

import { Button } from "#/components/ui/button"
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "#/components/ui/field"
import { Input } from "#/components/ui/input"
import { withForm } from "#/hooks/form"
import {
    Popover,
    PopoverContent,
    // PopoverDescription,
    // PopoverHeader,
    // PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import { LinkIcon, Tag, X } from "lucide-react"
import { DotsSixVerticalIcon } from "@phosphor-icons/react"
import { SortableDragItem, SortableDragProvider } from "../components/sortable-item"
import { resumeFormOptions } from "../../data/resume-default-values"

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
                    name={`basics.email.value`}
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
                    name={`basics.phone.label`}
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
                    <form.AppField name={`basics.website.value`}>
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
                        <PopoverTrigger render={<Button variant="ghost" />}>
                            <Tag />
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
                            <div className="border divide-y rounded-md">
                                <SortableDragProvider value={field.state.value} onChange={field.handleChange}>
                                    {field.state.value.map((item: any, idx: number) => (
                                        <SortableDragItem
                                            key={item.id}
                                            sortableProps={{
                                                index: idx,
                                                id: item.id,
                                            }}
                                            className="h-14 flex items-center"
                                        >
                                            <div
                                                role="button"
                                                tabIndex={0}
                                                aria-label={`Drag to reorder ${item.title}`}
                                                className="flex items-center p-2 mx-1 hover:bg-muted/80 cursor-grab focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                            >
                                                <DotsSixVerticalIcon aria-hidden="true" />
                                            </div>
                                            <form.AppField name={`basics.customFields[${idx}].label`}>
                                                {(field_1) => (
                                                    <Input
                                                        value={field_1.state.value}
                                                        onChange={(e) => field_1.handleChange(e.target.value)}
                                                        className="h-full"
                                                        placeholder="field..."
                                                    />
                                                )}
                                            </form.AppField>

                                            <Popover>
                                                <PopoverTrigger render={<Button variant="ghost" className="h-full" />}>
                                                    <LinkIcon />
                                                </PopoverTrigger>

                                                <PopoverContent>
                                                    <FieldLabel>Enter The URL to link to</FieldLabel>
                                                    <form.AppField name={`basics.customFields[${idx}].value`}>
                                                        {(customField) => (
                                                            <Input
                                                                value={customField.state.value}
                                                                onChange={(e) =>
                                                                    customField.handleChange(e.target.value)
                                                                }
                                                                placeholder="https://"
                                                            />
                                                        )}
                                                    </form.AppField>
                                                </PopoverContent>
                                            </Popover>

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                onClick={() => field.removeValue(idx)}
                                                className="h-full"
                                            >
                                                <X />
                                            </Button>
                                        </SortableDragItem>
                                    ))}
                                </SortableDragProvider>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    field.pushValue({
                                        id: crypto.randomUUID(),
                                        label: "",
                                        value: "",
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

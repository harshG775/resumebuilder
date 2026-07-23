import { Button } from "#/components/ui/button"
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "#/components/ui/field"
import { Input } from "#/components/ui/input"
import { withForm } from "#/hooks/form"
import { Plus } from "lucide-react"
import { DotsSixVerticalIcon } from "@phosphor-icons/react"
import { SortableDragItem, SortableDragProvider } from "../components/sortable-item"
import { WebsiteField } from "./components/website-field"
import { LinkField } from "./components/link-field"
import { resumeFormOptions } from "../../data/resume-default-values"
import { Separator } from "#/components/ui/separator"
import { cn } from "#/lib/utils"

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

                <form.AppField name={`basics.email.value`}>
                    {(valueField) => (
                        <form.AppField name={`basics.email.label`}>
                            {(labelField) => (
                                <WebsiteField
                                    id={valueField.name}
                                    label="Email"
                                    type="email"
                                    prefix="mailto:"
                                    value={valueField.state.value}
                                    onValueChange={valueField.handleChange}
                                    onBlur={valueField.handleBlur}
                                    linkLabel={labelField.state.value}
                                    onLinkLabelChange={labelField.handleChange}
                                    placeholder="you@example.com"
                                    labelPlaceholder="e.g. Work Email"
                                />
                            )}
                        </form.AppField>
                    )}
                </form.AppField>
                <form.AppField name={`basics.phone.value`}>
                    {(valueField) => (
                        <form.AppField name={`basics.phone.label`}>
                            {(labelField) => (
                                <WebsiteField
                                    id={valueField.name}
                                    label="Phone"
                                    type="tel"
                                    prefix="tel:"
                                    value={valueField.state.value}
                                    onValueChange={valueField.handleChange}
                                    onBlur={valueField.handleBlur}
                                    linkLabel={labelField.state.value}
                                    onLinkLabelChange={labelField.handleChange}
                                    placeholder="+1 (555) 000-0000"
                                    labelPlaceholder="e.g. Mobile"
                                />
                            )}
                        </form.AppField>
                    )}
                </form.AppField>

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
                <form.AppField name={`basics.website.value`}>
                    {(valueField) => (
                        <form.AppField name={`basics.website.label`}>
                            {(labelField) => (
                                <WebsiteField
                                    id={valueField.name}
                                    prefix="https://"
                                    value={valueField.state.value}
                                    onValueChange={valueField.handleChange}
                                    onBlur={valueField.handleBlur}
                                    linkLabel={labelField.state.value}
                                    onLinkLabelChange={labelField.handleChange}
                                    placeholder="harshgaur.in"
                                />
                            )}
                        </form.AppField>
                    )}
                </form.AppField>
                <form.AppField
                    name={`basics.customFields`}
                    mode="array"
                    children={(field) => (
                        <Field>
                            <FieldLabel>Custom Fields</FieldLabel>
                            <div className="divide-y">
                                <SortableDragProvider
                                    value={field.state.value}
                                    onChange={field.handleChange}
                                    children={(items) => {
                                        return items.map((item, idx: number) => {
                                            const realIndex = field.state.value.findIndex((i) => i.id === item.id)
                                            return (
                                                <SortableDragItem
                                                    key={item.id}
                                                    sortableProps={{
                                                        index: idx,
                                                        id: item.id,
                                                    }}
                                                    className={cn("flex items-stretch border")}
                                                >
                                                    <div
                                                        role="button"
                                                        tabIndex={0}
                                                        aria-label={`Drag to reorder ${item.label}`}
                                                        className="flex justify-center items-center w-10 hover:bg-muted/80 cursor-grab focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                    >
                                                        <DotsSixVerticalIcon aria-hidden="true" />
                                                    </div>
                                                    <Separator orientation="vertical" />

                                                    <form.AppField name={`basics.customFields[${realIndex}].value`}>
                                                        {(valueField) => (
                                                            <form.AppField
                                                                name={`basics.customFields[${realIndex}].label`}
                                                            >
                                                                {(labelField) => (
                                                                    <LinkField
                                                                        id={valueField.name}
                                                                        value={valueField.state.value}
                                                                        onValueChange={valueField.handleChange}
                                                                        linkLabel={labelField.state.value}
                                                                        onLinkLabelChange={labelField.handleChange}
                                                                        onRemove={() => field.removeValue(realIndex)}
                                                                        placeholder="e.g. github.com/username"
                                                                        className="flex-1 p-1.5"
                                                                    />
                                                                )}
                                                            </form.AppField>
                                                        )}
                                                    </form.AppField>
                                                </SortableDragItem>
                                            )
                                        })
                                    }}
                                />
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
                                <Plus />
                                Add Custom Field
                            </Button>
                        </Field>
                    )}
                />
            </FieldGroup>
        </FieldSet>
    ),
})

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
import { LinkIcon, Plus, X } from "lucide-react"
import { DotsSixVerticalIcon } from "@phosphor-icons/react"
import { SortableDragItem, SortableDragProvider } from "../components/sortable-item"
import { WebsiteField } from "./components/website-field"
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
                <form.AppField name={`basics.website.value`}>
                    {(valueField) => (
                        <form.AppField name={`basics.website.label`}>
                            {(labelField) => (
                                <WebsiteField
                                    id={valueField.name}
                                    value={valueField.state.value}
                                    onValueChange={valueField.handleChange}
                                    onBlur={valueField.handleBlur}
                                    linkLabel={labelField.state.value}
                                    onLinkLabelChange={labelField.handleChange}
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
                                                    className={cn("h-12 flex items-center border")}
                                                >
                                                    <div
                                                        role="button"
                                                        tabIndex={0}
                                                        aria-label={`Drag to reorder ${item.label}`}
                                                        className="flex justify-center items-center w-10 h-full hover:bg-muted/80 cursor-grab focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                    >
                                                        <DotsSixVerticalIcon aria-hidden="true" />
                                                    </div>
                                                    <Separator orientation="vertical" />

                                                    <form.AppField name={`basics.customFields[${realIndex}].label`}>
                                                        {(field_1) => (
                                                            <Input
                                                                value={field_1.state.value}
                                                                onChange={(e) => field_1.handleChange(e.target.value)}
                                                                className="h-full rounded-none line-clamp-1"
                                                                placeholder="field..."
                                                            />
                                                        )}
                                                    </form.AppField>

                                                    <Popover>
                                                        <PopoverTrigger
                                                            render={
                                                                <Button
                                                                    variant="ghost"
                                                                    className="h-full w-8 rounded-none "
                                                                />
                                                            }
                                                        >
                                                            <LinkIcon />
                                                        </PopoverTrigger>

                                                        <PopoverContent>
                                                            <FieldLabel>Enter The URL to link to</FieldLabel>
                                                            <form.AppField
                                                                name={`basics.customFields[${realIndex}].value`}
                                                            >
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
                                                        variant="destructive"
                                                        className="h-full w-8 rounded-none "
                                                        onClick={() => field.removeValue(realIndex)}
                                                    >
                                                        <X />
                                                    </Button>
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

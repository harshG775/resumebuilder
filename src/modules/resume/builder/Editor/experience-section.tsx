import { Button } from "#/components/ui/button"
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "#/components/ui/field"
import { withForm } from "#/hooks/form"
import { CalendarIcon, PlusIcon } from "lucide-react"
import { resumeFormOptions } from "../../data/resume-default-values"
import { SortableDragProvider, SortableItemRow } from "../components/sortable-item"
import { WebsiteField } from "./components/website-field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "#/components/ui/input-group"

import { useForm } from "@tanstack/react-form"
import { Input } from "#/components/ui/input"
import { Textarea } from "#/components/ui/textarea"
import type { ResumeValues } from "../../schema/resume.zod-schema"
import { useState } from "react"
import type { ReactNode } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "#/components/ui/dialog"

type ExperienceItem = ResumeValues["sections"]["experience"]["items"][0]

const getEmptyExperience = (): ExperienceItem => ({
    id: "",
    hidden: false,
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    website: {
        hidden: false,
        value: "",
        label: "",
    },
    content: "",
})

function ExperienceDialog({
    defaultValues,
    onSubmit,
    trigger,
    initialOpen = false,
    onClosed,
    mode = "create",
}: {
    defaultValues: ExperienceItem
    onSubmit: (value: ExperienceItem) => void
    trigger?: ReactNode | null
    initialOpen?: boolean
    onClosed?: () => void
    mode?: "create" | "edit"
}) {
    const [isOpen, setIsOpen] = useState(initialOpen)
    const form = useForm({
        defaultValues,
        onSubmit: async ({ value }) => {
            onSubmit(value)

            setIsOpen(false)
        },
    })

    const attemptClose = () => {
        const message =
            mode === "edit"
                ? "Discard changes to this experience? Unsaved changes will be lost."
                : "Discard this new experience? Unsaved changes will be lost."
        if (!form.state.isDirty || window.confirm(message)) {
            setIsOpen(false)
        }
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(lastOpen) => {
                if (!lastOpen) {
                    attemptClose()
                } else {
                    setIsOpen(lastOpen)
                }
            }}
            onOpenChangeComplete={(lastOpen) => {
                if (!lastOpen) {
                    form.reset()
                    onClosed?.()
                }
            }}
        >
            {trigger === null
                ? null
                : (trigger ?? (
                      <DialogTrigger render={<Button variant="outline" />}>
                          <PlusIcon /> Add a new {"Experience"}
                      </DialogTrigger>
                  ))}

            <DialogContent
                render={
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            form.handleSubmit()
                        }}
                    />
                }
                className="md:max-w-2xl lg:max-w-3xl h-[calc(90vh)] overflow-y-scroll"
            >
                <DialogHeader>
                    <DialogTitle>
                        {mode === "edit" ? "Edit" : "Add"} {"Experience"}
                    </DialogTitle>
                    <DialogDescription>Fill out the {"Experience"} information details below.</DialogDescription>
                </DialogHeader>

                <FieldSet>
                    <FieldSet>
                        <form.Field
                            name="company"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel>Company</FieldLabel>
                                        <Input
                                            value={dialogField.state.value}
                                            onChange={(e) => dialogField.handleChange(e.target.value)}
                                            placeholder="xyz Pvt. Ltd."
                                        />
                                    </Field>
                                )
                            }}
                        />
                    </FieldSet>
                    <FieldSet>
                        <form.Field
                            name="position"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="position">Position</FieldLabel>
                                        <Input
                                            id="position"
                                            value={dialogField.state.value}
                                            onChange={(e) => dialogField.handleChange(e.target.value)}
                                            placeholder="e.g. Software Engineer"
                                        />
                                    </Field>
                                )
                            }}
                        />
                    </FieldSet>
                    <FieldSet>
                        <form.Field name="startDate">
                            {(startField) => (
                                <form.Field name="endDate">
                                    {(endField) => (
                                        <Field>
                                            <FieldLabel>Period</FieldLabel>
                                            <div className="flex items-center gap-2">
                                                <InputGroup className="flex-1">
                                                    <InputGroupAddon>
                                                        <CalendarIcon />
                                                    </InputGroupAddon>
                                                    <InputGroupInput
                                                        value={startField.state.value}
                                                        onChange={(e) => startField.handleChange(e.target.value)}
                                                        placeholder="e.g. Sept 2020"
                                                    />
                                                </InputGroup>
                                                <span className="text-muted-foreground">–</span>
                                                <InputGroup className="flex-1">
                                                    <InputGroupAddon>
                                                        <CalendarIcon />
                                                    </InputGroupAddon>
                                                    <InputGroupInput
                                                        value={endField.state.value}
                                                        onChange={(e) => endField.handleChange(e.target.value)}
                                                        placeholder="Present"
                                                    />
                                                </InputGroup>
                                            </div>
                                        </Field>
                                    )}
                                </form.Field>
                            )}
                        </form.Field>
                    </FieldSet>
                    <FieldSet>
                        <form.Field
                            name="location"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="location">Location</FieldLabel>
                                        <Input
                                            id="location"
                                            value={dialogField.state.value}
                                            onChange={(e) => dialogField.handleChange(e.target.value)}
                                            placeholder="e.g. Remote / New York, NY"
                                        />
                                    </Field>
                                )
                            }}
                        />
                    </FieldSet>
                    <FieldSet>
                        <form.Field name="website.value">
                            {(valueField) => (
                                <form.Field name="website.label">
                                    {(labelField) => (
                                        <WebsiteField
                                            id="website"
                                            value={valueField.state.value}
                                            onValueChange={valueField.handleChange}
                                            linkLabel={labelField.state.value}
                                            onLinkLabelChange={labelField.handleChange}
                                        />
                                    )}
                                </form.Field>
                            )}
                        </form.Field>
                    </FieldSet>
                    <FieldSet>
                        <form.Field
                            name="content"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="content">Description</FieldLabel>
                                        <Textarea
                                            id="content"
                                            value={dialogField.state.value}
                                            onChange={(e) => dialogField.handleChange(e.target.value)}
                                            placeholder="Describe your responsibilities and achievements..."
                                        />
                                    </Field>
                                )
                            }}
                        />
                    </FieldSet>
                </FieldSet>
                <DialogFooter>
                    <Button type="button" variant={"destructive"} onClick={attemptClose}>
                        Cancel
                    </Button>
                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                            <Button disabled={!canSubmit} type="submit">
                                {isSubmitting ? "Saving..." : mode === "edit" ? "Save" : "Create"}
                            </Button>
                        )}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export const ExperienceSection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => {
        const [editingItem, setEditingItem] = useState<ExperienceItem | null>(null)

        return (
            <form.AppField
                name="sections.experience.items"
                mode="array"
                children={(field) => {
                    return (
                        <FieldSet>
                            <FieldLegend className="font-bold text-2xl!">
                                {form.state.values.sections.experience.title}
                            </FieldLegend>
                            <FieldGroup>
                                <div className="border divide-y rounded-md">
                                    <SortableDragProvider value={field.state.value} onChange={field.handleChange}>
                                        {(items) =>
                                            items.map((item, idx) => (
                                                <SortableItemRow
                                                    key={item.id}
                                                    sortableProps={{
                                                        index: idx,
                                                        id: item.id,
                                                    }}
                                                    title={item.company}
                                                    subtitle={item.position}
                                                    hidden={item.hidden}
                                                    actions={{
                                                        onToggleVisibility: (nextHidden) => {
                                                            field.handleChange((prev) =>
                                                                prev.map((i) =>
                                                                    i.id === item.id ? { ...i, hidden: nextHidden } : i,
                                                                ),
                                                            )
                                                        },

                                                        onEdit: () => {
                                                            setEditingItem(item)
                                                        },

                                                        onDelete: () => {
                                                            field.handleChange((prev) =>
                                                                prev.filter((i) => i.id !== item.id),
                                                            )
                                                        },
                                                    }}
                                                />
                                            ))
                                        }
                                    </SortableDragProvider>
                                </div>
                                <ExperienceDialog
                                    defaultValues={getEmptyExperience()}
                                    onSubmit={(value) =>
                                        field.pushValue({
                                            ...value,
                                            id: crypto.randomUUID(),
                                        })
                                    }
                                />
                                {editingItem && (
                                    <ExperienceDialog
                                        key={editingItem.id}
                                        mode="edit"
                                        trigger={null}
                                        initialOpen
                                        defaultValues={editingItem}
                                        onSubmit={(value) => {
                                            field.handleChange((prev) =>
                                                prev.map((i) => (i.id === value.id ? value : i)),
                                            )
                                        }}
                                        onClosed={() => setEditingItem(null)}
                                    />
                                )}
                            </FieldGroup>
                        </FieldSet>
                    )
                }}
            />
        )
    },
})

import { Button } from "#/components/ui/button"
import { Field, FieldLabel, FieldSet } from "#/components/ui/field"
import { withForm } from "#/hooks/form"
import { CalendarIcon, PlusIcon } from "@phosphor-icons/react"
import { ListIcon } from "@phosphor-icons/react"
import { resumeFormOptions } from "../../data/resume-default-values"
import { SectionFieldSet } from "../components/section-field-set"
import { SortableDragProvider, SortableItemRow } from "../components/sortable-item"
import { InputGroup, InputGroupAddon, InputGroupInput } from "#/components/ui/input-group"
import { contentItemsToText, textToContentItems } from "../components/content-items"

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

type VolunteeringItem = ResumeValues["data"]["sections"]["volunteeringLeadership"]["attributes"][number]

const getEmptyVolunteering = (): VolunteeringItem => ({
    id: "",
    isActive: true,
    organization: "",
    involvement: "",
    location: "",
    startDate: "",
    endDate: "",
    content: [],
})

function VolunteeringDialog({
    defaultValues,
    onSubmit,
    trigger,
    initialOpen = false,
    onClosed,
    mode = "create",
}: {
    defaultValues: VolunteeringItem
    onSubmit: (value: VolunteeringItem) => void
    trigger?: ReactNode | null
    initialOpen?: boolean
    onClosed?: () => void
    mode?: "create" | "edit"
}) {
    const [isOpen, setIsOpen] = useState(initialOpen)
    const form = useForm({
        defaultValues,
        onSubmit: async ({ value, formApi }) => {
            onSubmit(value)

            setIsOpen(false)
            formApi.reset()
        },
    })

    const attemptClose = () => {
        const message =
            mode === "edit"
                ? "Discard changes to this entry? Unsaved changes will be lost."
                : "Discard this new entry? Unsaved changes will be lost."
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
                          <PlusIcon /> Add a new {"Entry"}
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
                className="md:max-w-2xl lg:max-w-3xl max-h-[calc(90vh)] overflow-y-auto"
            >
                <DialogHeader>
                    <DialogTitle>
                        {mode === "edit" ? "Edit" : "Add"} {"Volunteering / Leadership"}
                    </DialogTitle>
                    <DialogDescription>Fill out the details below.</DialogDescription>
                </DialogHeader>

                <FieldSet>
                    <FieldSet className="grid grid-cols-1 md:grid-cols-2">
                        <form.Field
                            name="organization"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="organization">Organization</FieldLabel>
                                        <Input
                                            id="organization"
                                            value={dialogField.state.value}
                                            onChange={(e) => dialogField.handleChange(e.target.value)}
                                            placeholder="e.g. Red Cross"
                                        />
                                    </Field>
                                )
                            }}
                        />
                        <form.Field
                            name="involvement"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="involvement">Involvement</FieldLabel>
                                        <Input
                                            id="involvement"
                                            value={dialogField.state.value}
                                            onChange={(e) => dialogField.handleChange(e.target.value)}
                                            placeholder="e.g. Volunteer Coordinator"
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
                        <form.Field
                            name="content"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="content">Description</FieldLabel>
                                        <Textarea
                                            id="content"
                                            value={contentItemsToText(dialogField.state.value)}
                                            onChange={(e) =>
                                                dialogField.handleChange(
                                                    textToContentItems(e.target.value, dialogField.state.value),
                                                )
                                            }
                                            placeholder="Describe your involvement and impact..."
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

export const VolunteeringLeadershipSection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => {
        const [editingItem, setEditingItem] = useState<VolunteeringItem | null>(null)

        return (
            <form.AppField
                name="data.sections.volunteeringLeadership.attributes"
                mode="array"
                children={(field) => {
                    return (
                        <SectionFieldSet
                            title={form.state.values.data.sections.volunteeringLeadership.title}
                            actions={
                                <Button variant={"ghost"}>
                                    <ListIcon />
                                </Button>
                            }
                        >
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
                                                title={item.organization}
                                                subtitle={item.involvement}
                                                hidden={!item.isActive}
                                                actions={{
                                                    onToggleVisibility: (nextHidden) => {
                                                        field.handleChange((prev) =>
                                                            prev.map((i) =>
                                                                i.id === item.id ? { ...i, isActive: !nextHidden } : i,
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
                            <VolunteeringDialog
                                defaultValues={getEmptyVolunteering()}
                                onSubmit={(value) =>
                                    field.pushValue({
                                        ...value,
                                        id: crypto.randomUUID(),
                                    })
                                }
                            />
                            {editingItem && (
                                <VolunteeringDialog
                                    key={editingItem.id}
                                    mode="edit"
                                    trigger={null}
                                    initialOpen
                                    defaultValues={editingItem}
                                    onSubmit={(value) => {
                                        field.handleChange((prev) => prev.map((i) => (i.id === value.id ? value : i)))
                                    }}
                                    onClosed={() => setEditingItem(null)}
                                />
                            )}
                        </SectionFieldSet>
                    )
                }}
            />
        )
    },
})

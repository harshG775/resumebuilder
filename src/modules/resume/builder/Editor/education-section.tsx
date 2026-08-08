import { Button } from "#/components/ui/button"
import { Field, FieldLabel, FieldSet } from "#/components/ui/field"
import { withForm } from "#/hooks/form"
import { CalendarIcon, PlusIcon } from "@phosphor-icons/react"
import { ListIcon } from "@phosphor-icons/react"
import { resumeFormOptions } from "../../data/resume-default-values"
import { SectionFieldSet } from "../components/section-field-set"
import { SortableDragProvider, SortableItemRow } from "../components/sortable-item"
import { InputGroup, InputGroupAddon, InputGroupInput } from "#/components/ui/input-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#/components/ui/select"
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

type EducationItem = ResumeValues["data"]["sections"]["education"]["attributes"][number]

const DATE_LABELS = ["", "Expected", "Anticipated", "Exp."] as const

const getEmptyEducation = (): EducationItem => ({
    id: "",
    isActive: true,
    school: "",
    degree: "",
    area: "",
    grade: "",
    location: "",
    startDate: "",
    endDate: "",
    dateLabel: "",
    content: [],
})

function EducationDialog({
    defaultValues,
    onSubmit,
    trigger,
    initialOpen = false,
    onClosed,
    mode = "create",
}: {
    defaultValues: EducationItem
    onSubmit: (value: EducationItem) => void
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
                ? "Discard changes to this education entry? Unsaved changes will be lost."
                : "Discard this new education entry? Unsaved changes will be lost."
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
                          <PlusIcon /> Add a new {"Education"}
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
                        {mode === "edit" ? "Edit" : "Add"} {"Education"}
                    </DialogTitle>
                    <DialogDescription>Fill out the {"Education"} information details below.</DialogDescription>
                </DialogHeader>

                <FieldSet>
                    <FieldSet>
                        <form.Field
                            name="school"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="school">School</FieldLabel>
                                        <Input
                                            id="school"
                                            value={dialogField.state.value}
                                            onChange={(e) => dialogField.handleChange(e.target.value)}
                                            placeholder="e.g. Stanford University"
                                        />
                                    </Field>
                                )
                            }}
                        />
                    </FieldSet>
                    <FieldSet>
                        <form.Field
                            name="degree"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="degree">Degree</FieldLabel>
                                        <Input
                                            id="degree"
                                            value={dialogField.state.value}
                                            onChange={(e) => dialogField.handleChange(e.target.value)}
                                            placeholder="e.g. Bachelor of Science"
                                        />
                                    </Field>
                                )
                            }}
                        />
                    </FieldSet>
                    <FieldSet className="grid grid-cols-1 md:grid-cols-2">
                        <form.Field
                            name="area"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="area">Area of Study</FieldLabel>
                                        <Input
                                            id="area"
                                            value={dialogField.state.value}
                                            onChange={(e) => dialogField.handleChange(e.target.value)}
                                            placeholder="e.g. Computer Science"
                                        />
                                    </Field>
                                )
                            }}
                        />
                        <form.Field
                            name="grade"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="grade">Grade</FieldLabel>
                                        <Input
                                            id="grade"
                                            value={dialogField.state.value}
                                            onChange={(e) => dialogField.handleChange(e.target.value)}
                                            placeholder="e.g. 3.8 GPA"
                                        />
                                    </Field>
                                )
                            }}
                        />
                    </FieldSet>
                    <FieldSet className="grid grid-cols-1 md:grid-cols-2">
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
                        <form.Field
                            name="dateLabel"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="dateLabel">Date Label</FieldLabel>
                                        <Select
                                            value={dialogField.state.value}
                                            onValueChange={(value) =>
                                                dialogField.handleChange(value as EducationItem["dateLabel"])
                                            }
                                        >
                                            <SelectTrigger id="dateLabel" className="w-full">
                                                <SelectValue placeholder="None" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {DATE_LABELS.map((label) => (
                                                    <SelectItem key={label} value={label}>
                                                        {label || "None"}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                )
                            }}
                        />
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
                                            placeholder="Describe your coursework and achievements..."
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

export const EducationSection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => {
        const [editingItem, setEditingItem] = useState<EducationItem | null>(null)

        return (
            <form.AppField
                name="data.sections.education.attributes"
                mode="array"
                children={(field) => {
                    return (
                        <SectionFieldSet
                            title={form.state.values.data.sections.education.title}
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
                                                title={item.degree}
                                                subtitle={item.school}
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
                            <EducationDialog
                                defaultValues={getEmptyEducation()}
                                onSubmit={(value) =>
                                    field.pushValue({
                                        ...value,
                                        id: crypto.randomUUID(),
                                    })
                                }
                            />
                            {editingItem && (
                                <EducationDialog
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

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

type PublicationItem = ResumeValues["data"]["sections"]["publications"]["attributes"][number]

const getEmptyPublication = (): PublicationItem => ({
    id: "",
    isActive: true,
    title: "",
    publisher: "",
    date: "",
    content: [],
})

function PublicationDialog({
    defaultValues,
    onSubmit,
    trigger,
    initialOpen = false,
    onClosed,
    mode = "create",
}: {
    defaultValues: PublicationItem
    onSubmit: (value: PublicationItem) => void
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
                ? "Discard changes to this publication? Unsaved changes will be lost."
                : "Discard this new publication? Unsaved changes will be lost."
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
                          <PlusIcon /> Add a new {"Publication"}
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
                        {mode === "edit" ? "Edit" : "Add"} {"Publication"}
                    </DialogTitle>
                    <DialogDescription>Fill out the {"Publication"} information details below.</DialogDescription>
                </DialogHeader>

                <FieldSet>
                    <FieldSet>
                        <form.Field
                            name="title"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="title">Title</FieldLabel>
                                        <Input
                                            id="title"
                                            value={dialogField.state.value}
                                            onChange={(e) => dialogField.handleChange(e.target.value)}
                                            placeholder="e.g. Scaling Real-Time Collaboration"
                                        />
                                    </Field>
                                )
                            }}
                        />
                    </FieldSet>
                    <FieldSet className="grid grid-cols-1 md:grid-cols-2">
                        <form.Field
                            name="publisher"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="publisher">Publisher</FieldLabel>
                                        <Input
                                            id="publisher"
                                            value={dialogField.state.value}
                                            onChange={(e) => dialogField.handleChange(e.target.value)}
                                            placeholder="e.g. IEEE"
                                        />
                                    </Field>
                                )
                            }}
                        />
                        <form.Field
                            name="date"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="date">Date</FieldLabel>
                                        <InputGroup>
                                            <InputGroupAddon>
                                                <CalendarIcon />
                                            </InputGroupAddon>
                                            <InputGroupInput
                                                id="date"
                                                value={dialogField.state.value}
                                                onChange={(e) => dialogField.handleChange(e.target.value)}
                                                placeholder="e.g. Jun 2023"
                                            />
                                        </InputGroup>
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
                                            placeholder="Describe what this publication covers..."
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

export const PublicationsSection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => {
        const [editingItem, setEditingItem] = useState<PublicationItem | null>(null)

        return (
            <form.AppField
                name="data.sections.publications.attributes"
                mode="array"
                children={(field) => {
                    return (
                        <SectionFieldSet
                            title={form.state.values.data.sections.publications.title}
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
                                                title={item.title}
                                                subtitle={item.publisher}
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
                            <PublicationDialog
                                defaultValues={getEmptyPublication()}
                                onSubmit={(value) =>
                                    field.pushValue({
                                        ...value,
                                        id: crypto.randomUUID(),
                                    })
                                }
                            />
                            {editingItem && (
                                <PublicationDialog
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

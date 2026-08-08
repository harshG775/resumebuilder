import { Button } from "#/components/ui/button"
import { Field, FieldLabel, FieldSet } from "#/components/ui/field"
import { withForm } from "#/hooks/form"
import { CalendarIcon, PlusIcon } from "@phosphor-icons/react"
import { ListIcon } from "@phosphor-icons/react"
import { resumeFormOptions } from "../../data/resume-default-values"
import { SectionFieldSet } from "../components/section-field-set"
import { SortableDragProvider, SortableItemRow } from "../components/sortable-item"
import { InputGroup, InputGroupAddon, InputGroupInput } from "#/components/ui/input-group"

import { useForm } from "@tanstack/react-form"
import { Input } from "#/components/ui/input"
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

type AwardItem = ResumeValues["data"]["sections"]["awardsScholarships"]["attributes"][number]

const getEmptyAward = (): AwardItem => ({
    id: "",
    isActive: true,
    title: "",
    organization: "",
    date: "",
})

function AwardDialog({
    defaultValues,
    onSubmit,
    trigger,
    initialOpen = false,
    onClosed,
    mode = "create",
}: {
    defaultValues: AwardItem
    onSubmit: (value: AwardItem) => void
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
                ? "Discard changes to this award? Unsaved changes will be lost."
                : "Discard this new award? Unsaved changes will be lost."
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
                          <PlusIcon /> Add a new {"Award"}
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
                        {mode === "edit" ? "Edit" : "Add"} {"Award"}
                    </DialogTitle>
                    <DialogDescription>Fill out the {"Award"} information details below.</DialogDescription>
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
                                            placeholder="e.g. Dean's List"
                                        />
                                    </Field>
                                )
                            }}
                        />
                    </FieldSet>
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
                                            placeholder="e.g. University of Texas"
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
                                                placeholder="e.g. May 2022"
                                            />
                                        </InputGroup>
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

export const AwardsScholarshipsSection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => {
        const [editingItem, setEditingItem] = useState<AwardItem | null>(null)

        return (
            <form.AppField
                name="data.sections.awardsScholarships.attributes"
                mode="array"
                children={(field) => {
                    return (
                        <SectionFieldSet
                            title={form.state.values.data.sections.awardsScholarships.title}
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
                                                subtitle={item.organization}
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
                            <AwardDialog
                                defaultValues={getEmptyAward()}
                                onSubmit={(value) =>
                                    field.pushValue({
                                        ...value,
                                        id: crypto.randomUUID(),
                                    })
                                }
                            />
                            {editingItem && (
                                <AwardDialog
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

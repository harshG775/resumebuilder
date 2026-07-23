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

type CertificationItem = ResumeValues["sections"]["certification"]["items"][0]

const getEmptyCertification = (): CertificationItem => ({
    id: "",
    hidden: false,
    title: "",
    issuer: "",
    date: "",
    website: {
        hidden: false,
        value: "",
        label: "",
    },
    content: "",
})

function CertificationDialog({
    defaultValues,
    onSubmit,
    trigger,
    initialOpen = false,
    onClosed,
    mode = "create",
}: {
    defaultValues: CertificationItem
    onSubmit: (value: CertificationItem) => void
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
                ? "Discard changes to this certification? Unsaved changes will be lost."
                : "Discard this new certification? Unsaved changes will be lost."
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
                          <PlusIcon /> Add a new {"Certification"}
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
                        {mode === "edit" ? "Edit" : "Add"} {"Certification"}
                    </DialogTitle>
                    <DialogDescription>Fill out the {"Certification"} information details below.</DialogDescription>
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
                                            placeholder="e.g. AWS Certified Solutions Architect"
                                        />
                                    </Field>
                                )
                            }}
                        />
                    </FieldSet>
                    <FieldSet className="grid grid-cols-1 md:grid-cols-2">
                        <form.Field
                            name="issuer"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="issuer">Issuer</FieldLabel>
                                        <Input
                                            id="issuer"
                                            value={dialogField.state.value}
                                            onChange={(e) => dialogField.handleChange(e.target.value)}
                                            placeholder="e.g. Amazon Web Services"
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
                                                placeholder="e.g. Jan 2024"
                                            />
                                        </InputGroup>
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
                                            placeholder="Describe what this certification covers..."
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

export const CertificationsSection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => {
        const [editingItem, setEditingItem] = useState<CertificationItem | null>(null)

        return (
            <form.AppField
                name="sections.certification.items"
                mode="array"
                children={(field) => {
                    return (
                        <FieldSet>
                            <FieldLegend className="font-bold text-2xl!">
                                {form.state.values.sections.certification.title}
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
                                                    title={item.title}
                                                    subtitle={item.issuer}
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
                                <CertificationDialog
                                    defaultValues={getEmptyCertification()}
                                    onSubmit={(value) =>
                                        field.pushValue({
                                            ...value,
                                            id: crypto.randomUUID(),
                                        })
                                    }
                                />
                                {editingItem && (
                                    <CertificationDialog
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

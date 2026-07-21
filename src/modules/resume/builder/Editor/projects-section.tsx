import { Button } from "#/components/ui/button"
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "#/components/ui/field"
import { withForm } from "#/hooks/form"
import { CalendarIcon, PlusIcon } from "lucide-react"
import { DotsSixVerticalIcon } from "@phosphor-icons/react"
import { resumeFormOptions } from "../../data/resume-default-values"
import { SortableDragItem, SortableDragProvider, SortableItemRow } from "../components/sortable-item"
import { TagsInput } from "#/components/ui/tags-input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#/components/ui/select"
import { InputGroup, InputGroupAddon, InputGroupInput } from "#/components/ui/input-group"
import { LinkField } from "./components/link-field"

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

type ProjectItem = ResumeValues["sections"]["project"]["items"][0]

const PROJECT_TYPES = ["personal", "professional", "open-source", "freelance"] as const

const getEmptyProject = (): ProjectItem => ({
    id: "",
    hidden: false,
    name: "",
    type: "personal",
    links: [],
    keywords: [],
    startDate: "",
    endDate: "",
    content: "",
})

function ProjectDialog({
    defaultValues,
    onSubmit,
    trigger,
    initialOpen = false,
    onClosed,
    mode = "create",
}: {
    defaultValues: ProjectItem
    onSubmit: (value: ProjectItem) => void
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
                ? "Discard changes to this project? Unsaved changes will be lost."
                : "Discard this new project? Unsaved changes will be lost."
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
                          <PlusIcon /> Add a new {"Project"}
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
                        {mode === "edit" ? "Edit" : "Add"} {"Project"}
                    </DialogTitle>
                    <DialogDescription>Fill out the {"Project"} information details below.</DialogDescription>
                </DialogHeader>

                <FieldSet>
                    <FieldSet className="grid grid-cols-1 md:grid-cols-2">
                        <form.Field
                            name="name"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="name">Name</FieldLabel>
                                        <Input
                                            id="name"
                                            value={dialogField.state.value}
                                            onChange={(e) => dialogField.handleChange(e.target.value)}
                                            placeholder="e.g. Resume Builder"
                                        />
                                    </Field>
                                )
                            }}
                        />
                        <form.Field
                            name="type"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="type">Type</FieldLabel>
                                        <Select
                                            value={dialogField.state.value}
                                            onValueChange={(value) =>
                                                dialogField.handleChange(value as ProjectItem["type"])
                                            }
                                        >
                                            <SelectTrigger id="type" className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {PROJECT_TYPES.map((type) => (
                                                    <SelectItem key={type} value={type}>
                                                        {type}
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
                            name="keywords"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="keywords">Keywords</FieldLabel>
                                        <TagsInput
                                            value={dialogField.state.value}
                                            onValueChange={(val) => dialogField.handleChange(val)}
                                            placeholder="React, TypeScript, UI"
                                        />
                                    </Field>
                                )
                            }}
                        />
                    </FieldSet>
                    <FieldSet>
                        <form.Field
                            name="links"
                            mode="array"
                            children={(linksField) => {
                                return (
                                    <Field>
                                        <FieldLabel>Links</FieldLabel>
                                        <div className="flex flex-col gap-2">
                                            <SortableDragProvider
                                                value={linksField.state.value}
                                                onChange={linksField.handleChange}
                                            >
                                                {(items) =>
                                                    items.map((link, idx) => {
                                                        const realIndex = linksField.state.value.findIndex(
                                                            (l) => l.id === link.id,
                                                        )
                                                        return (
                                                            <SortableDragItem
                                                                key={link.id}
                                                                sortableProps={{ index: idx, id: link.id }}
                                                                className="flex items-center gap-2"
                                                            >
                                                                <div
                                                                    role="button"
                                                                    tabIndex={0}
                                                                    aria-label="Drag to reorder link"
                                                                    className="flex size-8 shrink-0 items-center justify-center text-muted-foreground cursor-grab hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                                >
                                                                    <DotsSixVerticalIcon aria-hidden="true" />
                                                                </div>
                                                                <form.Field name={`links[${realIndex}].value`}>
                                                                    {(valueField) => (
                                                                        <form.Field
                                                                            name={`links[${realIndex}].label`}
                                                                        >
                                                                            {(labelField) => (
                                                                                <LinkField
                                                                                    id={valueField.name}
                                                                                    value={valueField.state.value}
                                                                                    onValueChange={
                                                                                        valueField.handleChange
                                                                                    }
                                                                                    linkLabel={labelField.state.value}
                                                                                    onLinkLabelChange={
                                                                                        labelField.handleChange
                                                                                    }
                                                                                    onRemove={() =>
                                                                                        linksField.removeValue(
                                                                                            realIndex,
                                                                                        )
                                                                                    }
                                                                                    className="flex-1"
                                                                                />
                                                                            )}
                                                                        </form.Field>
                                                                    )}
                                                                </form.Field>
                                                            </SortableDragItem>
                                                        )
                                                    })
                                                }
                                            </SortableDragProvider>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                linksField.pushValue({
                                                    id: crypto.randomUUID(),
                                                    label: "",
                                                    value: "",
                                                })
                                            }
                                        >
                                            <PlusIcon /> Add Link
                                        </Button>
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
                                            value={dialogField.state.value}
                                            onChange={(e) => dialogField.handleChange(e.target.value)}
                                            placeholder="Describe the project and your contributions..."
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

export const ProjectsSection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => {
        const [editingItem, setEditingItem] = useState<ProjectItem | null>(null)

        return (
            <form.AppField
                name="sections.project.items"
                mode="array"
                children={(field) => {
                    return (
                        <FieldSet>
                            <FieldLegend className="font-bold text-2xl!">
                                {form.state.values.sections.project.title}
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
                                                    title={item.name}
                                                    subtitle={`${item.startDate} - ${item.endDate}`}
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
                                <ProjectDialog
                                    defaultValues={getEmptyProject()}
                                    onSubmit={(value) =>
                                        field.pushValue({
                                            ...value,
                                            id: crypto.randomUUID(),
                                        })
                                    }
                                />
                                {editingItem && (
                                    <ProjectDialog
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

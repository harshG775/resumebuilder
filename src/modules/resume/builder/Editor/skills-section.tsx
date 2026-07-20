import { Button } from "#/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "#/components/ui/field"
import { withForm } from "#/hooks/form"
import { PlusIcon } from "lucide-react"
import { resumeFormOptions } from "../../data/resume-default-values"
import { SortableDragProvider, SortableItemRow } from "../components/sortable-item"

import { useForm } from "@tanstack/react-form"
import { Input } from "#/components/ui/input"
import { Slider } from "#/components/ui/slider"
import { TagsInput } from "#/components/ui/tags-input"
import { CaretDownIcon, ListIcon } from "@phosphor-icons/react"
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

type SkillItem = ResumeValues["sections"]["skill"]["items"][0]

const getEmptySkill = (): SkillItem => ({
    id: "",
    hidden: false,
    icon: "",
    keywords: [],
    level: 1,
    name: "",
    proficiency: "",
})

function SkillDialog({
    defaultValues,
    onSubmit,
    trigger,
    initialOpen = false,
    onClosed,
    mode = "create",
}: {
    defaultValues: SkillItem
    onSubmit: (value: SkillItem) => void
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
                ? "Discard changes to this skill? Unsaved changes will be lost."
                : "Discard this new skill? Unsaved changes will be lost."
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
                          <PlusIcon /> Add a new {"Skill"}
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
                className="md:max-w-2xl lg:max-w-3xl"
            >
                <DialogHeader>
                    <DialogTitle>
                        {mode === "edit" ? "Edit" : "Add"} {"Skill"}
                    </DialogTitle>
                    <DialogDescription>Fill out the {"Skill"} information details below.</DialogDescription>
                </DialogHeader>

                <FieldSet>
                    <FieldSet className="grid grid-cols-1 md:grid-cols-2">
                        <form.Field
                            name="name"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="name">Skill Name</FieldLabel>
                                        <Input
                                            id="name"
                                            value={dialogField.state.value}
                                            onChange={(e) => dialogField.handleChange(e.target.value)}
                                            placeholder="e.g. React"
                                        />
                                    </Field>
                                )
                            }}
                        />
                        <form.Field
                            name="proficiency"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="proficiency">Proficiency Description</FieldLabel>
                                        <Input
                                            id="proficiency"
                                            value={dialogField.state.value}
                                            onChange={(e) => dialogField.handleChange(e.target.value)}
                                            placeholder="e.g. Advanced / 5 years"
                                        />
                                    </Field>
                                )
                            }}
                        />
                    </FieldSet>
                    <FieldSet>
                        <form.Field
                            name="level"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel>Skill Level</FieldLabel>
                                        <Slider
                                            value={[dialogField.state.value]}
                                            onValueChange={(val) =>
                                                dialogField.handleChange(Array.isArray(val) ? val[0] : val)
                                            }
                                            max={6}
                                            min={1}
                                            step={1}
                                        />
                                        <FieldDescription>
                                            ({dialogField.state.value - 1 > 0 ? `${dialogField.state.value - 1}/5` : "hidden"})
                                        </FieldDescription>
                                    </Field>
                                )
                            }}
                        />
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
                                            placeholder="Frontend, Hooks, UI"
                                        />
                                        <FieldDescription>Separate with commas</FieldDescription>
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

export const SkillsSection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => {
        const [editingItem, setEditingItem] = useState<SkillItem | null>(null)

        return (
            <form.AppField
                name="sections.skill.items"
                mode="array"
                children={(field) => {
                    return (
                        <FieldSet>
                            <FieldLegend className="font-bold text-2xl! flex items-center w-full">
                                <Button variant={"ghost"}>
                                    <CaretDownIcon />
                                </Button>
                                <div className="w-full">{form.state.values.sections.skill.title}</div>
                                <Button variant={"ghost"}>
                                    <ListIcon />
                                </Button>
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
                                                    subtitle={item.keywords.join(", ")}
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
                                <SkillDialog
                                    defaultValues={getEmptySkill()}
                                    onSubmit={(value) =>
                                        field.pushValue({
                                            ...value,
                                            id: crypto.randomUUID(),
                                        })
                                    }
                                />
                                {editingItem && (
                                    <SkillDialog
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

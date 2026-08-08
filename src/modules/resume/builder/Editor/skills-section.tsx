import { Button } from "#/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "#/components/ui/dialog"
import { Field, FieldLabel, FieldSet } from "#/components/ui/field"
import { Input } from "#/components/ui/input"
import { TagsInput } from "#/components/ui/tags-input"
import { withForm } from "#/hooks/form"
import { resumeFormOptions } from "../../data/resume-default-values"
import { SectionFieldSet } from "../components/section-field-set"
import { SortableDragProvider, SortableItemRow } from "../components/sortable-item"
import { ListIcon, PlusIcon } from "@phosphor-icons/react"
import { useForm } from "@tanstack/react-form"
import { useState } from "react"
import type { ReactNode } from "react"
import type { ResumeValues } from "../../schema/resume.zod-schema"

type CategoryItem = ResumeValues["data"]["sections"]["skills"]["attributes"][number]
type SkillItem = CategoryItem["skill"][number]

const skillsToNames = (skills: SkillItem[]): string[] => skills.map((skill) => skill.name)

const namesToSkills = (names: string[], prevSkills: SkillItem[]): SkillItem[] =>
    names.map((name) => prevSkills.find((skill) => skill.name === name) ?? { id: crypto.randomUUID(), isActive: true, name })

const getEmptyCategory = (): CategoryItem => ({
    id: "",
    isActive: true,
    category: "",
    skill: [],
})

function CategoryDialog({
    defaultValues,
    onSubmit,
    trigger,
    initialOpen = false,
    onClosed,
    mode = "create",
}: {
    defaultValues: CategoryItem
    onSubmit: (value: CategoryItem) => void
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
                ? "Discard changes to this category? Unsaved changes will be lost."
                : "Discard this new category? Unsaved changes will be lost."
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
                          <PlusIcon /> Add Skill Category
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
                        {mode === "edit" ? "Edit" : "Add"} {"Category"}
                    </DialogTitle>
                    <DialogDescription>Fill out the {"Category"} information details below.</DialogDescription>
                </DialogHeader>

                <FieldSet>
                    <FieldSet>
                        <form.Field
                            name="category"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="category">Category</FieldLabel>
                                        <Input
                                            id="category"
                                            value={dialogField.state.value}
                                            onChange={(e) => dialogField.handleChange(e.target.value)}
                                            placeholder="e.g. Languages"
                                        />
                                    </Field>
                                )
                            }}
                        />
                    </FieldSet>
                    <FieldSet>
                        <form.Field
                            name="skill"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="skill">Skills</FieldLabel>
                                        <TagsInput
                                            value={skillsToNames(dialogField.state.value)}
                                            onValueChange={(names) =>
                                                dialogField.handleChange(namesToSkills(names, dialogField.state.value))
                                            }
                                            placeholder="Add a skill and press Enter"
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

export const SkillsSection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => {
        const [editingItem, setEditingItem] = useState<CategoryItem | null>(null)

        return (
            <form.AppField
                name="data.sections.skills.attributes"
                mode="array"
                children={(field) => {
                    return (
                        <SectionFieldSet
                            title={form.state.values.data.sections.skills.title}
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
                                                title={item.category}
                                                subtitle={skillsToNames(item.skill).join(", ")}
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
                            <CategoryDialog
                                defaultValues={getEmptyCategory()}
                                onSubmit={(value) =>
                                    field.pushValue({
                                        ...value,
                                        id: crypto.randomUUID(),
                                    })
                                }
                            />
                            {editingItem && (
                                <CategoryDialog
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

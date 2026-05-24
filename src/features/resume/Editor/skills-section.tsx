import { Button } from "#/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "#/components/ui/field"
import { withForm } from "#/hooks/form"
import { resumeFormOptions } from "#/features/resume/resume-form-options"
import { Plus } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    // DialogTrigger,
} from "@/components/ui/dialog"
import { Slider } from "#/components/ui/slider"
import { Input } from "#/components/ui/input"
import type z from "zod"
import type { SkillsItemSchema } from "#/features/resume/resume-schema"
import { useState } from "react"
import { TagsInput } from "#/components/ui/tags-input"
import { SortableDragProvider, SortableItemRow } from "#/components/sortable-item"
import { CaretDownIcon, ListIcon } from "@phosphor-icons/react"

type SkillItem = z.infer<typeof SkillsItemSchema>

export const SkillsSection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => {
        const [dialogState, setDialogState] = useState<"NEW_ITEM" | "EDIT_ITEM" | null>(null)
        const [editingIndex, setEditingIndex] = useState<number | null>(null)

        const [formState, setFormState] = useState<SkillItem>({
            id: crypto.randomUUID(),
            hidden: false,
            icon: "",
            keywords: [],
            level: 1,
            name: "",
            proficiency: "",
        })
        const isEditing = editingIndex !== null && dialogState === "EDIT_ITEM"

        const handleCloseDialog = () => {
            setDialogState(null)
            setEditingIndex(null)
        }
        return (
            <form.AppField
                name="sections.skills.items"
                mode="array"
                children={(field) => {
                    return (
                        <>
                            <FieldSet>
                                <FieldLegend className="font-bold text-2xl! flex items-center w-full">
                                    <Button variant={"ghost"}>
                                        <CaretDownIcon />
                                    </Button>
                                    <div className="w-full">{form.state.values.sections.skills.title}</div>
                                    <Button variant={"ghost"}>
                                        <ListIcon />
                                    </Button>
                                </FieldLegend>
                                <FieldGroup>
                                    <div className="border divide-y rounded-md">
                                        <SortableDragProvider value={field.state.value} onChange={field.handleChange}>
                                            {field.state.value.map((item, idx) => (
                                                <SortableItemRow
                                                    key={item.id}
                                                    sortableProps={{
                                                        index: idx,
                                                        id: item.id,
                                                    }}
                                                    title={item?.name}
                                                    subtitle={item?.keywords.join(", ")}
                                                    hidden={item?.hidden}
                                                    actions={{
                                                        onToggleVisibility: (nextHidden) => {
                                                            field.handleChange((prev) =>
                                                                prev.map((i) =>
                                                                    i.id === item.id ? { ...i, hidden: nextHidden } : i,
                                                                ),
                                                            )
                                                        },

                                                        onEdit: () => {
                                                            // alert("Update item " + item.id)
                                                            setDialogState("EDIT_ITEM")
                                                            setEditingIndex(idx)
                                                            setFormState(item)
                                                        },

                                                        onDelete: () => {
                                                            field.handleChange((prev) =>
                                                                prev.filter((i) => i.id !== item.id),
                                                            )
                                                        },
                                                    }}
                                                />
                                            ))}
                                        </SortableDragProvider>
                                    </div>
                                    <Button
                                        variant={"outline"}
                                        onClick={() => {
                                            setDialogState("NEW_ITEM")
                                            setFormState({
                                                id: crypto.randomUUID(),
                                                hidden: false,
                                                icon: "",
                                                keywords: [],
                                                level: 1,
                                                name: "",
                                                proficiency: "",
                                            })
                                        }}
                                    >
                                        <Plus /> Add a new skills
                                    </Button>
                                </FieldGroup>
                            </FieldSet>
                            <Dialog open={dialogState !== null} onOpenChange={handleCloseDialog}>
                                <DialogContent className="md:max-w-2xl lg:max-w-3xl">
                                    <DialogHeader>
                                        <DialogTitle className="flex gap-2 items-center">
                                            <Plus />
                                            {isEditing ? "Edit skill" : "Add skill"}
                                        </DialogTitle>
                                        <DialogDescription className="text-left text-xs">
                                            {isEditing
                                                ? "modify the skill information details below."
                                                : " Fill out the skill information details below."}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <FieldSet>
                                        <FieldSet className="grid grid-cols-1 md:grid-cols-2">
                                            <Field>
                                                <FieldLabel htmlFor="name">Skill Name</FieldLabel>
                                                <Input
                                                    id="name"
                                                    value={formState.name}
                                                    onChange={(e) =>
                                                        setFormState({ ...formState, name: e.target.value })
                                                    }
                                                    placeholder="e.g. React"
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="proficiency">Proficiency Description</FieldLabel>
                                                <Input
                                                    id="proficiency"
                                                    value={formState.proficiency}
                                                    onChange={(e) =>
                                                        setFormState({ ...formState, proficiency: e.target.value })
                                                    }
                                                    placeholder="e.g. Advanced / 5 years"
                                                />
                                            </Field>
                                        </FieldSet>
                                        <Field>
                                            <FieldLabel>Skill Level </FieldLabel>
                                            <Slider
                                                value={[formState.level]}
                                                onValueChange={([val]) => setFormState({ ...formState, level: val })}
                                                max={6}
                                                min={1}
                                                step={1}
                                            />
                                            <FieldDescription>
                                                ({formState.level - 1 > 0 ? `${formState.level - 1}/5` : "hidden"})
                                            </FieldDescription>
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="keywords">Keywords</FieldLabel>
                                            <TagsInput
                                                value={formState.keywords}
                                                onValueChange={(val) => setFormState({ ...formState, keywords: val })}
                                                placeholder="Frontend, Hooks, UI"
                                            />
                                            <FieldDescription>Separate with commas</FieldDescription>
                                        </Field>
                                        <div className="flex gap-2 justify-end">
                                            <Button variant={"ghost"} onClick={handleCloseDialog}>
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    if (isEditing) {
                                                        field.replaceValue(editingIndex, formState)
                                                    } else {
                                                        field.pushValue(formState)
                                                    }
                                                    handleCloseDialog()
                                                }}
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    </FieldSet>
                                </DialogContent>
                            </Dialog>
                        </>
                    )
                }}
            />
        )
    },
})

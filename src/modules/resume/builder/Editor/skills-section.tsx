import { Button } from "#/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "#/components/ui/field"
import { useAppForm, withForm } from "#/hooks/form"
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
import { useState } from "react"
import { TagsInput } from "#/components/ui/tags-input"
import { CaretDownIcon, ListIcon } from "@phosphor-icons/react"
import { resumeFormOptions } from "../../data/resume-default-values"
import { SortableDragProvider, SortableItemRow } from "../components/sortable-item"
import type { ResumeValues } from "../../schema/resume.zod-schema"

type SkillItem = ResumeValues["sections"]["skill"]["items"][0]

const getEmptySkill = (): SkillItem => ({
    id: crypto.randomUUID(),
    hidden: false,
    icon: "",
    keywords: [],
    level: 1,
    name: "",
    proficiency: "",
})
export const SkillsSection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => {
        const [dialogState, setDialogState] = useState<"NEW_ITEM" | "EDIT_ITEM" | null>(null)
        const [editingIndex, setEditingIndex] = useState<number | null>(null)

        const dialogForm = useAppForm({ defaultValues: { item: getEmptySkill() } })
        const isEditing = editingIndex !== null && dialogState === "EDIT_ITEM"

        const handleCloseDialog = () => {
            setDialogState(null)
            setEditingIndex(null)
        }
        return (
            <form.AppField
                name="sections.skill.items"
                mode="array"
                children={(field) => {
                    return (
                        <>
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
                                            {field.state.value.map((item, idx) => (
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
                                                            // alert("Update item " + item.id)
                                                            setDialogState("EDIT_ITEM")
                                                            setEditingIndex(idx)
                                                            dialogForm.setFieldValue("item", item)
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
                                            dialogForm.setFieldValue("item", getEmptySkill())
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
                                            <dialogForm.AppField
                                                name="item.name"
                                                children={(dialogField) => {
                                                    return (
                                                        <Field>
                                                            <FieldLabel htmlFor="name">Skill Name</FieldLabel>
                                                            <Input
                                                                id="name"
                                                                value={dialogField.state.value}
                                                                onChange={(e) =>
                                                                    dialogField.handleChange(e.target.value)
                                                                }
                                                                placeholder="e.g. React"
                                                            />
                                                        </Field>
                                                    )
                                                }}
                                            />
                                            <dialogForm.AppField
                                                name="item.proficiency"
                                                children={(dialogField) => {
                                                    return (
                                                        <Field>
                                                            <FieldLabel htmlFor="proficiency">
                                                                Proficiency Description
                                                            </FieldLabel>
                                                            <Input
                                                                id="proficiency"
                                                                value={dialogField.state.value}
                                                                onChange={(e) =>
                                                                    dialogField.handleChange(e.target.value)
                                                                }
                                                                placeholder="e.g. Advanced / 5 years"
                                                            />
                                                        </Field>
                                                    )
                                                }}
                                            />
                                        </FieldSet>
                                        <dialogForm.AppField
                                            name="item.level"
                                            children={(dialogField) => {
                                                return (
                                                    <Field>
                                                        <FieldLabel>Skill Level </FieldLabel>
                                                        <Slider
                                                            value={[dialogField.state.value]}
                                                            onValueChange={(val) =>
                                                                dialogField.handleChange(
                                                                    Array.isArray(val) ? val[0] : val,
                                                                )
                                                            }
                                                            max={6}
                                                            min={1}
                                                            step={1}
                                                        />
                                                        <FieldDescription>
                                                            (
                                                            {dialogField.state.value - 1 > 0
                                                                ? `${dialogField.state.value - 1}/5`
                                                                : "hidden"}
                                                            )
                                                        </FieldDescription>
                                                    </Field>
                                                )
                                            }}
                                        />
                                        <dialogForm.AppField
                                            name="item.keywords"
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

                                        <div className="flex gap-2 justify-end">
                                            <Button variant={"ghost"} onClick={handleCloseDialog}>
                                                Cancel
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    const value = dialogForm.state.values.item
                                                    if (isEditing) {
                                                        field.replaceValue(editingIndex, value)
                                                    } else {
                                                        field.pushValue(value)
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

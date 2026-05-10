import { Button } from "#/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "#/components/ui/field"
import { withForm } from "#/hooks/form"
import { resumeFormOptions } from "#/lib/resume-form-options"
import { Plus } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Slider } from "../ui/slider"
import { Input } from "../ui/input"
import type z from "zod"
import type { SkillsItemSchema } from "#/lib/schemas/resume-schema"
import { useState } from "react"
import { TagsInput } from "../ui/tags-input"
import { SortableDragProvider, SortableItemRow } from "../sortable-item"
import { CaretDownIcon, ListIcon } from "@phosphor-icons/react"

type SkillItem = z.infer<typeof SkillsItemSchema>

const SkillItemDialog = ({ onSave, trigger }: { onSave: (value: SkillItem) => void; trigger: React.ReactNode }) => {
    const [open, setOpen] = useState(false)
    const [draft, setDraft] = useState({
        id: "",
        hidden: false,
        icon: "",
        keywords: [] as string[],
        level: 1,
        name: "",
        proficiency: "",
    })
    const handleCreate = () => {
        onSave({
            ...draft,
            id: crypto.randomUUID(),
        })
        setOpen(false)
        setDraft({ id: "", hidden: false, icon: "", keywords: [], level: 1, name: "", proficiency: "" })
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="md:max-w-2xl lg:max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="flex gap-2 items-center">
                        <Plus />
                        Create a new skill
                    </DialogTitle>
                    <DialogDescription className="text-left text-xs">
                        Fill in the details for your new skill set.
                    </DialogDescription>{" "}
                </DialogHeader>
                <FieldSet>
                    <FieldSet className="grid grid-cols-1 md:grid-cols-2">
                        <Field>
                            <FieldLabel htmlFor="name">Skill Name</FieldLabel>
                            <Input
                                id="name"
                                value={draft.name}
                                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                                placeholder="e.g. React"
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="proficiency">Proficiency Description</FieldLabel>
                            <Input
                                id="proficiency"
                                value={draft.proficiency}
                                onChange={(e) => setDraft({ ...draft, proficiency: e.target.value })}
                                placeholder="e.g. Advanced / 5 years"
                            />
                        </Field>
                    </FieldSet>
                    <Field>
                        <FieldLabel>Skill Level </FieldLabel>
                        <Slider
                            value={[draft.level]}
                            onValueChange={([val]) => setDraft({ ...draft, level: val })}
                            max={6}
                            min={1}
                            step={1}
                        />
                        <FieldDescription>({draft.level - 1 > 0 ? `${draft.level - 1}/5` : "hidden"})</FieldDescription>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="keywords">Keywords</FieldLabel>
                        <TagsInput
                            value={draft.keywords}
                            onValueChange={(val) => setDraft({ ...draft, keywords: val })}
                            placeholder="Frontend, Hooks, UI"
                        />
                        <FieldDescription>Separate with commas</FieldDescription>
                    </Field>
                    <div className="flex gap-2 justify-end">
                        <Button variant={"ghost"} onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleCreate}>Create</Button>
                    </div>
                </FieldSet>
            </DialogContent>
        </Dialog>
    )
}

export const SkillsSection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => {
        return (
            <form.AppField
                name="sections.skills.items"
                mode="array"
                children={(field) => (
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
                                                    alert("Update item " + item.id)
                                                },

                                                onDelete: () => {
                                                    field.handleChange((prev) => prev.filter((i) => i.id !== item.id))
                                                },
                                            }}
                                        />
                                    ))}
                                </SortableDragProvider>
                            </div>
                            <SkillItemDialog
                                trigger={
                                    <Button variant={"outline"}>
                                        <Plus /> Add a new skills
                                    </Button>
                                }
                                onSave={(newItem) => field.pushValue(newItem)}
                            />
                        </FieldGroup>
                    </FieldSet>
                )}
            />
        )
    },
})

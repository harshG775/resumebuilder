import { Button } from "#/components/ui/button"
import { Field, FieldLabel } from "#/components/ui/field"
import { Input } from "#/components/ui/input"
import { withForm } from "#/hooks/form"
import { resumeFormOptions } from "../../data/resume-default-values"
import { SectionFieldSet } from "../components/section-field-set"
import { SortableDragItem, SortableDragProvider } from "../components/sortable-item"
import { TagsInput } from "#/components/ui/tags-input"
import { DotsSixVerticalIcon, EyeClosedIcon, EyeIcon, PlusIcon, TrashIcon } from "@phosphor-icons/react"
import type { ResumeValues } from "../../schema/resume.zod-schema"

type SkillItem = ResumeValues["data"]["sections"]["skills"]["attributes"][number]["skill"][number]

const skillsToNames = (skills: SkillItem[]): string[] => skills.map((skill) => skill.name)

const namesToSkills = (names: string[], prevSkills: SkillItem[]): SkillItem[] =>
    names.map((name) => prevSkills.find((skill) => skill.name === name) ?? { id: crypto.randomUUID(), isActive: true, name })

export const SkillsSection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => (
        <form.AppField name="data.sections.skills.attributes" mode="array">
            {(field) => (
                <SectionFieldSet title={form.state.values.data.sections.skills.title}>
                    <form.AppField name="data.sections.skills.columns">
                        {(columnsField) => (
                            <Field orientation="horizontal">
                                <FieldLabel htmlFor={columnsField.name}>Columns</FieldLabel>
                                <Input
                                    id={columnsField.name}
                                    type="number"
                                    min={1}
                                    max={5}
                                    step={1}
                                    className="w-20"
                                    value={columnsField.state.value}
                                    onChange={(e) => columnsField.handleChange(e.target.valueAsNumber)}
                                />
                            </Field>
                        )}
                    </form.AppField>

                    <div className="border divide-y rounded-md">
                        <SortableDragProvider value={field.state.value} onChange={field.handleChange}>
                            {(items) =>
                                items.map((category, idx) => {
                                    const realIndex = field.state.value.findIndex((c) => c.id === category.id)
                                    return (
                                        <SortableDragItem
                                            key={category.id}
                                            sortableProps={{ index: idx, id: category.id }}
                                            className="flex items-start gap-2 p-2"
                                        >
                                            <div
                                                role="button"
                                                tabIndex={0}
                                                aria-label={`Drag to reorder ${category.category || "category"}`}
                                                className="flex size-8 shrink-0 items-center justify-center text-muted-foreground cursor-grab hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring mt-0.5"
                                            >
                                                <DotsSixVerticalIcon aria-hidden="true" weight="bold" />
                                            </div>
                                            <div className="flex-1 flex flex-col gap-2">
                                                <form.AppField name={`data.sections.skills.attributes[${realIndex}].category`}>
                                                    {(categoryField) => (
                                                        <Input
                                                            value={categoryField.state.value}
                                                            onChange={(e) => categoryField.handleChange(e.target.value)}
                                                            placeholder="e.g. Languages"
                                                            className="font-medium"
                                                        />
                                                    )}
                                                </form.AppField>
                                                <form.AppField name={`data.sections.skills.attributes[${realIndex}].skill`}>
                                                    {(skillField) => (
                                                        <TagsInput
                                                            value={skillsToNames(skillField.state.value)}
                                                            onValueChange={(names) =>
                                                                skillField.handleChange(namesToSkills(names, skillField.state.value))
                                                            }
                                                            placeholder="Add a skill and press Enter"
                                                        />
                                                    )}
                                                </form.AppField>
                                            </div>
                                            <div className="flex shrink-0 gap-1">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon-sm"
                                                    aria-label={category.isActive ? "Hide category" : "Show category"}
                                                    onClick={() =>
                                                        field.handleChange((prev) =>
                                                            prev.map((c) =>
                                                                c.id === category.id ? { ...c, isActive: !c.isActive } : c,
                                                            ),
                                                        )
                                                    }
                                                >
                                                    {category.isActive ? <EyeIcon /> : <EyeClosedIcon />}
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon-sm"
                                                    aria-label="Delete category"
                                                    onClick={() => field.removeValue(realIndex)}
                                                >
                                                    <TrashIcon />
                                                </Button>
                                            </div>
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
                            field.pushValue({
                                id: crypto.randomUUID(),
                                isActive: true,
                                category: "",
                                skill: [],
                            })
                        }
                    >
                        <PlusIcon />
                        Add Category
                    </Button>
                </SectionFieldSet>
            )}
        </form.AppField>
    ),
})

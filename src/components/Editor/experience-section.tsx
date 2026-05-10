import { Button } from "#/components/ui/button"
import { FieldGroup, FieldLegend, FieldSet } from "#/components/ui/field"
import { withForm } from "#/hooks/form"
import { resumeFormOptions } from "#/lib/resume-form-options"
import { Plus } from "lucide-react"
import { SortableDragProvider, SortableItemRow } from "../sortable-item"

export const ExperienceSection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => (
        <form.AppField
            name="sections.experience.items"
            mode="array"
            children={(field) => {
                const items = field.state.value
                const handleClickAddProject = () => {}
                return (
                    <FieldSet>
                        <FieldLegend className="font-bold text-2xl!">
                            {form.state.values.sections.experience.title}
                        </FieldLegend>
                        <FieldGroup>
                            <div className="border divide-y rounded-md">
                                <SortableDragProvider value={field.state.value} onChange={field.handleChange}>
                                    {items.map((item, idx) => (
                                        <SortableItemRow
                                            key={item.id}
                                            sortableProps={{
                                                index: idx,
                                                id: item.id,
                                            }}
                                            title={item?.company}
                                            subtitle={item?.position}
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
                            <Button variant={"outline"} onClick={handleClickAddProject}>
                                <Plus /> Add a new {form.state.values.sections.experience.title}
                            </Button>
                        </FieldGroup>
                    </FieldSet>
                )
            }}
        />
    ),
})

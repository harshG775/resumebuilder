import { Button } from "#/components/ui/button"
import { FieldGroup, FieldLegend, FieldSet } from "#/components/ui/field"
import { withForm } from "#/hooks/form"
import { Plus } from "lucide-react"
import { resumeFormOptions } from "../../data/resume-default-values"
import { SortableDragProvider, SortableItemRow } from "../components/sortable-item"

export const EducationSection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => (
        <form.AppField
            name="sections.education.items"
            mode="array"
            children={(field) => {
                const items = field.state.value
                const handleClickAddProject = () => {}
                return (
                    <FieldSet>
                        <FieldLegend className="font-bold text-2xl!">
                            {form.state.values.sections.education.title}
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
                                            title={item.degree}
                                            subtitle={item.school}
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
                                <Plus /> Add a new {form.state.values.sections.education.title}
                            </Button>
                        </FieldGroup>
                    </FieldSet>
                )
            }}
        />
    ),
})

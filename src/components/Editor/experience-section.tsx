import { Button } from "#/components/ui/button"
import { FieldGroup, FieldLegend, FieldSet } from "#/components/ui/field"
import { withForm } from "#/hooks/form"
import { resumeFormOptions } from "#/lib/resume-form-options"
import { Plus } from "lucide-react"
import { SortableItemRow } from "../sortable-item"

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
                            <div>
                                {items.map((item) => (
                                    <SortableItemRow
                                        key={item.id}
                                        title={item?.company}
                                        subtitle={item?.position}
                                        onDragHandleProps={{
                                            onClick: () => {
                                                alert("dragged")
                                            },
                                        }}
                                        onItemClick={() => {
                                            alert("Item")
                                        }}
                                        onOptionsClick={() => {
                                            alert("option")
                                        }}
                                    />
                                ))}
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

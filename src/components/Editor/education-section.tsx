import { Button } from "#/components/ui/button"
import { FieldGroup, FieldLegend, FieldSet } from "#/components/ui/field"
import { withForm } from "#/hooks/form"
import { resumeFormOptions } from "#/lib/resume-form-options"
import { Plus } from "lucide-react"
import { SortableItemRow } from "../sortable-item"

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
                            <div>
                                {items.map((item) => (
                                    <SortableItemRow
                                        key={item.id}
                                        title={item?.degree}
                                        subtitle={item?.school}
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
                                <Plus /> Add a new {form.state.values.sections.education.title}
                            </Button>
                        </FieldGroup>
                    </FieldSet>
                )
            }}
        />
    ),
})

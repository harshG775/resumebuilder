import { Button } from "#/components/ui/button"
import { FieldGroup, FieldLegend, FieldSet } from "#/components/ui/field"
import { withForm } from "#/hooks/form"
import { resumeFormOptions } from "#/lib/resume-form-options"
import { Plus } from "lucide-react"

export const ProjectsSection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => (
        <form.AppField
            name="sections.projects.items"
            mode="array"
            children={(field) => {
                const items = field.state.value
                const handleClickAddProject = () => {
                    
                }
                return (
                    <FieldSet>
                        <FieldLegend className="font-bold text-2xl!">
                            {form.state.values.sections.projects.title}
                        </FieldLegend>
                        <FieldGroup>
                            <div>
                                {items.map((item) => (
                                    <div key={item.id}>{item.name}</div>
                                ))}
                            </div>
                            <Button variant={"outline"} onClick={handleClickAddProject}>
                                <Plus /> Add a new {form.state.values.sections.projects.title}
                            </Button>
                        </FieldGroup>
                    </FieldSet>
                )
            }}
        />
    ),
})

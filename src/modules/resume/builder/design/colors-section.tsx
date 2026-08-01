import { Field, FieldLabel } from "#/components/ui/field"
import { withForm } from "#/hooks/form"
import { resumeFormOptions } from "../../data/resume-default-values"
import { ColorField } from "../components/color-field"
import { SectionFieldSet } from "../components/section-field-set"

const COLOR_FIELDS = [
    { name: "primary", label: "Primary" },
    { name: "text", label: "Text" },
    { name: "textMuted", label: "Text (muted)" },
    { name: "background", label: "Background" },
    { name: "border", label: "Border" },
] as const

export const ColorsSection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => (
        <SectionFieldSet title="Colors">
            <div className="flex flex-col gap-4">
                {COLOR_FIELDS.map(({ name, label }) => (
                    <form.AppField key={name} name={`meta.theme.color.${name}`}>
                        {(field) => (
                            <Field>
                                <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                                <ColorField
                                    id={field.name}
                                    value={field.state.value}
                                    onValueChange={field.handleChange}
                                    onBlur={field.handleBlur}
                                />
                            </Field>
                        )}
                    </form.AppField>
                ))}
            </div>
        </SectionFieldSet>
    ),
})

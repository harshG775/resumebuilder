import { Field, FieldLabel } from "#/components/ui/field"
import { Input } from "#/components/ui/input"
import { withForm } from "#/hooks/form"
import { resumeFormOptions } from "../../data/resume-default-values"
import { SectionFieldSet } from "../components/section-field-set"

export const TargetTitleSection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => (
        <SectionFieldSet title={form.state.values.data.sections.targetTitle.title}>
            <form.AppField
                name="data.sections.targetTitle.attributes.name"
                children={(field) => (
                    <Field>
                        <FieldLabel htmlFor={field.name}>Target Title</FieldLabel>
                        <Input
                            id={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="e.g. Senior Frontend Engineer"
                            autoComplete="off"
                        />
                    </Field>
                )}
            />
        </SectionFieldSet>
    ),
})

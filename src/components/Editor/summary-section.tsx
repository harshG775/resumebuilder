import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "#/components/ui/field"
import { withForm } from "#/hooks/form"
import { resumeFormOptions } from "#/lib/resume-form-options"
import { RichTextEditor } from "../ui/rich-text-editor"

export const SummarySection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => (
        <FieldSet>
            <FieldLegend className="font-bold text-2xl!">{form.state.values.sections.summary.title}</FieldLegend>
            <FieldGroup>
                <form.AppField
                    name="sections.summary.content"
                    children={(field) => (
                        <Field>
                            <FieldLabel htmlFor={field.name}>Summary</FieldLabel>
                            <RichTextEditor
                                id={field.name}
                                value={field.state.value}
                                onChange={field.handleChange}
                                onBlur={field.handleBlur}
                            />
                        </Field>
                    )}
                />
            </FieldGroup>
        </FieldSet>
    ),
})

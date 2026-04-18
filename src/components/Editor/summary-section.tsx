import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "#/components/ui/field"
import { Textarea } from "#/components/ui/textarea"
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
                            {/* <Textarea
                                id={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="min-h-32"
                            /> */}
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

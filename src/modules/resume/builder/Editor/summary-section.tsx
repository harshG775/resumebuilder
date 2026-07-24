import { Field, FieldLabel } from "#/components/ui/field"
import { Textarea } from "#/components/ui/textarea"
import { withForm } from "#/hooks/form"
import { resumeFormOptions } from "../../data/resume-default-values"
import { SectionFieldSet } from "../components/section-field-set"

export const SummarySection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => (
        <SectionFieldSet title={form.state.values.sections.summary.title}>
            <form.AppField
                name="sections.summary.content"
                children={(field) => (
                    <Field>
                        <FieldLabel htmlFor={field.name}>Summary</FieldLabel>
                        <Textarea
                            id={field.name}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                        ></Textarea>
                        {/* <RichTextEditor
                            id={field.name}
                            value={field.state.value}
                            onChange={field.handleChange}
                            onBlur={field.handleBlur}
                        /> */}
                    </Field>
                )}
            />
        </SectionFieldSet>
    ),
})

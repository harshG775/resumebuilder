import { Field, FieldLabel } from "#/components/ui/field"
import { Textarea } from "#/components/ui/textarea"
import { withForm } from "#/hooks/form"
import { resumeFormOptions } from "../../data/resume-default-values"
import { SectionFieldSet } from "../components/section-field-set"
import { contentItemsToText, textToContentItems } from "../components/content-items"

export const SummarySection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => (
        <SectionFieldSet title={form.state.values.data.sections.professionalSummary.title}>
            <form.AppField
                name="data.sections.professionalSummary.attributes"
                children={(field) => (
                    <Field>
                        <FieldLabel htmlFor={field.name}>Summary</FieldLabel>
                        <Textarea
                            id={field.name}
                            value={contentItemsToText(field.state.value)}
                            onChange={(e) => field.handleChange(textToContentItems(e.target.value, field.state.value))}
                            onBlur={field.handleBlur}
                        ></Textarea>
                    </Field>
                )}
            />
        </SectionFieldSet>
    ),
})

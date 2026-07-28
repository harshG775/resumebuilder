import { Field, FieldLabel } from "#/components/ui/field"
import { Input } from "#/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#/components/ui/select"
import { withForm } from "#/hooks/form"
import { resumeFormOptions } from "../../data/resume-default-values"
import { SectionFieldSet } from "../components/section-field-set"

const FONT_FAMILIES = ["Libertinus Serif", "New Computer Modern", "DejaVu Sans Mono"] as const

const FONT_WEIGHTS = [
    { value: "400", label: "Regular" },
    { value: "500", label: "Medium" },
    { value: "600", label: "Semibold" },
    { value: "700", label: "Bold" },
    { value: "800", label: "Extrabold" },
    { value: "900", label: "Black" },
] as const

const TYPOGRAPHY_GROUPS = [
    { name: "body", label: "Body" },
    { name: "heading", label: "Heading" },
] as const

export const TypographySection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => (
        <SectionFieldSet title="Typography">
            <div className="flex flex-col gap-6">
                {TYPOGRAPHY_GROUPS.map(({ name, label }) => (
                    <div key={name} className="flex flex-col gap-4">
                        <form.AppField name={`meta.typography.${name}.fontFamily`}>
                            {(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>{label} font</FieldLabel>
                                    <Select
                                        value={field.state.value}
                                        onValueChange={(value) => field.handleChange(value ?? "")}
                                    >
                                        <SelectTrigger id={field.name} className="w-full">
                                            <SelectValue placeholder="Select a font" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {FONT_FAMILIES.map((fontFamily) => (
                                                <SelectItem key={fontFamily} value={fontFamily}>
                                                    {fontFamily}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Field>
                            )}
                        </form.AppField>
                        <form.AppField name={`meta.typography.${name}.fontWeight`}>
                            {(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>{label} weight</FieldLabel>
                                    <Select
                                        value={field.state.value}
                                        onValueChange={(value) => field.handleChange(value ?? "")}
                                    >
                                        <SelectTrigger id={field.name} className="w-full">
                                            <SelectValue placeholder="Select a weight" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {FONT_WEIGHTS.map((weight) => (
                                                <SelectItem key={weight.value} value={weight.value}>
                                                    {weight.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Field>
                            )}
                        </form.AppField>
                        <div className="grid grid-cols-2 gap-4">
                            <form.AppField name={`meta.typography.${name}.fontSize`}>
                                {(field) => (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Font size</FieldLabel>
                                        <Input
                                            id={field.name}
                                            type="number"
                                            min={6}
                                            max={24}
                                            step={0.5}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                                        />
                                    </Field>
                                )}
                            </form.AppField>
                            <form.AppField name={`meta.typography.${name}.lineHeight`}>
                                {(field) => (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Line height</FieldLabel>
                                        <Input
                                            id={field.name}
                                            type="number"
                                            min={1}
                                            max={3}
                                            step={0.1}
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                                        />
                                    </Field>
                                )}
                            </form.AppField>
                        </div>
                    </div>
                ))}
            </div>
        </SectionFieldSet>
    ),
})

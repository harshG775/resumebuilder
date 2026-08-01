import { Field, FieldLabel } from "#/components/ui/field"
import { Input } from "#/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#/components/ui/select"
import { withForm } from "#/hooks/form"
import { resumeFormOptions } from "../../data/resume-default-values"
import { SectionFieldSet } from "../components/section-field-set"

const FONT_FAMILIES = ["Libertinus Serif", "New Computer Modern", "DejaVu Sans Mono"] as const

const FONT_WEIGHTS = [
    { value: 400, label: "Regular" },
    { value: 500, label: "Medium" },
    { value: 600, label: "Semibold" },
    { value: 700, label: "Bold" },
    { value: 800, label: "Extrabold" },
    { value: 900, label: "Black" },
] as const

const FONT_FIELDS = [
    { name: "body", label: "Body font" },
    { name: "heading", label: "Heading font" },
] as const

const SIZE_FIELDS = [
    { name: "name", label: "Name" },
    { name: "heading", label: "Section heading" },
    { name: "subheading", label: "Subheading" },
    { name: "body", label: "Body" },
    { name: "meta", label: "Meta" },
] as const

const WEIGHT_FIELDS = [
    { name: "heading", label: "Heading weight" },
    { name: "subheading", label: "Subheading weight" },
] as const

export const TypographySection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => (
        <SectionFieldSet title="Typography">
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {FONT_FIELDS.map(({ name, label }) => (
                        <form.AppField key={name} name={`meta.theme.font.${name}`}>
                            {(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
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
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {WEIGHT_FIELDS.map(({ name, label }) => (
                        <form.AppField key={name} name={`meta.theme.weight.${name}`}>
                            {(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                                    <Select
                                        value={String(field.state.value)}
                                        onValueChange={(value) => field.handleChange(Number(value))}
                                    >
                                        <SelectTrigger id={field.name} className="w-full">
                                            <SelectValue placeholder="Select a weight" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {FONT_WEIGHTS.map((weight) => (
                                                <SelectItem key={weight.value} value={String(weight.value)}>
                                                    {weight.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Field>
                            )}
                        </form.AppField>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {SIZE_FIELDS.map(({ name, label }) => (
                        <form.AppField key={name} name={`meta.theme.size.${name}`}>
                            {(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>{label} size</FieldLabel>
                                    <Input
                                        id={field.name}
                                        type="number"
                                        min={6}
                                        max={28}
                                        step={0.5}
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                                    />
                                </Field>
                            )}
                        </form.AppField>
                    ))}
                </div>

                <form.AppField name="meta.theme.leading">
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
        </SectionFieldSet>
    ),
})

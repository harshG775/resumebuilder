import { Field, FieldLabel } from "#/components/ui/field"
import { Input } from "#/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#/components/ui/select"
import { Switch } from "#/components/ui/switch"
import { withForm } from "#/hooks/form"
import { resumeFormOptions } from "../../data/resume-default-values"
import { SectionFieldSet } from "../components/section-field-set"

const PAGE_FORMATS = [
    { value: "a4", label: "A4" },
    { value: "us-letter", label: "US Letter" },
    { value: "us-legal", label: "US Legal" },
] as const

const LANGUAGES = [
    { value: "en", label: "English" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "es", label: "Spanish" },
    { value: "pt", label: "Portuguese" },
    { value: "hi", label: "Hindi" },
] as const

const TOGGLE_FIELDS = [
    { name: "hideLinkUnderline", label: "Hide link underline" },
    { name: "hideIcons", label: "Hide icons" },
    { name: "hideSectionIcons", label: "Hide section icons" },
] as const

export const PageSection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => (
        <SectionFieldSet title="Page">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <form.AppField name="meta.theme.layout.paper">
                    {(field) => (
                        <Field>
                            <FieldLabel htmlFor={field.name}>Paper format</FieldLabel>
                            <Select
                                value={field.state.value}
                                onValueChange={(value) => field.handleChange(value ?? "a4")}
                            >
                                <SelectTrigger id={field.name} className="w-full">
                                    <SelectValue placeholder="Select a format" />
                                </SelectTrigger>
                                <SelectContent>
                                    {PAGE_FORMATS.map((format) => (
                                        <SelectItem key={format.value} value={format.value}>
                                            {format.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                    )}
                </form.AppField>
                <form.AppField name="meta.theme.lang">
                    {(field) => (
                        <Field>
                            <FieldLabel htmlFor={field.name}>Language</FieldLabel>
                            <Select
                                value={field.state.value}
                                onValueChange={(value) => field.handleChange(value ?? "en")}
                            >
                                <SelectTrigger id={field.name} className="w-full">
                                    <SelectValue placeholder="Select a language" />
                                </SelectTrigger>
                                <SelectContent>
                                    {LANGUAGES.map((language) => (
                                        <SelectItem key={language.value} value={language.value}>
                                            {language.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </Field>
                    )}
                </form.AppField>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <form.AppField name="meta.theme.layout.margin.x">
                    {(field) => (
                        <Field>
                            <FieldLabel htmlFor={field.name}>Horizontal margin</FieldLabel>
                            <Input
                                id={field.name}
                                type="number"
                                min={0}
                                max={150}
                                step={1}
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                            />
                        </Field>
                    )}
                </form.AppField>
                <form.AppField name="meta.theme.layout.margin.y">
                    {(field) => (
                        <Field>
                            <FieldLabel htmlFor={field.name}>Vertical margin</FieldLabel>
                            <Input
                                id={field.name}
                                type="number"
                                min={0}
                                max={150}
                                step={1}
                                value={field.state.value}
                                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                            />
                        </Field>
                    )}
                </form.AppField>
            </div>

            <form.AppField name="meta.theme.space.itemGap">
                {(field) => (
                    <Field>
                        <FieldLabel htmlFor={field.name}>Item spacing</FieldLabel>
                        <Input
                            id={field.name}
                            type="number"
                            min={0}
                            max={40}
                            step={1}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                        />
                    </Field>
                )}
            </form.AppField>

            {TOGGLE_FIELDS.map(({ name, label }) => (
                <form.AppField key={name} name={`meta.display.${name}`}>
                    {(field) => (
                        <Field orientation="horizontal">
                            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                            <Switch
                                id={field.name}
                                checked={field.state.value}
                                onCheckedChange={(checked) => field.handleChange(checked)}
                            />
                        </Field>
                    )}
                </form.AppField>
            ))}
        </SectionFieldSet>
    ),
})

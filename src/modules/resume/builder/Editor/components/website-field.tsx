import { Field, FieldLabel } from "#/components/ui/field"
import { Input } from "#/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "#/components/ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "#/components/ui/popover"
import { Tag } from "lucide-react"

export function WebsiteField({
    id,
    label = "Website",
    type = "text",
    prefix,
    value,
    onValueChange,
    onBlur,
    linkLabel,
    onLinkLabelChange,
    placeholder = "https://",
    labelPlaceholder = "e.g. Portfolio",
}: {
    id?: string
    label?: string
    type?: React.HTMLInputTypeAttribute
    /** Non-editable prefix shown before the input, e.g. "https://", "mailto:", "tel:" */
    prefix?: string
    value: string
    onValueChange: (value: string) => void
    onBlur?: () => void
    linkLabel: string
    onLinkLabelChange: (value: string) => void
    placeholder?: string
    labelPlaceholder?: string
}) {
    // The prefix is displayed as a fixed addon, so it should never also live inside
    // the editable text — strip it whenever it's typed, pasted, or already stored.
    const stripPrefix = (raw: string) =>
        prefix && raw.toLowerCase().startsWith(prefix.toLowerCase()) ? raw.slice(prefix.length) : raw

    return (
        <Field>
            <FieldLabel htmlFor={id}>{label}</FieldLabel>
            <InputGroup>
                {prefix && <InputGroupAddon className="text-muted-foreground">{prefix}</InputGroupAddon>}
                <InputGroupInput
                    type={type}
                    id={id}
                    value={stripPrefix(value)}
                    onChange={(e) => onValueChange(stripPrefix(e.target.value))}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    autoComplete="off"
                />
                <InputGroupAddon align="inline-end">
                    <Popover>
                        <PopoverTrigger
                            render={
                                <button
                                    type="button"
                                    aria-label="Edit link label"
                                    className="flex items-center text-muted-foreground outline-none hover:text-foreground"
                                />
                            }
                        >
                            <Tag className="size-3.5" />
                        </PopoverTrigger>
                        <PopoverContent className="w-56" align="end">
                            <FieldLabel htmlFor={id ? `${id}-label` : undefined}>Label</FieldLabel>
                            <Input
                                id={id ? `${id}-label` : undefined}
                                value={linkLabel}
                                onChange={(e) => onLinkLabelChange(e.target.value)}
                                placeholder={labelPlaceholder}
                                autoComplete="off"
                            />
                        </PopoverContent>
                    </Popover>
                </InputGroupAddon>
            </InputGroup>
        </Field>
    )
}

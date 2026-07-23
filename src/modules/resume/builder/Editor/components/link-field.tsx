import { Button } from "#/components/ui/button"
import { FieldLabel } from "#/components/ui/field"
import { Input } from "#/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "#/components/ui/popover"
import { cn } from "#/lib/utils"
import { Tag, X } from "lucide-react"

export function LinkField({
    id,
    value,
    onValueChange,
    onBlur,
    linkLabel,
    onLinkLabelChange,
    placeholder = "https://",
    onRemove,
    className,
}: {
    id?: string
    value: string
    onValueChange: (value: string) => void
    onBlur?: () => void
    linkLabel: string
    onLinkLabelChange: (value: string) => void
    placeholder?: string
    onRemove?: () => void
    className?: string
}) {
    return (
        <div className={cn("flex gap-2", className)}>
            <div className="relative flex-1">
                <Input
                    id={id}
                    value={value}
                    onChange={(e) => onValueChange(e.target.value)}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    className="pr-8"
                    autoComplete="off"
                />
                <Popover>
                    <PopoverTrigger
                        render={
                            <button
                                type="button"
                                aria-label="Edit link label"
                                className="absolute inset-y-0 right-2.5 flex items-center text-muted-foreground outline-none hover:text-foreground"
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
                            placeholder="e.g. Portfolio"
                            autoComplete="off"
                        />
                    </PopoverContent>
                </Popover>
            </div>
            {onRemove && (
                <Button type="button" variant="destructive" size="icon" onClick={onRemove}>
                    <X />
                </Button>
            )}
        </div>
    )
}

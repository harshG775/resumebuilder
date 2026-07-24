import { Input } from "#/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "#/components/ui/popover"
import { cn } from "#/lib/utils"

const HEX_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

const PRESET_COLORS = [
    "#000000",
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#84cc16",
    "#22c55e",
    "#10b981",
    "#14b8a6",
    "#0ea5e9",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#a855f7",
    "#d946ef",
    "#ec4899",
    "#64748b",
]

type ColorFieldProps = {
    id?: string
    value: string
    onValueChange: (value: string) => void
    onBlur?: () => void
}

export function ColorField({ id, value, onValueChange, onBlur }: ColorFieldProps) {
    const swatchColor = HEX_PATTERN.test(value) ? value : "#000000"

    return (
        <Popover>
            <PopoverTrigger
                render={
                    <button
                        type="button"
                        id={id}
                        className="flex w-full items-center gap-2 rounded-md border p-1.5 text-left hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                }
            >
                <span
                    aria-hidden="true"
                    className="size-6 shrink-0 rounded-full border"
                    style={{ backgroundColor: swatchColor }}
                />
                <span className="truncate font-mono text-xs text-muted-foreground">{value || "Select color"}</span>
            </PopoverTrigger>
            <PopoverContent className="w-60">
                <div className="flex flex-col gap-2">
                    <span className="text-xs font-medium text-muted-foreground">Presets</span>
                    <div className="grid grid-cols-8 gap-1.5">
                        {PRESET_COLORS.map((preset) => (
                            <button
                                key={preset}
                                type="button"
                                aria-label={preset}
                                onClick={() => onValueChange(preset)}
                                className={cn(
                                    "size-6 shrink-0 rounded-full border transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                    value.toLowerCase() === preset &&
                                        "ring-2 ring-ring ring-offset-2 ring-offset-popover",
                                )}
                                style={{ backgroundColor: preset }}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-xs font-medium text-muted-foreground">Custom</span>
                    <div className="flex items-center gap-2 rounded-md border p-1">
                        <input
                            type="color"
                            aria-label="Custom color picker"
                            value={swatchColor}
                            onChange={(e) => onValueChange(e.target.value)}
                            className="size-7 shrink-0 cursor-pointer rounded border-0 bg-transparent p-0"
                        />
                        <Input
                            value={value}
                            onChange={(e) => onValueChange(e.target.value)}
                            onBlur={onBlur}
                            placeholder="#000000"
                            className="h-7 border-0 px-1 font-mono shadow-none focus-visible:ring-0"
                        />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

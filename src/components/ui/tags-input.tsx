import { useState } from "react"
import { X } from "lucide-react"
import { cn } from "#/lib/utils"
import { Input } from "./input"
import { Badge } from "./badge"

interface TagsInputProps {
    value: string[]
    onValueChange: (value: string[]) => void
    placeholder?: string
    className?: string
}

export function TagsInput({ value, onValueChange, placeholder, className }: TagsInputProps) {
    const [inputValue, setInputValue] = useState("")

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault()
            const trimmed = inputValue.trim()
            if (trimmed && !value.includes(trimmed)) {
                onValueChange([...value, trimmed])
            }
            setInputValue("")
        }
        if (e.key === "Backspace" && !inputValue && value.length > 0) {
            onValueChange(value.slice(0, -1))
        }
    }

    return (
        <div className={cn("border-input flex min-h-9 flex-wrap gap-1.5 rounded-md border bg-transparent px-3 py-1.5 text-sm shadow-xs focus-within:ring-1", className)}>
            {value.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                    {tag}
                    <button
                        type="button"
                        onClick={() => onValueChange(value.filter((t) => t !== tag))}
                        className="hover:text-destructive rounded-full"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            ))}
            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={value.length === 0 ? placeholder : undefined}
                className="h-auto min-w-30 flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
            />
        </div>
    )
}
import { cn } from "#/lib/utils.ts"
import { LoaderIcon, LoaderCircleIcon } from "lucide-react"

const spinnerVariants = {
    default: LoaderIcon,
    circle: LoaderCircleIcon,
} as const

type SpinnerVariant = keyof typeof spinnerVariants

interface SpinnerProps extends React.ComponentProps<"svg"> {
    variant?: SpinnerVariant
}

function Spinner({ className, variant = "default", ...props }: SpinnerProps) {
    const Icon = spinnerVariants[variant]

    return (
        <Icon
            data-slot="spinner"
            data-variant={variant}
            role="status"
            aria-label="Loading"
            className={cn("size-4 animate-spin", className)}
            {...props}
        />
    )
}

export { Spinner, spinnerVariants }
export type { SpinnerVariant }

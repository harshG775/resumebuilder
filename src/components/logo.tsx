import { cva } from "class-variance-authority"
import type { VariantProps } from "class-variance-authority"
import type { ComponentPropsWithRef, ComponentType } from "react"

import { cn } from "#/lib/utils.ts"
import { LogoMark } from "#/components/icons/logo-mark.tsx"
import { siteConfig } from "#/config/site.ts"

// Swap the icon to re-skin the brand mark for a new project; name comes from siteConfig.
const DEFAULT_ICON = LogoMark
const DEFAULT_NAME = siteConfig.name
const DEFAULT_TAGLINE = "Build Your Resume"

const logoMarkVariants = cva("flex shrink-0 items-center justify-center", {
    variants: {
        size: {
            sm: "size-7",
            default: "size-9",
            lg: "size-11",
        },
    },
    defaultVariants: {
        size: "default",
    },
})

type LogoIcon = ComponentType<{ className?: string }>

interface LogoProps extends Omit<ComponentPropsWithRef<"div">, "children">, VariantProps<typeof logoMarkVariants> {
    /** "icon" renders just the mark, "full" adds a wordmark next to it */
    variant?: "icon" | "full"
    /** Only used with variant="full": stacked name + tagline vs a single inline wordmark */
    tagline?: boolean
    icon?: LogoIcon
    name?: string
    taglineText?: string
}

function Logo({
    variant = "full",
    tagline = true,
    icon: Icon = DEFAULT_ICON,
    name = DEFAULT_NAME,
    taglineText = DEFAULT_TAGLINE,
    size,
    className,
    ref,
    ...props
}: LogoProps) {
    return (
        <div ref={ref} className={cn("flex items-center gap-3", className)} {...props}>
            <div className={cn(logoMarkVariants({ size }))}>
                <Icon className="size-full" />
            </div>
            {variant === "full" &&
                (tagline ? (
                    <div className="flex flex-col">
                        <span className="font-semibold text-foreground text-sm leading-tight">{name}</span>
                        <span className="text-xs text-muted-foreground leading-tight">{taglineText}</span>
                    </div>
                ) : (
                    <span className="font-heading font-semibold">{name}</span>
                ))}
        </div>
    )
}

export { Logo, type LogoProps }

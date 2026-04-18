import { DotsSixVerticalIcon, DotsThreeVerticalIcon } from "@phosphor-icons/react"
import { cn } from "#/lib/utils"

interface SortableItemRowProps {
    title: string
    subtitle?: string
    onDragHandleProps?: React.HTMLAttributes<HTMLDivElement>
    onItemClick?: () => void
    onOptionsClick?: () => void
    className?: string
}

export const SortableItemRow = ({
    title,
    subtitle,
    onDragHandleProps,
    onItemClick,
    onOptionsClick,
    className,
}: SortableItemRowProps) => {
    return (
        <div className={cn("flex text-muted-foreground rounded-md", className)} role="listitem">
            <div
                role="button"
                tabIndex={0}
                aria-label={`Drag to reorder ${title}`}
                className="h-14 flex items-center p-2 hover:bg-muted/80 rounded-l-md cursor-grab focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                {...onDragHandleProps}
            >
                <DotsSixVerticalIcon aria-hidden="true" />
            </div>
            <button
                type="button"
                aria-label={`Edit ${title}`}
                onClick={onItemClick}
                className="h-14 p-2 flex flex-col justify-center hover:bg-muted/80 flex-1 select-none text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                <div className="text-sm text-foreground font-semibold">{title}</div>
                {subtitle && <div className="text-xs">{subtitle}</div>}
            </button>
            <button
                type="button"
                aria-label={`More options for ${title}`}
                className="h-14 flex items-center p-2 hover:bg-muted/80 rounded-r-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={onOptionsClick}
            >
                <DotsThreeVerticalIcon aria-hidden="true" />
            </button>
        </div>
    )
}

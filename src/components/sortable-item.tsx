import {
    DotsSixVerticalIcon,
    DotsThreeVerticalIcon,
    EyeClosedIcon,
    EyeIcon,
    PencilIcon,
    TrashIcon,
} from "@phosphor-icons/react"
import { cn } from "#/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    // DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRef } from "react"
import {
    useSortable,
    // isSortable
} from "@dnd-kit/react/sortable"
import { move } from "@dnd-kit/helpers"
import { DragDropProvider } from "@dnd-kit/react"

type SortableItemRowProps = {
    title: string
    subtitle?: string
    hidden: boolean
    actions: {
        onToggleVisibility: (hidden: boolean) => void
        onEdit: () => void
        onDelete: () => void
    }
    className?: string

    sortableProps: {
        index: number
        id: string
    }
}

export const SortableItemRow = ({
    title,
    subtitle,
    hidden,
    actions,
    className,
    sortableProps,
}: SortableItemRowProps) => {
    const { ref } = useSortable({ id: sortableProps.id, index: sortableProps.index })

    return (
        <div ref={ref} className={cn("flex text-muted-foreground", className)} role="listitem">
            <div
                role="button"
                tabIndex={0}
                aria-label={`Drag to reorder ${title}`}
                className="h-14 flex items-center p-2 hover:bg-muted/80 cursor-grab focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                <DotsSixVerticalIcon aria-hidden="true" />
            </div>
            <button
                type="button"
                aria-label={`Edit ${title}`}
                onClick={actions?.onEdit}
                className={cn(
                    "h-14 p-2 flex flex-col justify-center hover:bg-muted/80 flex-1 select-none text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    hidden ? "opacity-50" : "text-muted-foreground",
                )}
            >
                <div className="text-sm text-foreground font-semibold line-clamp-1">{title}</div>
                {subtitle && <div className="text-xs line-clamp-1">{subtitle}</div>}
            </button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        type="button"
                        aria-label={`More options for ${title}`}
                        className="h-14 flex items-center p-2 hover:bg-muted/80 rounded-r-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <DotsThreeVerticalIcon aria-hidden="true" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => actions?.onToggleVisibility(!hidden)}>
                            {hidden ? (
                                <>
                                    <EyeIcon /> Show
                                </>
                            ) : (
                                <>
                                    <EyeClosedIcon /> Hide
                                </>
                            )}
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={actions?.onEdit}>
                            <PencilIcon />
                            Update
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem variant="destructive" onClick={actions?.onDelete}>
                            <TrashIcon />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

type SortableDragItemProps = {
    children?: React.ReactNode
    className?: string
    sortableProps: {
        index: number
        id: string
    }
}
export const SortableDragItem = ({ className, sortableProps, children }: SortableDragItemProps) => {
    const { ref } = useSortable({ id: sortableProps.id, index: sortableProps.index })

    return (
        <div ref={ref} className={cn(className)}>
            {children}
        </div>
    )
}
type SortableDragProviderProps<T> = {
    value: T[]
    onChange: (updater: (prev: T[]) => T[]) => void
    children: React.ReactNode
}

export function SortableDragProvider<T>({ value, onChange, children }: SortableDragProviderProps<T>) {
    const snapshot = useRef<T[]>([])

    return (
        <DragDropProvider
            onDragStart={() => {
                snapshot.current = value
            }}
            onDragOver={(event) => {
                // onChange((items) => {
                //     const { source } = event.operation
                //     if (!isSortable(source)) return items
                //     //
                //     const { initialIndex, index } = source
                //     if (initialIndex === index) return items
                //     //
                //     const next = [...items]
                //     const [removed] = next.splice(initialIndex, 1)
                //     next.splice(index, 0, removed)
                //     return next
                // })
                onChange((prev: any) => move(prev, event))
            }}
            onDragEnd={(event) => {
                if (event.canceled) {
                    onChange(() => snapshot.current)
                }
            }}
        >
            {children}
        </DragDropProvider>
    )
}

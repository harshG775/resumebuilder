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
import { useEffect, useRef, useState } from "react"
import {
    useSortable,
    // isSortable
} from "@dnd-kit/react/sortable"
import { move } from "@dnd-kit/helpers"
import { DragDropProvider } from "@dnd-kit/react"
import { Button } from "#/components/ui/button"

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
        <div ref={ref} className={cn("flex text-muted-foreground h-14", className)} role="listitem">
            <div
                role="button"
                tabIndex={0}
                aria-label={`Drag to reorder ${title}`}
                className={"w-10 h-full rounded-none cursor-grab bg-muted text-muted-foreground hover:bg-muted/80 flex items-center justify-center"}
            >
                <DotsSixVerticalIcon weight="bold" />
            </div>
            <button
                type="button"
                aria-label={`Edit ${title}`}
                onClick={actions.onEdit}
                className={cn(
                    "h-14 p-2 flex flex-col justify-center hover:bg-muted/80 flex-1 select-none text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    hidden ? "opacity-50" : "text-muted-foreground",
                )}
            >
                <div className="text-sm text-foreground font-semibold line-clamp-1">{title}</div>
                {subtitle && <div className="text-xs line-clamp-1">{subtitle}</div>}
            </button>
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <Button
                            variant={"ghost"}
                            aria-label={`More options for ${title}`}
                            className={"w-10 h-full rounded-none"}
                        />
                    }
                >
                    <DotsThreeVerticalIcon weight="bold" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => actions.onToggleVisibility(!hidden)}>
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
                        <DropdownMenuItem onClick={actions.onEdit}>
                            <PencilIcon />
                            Update
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem variant="destructive" onClick={actions.onDelete}>
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
    children: (items: T[]) => React.ReactNode
}

export function SortableDragProvider<T>({ value, onChange, children }: SortableDragProviderProps<T>) {
    const [items, setItems] = useState(value)
    const itemsRef = useRef(items)
    const isDragging = useRef(false)

    useEffect(() => {
        if (!isDragging.current) {
            itemsRef.current = value
            setItems(value)
        }
    }, [value])

    return (
        <DragDropProvider
            onDragStart={() => {
                isDragging.current = true
            }}
            onDragOver={(event) => {
                setItems((prev: any) => {
                    const next = move(prev, event) as T[]
                    itemsRef.current = next
                    return next
                })
            }}
            onDragEnd={(event) => {
                isDragging.current = false
                if (event.canceled) {
                    itemsRef.current = value
                    setItems(value)
                    return
                }
                onChange(() => itemsRef.current)
            }}
        >
            {children(items)}
        </DragDropProvider>
    )
}

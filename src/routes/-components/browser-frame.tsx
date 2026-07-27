import { DotsThreeVerticalIcon, LockIcon, StarIcon } from "@phosphor-icons/react"
import type { ReactNode } from "react"

export function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
    return (
        <div className="overflow-hidden rounded-xl border border-border bg-card text-left shadow-(--shadow-elevated)">
            <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-3 py-2.5 sm:px-4 sm:py-3">
                <span className="size-2.5 shrink-0 rounded-full bg-destructive/50" />
                <span className="size-2.5 shrink-0 rounded-full bg-primary/40" />
                <span className="size-2.5 shrink-0 rounded-full bg-primary/60" />
                <span className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 truncate rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground sm:ml-4">
                    <LockIcon className="size-3 shrink-0" />
                    <span className="truncate">{url}</span>
                </span>
                <span className="ml-2 hidden shrink-0 items-center gap-2 text-muted-foreground sm:flex">
                    <StarIcon className="size-3.5" />
                    <DotsThreeVerticalIcon className="size-3.5" />
                </span>
            </div>
            {children}
        </div>
    )
}

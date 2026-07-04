import { Badge } from "#/components/ui/badge"
import { Button } from "#/components/ui/button"
import { Separator } from "#/components/ui/separator"
import { SidebarTrigger } from "#/components/ui/sidebar"
import { useLocation } from "@tanstack/react-router"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react"
import { BellIcon, SearchIcon } from "lucide-react"

export function DashboardHeader() {
    const pathname = useLocation({ select: (location) => location.pathname })

    const pathSegments = pathname.split("/").filter(Boolean)

    return (
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4 my-auto" />

            <Breadcrumb>
                <BreadcrumbList>
                    {pathSegments.map((segment, index) => {
                        const isLast = index === pathSegments.length - 1
                        const formattedLabel = segment
                            .replace(/[-_]/g, " ")
                            .replace(/\b\w/g, (char) => char.toUpperCase())

                        const url = "/" + pathSegments.slice(0, index + 1).join("/")

                        return (
                            <React.Fragment key={url}>
                                <BreadcrumbItem>
                                    {isLast ? (
                                        <BreadcrumbPage className="text-primary">{formattedLabel}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={url} className="hidden sm:block">
                                            {formattedLabel}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {!isLast && <BreadcrumbSeparator className="hidden sm:block" />}
                            </React.Fragment>
                        )
                    })}
                </BreadcrumbList>
            </Breadcrumb>

            <div className="ml-auto flex items-center gap-2">
                <Button variant="ghost" size="icon" className="size-8 relative">
                    <SearchIcon className="size-4" />
                    <span className="sr-only">Search</span>
                </Button>
                <Button variant="ghost" size="icon" className="size-8 relative">
                    <BellIcon className="size-4" />
                    <Badge className="absolute -top-0.5 -right-0.5 size-4 p-0 text-[10px] flex items-center justify-center">
                        4
                    </Badge>
                    <span className="sr-only">Notifications</span>
                </Button>
            </div>
        </header>
    )
}

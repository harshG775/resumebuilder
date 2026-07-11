import { Badge } from "#/components/ui/badge"
import { Button } from "#/components/ui/button"
import { Separator } from "#/components/ui/separator"
import { SidebarTrigger } from "#/components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { BellIcon, SearchIcon } from "lucide-react"

export function DashboardHeader() {
    return (
        <header className="bg-sidebar shadow flex items-center h-12 gap-2 px-3 pointer-events-auto">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4 my-auto" />

            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Resumes</BreadcrumbPage>
                    </BreadcrumbItem>
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

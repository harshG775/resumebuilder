import type { LinkProps } from "@tanstack/react-router"
import type { LucideIcon } from "lucide-react"

import { Badge } from "#/components/ui/badge"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar"

import { Link, useLocation } from "@tanstack/react-router"
import { DashboardNavUser } from "./dashboard-nav-user"
import { FileTextIcon } from "lucide-react"
import { Logo } from "#/components/logo.tsx"

const navMain: {
    title: string
    href: LinkProps["to"]
    icon: LucideIcon
    badge: string
}[] = [
    {
        title: "Resumes",
        href: "/dashboard/resumes",
        icon: FileTextIcon,
        badge: "",
    },
]

const navPlatforms = []

const navSettings = []
export function DashboardSidebar() {
    const pathname = useLocation({ select: (location) => location.pathname })
    return (
        <Sidebar>
            <SidebarHeader className="h-16  flex flex-col justify-center">
                <Logo />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Main</SidebarGroupLabel>
                    <SidebarMenu>
                        {navMain.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton
                                    render={<Link to={item.href} />}
                                    isActive={pathname === item.href}
                                    tooltip={item.title}
                                    className="flex items-center justify-between"
                                >
                                    <span className="flex items-center gap-2">
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </span>
                                    {item.badge && (
                                        <Badge variant="secondary" className="ml-auto text-xs px-1.5 py-0 h-5">
                                            {item.badge}
                                        </Badge>
                                    )}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarSeparator className={"max-w-[calc(100%-2rem)]"} />
            </SidebarContent>
            <SidebarFooter className="p-3">
                <DashboardNavUser />
            </SidebarFooter>
        </Sidebar>
    )
}

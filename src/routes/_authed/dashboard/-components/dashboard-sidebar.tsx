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
import { FileTextIcon, UserCircleIcon } from "lucide-react"
import { Logo } from "#/components/logo.tsx"

type NavItemType = {
    title: string
    href: LinkProps["to"]
    icon: LucideIcon
}

const navMain: NavItemType[] = [
    {
        title: "Resumes",
        href: "/dashboard/resumes",
        icon: FileTextIcon,
    },
]

const navSettings: NavItemType[] = [
    {
        title: "Profile",
        href: "/dashboard/profile",
        icon: UserCircleIcon,
    },
]

export function DashboardSidebar() {
    const pathname = useLocation({ select: (location) => location.pathname })
    return (
        <Sidebar>
            <SidebarHeader className="h-16  flex flex-col justify-center">
                <Link to="/">
                    <Logo />
                </Link>
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
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Settings</SidebarGroupLabel>
                    <SidebarMenu>
                        {navSettings.map((item) => (
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

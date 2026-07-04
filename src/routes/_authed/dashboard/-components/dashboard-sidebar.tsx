import { Badge } from "#/components/ui/badge"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar"

import { Link, useLocation } from "@tanstack/react-router"
import { DashboardNavUser } from "./dashboard-nav-user"
import { LayoutDashboardIcon } from "lucide-react"

const navMain = [
    {
        title: "Overview",
        href: "/dashboard",
        icon: LayoutDashboardIcon,
        badge: "3",
    },
]

const navPlatforms = []

const navSettings = []
export function DashboardSidebar() {
    const pathname = useLocation({ select: (location) => location.pathname })
    return (
        <Sidebar>
            <SidebarHeader className="p-4">
                <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-primary">
                        {/* <RiFlowChart className="size-4 text-primary-foreground" /> */}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold text-foreground text-sm leading-tight">EngageFlow</span>
                        <span className="text-xs text-muted-foreground leading-tight">Automation Suite</span>
                    </div>
                </div>
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

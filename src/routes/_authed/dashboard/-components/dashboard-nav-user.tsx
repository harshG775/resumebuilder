import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { authClient } from "#/lib/auth/auth-client"
import { ChevronDownIcon, ChevronRightIcon, LogOutIcon, PaletteIcon } from "lucide-react"

export function DashboardNavUser() {
    const { data: session, isPending } = authClient.useSession()
    if (isPending) {
        return <div>isPending</div>
    }

    if (session) {
        const user = session.user
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            render={
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                />
                            }
                        >
                            <Avatar className="size-8 rounded-lg">
                                <AvatarImage src={user.image || ""} alt={user.name} />
                                <AvatarFallback className="rounded-lg uppercase bg-primary/20 text-primary text-xs font-semibold">
                                    {session.user.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user.name}</span>
                                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                            </div>
                            <ChevronDownIcon className="ml-auto size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="min-w-56 rounded-lg" side={"top"} align="end" sideOffset={4}>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <PaletteIcon />
                                    Theme
                                    <ChevronRightIcon className="ml-auto" />
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => void authClient.signOut()} variant="destructive">
                                <LogOutIcon />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        )
    }
}

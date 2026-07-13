import { SidebarInset, SidebarProvider } from "#/components/ui/sidebar"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { DashboardSidebar } from "./-components/dashboard-sidebar"

export const Route = createFileRoute("/_authed/dashboard")({
    beforeLoad: async ({ context, location }) => {
        if (!context.session?.user) {
            throw redirect({
                to: "/sign-in",
                search: { from: location.href },
            })
        }
    },
    component: RouteComponent,
})
function RouteComponent() {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "20rem",
                    "--sidebar-width-mobile": "20rem",
                } as React.CSSProperties
            }
        >
            <DashboardSidebar />
            <SidebarInset>
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    )
}

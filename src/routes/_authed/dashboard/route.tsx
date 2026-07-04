import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

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
    return <Outlet />
}

import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_authed/builder")({
    beforeLoad: async ({ context }) => {
        if (!context.session?.user) {
            throw redirect({ to: "/", search: { auth: false } })
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
    return <Outlet />
}

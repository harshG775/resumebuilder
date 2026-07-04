import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard")({
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

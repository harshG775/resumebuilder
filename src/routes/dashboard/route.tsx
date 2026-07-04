import { authMiddleware } from "#/lib/server/auth.middleware"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard")({
    server: {
        middleware: [authMiddleware],
    },
    component: RouteComponent,
})

function RouteComponent() {
    return <Outlet />
}

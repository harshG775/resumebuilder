import { authMiddleware } from "#/lib/server/middleware"
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

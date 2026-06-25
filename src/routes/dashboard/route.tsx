import { authMiddleware } from "#/lib/server/middleware"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard")({
    server: {
        middleware: [authMiddleware],
    },
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/dashboard"!</div>
}

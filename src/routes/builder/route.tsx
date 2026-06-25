import { authMiddleware } from "#/lib/server/middleware"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/builder")({
    server: {
        middleware: [authMiddleware],
    },
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/builder"!</div>
}

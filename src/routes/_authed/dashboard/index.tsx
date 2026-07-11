import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_authed/dashboard/")({
    beforeLoad: async () => {
        throw redirect({ to: "/dashboard/resumes" })
    },
})

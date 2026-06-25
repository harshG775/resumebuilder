import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/builder/resumes/$resume/")({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/builder/resumes/$resume/"!</div>
}

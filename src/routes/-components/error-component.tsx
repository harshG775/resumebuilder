import { ErrorComponent as ErrorComponentPrimitive } from "@tanstack/react-router"

export default function ErrorComponent({ error }: { error: any }) {
    return <ErrorComponentPrimitive error={error} />
}

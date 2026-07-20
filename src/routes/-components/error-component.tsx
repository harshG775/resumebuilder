// import { ErrorComponent as ErrorComponentPrimitive } from "@tanstack/react-router"

// export default function ErrorComponent({ error }: { error: any }) {
//     return <ErrorComponentPrimitive error={error} />
// }

import { Link } from "@tanstack/react-router"
import type { ErrorComponentProps } from "@tanstack/react-router"
import { Home, RefreshCw, ServerCrash } from "lucide-react"
import { Button } from "#/components/ui/button"

export default function ErrorComponent({ error, reset }: ErrorComponentProps) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-8 text-center font-sans">
            <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
                <ServerCrash className="size-8 text-destructive" />
            </div>

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold text-foreground">Something went wrong</h1>
                <p className="max-w-md text-sm text-muted-foreground">
                    An unexpected error occurred while loading this page. Try again, or head back to the dashboard.
                </p>
            </div>

            {import.meta.env.DEV && error.message && (
                <pre className="max-w-lg overflow-auto rounded-lg border border-border bg-muted p-3 text-left text-xs text-muted-foreground">
                    {error.message}
                </pre>
            )}

            <div className="flex flex-wrap items-center justify-center gap-2">
                <Button onClick={() => reset()}>
                    <RefreshCw />
                    Try again
                </Button>
                <Button render={<Link to="/dashboard" />} nativeButton={false} variant="secondary">
                    <Home />
                    Go to Dashboard
                </Button>
            </div>
        </div>
    )
}

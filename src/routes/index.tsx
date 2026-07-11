import { Button } from "#/components/ui/button"
import { authClient } from "#/lib/auth/auth-client"
import { Link, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
    component: Home,
})

function Home() {
    const { data: session, isPending } = authClient.useSession()

    if (isPending) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-8 w-8 animate-pulse rounded-full bg-primary" />
            </div>
        )
    }

    return (
        <div className="relative flex h-screen flex-col items-center justify-center gap-6 overflow-hidden px-6 text-center">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,color-mix(in_srgb,var(--primary)_35%,var(--background))_100%)]" />

            <span className="relative z-10 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                Free forever · No credit card
            </span>

            <h1 className="relative z-10 max-w-2xl text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                Build a resume that gets you hired
            </h1>

            <p className="relative z-10 max-w-md text-base text-muted-foreground">
                Pick a template, fill in your details, and export a polished PDF in minutes.
            </p>

            {session?.user ? (
                <div className="relative z-10 flex items-center gap-4">
                    <Button size="lg" render={<Link to="/dashboard/resumes" />}>
                        Go to Dashboard
                    </Button>
                    <Button size="lg" variant={"outline"} onClick={() => authClient.signOut()}>
                        Sign out
                    </Button>
                </div>
            ) : (
                <Button size="lg" render={<Link to="/sign-in" />} className="relative z-10">
                    Get Started
                </Button>
            )}
        </div>
    )
}

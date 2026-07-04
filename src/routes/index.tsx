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
                <div className="h-8 w-8 animate-pulse rounded-full bg-neutral-400" />
            </div>
        )
    }

    return (
        <div className="flex h-screen flex-col items-center justify-center gap-4">
            {session?.user && (
                <div className="island-shell flex items-center gap-4 rounded-xl p-6">
                    {session.user.image ? (
                        <img src={session.user.image} alt={session.user.name} className="h-12 w-12 rounded-full" />
                    ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800">
                            <span className="text-sm font-bold">{session.user.name.charAt(0).toUpperCase()}</span>
                        </div>
                    )}

                    <div>
                        <h2 className="text-lg font-bold">Hello, {session.user.name}!</h2>
                        <p className="text-sm text-neutral-500">{session.user.email}</p>
                    </div>
                </div>
            )}

            {session?.user ? (
                <div className="flex items-center gap-4">
                    <Button render={<Link to="/dashboard/resumes" />}>Go to Dashboard</Button>
                    <Button variant={"destructive"} onClick={() => authClient.signOut()}>
                        Sign out
                    </Button>
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <Button render={<Link to="/sign-in" />}>Sign In</Button>
                </div>
            )}
        </div>
    )
}

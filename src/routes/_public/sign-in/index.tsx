import { Button } from "#/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "#/components/ui/card"
import { Logo } from "#/components/logo"
import { authClient } from "#/lib/auth/auth-client"
import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowLeftIcon } from "@phosphor-icons/react"
import z from "zod"

export const Route = createFileRoute("/_public/sign-in/")({
    validateSearch: z.object({
        from: z.string().optional().default("/"),
    }),
    component: RouteComponent,
})

function RouteComponent() {
    const { from } = Route.useSearch()
    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: from,
        })
    }
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,color-mix(in_srgb,var(--primary)_35%,var(--background))_100%)]"
            />

            <Link
                to="/"
                className="absolute top-6 left-6 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowLeftIcon className="size-4" />
                Back to home
            </Link>

            <Card className="relative w-full max-w-sm shadow-(--shadow-elevated)">
                <CardHeader className="items-center text-center">
                    <Logo size="lg" tagline={false} />
                    <CardDescription className="mt-1">Sign in to continue</CardDescription>
                </CardHeader>

                <CardContent>
                    <Button onClick={handleGoogleSignIn} variant="outline" size="lg" className="w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="size-4.5">
                            <path
                                fill="#FFC107"
                                d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
                            />
                            <path
                                fill="#FF3D00"
                                d="M6.3 14.7l6.6 4.8C14.7 15 19 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"
                            />
                            <path
                                fill="#4CAF50"
                                d="M24 44c5.2 0 10-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z"
                            />
                            <path
                                fill="#1976D2"
                                d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.4 5.5-6.7 6.9l6.2 5.2C38.4 36.7 44 31 44 24c0-1.3-.1-2.4-.4-3.5z"
                            />
                        </svg>
                        Continue with Google
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

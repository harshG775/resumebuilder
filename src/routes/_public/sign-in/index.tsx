import { Button } from "#/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "#/components/ui/card"
import { Logo } from "#/components/logo"
import { Spinner } from "#/components/ui/spinner"
import { authClient } from "#/lib/auth/auth-client"
import { createFileRoute, Link } from "@tanstack/react-router"
import { ArrowLeftIcon, CloudCheckIcon, FilePdfIcon, LinkSimpleIcon } from "@phosphor-icons/react"
import z from "zod"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const Route = createFileRoute("/_public/sign-in/")({
    validateSearch: z.object({
        from: z.string().optional().default("/"),
    }),
    component: RouteComponent,
})

const proofPoints = [
    {
        icon: CloudCheckIcon,
        title: "Autosaves as you go",
        description: "Every change is saved automatically — nothing to lose.",
    },
    {
        icon: FilePdfIcon,
        title: "PDF & JSON export",
        description: "Download a print-ready PDF whenever you need it.",
    },
    {
        icon: LinkSimpleIcon,
        title: "Your own shareable link",
        description: "Send one link instead of an attachment.",
    },
]

function RouteComponent() {
    const { from } = Route.useSearch()
    const loginMutation = useMutation({
        mutationFn: async () => {
            const { error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: from,
            })
            if (error) {
                throw new Error(error.message ?? "Something went wrong. Please try again.")
            }
        },
        scope: { id: "login" },
        onError: (error) => {
            toast.error("Couldn't sign you in", {
                description: error instanceof Error ? error.message : "Please try again.",
            })
        },
    })

    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            <div className="relative hidden overflow-hidden bg-primary lg:flex lg:flex-col lg:justify-between lg:p-10">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />

                <Link
                    to="/"
                    className="relative flex w-fit items-center gap-1.5 text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                >
                    <ArrowLeftIcon className="size-4" />
                    Back to home
                </Link>

                <div className="relative flex flex-col gap-10">
                    <blockquote className="font-heading text-3xl leading-tight font-medium text-balance text-primary-foreground">
                        From blank page to published link — three steps, no exporting back and forth.
                    </blockquote>

                    <ul className="flex flex-col gap-5">
                        {proofPoints.map(({ icon: Icon, title, description }) => (
                            <li key={title} className="flex items-start gap-3">
                                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-foreground/10 text-secondary">
                                    <Icon className="size-4" weight="bold" />
                                </span>
                                <div>
                                    <p className="text-sm font-medium text-primary-foreground">{title}</p>
                                    <p className="text-sm text-primary-foreground/60">{description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="relative text-xs text-primary-foreground/50">
                    Free forever, kept running by the people who use it.
                </p>
            </div>

            <div className="relative flex flex-col items-center justify-center overflow-hidden p-4">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-60 mask-[radial-gradient(ellipse_60%_45%_at_50%_0%,black_35%,transparent_90%)]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, color-mix(in srgb, var(--foreground) 25%, transparent) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />

                <Link
                    to="/"
                    className="absolute top-6 left-6 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground lg:hidden"
                >
                    <ArrowLeftIcon className="size-4" />
                    Back to home
                </Link>

                <Card className="relative w-full max-w-sm animate-in fade-in slide-in-from-bottom-2 shadow-(--shadow-elevated) duration-500">
                    <CardHeader className="items-center text-center">
                        <Logo size="lg" tagline={false} />
                        <div className="mt-3 flex flex-col items-center gap-1">
                            <h1 className="font-heading text-2xl font-medium tracking-tight">
                                Welcome{" "}
                                <span className="relative inline-block">
                                    back
                                    <svg
                                        viewBox="0 0 90 12"
                                        className="absolute -bottom-1 left-0 h-2.5 w-full text-secondary"
                                        preserveAspectRatio="none"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M2 8.5C17 2.5 38 2 45 5.5C52 9 70 9.5 88 4"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>
                            </h1>
                            <CardDescription>Sign in to continue building your resume</CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-4">
                        <Button
                            onClick={() => loginMutation.mutate()}
                            disabled={loginMutation.isPending}
                            variant="outline"
                            size="lg"
                            className="w-full"
                        >
                            {loginMutation.isPending ? (
                                <Spinner />
                            ) : (
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
                            )}
                            {loginMutation.isPending ? "Signing in..." : "Continue with Google"}
                        </Button>

                        <p className="text-center text-xs text-muted-foreground">
                            We only use your Google account to create your profile — no spam, ever. New here?
                            Signing in creates your account automatically.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
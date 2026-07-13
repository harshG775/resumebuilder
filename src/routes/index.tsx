import { Button } from "#/components/ui/button"
import { Logo } from "#/components/logo.tsx"
import { Link, createFileRoute } from "@tanstack/react-router"
import { ArrowRight, FileDown, LayoutTemplate } from "lucide-react"

export const Route = createFileRoute("/")({
    component: Home,
})

const features = [
    {
        icon: LayoutTemplate,
        title: "Pick a Template",
        description: "Modern, ATS-friendly designs",
    },
    {
        icon: FileDown,
        title: "Export as PDF",
        description: "Polished, ready to send",
    },
]

function Home() {
    return (
        <div className="relative flex min-h-screen flex-col overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,color-mix(in_srgb,var(--primary)_35%,var(--background))_100%)]" />

            <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
                <Logo size="sm" tagline={false} />
                <Button nativeButton={false} size="lg" render={<Link to="/dashboard" />}>
                    <span className="sr-only">Get Started</span>
                    <ArrowRight />
                </Button>
            </header>

            <main className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-6 px-6 pb-24 text-center">
                <span className="flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm">
                    <span className="size-1.5 rounded-full bg-primary" />
                    Free forever · No credit card
                </span>

                <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                    Build a resume
                    <br />
                    <span className="text-muted-foreground">that gets you hired</span>
                </h1>

                <p className="max-w-md text-base text-muted-foreground">
                    Pick a template, fill in your details, and export a polished PDF in minutes.
                </p>

                <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:max-w-lg">
                    {features.map(({ icon: Icon, title, description }) => (
                        <div
                            key={title}
                            className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-4 text-left backdrop-blur-sm"
                        >
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Icon className="size-4" />
                            </span>
                            <div>
                                <p className="text-sm font-medium">{title}</p>
                                <p className="text-xs text-muted-foreground">{description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <Button nativeButton={false} size="lg" render={<Link to="/dashboard" />}>
                    <span>Get Started</span>
                    <ArrowRight />
                </Button>
            </main>
        </div>
    )
}

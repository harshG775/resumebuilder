import { Button } from "#/components/ui/button"
import { Logo } from "#/components/logo.tsx"
import { Link, createFileRoute } from "@tanstack/react-router"
import { ArrowRight, CloudCheck, Columns3, FileDown, GripVertical, LayoutTemplate, Smartphone } from "lucide-react"

export const Route = createFileRoute("/")({
    component: Home,
})

const features = [
    {
        icon: LayoutTemplate,
        title: "ATS-friendly templates",
        description: "Modern designs that pass applicant tracking systems",
    },
    {
        icon: Columns3,
        title: "Editor, preview & design",
        description: "See your resume update live as you type",
    },
    {
        icon: GripVertical,
        title: "Drag-and-drop reordering",
        description: "Rearrange sections and links to fit your story",
    },
    {
        icon: CloudCheck,
        title: "Autosaves as you go",
        description: "Every change is saved, no export required",
    },
    {
        icon: FileDown,
        title: "PDF & JSON export",
        description: "Download a polished PDF or your raw resume data",
    },
    {
        icon: Smartphone,
        title: "Works on any device",
        description: "A focused, tab-based editor that fits your phone",
    },
]

function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
                <Logo size="sm" tagline={false} />
                <Button nativeButton={false} size="lg" render={<Link to="/dashboard" />}>
                    <span className="sr-only">Get Started</span>
                    <ArrowRight />
                </Button>
            </header>

            <main className="flex flex-1 flex-col">
                <section className="relative overflow-hidden">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,color-mix(in_srgb,var(--primary)_35%,var(--background))_100%)] mask-[linear-gradient(to_bottom,black_0%,black_65%,transparent_100%)]"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-60 mask-[radial-gradient(ellipse_60%_45%_at_50%_0%,black_35%,transparent_90%)]"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle, color-mix(in srgb, var(--foreground) 25%, transparent) 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                        }}
                    />

                    <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-6 pt-8 pb-16 text-center">
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
                            Edit, preview, and style your resume side-by-side, then export a polished PDF in
                            minutes.
                        </p>

                        <Button nativeButton={false} size="lg" render={<Link to="/dashboard" />}>
                            <span>Get Started</span>
                            <ArrowRight />
                        </Button>
                    </div>
                </section>

                <section className="mx-auto w-full max-w-4xl px-6 pb-14">
                    <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-card/60 text-left shadow-xl backdrop-blur-sm mx-auto">
                        <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-4 py-3">
                            <span className="size-2.5 rounded-full bg-destructive/50" />
                            <span className="size-2.5 rounded-full bg-primary/40" />
                            <span className="size-2.5 rounded-full bg-primary/60" />
                            <span className="ml-3 text-xs text-muted-foreground">resumebuilder.app/builder</span>
                        </div>
                        <div className="grid h-56 grid-cols-2 divide-x divide-border sm:h-64 sm:grid-cols-3">
                            <div className="flex flex-col gap-2 p-3">
                                <span className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                                    Editor
                                </span>
                                {[...Array(5)].map((_, i) => (
                                    <span
                                        key={i}
                                        className="h-2 rounded-full bg-muted"
                                        style={{ width: `${80 - i * 10}%` }}
                                    />
                                ))}
                            </div>
                            <div className="flex items-center justify-center bg-background p-4">
                                <div className="flex h-full w-3/4 flex-col gap-1.5 rounded-md bg-card p-3 shadow-sm">
                                    <span className="mb-1 h-2.5 w-2/3 rounded-full bg-primary/60" />
                                    {[...Array(6)].map((_, i) => (
                                        <span
                                            key={i}
                                            className="h-1.5 rounded-full bg-muted"
                                            style={{ width: `${90 - (i % 3) * 15}%` }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="hidden flex-col gap-3 p-3 sm:flex">
                                <span className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                                    Design
                                </span>
                                <div className="flex gap-1.5">
                                    <span className="size-4 rounded-full bg-primary" />
                                    <span className="size-4 rounded-full bg-primary/50" />
                                    <span className="size-4 rounded-full border border-border" />
                                </div>
                                {[...Array(3)].map((_, i) => (
                                    <span
                                        key={i}
                                        className="h-2 rounded-full bg-muted"
                                        style={{ width: `${70 - i * 10}%` }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto w-full max-w-4xl px-6 pb-24">
                    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                </section>
            </main>

            <footer className="border-t border-border/60 px-6 py-8 text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} resumebuilder.app — free forever, no credit card required.
            </footer>
        </div>
    )
}

import { Button } from "#/components/ui/button"
import { Logo } from "#/components/logo.tsx"
import { Link, createFileRoute } from "@tanstack/react-router"
import {
    ArrowRightIcon,
    CloudCheckIcon,
    Columns3Icon,
    FileDownIcon,
    GripVerticalIcon,
    Link2Icon,
    LayoutTemplateIcon,
    PaletteIcon,
    PlusIcon,
    Share2Icon,
} from "lucide-react"

export const Route = createFileRoute("/")({
    component: Home,
})

const features = [
    {
        icon: LayoutTemplateIcon,
        title: "Polished templates",
        description: "Classic and Modern layouts, designed to read cleanly and parse well in ATS software",
    },
    {
        icon: Columns3Icon,
        title: "Edit, preview & design side-by-side",
        description: "A resizable three-pane workspace — see exactly what you're building as you type",
    },
    {
        icon: GripVerticalIcon,
        title: "Drag-and-drop sections",
        description: "Reorder experience, projects, skills, and more without leaving the editor",
    },
    {
        icon: CloudCheckIcon,
        title: "Autosaves as you go",
        description: "Every change is saved automatically — no save button, nothing to remember",
    },
    {
        icon: FileDownIcon,
        title: "PDF & JSON export",
        description: "Download a print-ready PDF or your raw resume data, whenever you need it",
    },
    {
        icon: Link2Icon,
        title: "Your own shareable link",
        description: "Publish at resumebuilder.app/you/resume and send one link instead of an attachment",
    },
]

const steps = [
    {
        icon: PlusIcon,
        title: "Create",
        description: "Name your resume and start from a clean, ready-to-edit template.",
    },
    {
        icon: PaletteIcon,
        title: "Customize",
        description: "Fill in your sections, drag to reorder, and pick a design that fits.",
    },
    {
        icon: Share2Icon,
        title: "Share",
        description: "Export a polished PDF or hand out your personal link — updates reflect instantly.",
    },
]

function Home() {
    const { session } = Route.useRouteContext()
    const isSignedIn = Boolean(session?.user)

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur-sm">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
                    <Logo size="sm" tagline={false} />
                    <nav className="flex items-center gap-2">
                        {!isSignedIn && (
                            <Button nativeButton={false} variant="ghost" render={<Link to="/sign-in" />}>
                                Sign in
                            </Button>
                        )}
                        <Button nativeButton={false} render={<Link to="/dashboard" />}>
                            {isSignedIn ? "Dashboard" : "Get Started"}
                            <ArrowRightIcon />
                        </Button>
                    </nav>
                </div>
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

                    <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-6 pt-16 pb-16 text-center">
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
                            Edit, preview, and style your resume side-by-side. Export a print-ready PDF or share a
                            personal link — no attachments required.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <Button nativeButton={false} size="lg" render={<Link to="/dashboard" />}>
                                <span>{isSignedIn ? "Go to Dashboard" : "Get Started"}</span>
                                <ArrowRightIcon />
                            </Button>
                            {!isSignedIn && (
                                <Button
                                    nativeButton={false}
                                    size="lg"
                                    variant="outline"
                                    render={<Link to="/sign-in" />}
                                >
                                    Sign in
                                </Button>
                            )}
                        </div>
                    </div>
                </section>

                <section className="mx-auto w-full max-w-4xl px-6 pb-14">
                    <div className="relative mx-auto w-full max-w-2xl">
                        <div
                            aria-hidden="true"
                            className="absolute -inset-4 -z-10 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--primary)_18%,transparent)_0%,transparent_70%)]"
                        />
                        <div className="overflow-hidden rounded-3xl border border-border bg-card/60 text-left shadow-xl backdrop-blur-sm">
                            <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
                                <span className="size-2.5 rounded-full bg-destructive/50" />
                                <span className="size-2.5 rounded-full bg-primary/40" />
                                <span className="size-2.5 rounded-full bg-primary/60" />
                                <span className="ml-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <Link2Icon className="size-3" />
                                    resumebuilder.app/alex/software-engineer
                                </span>
                                <span className="ml-auto flex items-center gap-1.5 text-[10px] font-medium text-primary">
                                    <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                                    Live preview
                                </span>
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
                    </div>
                </section>

                <section className="mx-auto w-full max-w-4xl px-6 pb-20">
                    <div className="mb-10 text-center">
                        <h2 className="text-2xl font-semibold tracking-tight">From blank page to published link</h2>
                        <p className="mt-2 text-sm text-muted-foreground">Three steps, no exporting back and forth.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        {steps.map(({ icon: Icon, title, description }, i) => (
                            <div key={title} className="relative flex flex-col items-center gap-3 text-center">
                                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <Icon className="size-5" />
                                </span>
                                <span className="text-xs font-medium text-muted-foreground">Step {i + 1}</span>
                                <p className="text-sm font-medium">{title}</p>
                                <p className="text-xs text-muted-foreground">{description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mx-auto w-full max-w-4xl px-6 pb-24">
                    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map(({ icon: Icon, title, description }) => (
                            <div
                                key={title}
                                className="flex items-start gap-3 rounded-2xl border border-border bg-card/60 p-4 text-left backdrop-blur-sm"
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

                <section className="mx-auto w-full max-w-3xl px-6 pb-24 text-center">
                    <div className="rounded-3xl border border-border bg-card/60 px-8 py-12 backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            {isSignedIn ? "Pick up where you left off" : "Ready to build yours?"}
                        </h2>
                        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                            {isSignedIn
                                ? "Jump back into your resumes and keep editing."
                                : "Sign in with Google and start editing — free, no credit card required."}
                        </p>
                        <Button nativeButton={false} size="lg" className="mt-6" render={<Link to="/dashboard" />}>
                            <span>{isSignedIn ? "Go to Dashboard" : "Get Started"}</span>
                            <ArrowRightIcon />
                        </Button>
                    </div>
                </section>
            </main>

            <footer className="border-t border-border/60 px-6 py-8 text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} resumebuilder.app — free forever, no credit card required.
            </footer>
        </div>
    )
}

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "#/components/ui/accordion"
import { Button } from "#/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "#/components/ui/sheet"
import { Logo } from "#/components/logo.tsx"
import { siteConfig } from "#/config/site"
import { to } from "#/lib/await-to"
import { getAllResumeFn } from "#/lib/server/resume.function"
import { formatRelativeTime } from "#/lib/utils"
import { Link, createFileRoute } from "@tanstack/react-router"
import {
    ArrowRightIcon,
    CloudCheckIcon,
    Columns3Icon,
    CoffeeIcon,
    FileDownIcon,
    FileTextIcon,
    GripVerticalIcon,
    HeartHandshakeIcon,
    Link2Icon,
    LayoutTemplateIcon,
    MenuIcon,
    PaletteIcon,
    PlusIcon,
    Share2Icon,
} from "lucide-react"

export const Route = createFileRoute("/")({
    loader: async ({ context }) => {
        if (!context.session?.user) return { recentResume: null }
        const [error, result] = await to(getAllResumeFn({ data: { page: 1, pageSize: 1 } }))
        if (error) return { recentResume: null }
        return { recentResume: result?.data[0] ?? null }
    },
    component: Home,
})

/** Screenshot of the builder in action — drop a real image at e.g. public/hero-screenshot.png and set this. */
const heroImage: string | null = null

/** No real numbers yet — set to a real array once you have them, this hides the row until then. */
const stats: { value: string; label: string }[] | null = null

const features = [
    {
        icon: LayoutTemplateIcon,
        title: "Polished templates",
        description: "Classic and Modern layouts with a clean, single-column structure that's easy to scan",
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
        description: `Publish at ${siteConfig.domain}/you/resume and send one link instead of an attachment`,
    },
]

/** Anchors into sections on this page — add a matching `id` on the section once it exists. */
const NAV_LINKS = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Templates", href: "#templates" },
    { label: "FAQ", href: "#faq" },
    { label: "Support", href: "#support" },
]

/** The two templates in `modules/resume/builder/preview/templates` — illustrative mockups, not real screenshots. */
const templates = [
    {
        id: "classic",
        name: "Classic",
        description:
            "A traditional single-column layout with clean rules and generous whitespace — reads well for corporate and conservative roles.",
        accentClassName: "bg-foreground/70",
    },
    {
        id: "modern",
        name: "Modern",
        description:
            "Tighter spacing with bold accent color and a stronger visual hierarchy — suits tech, design, and creative roles.",
        accentClassName: "bg-secondary",
    },
]

const faqs = [
    {
        question: "Is it actually free?",
        answer: "Yes — every feature, including PDF export, your shareable link, and both templates, is free with no credit card required.",
    },
    {
        question: "Are the templates ATS-friendly?",
        answer: "Both templates use a clean, single-column layout with no tables or graphics — the kind of structure that's generally easier for parsers to read. We haven't run them through formal ATS testing, so results can still vary by employer.",
    },
    {
        question: "What can I export?",
        answer: "A print-ready PDF for applications, or your raw resume data as JSON if you want to back it up or move it elsewhere.",
    },
    {
        question: "Do I need to create an account?",
        answer: "You can sign in with Google to save your resume, autosave changes, and get your own shareable link. Without an account, changes won't be saved.",
    },
    {
        question: "Can I switch templates after I've started?",
        answer: "Yes — your content stays the same, so you can preview it in Classic or Modern and switch anytime from the design panel.",
    },
    {
        question: "What happens to my resume after I share the link?",
        answer: "Your link always reflects your latest saved version — if you keep editing, anyone with the link sees the updated resume automatically.",
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
    const { recentResume } = Route.useLoaderData()
    const isSignedIn = Boolean(session?.user)

    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur-sm">
                <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
                    <Logo size="sm" tagline={false} />

                    <nav className="hidden items-center gap-8 md:flex">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-2 md:flex">
                        {!isSignedIn && (
                            <Button nativeButton={false} variant="ghost" render={<Link to="/sign-in" />}>
                                Sign in
                            </Button>
                        )}
                        <Button nativeButton={false} render={<Link to="/dashboard" />}>
                            {isSignedIn ? "Dashboard" : "Get Started"}
                            <ArrowRightIcon />
                        </Button>
                    </div>

                    <Sheet>
                        <SheetTrigger
                            render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />}
                        >
                            <MenuIcon />
                        </SheetTrigger>
                        <SheetContent side="right" className="flex w-full flex-col">
                            <SheetHeader>
                                <SheetTitle>
                                    <Logo size="sm" tagline={false} />
                                </SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-1 px-6">
                                {NAV_LINKS.map((link) => (
                                    <SheetClose
                                        key={link.href}
                                        render={<a href={link.href} />}
                                        className="rounded-md px-2 py-2.5 text-sm text-foreground hover:bg-accent"
                                    >
                                        {link.label}
                                    </SheetClose>
                                ))}
                            </nav>
                            <div className="mt-auto flex flex-col gap-2 p-6">
                                {!isSignedIn && (
                                    <Button nativeButton={false} variant="ghost" render={<Link to="/sign-in" />}>
                                        Sign in
                                    </Button>
                                )}
                                <Button nativeButton={false} render={<Link to="/dashboard" />}>
                                    {isSignedIn ? "Dashboard" : "Get Started"}
                                    <ArrowRightIcon />
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
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
                        <span className="flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 font-mono text-xs text-muted-foreground backdrop-blur-sm">
                            <span className="size-1.5 rounded-full bg-primary" />
                            Free forever · No credit card
                        </span>

                        <h1 className="max-w-2xl font-heading text-4xl font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
                            Build a resume that{" "}
                            <span className="relative inline-block whitespace-nowrap">
                                gets you hired
                                <svg
                                    viewBox="0 0 210 12"
                                    className="absolute -bottom-1 left-0 h-2.5 w-full text-secondary"
                                    preserveAspectRatio="none"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M2 8.5C40 2.5 90 2 105 5.5C120 9 165 9.5 208 4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                        </h1>

                        <p className="max-w-md text-sm text-muted-foreground sm:text-base">
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

                        {stats && (
                            <div className="mt-2 grid w-full max-w-md grid-cols-3 gap-4 border-t border-border/60 pt-6">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="flex flex-col items-center gap-0.5">
                                        <span className="font-mono text-lg font-medium tracking-tight sm:text-xl">
                                            {stat.value}
                                        </span>
                                        <span className="text-[11px] text-muted-foreground sm:text-xs">
                                            {stat.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <section className="mx-auto w-full max-w-4xl px-4 pb-14 sm:px-6">
                    <div className="relative mx-auto w-full max-w-2xl">
                        <div
                            aria-hidden="true"
                            className="absolute -inset-4 -z-10 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--primary)_18%,transparent)_0%,transparent_70%)]"
                        />
                        {heroImage ? (
                            <img
                                src={heroImage}
                                alt="Resume Builder editor, live preview, and design panel"
                                className="w-full rounded-3xl border border-border shadow-xl"
                            />
                        ) : (
                            <div className="overflow-hidden rounded-3xl border border-border bg-card/60 text-left shadow-xl backdrop-blur-sm">
                                <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-3 py-2.5 sm:px-4 sm:py-3">
                                    <span className="size-2.5 shrink-0 rounded-full bg-destructive/50" />
                                    <span className="size-2.5 shrink-0 rounded-full bg-primary/40" />
                                    <span className="size-2.5 shrink-0 rounded-full bg-primary/60" />
                                    <span className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 truncate text-xs text-muted-foreground sm:ml-3">
                                        <Link2Icon className="size-3 shrink-0" />
                                        <span className="truncate">{siteConfig.domain}/alex/software-engineer</span>
                                    </span>
                                    <span className="ml-auto hidden shrink-0 items-center gap-1.5 text-[10px] font-medium text-primary sm:flex">
                                        <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                                        Live preview
                                    </span>
                                </div>
                                <div className="grid h-56 grid-cols-2 divide-x divide-border sm:h-64 sm:grid-cols-3">
                                    <div className="flex flex-col gap-2 p-2.5 sm:p-3">
                                        <span className="font-mono text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
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
                                    <div className="flex items-center justify-center bg-background p-3 sm:p-4">
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
                                        <span className="font-mono text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
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
                        )}
                    </div>
                </section>

                <section id="how-it-works" className="mx-auto w-full max-w-4xl scroll-mt-20 px-6 pb-20">
                    <div className="mb-10 text-center">
                        <h2 className="font-heading text-2xl font-medium tracking-tight">
                            From blank page to published link
                        </h2>
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

                <section id="features" className="mx-auto w-full max-w-4xl scroll-mt-20 px-6 pb-24">
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

                <section id="templates" className="mx-auto w-full max-w-4xl scroll-mt-20 px-6 pb-24">
                    <div className="mb-10 text-center">
                        <h2 className="font-heading text-2xl font-medium tracking-tight">Two templates to choose from</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Same content, different look — switch anytime from the design panel.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {templates.map((template) => (
                            <div
                                key={template.id}
                                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card/60 text-left backdrop-blur-sm"
                            >
                                <div className="flex flex-col gap-2 border-b border-border bg-background/60 p-5">
                                    <span className={`h-2.5 w-1/2 rounded-full ${template.accentClassName}`} />
                                    <span className="h-1.5 w-1/3 rounded-full bg-muted" />
                                    <div className="mt-2 space-y-1.5">
                                        {[...Array(4)].map((_, i) => (
                                            <span
                                                key={i}
                                                className="block h-1.5 rounded-full bg-muted"
                                                style={{ width: `${85 - i * 12}%` }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-1 flex-col gap-1 p-5">
                                    <p className="text-sm font-medium">{template.name}</p>
                                    <p className="flex-1 text-xs text-muted-foreground">{template.description}</p>
                                    <Button
                                        nativeButton={false}
                                        variant="outline"
                                        size="sm"
                                        className="mt-4 self-start"
                                        render={<Link to="/dashboard" />}
                                    >
                                        <span>Get started</span>
                                        <ArrowRightIcon />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="support" className="mx-auto w-full max-w-3xl scroll-mt-20 px-6 pb-24 text-center">
                    <div className="rounded-3xl border border-border bg-card/60 px-8 py-12 backdrop-blur-sm">
                        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <HeartHandshakeIcon className="size-5" />
                        </span>
                        <h2 className="mt-4 font-heading text-2xl font-medium tracking-tight">
                            Free forever, kept running by you
                        </h2>
                        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                            {siteConfig.domain} has no ads and no paywalls. If it helped you land your next role, a
                            small donation goes toward hosting and keeping it free for everyone else.
                        </p>
                        {siteConfig.links.donate && (
                            <Button
                                nativeButton={false}
                                size="lg"
                                variant="secondary"
                                className="mt-6"
                                render={<a href={siteConfig.links.donate} target="_blank" rel="noreferrer" />}
                            >
                                <CoffeeIcon />
                                <span>Support this project</span>
                            </Button>
                        )}
                    </div>
                </section>

                <section id="faq" className="mx-auto w-full max-w-2xl scroll-mt-20 px-6 pb-24">
                    <div className="mb-10 text-center">
                        <h2 className="font-heading text-2xl font-medium tracking-tight">Frequently asked questions</h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Everything else you might be wondering about.
                        </p>
                    </div>
                    <Accordion>
                        {faqs.map((faq) => (
                            <AccordionItem key={faq.question} value={faq.question}>
                                <AccordionTrigger>{faq.question}</AccordionTrigger>
                                <AccordionContent>{faq.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>
                
                <section className="mx-auto w-full max-w-3xl px-6 pb-24 text-center">
                    <div className="rounded-3xl border border-border bg-card/60 px-8 py-12 backdrop-blur-sm">
                        {isSignedIn && recentResume ? (
                            <>
                                <h2 className="font-heading text-2xl font-medium tracking-tight">
                                    Pick up where you left off
                                </h2>
                                <div className="mx-auto mt-4 flex max-w-sm items-center gap-3 rounded-2xl border border-border bg-background/60 p-3 text-left">
                                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <FileTextIcon className="size-4" />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium">{recentResume.title}</p>
                                        <p className="text-xs text-muted-foreground">
                                            Last edited{" "}
                                            <span suppressHydrationWarning>
                                                {formatRelativeTime(new Date(recentResume.updatedAt))}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    nativeButton={false}
                                    size="lg"
                                    className="mt-6"
                                    render={
                                        <Link
                                            to="/builder/resumes/$resume_id"
                                            params={{ resume_id: recentResume.id }}
                                        />
                                    }
                                >
                                    <span>Continue editing</span>
                                    <ArrowRightIcon />
                                </Button>
                            </>
                        ) : (
                            <>
                                <h2 className="font-heading text-2xl font-medium tracking-tight">
                                    {isSignedIn ? "Create your first resume" : "Ready to build yours?"}
                                </h2>
                                <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                                    {isSignedIn
                                        ? "Head to your dashboard and start from a clean template."
                                        : "Sign in with Google and start editing — free, no credit card required."}
                                </p>
                                <Button
                                    nativeButton={false}
                                    size="lg"
                                    className="mt-6"
                                    render={<Link to="/dashboard" />}
                                >
                                    <span>{isSignedIn ? "Go to Dashboard" : "Get Started"}</span>
                                    <ArrowRightIcon />
                                </Button>
                            </>
                        )}
                    </div>
                </section>
            </main>

            <footer className="border-t border-border/60 px-6 py-12 text-sm">
                <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 sm:grid-cols-3">
                    <div className="flex flex-col gap-3">
                        <Logo size="sm" tagline={false} />
                        <p className="max-w-xs text-xs text-muted-foreground">
                            Build a polished resume for free — no credit card required.
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                            Explore
                        </span>
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                            Connect
                        </span>
                        {siteConfig.links.github && (
                            <a
                                href={siteConfig.links.github}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                            >
                                GitHub
                            </a>
                        )}
                        {siteConfig.links.linkedin && (
                            <a
                                href={siteConfig.links.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                            >
                                LinkedIn
                            </a>
                        )}
                        {siteConfig.links.donate && (
                            <a
                                href={siteConfig.links.donate}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Support this project ☕
                            </a>
                        )}
                    </div>
                </div>

                <div className="mx-auto mt-10 w-full max-w-6xl border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} {siteConfig.domain} — free forever, no credit card required.
                </div>
            </footer>
        </div>
    )
}

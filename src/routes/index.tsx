import { useTheme } from "#/components/ThemeToggle"
import { Button } from "#/components/ui/button"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
    component: RouteComponent,
})

function RouteComponent() {
    const { mode, toggleMode } = useTheme()

    const label =
        mode === "auto"
            ? "Theme mode: auto (system). Click to switch to light mode."
            : `Theme mode: ${mode}. Click to switch mode.`
    return (
        <div>
            <div>
                <button
                    type="button"
                    onClick={toggleMode}
                    aria-label={label}
                    title={label}
                    className="rounded-full shadow-[0_8px_22px_rgba(30,90,72,0.08)] transition hover:-translate-y-0.5"
                >
                    {mode === "auto"
                        ? "Auto"
                        : mode === "dark"
                          ? "Dark"
                          : "Light"}
                </button>
                <Button asChild>
                    <Link
                        to="/resumes/$resume"
                        params={{
                            resume: "123",
                        }}
                    >
                        Got To Resume
                    </Link>
                </Button>
            </div>
        </div>
    )
}

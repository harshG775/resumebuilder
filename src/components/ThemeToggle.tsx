import { type ReactNode } from "react"
import { createContext, useContext, useEffect, useState } from "react"

type ThemeMode = "light" | "dark" | "auto"

interface ThemeContextType {
    mode: ThemeMode
    toggleMode: () => void
    setMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function getInitialMode(): ThemeMode {
    if (typeof window === "undefined") return "auto"
    const stored = window.localStorage.getItem("theme")
    return stored === "light" || stored === "dark" || stored === "auto"
        ? stored
        : "auto"
}

function applyThemeMode(mode: ThemeMode) {
    if (typeof window === "undefined") return

    const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
    ).matches
    const resolved = mode === "auto" ? (prefersDark ? "dark" : "light") : mode

    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(resolved)
    root.style.colorScheme = resolved

    if (mode === "auto") {
        root.removeAttribute("data-theme")
    } else {
        root.setAttribute("data-theme", mode)
    }
}

// --- Provider Component ---

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [mode, setModeState] = useState<ThemeMode>("auto") // Start with auto to avoid hydration mismatch

    // Initialize theme on mount
    useEffect(() => {
        const initialMode = getInitialMode()
        setModeState(initialMode)
    }, [])

    // Update DOM and LocalStorage whenever mode changes
    useEffect(() => {
        applyThemeMode(mode)
        window.localStorage.setItem("theme", mode)

        // If auto, listen for system changes
        if (mode === "auto") {
            const media = window.matchMedia("(prefers-color-scheme: dark)")
            const onChange = () => applyThemeMode("auto")
            media.addEventListener("change", onChange)
            return () => media.removeEventListener("change", onChange)
        }
    }, [mode])

    const toggleMode = () => {
        setModeState((prev) =>
            prev === "light" ? "dark" : prev === "dark" ? "auto" : "light",
        )
    }

    const setMode = (newMode: ThemeMode) => setModeState(newMode)

    return (
        <ThemeContext.Provider value={{ mode, toggleMode, setMode }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}

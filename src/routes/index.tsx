import { authClient } from "#/lib/auth/auth-client"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"

export const Route = createFileRoute("/")({ component: Home })

function Home() {
    const { data: session, isPending } = authClient.useSession()

    // Form states
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [error, setError] = useState("")

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        await authClient.signUp.email(
            {
                email,
                password,
                name,
                callbackURL: "/",
            },
            {
                onError: (ctx) => setError(ctx.error.message || "Signup failed"),
            },
        )
    }

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        await authClient.signIn.email(
            {
                email,
                password,
                callbackURL: "/",
            },
            {
                onError: (ctx) => setError(ctx.error.message || "Signin failed"),
            },
        )
    }

    if (isPending) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-8 w-8 bg-neutral-400 animate-pulse rounded-full" />
            </div>
        )
    }

    // --- LOGGED IN STATE ---
    if (session?.user) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <div className="island-shell p-6 rounded-xl flex items-center gap-4">
                    {session.user.image ? (
                        <img src={session.user.image} alt="" className="h-12 w-12 rounded-full" />
                    ) : (
                        <div className="h-12 w-12 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center rounded-full">
                            <span className="text-sm font-bold">{session.user.name.charAt(0).toUpperCase()}</span>
                        </div>
                    )}
                    <div>
                        <h2 className="text-lg font-bold">Hello, {session.user.name}!</h2>
                        <p className="text-sm text-neutral-500">{session.user.email}</p>
                    </div>
                </div>

                <button
                    onClick={() => void authClient.signOut()}
                    className="px-6 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    Sign out
                </button>
            </div>
        )
    }

    // --- LOGGED OUT / AUTH FORM STATE ---
    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
            <div className="island-shell p-8 rounded-xl max-w-sm w-full space-y-4">
                <h1 className="text-2xl font-bold text-center display-title">Test Better Auth</h1>

                {error && <p className="text-sm text-red-500 text-center">{error}</p>}

                <form className="space-y-3">
                    <input
                        type="text"
                        placeholder="Full Name (for signup only)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-transparent"
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-transparent"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-transparent"
                    />

                    <div className="flex gap-2 pt-2">
                        <button
                            onClick={handleSignUp}
                            className="flex-1 py-2 text-sm font-medium bg-neutral-900 text-white dark:bg-white dark:text-black rounded-lg transition-transform hover:scale-[1.01]"
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={handleSignIn}
                            className="flex-1 py-2 text-sm font-medium border border-neutral-300 dark:border-neutral-700 rounded-lg transition-transform hover:scale-[1.01]"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

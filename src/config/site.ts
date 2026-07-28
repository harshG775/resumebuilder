import { env } from "#/env"

const FALLBACK_URL = "https://anchor-resume.vercel.app/"

const url = env.VITE_SERVER_URL ?? FALLBACK_URL
const domain = new URL(url).host

export const siteConfig = {
    name: "Anchor",
    url,
    domain,

    links: {
        github: "https://github.com/harshG775" as string | null,
        linkedin: "https://www.linkedin.com/in/harshg775" as string | null,
        // PLACEHOLDER — swap for your real donation link (Buy Me a Coffee, Ko-fi, GitHub Sponsors, etc.)
        donate: "https://buymeacoffee.com/your-handle" as string | null,
    },
}

import { toast } from "sonner"

export async function copyResumeShareLink(username: string, slug: string) {
    if (!username) {
        toast.error("Add a username in your profile to get a shareable link.")
        return
    }
    const url = `${window.location.origin}/${username}/${slug}`
    try {
        await navigator.clipboard.writeText(url)
        toast.success("Link copied to clipboard", { description: url })
    } catch (err) {
        toast.error("Couldn't copy link", {
            description: err instanceof Error ? err.message : "Please try again.",
        })
    }
}

export const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return ""

    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    })
}

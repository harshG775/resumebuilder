export const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return ""
    if (/^\d{4}$/.test(dateString)) return dateString
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    })
}

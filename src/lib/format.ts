export const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return "Present"

    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    })
}

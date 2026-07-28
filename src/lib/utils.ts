import { clsx } from "clsx"
import type { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import slugify from "slugify"
import { differenceInMinutes, differenceInHours, differenceInDays, format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function generateBaseSlug(text: string): string {
    return slugify(text, {
        lower: true,
        strict: true,
        trim: true,
    })
}

export function generateUniqueSlug(title: string, id: string): string {
    const baseSlug = generateBaseSlug(title)
    const shortHash = id.slice(0, 4)

    return `${baseSlug}-${shortHash}`
}

export function formatRelativeTime(date: Date): string {
    const now = new Date()
    const minutes = differenceInMinutes(now, date)
    if (minutes < 1) return "just now"
    if (minutes < 60) return `${minutes}m ago`

    const hours = differenceInHours(now, date)
    if (hours < 24) return `${hours}h ago`

    const days = differenceInDays(now, date)
    if (days < 7) return `${days}d ago`

    return format(date, "MMM d, yyyy")
}

export const seo = ({
    title,
    description,
    keywords,
    image,
}: {
    title: string
    description?: string
    image?: string
    keywords?: string
}) => {
    const tags = [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: keywords },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:creator", content: "@tannerlinsley" },
        { name: "twitter:site", content: "@tannerlinsley" },
        { name: "og:type", content: "website" },
        { name: "og:title", content: title },
        { name: "og:description", content: description },
        ...(image
            ? [
                  { name: "twitter:image", content: image },
                  { name: "twitter:card", content: "summary_large_image" },
                  { name: "og:image", content: image },
              ]
            : []),
    ]

    return tags
}

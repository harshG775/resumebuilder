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

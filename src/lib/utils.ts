import { clsx } from "clsx"
import type { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import slugify from "slugify"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

function generateBaseSlug(text: string): string {
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

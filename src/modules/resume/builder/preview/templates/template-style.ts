const HEX_COLOR_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

export const safeHex = (value: string, fallback: string): string => (HEX_COLOR_PATTERN.test(value) ? value : fallback)

const FONT_WEIGHT_PATTERN = /^[1-9]00$/

export const safeFontWeight = (value: string, fallback: string): string =>
    FONT_WEIGHT_PATTERN.test(value) ? value : fallback

export const safeFontFamily = (value: string, fallback: string): string => {
    const trimmed = value.trim()
    return trimmed !== "" ? trimmed.replace(/[\\"]/g, "") : fallback
}

export const safeNumber = (value: number, fallback: number, min: number, max: number): number =>
    Number.isFinite(value) && value >= min && value <= max ? value : fallback

const PAPER_FORMATS = new Set(["a4", "us-letter", "us-legal"])

export const safePaperFormat = (value: string, fallback: string): string =>
    PAPER_FORMATS.has(value) ? value : fallback

const LANG_PATTERN = /^[a-z]{2}/i

// Typst's `text(lang:)` wants a bare 2-letter code (e.g. "en"), not a full locale tag
// like "en-US" — this pulls the language subtag out of whatever locale string is stored.
export const localeToLang = (locale: string, fallback = "en"): string => {
    const match = LANG_PATTERN.exec(locale.trim())
    return match ? match[0].toLowerCase() : fallback
}

export const round2 = (value: number): number => Math.round(value * 100) / 100

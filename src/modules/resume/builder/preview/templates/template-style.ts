const HEX_COLOR_PATTERN = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

export const safeHex = (value: string, fallback: string): string => (HEX_COLOR_PATTERN.test(value) ? value : fallback)

const FONT_WEIGHT_PATTERN = /^[1-9]00$/

export const safeFontWeight = (value: string, fallback: string): string =>
    FONT_WEIGHT_PATTERN.test(value) ? value : fallback

export const safeFontFamily = (value: string, fallback: string): string => {
    const trimmed = value.trim()
    return trimmed !== "" ? trimmed.replace(/[\\"]/g, "") : fallback
}

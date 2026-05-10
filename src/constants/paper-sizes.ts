export const PAPER_SIZES = {
    a4: {
        label: "A4",
        aspectRatio: "1 / 1.4142",
        widthPx: 794,
        widthMm: 210,
        heightMm: 297,
    },
    letter: {
        label: "US Letter",
        aspectRatio: "1 / 1.2941",
        widthPx: 816,
        widthMm: 215.9,
        heightMm: 279.4,
    },
    freeForm: {
        label: "Free-Form",
        aspectRatio: undefined,
        widthPx: 794,
        widthMm: undefined,
        heightMm: undefined,
    },
} as const

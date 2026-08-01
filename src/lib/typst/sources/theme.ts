export const themeSource = `
#let theme-version = 1

#let default-theme = (
    version: theme-version,
    color: (
        text: rgb("#111827"),
        text-muted: rgb("#6b7280"),
        primary: rgb("#1e3a8a"),
        background: rgb("#ffffff"),
        border: rgb("#e5e7eb"),
    ),
    font: (
        body: "Libertinus Serif",
        heading: "New Computer Modern",
    ),
    size: (
        name: 20pt,
        heading: 14pt,
        subheading: 10.5pt,
        body: 10pt,
        meta: 9pt,
    ),
    weight: (heading: 800, subheading: 700),
    space: (item-gap: 6pt),
    border: (thickness: 0.5pt),
    layout: (
        paper: "a4",
        margin: (x: 40pt, y: 34pt),
    ),
    lang: "en",
    // Unitless line-height multiplier, anchored the same way \`resume()\` applies it to \`par(leading:)\`.
    leading: 1.5,
)

// JSON has no color/length type, so a user override for e.g. \`color.primary\` or
// \`size.heading\` round-trips through \`json(bytes(raw))\` as a plain string/number.
// These coerce known-typed fields back after the merge.
#let coerce-color(value) = if type(value) == str { rgb(value) } else { value }
#let coerce-pt(value) = if type(value) == int or type(value) == float { value * 1pt } else { value }

#let coerce-dict(dict, coerce) = {
    let out = (:)
    for (key, value) in dict {
        out.insert(key, coerce(value))
    }
    out
}

// Shallow merge: user overrides replace matching top-level sections one level deep.
// A renamed key silently falls back to the default instead of erroring - \`version\`
// exists so TS-side migration code can detect an old shape before it's ever sent here.
#let merge-theme(overrides: (:)) = {
    let merged = default-theme
    for (section, values) in overrides {
        if section in merged and type(merged.at(section)) == dictionary and type(values) == dictionary {
            merged.insert(section, merged.at(section) + values)
        } else {
            merged.insert(section, values)
        }
    }

    merged.color = coerce-dict(merged.color, coerce-color)
    merged.size = coerce-dict(merged.size, coerce-pt)
    merged.space = coerce-dict(merged.space, coerce-pt)
    merged.border.thickness = coerce-pt(merged.border.thickness)
    merged.layout.margin.x = coerce-pt(merged.layout.margin.x)
    merged.layout.margin.y = coerce-pt(merged.layout.margin.y)

    merged
}

#let theme = {
    let raw = sys.inputs.at("theme", default: none)
    if raw == none { default-theme } else { merge-theme(overrides: json(bytes(raw))) }
}
`

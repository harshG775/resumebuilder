import { renderToStaticMarkup } from "react-dom/server"

interface GenerateHtmlOptions {
    component: React.ReactElement
    title: string
    styles: string
}

export const generateResumeHtml = ({ component, title, styles }: GenerateHtmlOptions): string => {
    const rawMarkup = renderToStaticMarkup(component)

    const bodyMarkup = rawMarkup
        .trim()
        .replace(/\sdata-tsd-source="[^"]*"/g, "")
        .replace(/^<div/, "<body")
        .replace(/<\/div>$/, "</body>")

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>${styles}</style>
</head>
${bodyMarkup}
</html>
`.trim()
}

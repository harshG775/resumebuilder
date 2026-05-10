import { createClientOnlyFn } from "@tanstack/react-start"

export const printResumePdf = createClientOnlyFn((html: string) => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>@page { size: A4; margin: 0; } body { margin: 0; }</style>
</head>
<body>${html}</body>
</html>`

    const blob = new Blob([fullHtml], { type: "text/html" })
    const url = URL.createObjectURL(blob)

    const win = window.open(url, "_blank")
    if (!win) return

    win.focus()
    win.onload = () => {
        win.print()
        win.addEventListener("afterprint", () => {
            win.close()
            URL.revokeObjectURL(url)
        })
    }
})

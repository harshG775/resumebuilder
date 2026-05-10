import { createClientOnlyFn } from "@tanstack/react-start"

export const printResumePdf = createClientOnlyFn((html: string) => {
    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)

    const win = window.open(url, "_blank")
    if (!win) return

    win.focus()
    win.onload = () => {
        // win.print()
        // win.addEventListener("afterprint", () => {
        //     win.close()
        //     URL.revokeObjectURL(url)
        // })
    }
})

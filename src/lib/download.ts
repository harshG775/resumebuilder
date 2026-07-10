export function downloadBlob(bytes: Uint8Array, filename: string, mimeType: string) {
    const blob = new Blob([new Uint8Array(bytes)], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
}
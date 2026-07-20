import { useState } from "react"

type ToolbarCommand =
    | "bold"
    | "italic"
    | "underline"
    | "strike"
    | "textColor"
    | "highlight"
    | "bullet"
    | "divider"
    | "newLine"
    | "link"
    | "justify"

const handleCommand = (command: ToolbarCommand, value?: string) => {
    switch (command) {
        case "bold":
            break
        case "italic":
            break
        case "underline":
            break
        case "strike":
            break
        case "textColor":
            break
        case "highlight":
            break
        case "bullet":
            break
        case "divider":
            break
        case "newLine":
            break
        case "link": {
            break
        }
        case "justify":
            break
        default:
            break
    }
}
export function EditorToolBar() {
    return <div></div>
}
export function Editor() {
    return <div></div>
}
export function RichTextEditor() {
    return <div></div>
}

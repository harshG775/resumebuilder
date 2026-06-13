import { useEditor, EditorContent, useEditorState } from "@tiptap/react"
import Document from "@tiptap/extension-document"
import Paragraph from "@tiptap/extension-paragraph"
import Text from "@tiptap/extension-text"
import Bold from "@tiptap/extension-bold"
import Italic from "@tiptap/extension-italic"
import Highlight from "@tiptap/extension-highlight"
import Link from "@tiptap/extension-link"
import History from "@tiptap/extension-history"
import { useEffect, useState } from "react"
import { cn } from "#/lib/utils"

import { ToggleGroup, ToggleGroupItem } from "#/components/ui/toggle-group"
import { Separator } from "#/components/ui/separator"
import { Button } from "#/components/ui/button"
import { Input } from "#/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "#/components/ui/popover"

import {
    Bold as BoldIcon,
    Italic as ItalicIcon,
    Highlighter,
    Link as LinkIcon,
    Undo,
    Redo,
    Check,
    RemoveFormatting,
} from "lucide-react"

// ── Toolbar ───────────────────────────────────────────────────────────────────

function Toolbar({ editor }: { editor: ReturnType<typeof useEditor> }) {
    const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false)
    const [linkInput, setLinkInput] = useState("")

    const state = useEditorState({
        editor,
        selector: ({ editor: e }) => ({
            bold:      e?.isActive("bold")      ?? false,
            italic:    e?.isActive("italic")    ?? false,
            highlight: e?.isActive("highlight") ?? false,
            link:      e?.isActive("link")      ?? false,
            canUndo:   e?.can().undo()          ?? false,
            canRedo:   e?.can().redo()          ?? false,
        }),
    })

    if (!editor || !state) return null

    const activeMarks = (["bold", "italic", "highlight"] as const).filter((m) => state[m])

    const handleOpenChange = (open: boolean) => {
        setIsLinkPopoverOpen(open)
        if (open) setLinkInput(editor.getAttributes("link").href ?? "")
    }

    const saveLink = () => {
        if (linkInput.trim() === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run()
        } else {
            editor.chain().focus().extendMarkRange("link").setLink({ href: linkInput }).run()
        }
        setIsLinkPopoverOpen(false)
    }

    return (
        <div className="flex flex-wrap items-center gap-1 rounded-t-md border border-b-0 border-input bg-muted/40 px-2 py-1.5">
            {/* Undo / Redo */}
            <div className="flex items-center gap-0.5">
                <Button
                    type="button" variant="ghost" size="icon" className="size-7"
                    disabled={!state.canUndo}
                    onClick={() => editor.chain().focus().undo().run()}
                >
                    <Undo className="size-3.5" />
                </Button>
                <Button
                    type="button" variant="ghost" size="icon" className="size-7"
                    disabled={!state.canRedo}
                    onClick={() => editor.chain().focus().redo().run()}
                >
                    <Redo className="size-3.5" />
                </Button>
            </div>

            <Separator orientation="vertical" className="mx-1 h-5" />

            {/* Bold / Italic / Highlight */}
            <ToggleGroup
                type="multiple"
                value={activeMarks}
                onValueChange={(vals) => {
                    const added   = vals.filter((v) => !activeMarks.includes(v as never))
                    const removed = activeMarks.filter((v) => !vals.includes(v))
                    ;[...added, ...removed].forEach((mark) => {
                        ({
                            bold:      () => editor.chain().focus().toggleBold().run(),
                            italic:    () => editor.chain().focus().toggleItalic().run(),
                            highlight: () => editor.chain().focus().toggleHighlight().run(),
                        } as Record<string, () => void>)[mark]?.()
                    })
                }}
            >
                <ToggleGroupItem value="bold"      aria-label="Bold"      className="size-7 p-0"><BoldIcon    className="size-3.5" /></ToggleGroupItem>
                <ToggleGroupItem value="italic"    aria-label="Italic"    className="size-7 p-0"><ItalicIcon  className="size-3.5" /></ToggleGroupItem>
                <ToggleGroupItem value="highlight" aria-label="Highlight" className="size-7 p-0"><Highlighter className="size-3.5" /></ToggleGroupItem>
            </ToggleGroup>

            <Separator orientation="vertical" className="mx-1 h-5" />

            {/* Link */}
            <Popover open={isLinkPopoverOpen} onOpenChange={handleOpenChange}>
                <PopoverTrigger asChild>
                    <Button
                        type="button" variant="ghost" size="icon"
                        className={cn("size-7", state.link && "bg-accent text-accent-foreground")}
                        aria-label="Set link"
                    >
                        <LinkIcon className="size-3.5" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="flex w-72 items-center gap-2 p-2" align="start" sideOffset={8}>
                    <Input
                        placeholder="https://example.com"
                        value={linkInput}
                        onChange={(e) => setLinkInput(e.target.value)}
                        className="h-8 text-sm"
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === "Enter") { e.preventDefault(); saveLink() }
                        }}
                    />
                    <Button type="button" size="icon" className="size-8 shrink-0" onClick={saveLink}>
                        <Check className="size-4" />
                    </Button>
                </PopoverContent>
            </Popover>

            <Separator orientation="vertical" className="mx-1 h-5" />

            {/* Clear formatting */}
            <Button
                type="button" variant="ghost" size="icon"
                className="size-7 text-muted-foreground hover:text-foreground"
                aria-label="Clear formatting"
                onClick={() => editor.chain().focus().unsetAllMarks().unsetLink().run()}
            >
                <RemoveFormatting className="size-3.5" />
            </Button>
        </div>
    )
}

// ── Editor ────────────────────────────────────────────────────────────────────

interface RichTextEditorProps {
    id?:        string
    value:      string
    onChange:   (value: string) => void
    onBlur?:    () => void
    className?: string
}

export function RichTextEditor({ id, value, onChange, onBlur, className }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            Bold,
            Italic,
            History,
            Highlight.configure({
                HTMLAttributes: {
                    class: "bg-yellow-200 text-black dark:bg-yellow-500/30 dark:text-yellow-200 rounded px-0.5",
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    target: "_blank",
                    rel: "noreferrer",
                    class: "text-primary underline underline-offset-4 cursor-pointer",
                },
            }),
        ],
        content: value,
        immediatelyRender: false,
        onUpdate({ editor }) {
            onChange(editor.getHTML())
        },
        onBlur() {
            onBlur?.()
        },
        editorProps: {
            attributes: {
                id: id ?? "",
                class: cn(
                    "min-h-32 w-full rounded-b-md border border-input bg-background px-3 py-2",
                    "text-sm leading-relaxed focus:outline-none",
                    "[&_strong]:font-semibold [&_em]:italic",
                    "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4",
                    className,
                ),
            },
        },
    })

    useEffect(() => {
        if (!editor) return
        if (editor.getHTML() !== value) editor.commands.setContent(value)
    }, [value, editor])

    return (
        <div className="rounded-md">
            {editor && <Toolbar editor={editor} />}
            <EditorContent editor={editor} />
        </div>
    )
}
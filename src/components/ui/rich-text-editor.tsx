// src/components/ui/rich-text-editor.tsx
import { useEditor, EditorContent, useEditorState } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect } from "react"
import { cn } from "#/lib/utils"
import { ToggleGroup, ToggleGroupItem } from "#/components/ui/toggle-group"
import { Separator } from "#/components/ui/separator"
import { Button } from "#/components/ui/button"
import { Bold, Italic, Strikethrough, Code, List, ListOrdered, Undo, Redo, Minus } from "lucide-react"

// ── Toolbar ────────────────────────────────────────────────────────────────────

function Toolbar({ editor }: { editor: ReturnType<typeof useEditor> }) {
    const state = useEditorState({
        editor,
        selector: ({ editor: e }) => ({
            bold: e?.isActive("bold") ?? false,
            italic: e?.isActive("italic") ?? false,
            strike: e?.isActive("strike") ?? false,
            code: e?.isActive("code") ?? false,
            bulletList: e?.isActive("bulletList") ?? false,
            orderedList: e?.isActive("orderedList") ?? false,
            canUndo: e?.can().undo() ?? false,
            canRedo: e?.can().redo() ?? false,
        }),
    })

    if (!editor || !state) return null

    // Derive active marks/lists as string[] for ToggleGroup type="multiple"
    const activeMarks = [
        state.bold && "bold",
        state.italic && "italic",
        state.strike && "strike",
        state.code && "code",
    ].filter(Boolean) as string[]

    const activeLists = [state.bulletList && "bulletList", state.orderedList && "orderedList"].filter(
        Boolean,
    ) as string[]

    return (
        <div className="flex flex-wrap items-center gap-1 rounded-t-md border border-b-0 border-input bg-muted/40 px-2 py-1.5">
            {/* History */}
            <div className="flex items-center gap-0.5">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-7"
                    disabled={!state.canUndo}
                    onClick={() => editor.chain().focus().undo().run()}
                >
                    <Undo className="size-3.5" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-7"
                    disabled={!state.canRedo}
                    onClick={() => editor.chain().focus().redo().run()}
                >
                    <Redo className="size-3.5" />
                </Button>
            </div>

            <Separator orientation="vertical" className="h-5" />

            {/* Marks — multiple selection */}
            <ToggleGroup
                type="multiple"
                value={activeMarks}
                onValueChange={(vals) => {
                    // Toggle whichever mark changed
                    const was = activeMarks
                    const now = vals
                    const added = now.filter((v) => !was.includes(v))
                    const removed = was.filter((v) => !now.includes(v))
                    ;[...added, ...removed].forEach((mark) => {
                        const cmd = {
                            bold: () => editor.chain().focus().toggleBold().run(),
                            italic: () => editor.chain().focus().toggleItalic().run(),
                            strike: () => editor.chain().focus().toggleStrike().run(),
                            code: () => editor.chain().focus().toggleCode().run(),
                        }[mark]
                        cmd?.()
                    })
                }}
            >
                <ToggleGroupItem value="bold" aria-label="Bold" className="size-7 p-0">
                    <Bold className="size-3.5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Italic" className="size-7 p-0">
                    <Italic className="size-3.5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="strike" aria-label="Strikethrough" className="size-7 p-0">
                    <Strikethrough className="size-3.5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="code" aria-label="Inline code" className="size-7 p-0">
                    <Code className="size-3.5" />
                </ToggleGroupItem>
            </ToggleGroup>

            <Separator orientation="vertical" className="h-5" />

            {/* Lists — multiple selection (bold one at a time in practice) */}
            <ToggleGroup
                type="multiple"
                value={activeLists}
                onValueChange={(vals) => {
                    const was = activeLists
                    const added = vals.filter((v) => !was.includes(v))
                    const removed = was.filter((v) => !vals.includes(v))
                    ;[...added, ...removed].forEach((list) => {
                        const cmd = {
                            bulletList: () => editor.chain().focus().toggleBulletList().run(),
                            orderedList: () => editor.chain().focus().toggleOrderedList().run(),
                        }[list]
                        cmd?.()
                    })
                }}
            >
                <ToggleGroupItem value="bulletList" aria-label="Bullet list" className="size-7 p-0">
                    <List className="size-3.5" />
                </ToggleGroupItem>
                <ToggleGroupItem value="orderedList" aria-label="Ordered list" className="size-7 p-0">
                    <ListOrdered className="size-3.5" />
                </ToggleGroupItem>
            </ToggleGroup>

            <Separator orientation="vertical" className="h-5" />

            {/* Insert */}
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
                <Minus className="size-3.5" />
            </Button>
        </div>
    )
}

// ── Editor ─────────────────────────────────────────────────────────────────────

interface RichTextEditorProps {
    id?: string
    value: string
    onChange: (value: string) => void
    onBlur?: () => void
    className?: string
}

export function RichTextEditor({ id, value, onChange, onBlur, className }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [StarterKit],
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
                    "min-h-32 w-full rounded-sm border border-input bg-background px-3 py-2",
                    className,
                ),
            },
        },
    })

    useEffect(() => {
        if (!editor) return
        if (editor.getHTML() !== value) {
            editor.commands.setContent(value)
        }
    }, [value, editor])

    return (
        <div className="rounded-md ">
            {editor && <Toolbar editor={editor} />}
            <EditorContent editor={editor} />
        </div>
    )
}

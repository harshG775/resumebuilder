// src/components/ui/rich-text-editor.tsx
import { useEditor, EditorContent, useEditorState } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect } from "react"
import { cn } from "#/lib/utils"
import { Toggle } from "#/components/ui/toggle"
import { Separator } from "#/components/ui/separator"
import { Button } from "#/components/ui/button"
import { Bold, Italic, Strikethrough, List, ListOrdered, Undo, Redo, Minus, Code } from "lucide-react"

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

    if (!editor) return null

    return (
        <div className="flex flex-wrap items-center gap-0.5 rounded-t-md border border-b-0 border-input bg-muted/40 px-2 py-1.5">
            {/* History */}
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7"
                disabled={!state?.canUndo}
                onClick={() => editor.chain().focus().undo().run()}
            >
                <Undo className="size-3.5" />
            </Button>
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-7"
                disabled={!state?.canRedo}
                onClick={() => editor.chain().focus().redo().run()}
            >
                <Redo className="size-3.5" />
            </Button>

            <Separator orientation="vertical" className="mx-1 h-5" />

            {/* Marks */}
            <Toggle
                type="button"
                size="sm"
                className="size-7 p-0"
                pressed={state?.bold}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
            >
                <Bold className="size-3.5" />
            </Toggle>
            <Toggle
                type="button"
                size="sm"
                className="size-7 p-0"
                pressed={state?.italic}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            >
                <Italic className="size-3.5" />
            </Toggle>
            <Toggle
                type="button"
                size="sm"
                className="size-7 p-0"
                pressed={state?.strike}
                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            >
                <Strikethrough className="size-3.5" />
            </Toggle>
            <Toggle
                type="button"
                size="sm"
                className="size-7 p-0"
                pressed={state?.code}
                onPressedChange={() => editor.chain().focus().toggleCode().run()}
            >
                <Code className="size-3.5" />
            </Toggle>

            <Separator orientation="vertical" className="mx-1 h-5" />

            {/* Lists */}
            <Toggle
                type="button"
                size="sm"
                className="size-7 p-0"
                pressed={state?.bulletList}
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
            >
                <List className="size-3.5" />
            </Toggle>
            <Toggle
                type="button"
                size="sm"
                className="size-7 p-0"
                pressed={state?.orderedList}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <ListOrdered className="size-3.5" />
            </Toggle>

            <Separator orientation="vertical" className="mx-1 h-5" />

            {/* HR */}
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
                    "min-h-32 w-full rounded-md border border-input bg-background px-3 py-2",
                    "text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "prose prose-sm max-w-none",
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
        <div className="rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            {editor && <Toolbar editor={editor} />}
            <EditorContent editor={editor} />
        </div>
    )
}

import { Button } from "#/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "#/components/ui/dialog"
import { Field, FieldGroup } from "#/components/ui/field"
import { Label } from "#/components/ui/label"
import { InputGroup, InputGroupAddon, InputGroupInput } from "#/components/ui/input-group"
import { Spinner } from "#/components/ui/spinner"
import { useAppForm } from "#/hooks/form"
import { updateResumeFn } from "#/lib/server/resume.function"
import { generateBaseSlug } from "#/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"
import type { AnyFieldApi } from "@tanstack/react-form"
import { Link2Icon, PencilIcon, RefreshCwIcon } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const resumeFormSchema = z.object({
    title: z.string().min(1, "Resume title is required"),
    slug: z
        .string()
        .min(1, "Slug is required")
        .max(60, "Slug is too long")
        .regex(slugRegex, "Lowercase letters, numbers, and hyphens only"),
})

export function SlugField({
    field,
    host,
    username,
    onManualEdit,
    onRegenerate,
}: {
    field: AnyFieldApi
    host: string
    username: string
    onManualEdit: () => void
    onRegenerate: () => void
}) {
    const errors = field.state.meta.errors as Array<string | { message: string }>

    return (
        <div>
            <div className="mb-2 flex items-center justify-between">
                <Label htmlFor="slug" className="text-md font-bold">
                    Slug
                </Label>
                <button
                    type="button"
                    onClick={onRegenerate}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                    <RefreshCwIcon className="size-3" />
                    Regenerate from title
                </button>
            </div>
            <InputGroup>
                <InputGroupAddon>
                    <Link2Icon />
                    <span className="truncate">
                        {host}/{username}/
                    </span>
                </InputGroupAddon>
                <InputGroupInput
                    id="slug"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                        onManualEdit()
                        field.handleChange(e.target.value)
                    }}
                />
            </InputGroup>
            {field.state.meta.isTouched && errors.length > 0 && (
                <div className="mt-1 font-bold text-red-500">
                    {errors.map((error) => (typeof error === "string" ? error : error.message)).join(", ")}
                </div>
            )}
            <p className="mt-1 text-xs text-muted-foreground">This is the public URL for your resume.</p>
        </div>
    )
}

export function EditResumeDialog({
    resume,
    host,
    username,
    open,
    onOpenChange,
}: {
    resume: { id: string; title: string; slug: string }
    host: string
    username: string
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    const router = useRouter()

    const updateMutation = useMutation({
        mutationFn: updateResumeFn,
        scope: { id: `resume-${resume.id}` },
        onSuccess: (result) => {
            if (!result.success) {
                toast.error(result.error)
                return
            }
            toast.success(`${result.data.title} updated!`)
            router.invalidate()
            onOpenChange(false)
        },
        onError: (err) => {
            toast.error("Failed to update resume", {
                description: err instanceof Error ? err.message : "Please try again.",
            })
        },
    })

    const defaultValues = { title: resume.title, slug: resume.slug }

    const form = useAppForm({
        defaultValues,
        validators: {
            onMount: resumeFormSchema,
            onChange: resumeFormSchema,
        },
        onSubmit: async ({ value }) => {
            await updateMutation.mutateAsync({
                data: {
                    id: resume.id,
                    updatePayload: { title: value.title, slug: value.slug },
                },
            })
        },
    })

    function handleOpenChange(nextOpen: boolean) {
        const hasChanges = JSON.stringify(form.state.values) !== JSON.stringify(defaultValues)

        if (!nextOpen && hasChanges) {
            const confirmed = window.confirm("Discard your changes?")
            if (!confirmed) return
        }
        onOpenChange(nextOpen)
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex gap-2 items-center">
                        <PencilIcon className="size-5" />
                        Update Resume
                    </DialogTitle>
                    <DialogDescription>
                        Changed your mind? Rename your resume or update its public link.
                    </DialogDescription>
                </DialogHeader>
                <form.AppForm>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                    >
                        <FieldGroup>
                            <form.AppField
                                name="title"
                                children={(field) => <field.TextField label="Resume Title" />}
                            />
                            <form.AppField
                                name="slug"
                                children={(field) => (
                                    <SlugField
                                        field={field}
                                        host={host}
                                        username={username}
                                        onManualEdit={() => {}}
                                        onRegenerate={() => {
                                            field.handleChange(generateBaseSlug(form.state.values.title))
                                        }}
                                    />
                                )}
                            />
                            <Field orientation="horizontal" className="justify-end">
                                <form.Subscribe selector={(s) => [s.isSubmitting, s.canSubmit] as const}>
                                    {([isSubmitting, canSubmit]) => (
                                        <Button type="submit" disabled={!canSubmit || isSubmitting}>
                                            {isSubmitting ? (
                                                <>
                                                    <Spinner />
                                                    Saving...
                                                </>
                                            ) : (
                                                "Save"
                                            )}
                                        </Button>
                                    )}
                                </form.Subscribe>
                            </Field>
                        </FieldGroup>
                    </form>
                </form.AppForm>
            </DialogContent>
        </Dialog>
    )
}

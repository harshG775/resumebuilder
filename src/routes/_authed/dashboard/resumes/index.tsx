import { createFileRoute, useRouter } from "@tanstack/react-router"
import { createResumeFn, deleteResumeFn, getAllResumeFn, updateResumeFn } from "#/lib/server/resume.function"
import { Button } from "#/components/ui/button"
import { FileTextIcon, Link2Icon, PencilIcon, PlusIcon, RefreshCwIcon } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import ResumeCard, { ResumeCardSkeleton } from "./-components/resume-card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Skeleton } from "#/components/ui/skeleton"

import { useRef, useState } from "react"
import { toast } from "sonner"
import { useAppForm } from "#/hooks/form"
import { Field, FieldGroup } from "#/components/ui/field"
import { Label } from "#/components/ui/label"
import { InputGroup, InputGroupAddon, InputGroupInput } from "#/components/ui/input-group"
import { SidebarTrigger } from "#/components/ui/sidebar"
import { Separator } from "#/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "#/components/ui/breadcrumb"
import { Spinner } from "#/components/ui/spinner"
import { authClient } from "#/lib/auth/auth-client"
import { useHost } from "#/hooks/use-host"
import { generateBaseSlug } from "#/lib/utils"
import { z } from "zod"
import type { AnyFieldApi } from "@tanstack/react-form"

export const Route = createFileRoute("/_authed/dashboard/resumes/")({
    beforeLoad: async () => {
        const { data } = await getAllResumeFn({ data: { page: 1, pageSize: 10 } })
        return { resumes: data }
    },
    pendingComponent: RoutePendingComponent,
    component: RouteComponent,
})

type Resume = Awaited<ReturnType<typeof getAllResumeFn>>["data"][number]

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const resumeFormSchema = z.object({
    title: z.string().min(1, "Resume title is required"),
    slug: z
        .string()
        .min(1, "Slug is required")
        .max(60, "Slug is too long")
        .regex(slugRegex, "Lowercase letters, numbers, and hyphens only"),
})

function RoutePendingComponent() {
    return (
        <div className="min-h-screen bg-background text-foreground p-3 sm:p-4 lg:p-6 font-sans">
            <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-24 rounded-sm" />
                <Skeleton className="h-9 w-24" />
            </div>
            <section className="mt-4 grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]">
                {Array.from({ length: 8 }).map((_, i) => (
                    <ResumeCardSkeleton key={i} />
                ))}
            </section>
        </div>
    )
}

function SlugField({
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

function CreateResumeDialog({ host, username }: { host: string; username: string }) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const slugTouchedRef = useRef(false)

    const createMutation = useMutation({
        mutationFn: createResumeFn,
        scope: { id: "resume-create" },
        onSuccess: (result) => {
            if (!result.success) {
                toast.error(result.error)
                return
            }
            toast.success(`${result.data.title} created!`)
            router.invalidate()
            form.reset()
            setIsOpen(false)
        },
        onError: (err) => {
            toast.error("Failed to create resume", {
                description: err instanceof Error ? err.message : "Please try again.",
            })
        },
    })

    const form = useAppForm({
        defaultValues: {
            title: "",
            slug: "",
        },
        validators: {
            onMount: resumeFormSchema,
            onChange: resumeFormSchema,
        },
        onSubmit: async ({ value }) => {
            await createMutation.mutateAsync({
                data: { title: value.title, slug: value.slug },
            })
        },
    })

    function handleOpenChange(nextOpen: boolean) {
        if (!nextOpen) {
            if (form.state.isTouched && form.state.values.title.length) {
                const confirmed = window.confirm("Discard this new resume?")
                if (!confirmed) return
            }
            slugTouchedRef.current = false
            form.reset()
        }
        setIsOpen(nextOpen)
    }

    return (
        <>
            <Button disabled={createMutation.isPending} onClick={() => setIsOpen(true)}>
                <PlusIcon />
                Create
            </Button>
            <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex gap-2 items-center">
                            <PlusIcon className="size-5" />
                            Create a new resume
                        </DialogTitle>
                        <DialogDescription>Start building your resume by giving it a name.</DialogDescription>
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
                                    listeners={{
                                        onChange: ({ value }) => {
                                            if (!slugTouchedRef.current) {
                                                form.setFieldValue("slug", generateBaseSlug(value))
                                            }
                                        },
                                    }}
                                    children={(field) => <field.TextField label="Resume Title" />}
                                />
                                <form.AppField
                                    name="slug"
                                    children={(field) => (
                                        <SlugField
                                            field={field}
                                            host={host}
                                            username={username}
                                            onManualEdit={() => {
                                                slugTouchedRef.current = true
                                            }}
                                            onRegenerate={() => {
                                                slugTouchedRef.current = false
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
                                                        Creating
                                                    </>
                                                ) : (
                                                    "Create"
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
        </>
    )
}

function EditResumeDialog({
    resume,
    host,
    username,
    open,
    onOpenChange,
}: {
    resume: Resume
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

function RouteComponent() {
    const router = useRouter()
    const { resumes } = Route.useRouteContext()
    const [editingResume, setEditingResume] = useState<Resume | null>(null)
    const host = useHost()
    const { data: session } = authClient.useSession()
    const username = session?.user.username ?? ""

    const deleteMutation = useMutation({
        mutationFn: deleteResumeFn,
        scope: { id: "resume-delete" },
        onSuccess: ({ data }) => {
            toast.success(`${data.title} deleted!`)
            router.invalidate()
        },
    })

    return (
        <>
            <header className="bg-sidebar shadow flex items-center h-16 gap-2 px-3 sm:px-4 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="h-4 my-auto" />

                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-medium flex items-center gap-1 text-lg">
                                <FileTextIcon className="size-5" />
                                Resumes
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="ml-auto flex items-center gap-2">
                    <CreateResumeDialog host={host} username={username} />
                </div>
            </header>
            <div className="flex-1 overflow-auto p-3 sm:p-4 lg:p-6">
                <main>
                    <section className="mt-4 grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]">
                        {resumes.map((resume) => (
                            <ResumeCard
                                key={resume.id}
                                resume={resume}
                                actions={{
                                    onEdit: () => setEditingResume(resume),
                                    onDelete: async () => {
                                        const confirmed = window.confirm("Are you sure you want to delete this resume?")
                                        if (confirmed) {
                                            await deleteMutation.mutateAsync({
                                                data: { id: resume.id },
                                            })
                                        }
                                    },
                                }}
                            />
                        ))}
                    </section>
                </main>
                {editingResume && (
                    <EditResumeDialog
                        key={editingResume.id}
                        resume={editingResume}
                        host={host}
                        username={username}
                        open
                        onOpenChange={(open) => {
                            if (!open) setEditingResume(null)
                        }}
                    />
                )}
            </div>
        </>
    )
}

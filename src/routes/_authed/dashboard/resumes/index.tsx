import { createFileRoute, useRouter } from "@tanstack/react-router"
import { createResumeFn, deleteResumeFn, getAllResumeFn, updateResumeFn } from "#/lib/server/resume.function"
import { Button } from "#/components/ui/button"
import { FileTextIcon, PencilIcon, PlusIcon } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import ResumeCard, { ResumeCardSkeleton } from "./-components/resume-card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Skeleton } from "#/components/ui/skeleton"

import { useState } from "react"
import { toast } from "sonner"
import { useAppForm } from "#/hooks/form"
import { Field, FieldGroup } from "#/components/ui/field"
import { SidebarTrigger } from "#/components/ui/sidebar"
import { Separator } from "#/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "#/components/ui/breadcrumb"
import { Spinner } from "#/components/ui/spinner"
import { z } from "zod"

export const Route = createFileRoute("/_authed/dashboard/resumes/")({
    beforeLoad: async () => {
        const { data } = await getAllResumeFn({ data: { page: 1, pageSize: 10 } })
        return { resumes: data }
    },
    pendingComponent: RoutePendingComponent,
    component: RouteComponent,
})

type Resume = Awaited<ReturnType<typeof getAllResumeFn>>["data"][number]

const resumeFormSchema = z.object({
    title: z.string().min(1, "Resume title is required"),
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

function CreateResumeDialog() {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)

    const createMutation = useMutation({
        mutationFn: createResumeFn,
        scope: { id: "resume-create" },
        onSuccess: ({ data }) => {
            toast.success(`${data.title} created!`)
            router.invalidate()
            form.reset()
            setIsOpen(false)
        },
    })

    const form = useAppForm({
        defaultValues: {
            title: "",
        },
        validators: {
            onMount: resumeFormSchema,
            onChange: resumeFormSchema,
        },
        onSubmit: async ({ value }) => {
            await createMutation.mutateAsync({
                data: { title: value.title },
            })
        },
    })

    function handleOpenChange(nextOpen: boolean) {
        if (!nextOpen) {
            if (form.state.isTouched && form.state.values.title.length) {
                const confirmed = window.confirm("Discard this new resume?")
                if (!confirmed) return
            }
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
                                    children={(field) => <field.TextField label="Resume Title" />}
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
    open,
    onOpenChange,
}: {
    resume: Resume
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    const router = useRouter()

    const updateMutation = useMutation({
        mutationFn: updateResumeFn,
        scope: { id: `resume-${resume.id}` },
        onSuccess: ({ data }) => {
            toast.success(`${data.title} updated!`)
            router.invalidate()
            onOpenChange(false)
        },
    })

    const form = useAppForm({
        defaultValues: {
            title: resume.title,
        },
        validators: {
            onMount: resumeFormSchema,
            onChange: resumeFormSchema,
        },
        onSubmit: async ({ value }) => {
            await updateMutation.mutateAsync({
                data: {
                    id: resume.id,
                    updatePayload: { title: value.title },
                },
            })
        },
    })

    function handleOpenChange(nextOpen: boolean) {
        const hasChanges = JSON.stringify(form.state.values) !== JSON.stringify({ title: resume.title })

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
                        Changed your mind? Rename your resume to something more descriptive.
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
                    <CreateResumeDialog />
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

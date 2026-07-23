import { createFileRoute, useRouter } from "@tanstack/react-router"
import { createResumeFn, deleteResumeFn, getAllResumeFn } from "#/lib/server/resume.function"
import { Button } from "#/components/ui/button"
import { FileTextIcon, PlusIcon } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import ResumeCard, { ResumeCardSkeleton } from "./-components/resume-card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Skeleton } from "#/components/ui/skeleton"

import { useRef, useState } from "react"
import { toast } from "sonner"
import { useAppForm } from "#/hooks/form"
import { Field, FieldGroup } from "#/components/ui/field"
import { SidebarTrigger } from "#/components/ui/sidebar"
import { Separator } from "#/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "#/components/ui/breadcrumb"
import { Spinner } from "#/components/ui/spinner"
import { authClient } from "#/lib/auth/auth-client"
import { useHost } from "#/hooks/use-host"
import { generateBaseSlug } from "#/lib/utils"
import { EditResumeDialog, SlugField, resumeFormSchema } from "#/modules/resume/builder/components/edit-resume-dialog"

export const Route = createFileRoute("/_authed/dashboard/resumes/")({
    beforeLoad: async () => {
        const { data } = await getAllResumeFn({ data: { page: 1, pageSize: 10 } })
        return { resumes: data }
    },
    pendingComponent: RoutePendingComponent,
    component: RouteComponent,
})

type Resume = Awaited<ReturnType<typeof getAllResumeFn>>["data"][number]

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
                        {resumes.map((resume, index) => (
                            <ResumeCard
                                key={resume.id}
                                resume={resume}
                                isLastEdited={resumes.length > 1 && index === 0}
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

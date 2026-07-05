import { createFileRoute, useRouter } from "@tanstack/react-router"
import { createResumeFn, deleteResumeFn, getAllResumeFn, updateResumeFn } from "#/lib/server/resume.function"
import { Button } from "#/components/ui/button"
import { PlusIcon } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import ResumeCard from "./-components/resume-card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { useState } from "react"
import { toast } from "sonner"
import { useAppForm } from "#/hooks/form"
import { Field, FieldGroup } from "#/components/ui/field"

export const Route = createFileRoute("/_authed/dashboard/resumes/")({
    beforeLoad: async () => {
        const { data } = await getAllResumeFn({ data: { page: 1, pageSize: 10 } })
        return { resumes: data }
    },
    pendingComponent: () => <div>Loading user directory...</div>,
    component: RouteComponent,
})

function RouteComponent() {
    const router = useRouter()
    const { resumes } = Route.useRouteContext()
    const [isOpen, setIsOpen] = useState(false)
    const [currentEditing, setCurrentEditing] = useState<(typeof resumes)[0] | null>(null)

    const createMutation = useMutation({
        mutationFn: createResumeFn,
        onSuccess: ({ data }) => {
            toast.success(`${data.title} Created!`)
            router.invalidate()
            setIsOpen(false)
        },
    })
    const updateMutation = useMutation({
        mutationFn: updateResumeFn,
        onSuccess: ({ data }) => {
            toast.success(`${data.title} Updated!`)
            router.invalidate()
            setIsOpen(false)
        },
    })
    const deleteMutation = useMutation({
        mutationFn: deleteResumeFn,
        onSuccess: ({ data }) => {
            toast.success(`${data.title} Deleted!`)
            router.invalidate()
        },
    })

    const form = useAppForm({
        defaultValues: {
            title: "",
        },
        onSubmit({ value, formApi }) {
            if (currentEditing) {
                updateMutation.mutate({
                    data: {
                        id: currentEditing.id,
                        updatePayload: {
                            title: value.title,
                        },
                    },
                })
            } else {
                createMutation.mutate({
                    data: {
                        title: value.title,
                    },
                })
            }
            formApi.reset()
        },
    })
    return (
        <div className="min-h-screen bg-background text-foreground p-3 sm:p-4 lg:p-6 font-sans">
            <div className="flex justify-between items-center">
                <h1 className="font-semibold">Resumes</h1>
                <Button disabled={createMutation.status === "pending"} onClick={() => setIsOpen(true)}>
                    <PlusIcon />
                    New
                </Button>
            </div>
            <section className="mt-4 grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]">
                {resumes.map((resume) => (
                    <ResumeCard
                        key={resume.id}
                        resume={resume}
                        onOpenEditDialog={() => {
                            form.setFieldValue("title", resume.title)
                            setCurrentEditing(resume)
                            setIsOpen(true)
                        }}
                        onDelete={() => {
                            deleteMutation.mutate({
                                data: { id: resume.id },
                            })
                        }}
                    />
                ))}
            </section>
            <Dialog
                open={isOpen}
                onOpenChange={(change) => {
                    if (!change) {
                        alert("Are you sure you want to close this dialog?")
                    }
                    setIsOpen(change)
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className={"flex gap-2 items-center"}>
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
                                    <form.SubscribeButton label="Add" />
                                </Field>
                            </FieldGroup>
                        </form>
                    </form.AppForm>
                </DialogContent>
            </Dialog>
        </div>
    )
}

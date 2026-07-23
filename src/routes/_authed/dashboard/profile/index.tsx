import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "#/components/ui/breadcrumb"
import { Button } from "#/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "#/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "#/components/ui/dialog"
import { Field, FieldGroup } from "#/components/ui/field"
import { Label } from "#/components/ui/label"
import { Separator } from "#/components/ui/separator"
import { SidebarTrigger } from "#/components/ui/sidebar"
import { Skeleton } from "#/components/ui/skeleton"
import { Spinner } from "#/components/ui/spinner"
import { useAppForm } from "#/hooks/form"
import { useHost } from "#/hooks/use-host"
import { getCurrentUserFn, updateProfileFn } from "#/lib/server/user.function"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute, useRouter } from "@tanstack/react-router"
import { CalendarIcon, Link2Icon, PencilIcon, UserCircleIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { z } from "zod"

export const Route = createFileRoute("/_authed/dashboard/profile/")({
    loader: async () => {
        const { data } = await getCurrentUserFn()
        return { profile: data }
    },
    pendingComponent: RoutePendingComponent,
    component: RouteComponent,
})

type Profile = NonNullable<Awaited<ReturnType<typeof getCurrentUserFn>>["data"]>

const usernameRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const profileFormSchema = z.object({
    name: z.string().min(1, "Name is required").max(100),
    username: z
        .string()
        .min(3, "Must be at least 3 characters")
        .max(30, "Must be at most 30 characters")
        .regex(usernameRegex, "Lowercase letters, numbers, and hyphens only"),
})

function formatMemberSince(date: string | Date) {
    return new Date(date).toLocaleDateString(undefined, { month: "long", year: "numeric" })
}

function PublicLink({ host, username }: { host: string; username: string }) {
    const displayUsername = username || "username"

    return (
        <div className="flex items-center gap-2 rounded-xl border bg-muted/40 px-3 py-2">
            <Link2Icon className="size-4 shrink-0 text-muted-foreground" />
            <span className="min-w-0 flex-1 truncate font-mono text-sm">
                <span className="text-muted-foreground">{host}/</span>
                <span className="text-foreground">{displayUsername}/</span>
                <span className="font-semibold text-primary">resume-slug</span>
            </span>
        </div>
    )
}

function RoutePendingComponent() {
    return (
        <div className="p-3 sm:p-4 lg:p-6">
            <Card className="max-w-xl">
                <CardContent className="flex items-center gap-4">
                    <Skeleton className="size-16 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function EditProfileDialog({
    profile,
    host,
    open,
    onOpenChange,
}: {
    profile: Profile
    host: string
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    const router = useRouter()

    const updateMutation = useMutation({
        mutationFn: updateProfileFn,
        scope: { id: "profile-update" },
        onSuccess: (result) => {
            if (!result.success) {
                toast.error(result.error)
                return
            }
            toast.success("Profile updated!")
            router.invalidate()
            onOpenChange(false)
        },
        onError: (err) => {
            toast.error("Failed to update profile", {
                description: err instanceof Error ? err.message : "Please try again.",
            })
        },
    })

    const defaultValues = { name: profile.name, username: profile.username ?? "" }

    const form = useAppForm({
        defaultValues,
        validators: {
            onMount: profileFormSchema,
            onChange: profileFormSchema,
        },
        onSubmit: async ({ value }) => {
            await updateMutation.mutateAsync({ data: value })
        },
    })

    function handleOpenChange(nextOpen: boolean) {
        const hasChanges = JSON.stringify(form.state.values) !== JSON.stringify(defaultValues)

        if (!nextOpen) {
            if (hasChanges) {
                const confirmed = window.confirm("Discard your changes?")
                if (!confirmed) return
            }
            form.reset()
        }
        onOpenChange(nextOpen)
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex gap-2 items-center">
                        <PencilIcon className="size-5" />
                        Edit profile
                    </DialogTitle>
                    <DialogDescription>Update your name and public username.</DialogDescription>
                </DialogHeader>
                <form.AppForm>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                    >
                        <FieldGroup>
                            <form.AppField name="name" children={(field) => <field.TextField label="Name" />} />
                            <form.AppField
                                name="username"
                                children={(field) => <field.TextField label="Username" placeholder="jane-doe" />}
                            />
                            <div className="space-y-2">
                                <Label className="text-md font-bold text-muted-foreground">
                                    Public profile link for your resume
                                </Label>
                                <form.Subscribe selector={(s) => s.values.username}>
                                    {(username) => <PublicLink host={host} username={username} />}
                                </form.Subscribe>
                            </div>
                            <Field orientation="horizontal" className="justify-end">
                                <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)}>
                                    Cancel
                                </Button>
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
    const { profile } = Route.useLoaderData()
    const [isEditing, setIsEditing] = useState(false)
    const host = useHost()

    return (
        <>
            <header className="bg-sidebar shadow flex items-center h-16 gap-2 px-3 sm:px-4 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="h-4 my-auto" />

                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-medium flex items-center gap-1 text-lg">
                                <UserCircleIcon className="size-5" />
                                Profile
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </header>
            <div className="flex-1 overflow-auto p-3 sm:p-4 lg:p-6">
                <main>
                    <section className="mt-4">
                        <Card className="max-w-xl">
                            <CardHeader>
                                <CardTitle className="text-base">Your profile</CardTitle>
                                <CardDescription>This is how you appear across Resume Builder.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <Avatar className="size-16">
                                        <AvatarImage src={profile.image || ""} alt={profile.name} />
                                        <AvatarFallback className="text-lg uppercase bg-primary/20 text-primary font-semibold">
                                            {profile.name.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0 space-y-1">
                                        <div className="text-lg font-semibold truncate">{profile.name}</div>
                                        <div className="text-sm text-muted-foreground truncate">{profile.email}</div>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="text-xs font-medium text-muted-foreground">Public profile link</div>
                                    <PublicLink host={host} username={profile.username ?? ""} />
                                </div>
                            </CardContent>
                            <CardFooter className="justify-between border-t">
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <CalendarIcon className="size-3.5" />
                                    Member since {formatMemberSince(profile.createdAt)}
                                </div>
                                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                                    <PencilIcon />
                                    Edit profile
                                </Button>
                            </CardFooter>
                        </Card>
                    </section>
                </main>
                {isEditing && (
                    <EditProfileDialog profile={profile} host={host} open onOpenChange={(open) => setIsEditing(open)} />
                )}
            </div>
        </>
    )
}

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "#/components/ui/dialog"
import { Field, FieldDescription, FieldGroup, FieldLegend, FieldSet } from "#/components/ui/field"
import { withForm } from "#/hooks/form"
import { cn } from "#/lib/utils"
import { CheckIcon, PencilIcon } from "lucide-react"
import { resumeFormOptions } from "../../data/resume-default-values"
import { getTemplate, templateList } from "../preview/templates"
import type { TemplateId } from "../preview/templates"

const isSameTemplate = (a: TemplateId, b: TemplateId): boolean => (a as string) === (b as string)

const COMING_SOON_TEMPLATES = ["Minimal", "Creative"]

function TemplateThumbnail({ thumbnail }: { thumbnail?: string }) {
    if (thumbnail) {
        return (
            <img
                src={thumbnail}
                alt=""
                className="aspect-210/297 w-full rounded-sm object-cover ring-1 ring-black/5"
            />
        )
    }

    return (
        <div className="flex aspect-210/297 w-full flex-col gap-1.5 rounded-sm bg-white p-3 ring-1 ring-black/5">
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1 space-y-1">
                    <div className="h-1.5 w-3/5 rounded-full bg-neutral-800" />
                    <div className="h-1 w-2/5 rounded-full bg-neutral-300" />
                </div>
                <div className="size-4 shrink-0 rounded-full bg-neutral-200" />
            </div>
            <div className="h-1 w-3/4 rounded-full bg-neutral-300" />

            <div className="mt-1 space-y-1.5">
                {Array.from({ length: 3 }).map((_, section) => (
                    <div key={section} className="space-y-0.5">
                        <div className="h-1 w-1/3 rounded-full bg-neutral-700" />
                        <div className="h-0.5 w-full rounded-full bg-neutral-200" />
                        <div className="h-0.5 w-5/6 rounded-full bg-neutral-200" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export const TemplatesSection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => (
        <FieldSet>
            <FieldLegend className="font-bold text-2xl!">Templates</FieldLegend>
            <FieldGroup>
                <form.AppField name="meta.template">
                    {(field) => {
                        const selectedTemplate = getTemplate(field.state.value)

                        return (
                            <Field>
                                <Dialog>
                                    <DialogTrigger
                                        render={
                                            <button
                                                type="button"
                                                className="group max-w-40 rounded-2xl border p-2 text-left transition-colors hover:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
                                            />
                                        }
                                    >
                                        <TemplateThumbnail thumbnail={selectedTemplate.meta.thumbnail} />
                                        <div className="mt-2 flex items-center justify-between gap-2">
                                            <span className="text-sm font-medium">{selectedTemplate.meta.label}</span>
                                            <PencilIcon className="size-3.5 shrink-0 text-muted-foreground group-hover:text-foreground" />
                                        </div>
                                    </DialogTrigger>

                                    <DialogContent className="md:max-w-2xl lg:max-w-3xl max-h-[calc(90vh)] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>Choose a template</DialogTitle>
                                            <DialogDescription>Pick a layout for your resume. You can switch anytime.</DialogDescription>
                                        </DialogHeader>
                                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                            {templateList.map((template) => {
                                                const isSelected = isSameTemplate(template.meta.id, field.state.value)

                                                return (
                                                    <DialogClose
                                                        key={template.meta.id}
                                                        render={
                                                            <button
                                                                type="button"
                                                                onClick={() => field.handleChange(template.meta.id)}
                                                            />
                                                        }
                                                        className={cn(
                                                            "flex max-w-sm flex-col rounded-2xl border-2 p-2 text-left transition-colors focus-visible:outline-none",
                                                            isSelected
                                                                ? "border-ring"
                                                                : "border-transparent hover:border-border",
                                                        )}
                                                    >
                                                        <div className="relative">
                                                            <TemplateThumbnail thumbnail={template.meta.thumbnail} />
                                                            {isSelected && (
                                                                <div className="absolute top-1.5 right-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                                                    <CheckIcon className="size-3" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <span className="mt-2 text-sm font-medium">{template.meta.label}</span>
                                                    </DialogClose>
                                                )
                                            })}
                                            {COMING_SOON_TEMPLATES.map((label) => (
                                                <div
                                                    key={label}
                                                    className="flex max-w-sm cursor-not-allowed flex-col rounded-2xl border-2 border-transparent p-2 text-left opacity-60"
                                                >
                                                    <div className="relative">
                                                        <TemplateThumbnail />
                                                        <div className="absolute inset-0 flex items-center justify-center rounded-sm bg-background/70">
                                                            <span className="rounded-full border bg-background px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                                                                Coming soon
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <span className="mt-2 text-sm font-medium text-muted-foreground">{label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                <FieldDescription>Click the template to change it.</FieldDescription>
                            </Field>
                        )
                    }}
                </form.AppField>
            </FieldGroup>
        </FieldSet>
    ),
})

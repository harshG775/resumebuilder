import { Button } from "#/components/ui/button"
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "#/components/ui/field"
import { withForm } from "#/hooks/form"
import { PlusIcon } from "lucide-react"
import { resumeFormOptions } from "../../data/resume-default-values"
import { SortableDragProvider, SortableItemRow } from "../components/sortable-item"
import { WebsiteField } from "./components/website-field"

import { useForm } from "@tanstack/react-form"
import { Input } from "#/components/ui/input"
import { Textarea } from "#/components/ui/textarea"
import type { ResumeValues } from "../../schema/resume.zod-schema"
import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "#/components/ui/dialog"

function Create({ onCreate }: { onCreate: (value: ResumeValues["sections"]["experience"]["items"][0]) => void }) {
    const [isOpen, setIsOpen] = useState(false)
    const form = useForm({
        defaultValues: {
            id: "",
            hidden: false,
            company: "",
            position: "",
            location: "",
            startDate: "",
            endDate: "",
            website: {
                hidden: false,
                value: "",
                label: "",
            },
            content: "",
        },

        onSubmit: async ({ value, formApi }) => {
            onCreate({
                ...value,
                id: crypto.randomUUID(),
            })

            setIsOpen(false)
            formApi.reset()
        },
    })

    return (
        <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
            onOpenChangeComplete={(lastOpen) => {
                if (!lastOpen) {
                    form.reset()
                }
            }}
        >
            <DialogTrigger render={<Button variant="outline" />}>
                <PlusIcon /> Add a new {"Experience"}
            </DialogTrigger>

            <DialogContent
                render={
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            form.handleSubmit()
                        }}
                    />
                }
                className="md:max-w-2xl lg:max-w-3xl h-[calc(90vh)] overflow-y-scroll"
            >
                <DialogHeader>
                    <DialogTitle>Add {"Experience"}</DialogTitle>
                    <DialogDescription>Fill out the {"Experience"} information details below.</DialogDescription>
                </DialogHeader>

                <FieldSet>
                    <FieldSet>
                        <form.Field
                            name="company"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel>Company</FieldLabel>
                                        <Input
                                            value={dialogField.state.value}
                                            onChange={(e) => dialogField.handleChange(e.target.value)}
                                            placeholder="xyz Pvt. Ltd."
                                        />
                                    </Field>
                                )
                            }}
                        />
                    </FieldSet>
                    <FieldSet>
                        <form.Field
                            name="position"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="position">Position</FieldLabel>
                                        <Input
                                            id="position"
                                            value={dialogField.state.value}
                                            onChange={(e) => dialogField.handleChange(e.target.value)}
                                            placeholder="e.g. Software Engineer"
                                        />
                                    </Field>
                                )
                            }}
                        />
                    </FieldSet>
                    <FieldSet className="grid grid-cols-1 md:grid-cols-2">
                        <form.Field
                            name="startDate"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="startDate">Start Date</FieldLabel>
                                        <Input
                                            id="startDate"
                                            type="month"
                                            value={dialogField.state.value}
                                            onChange={(e) => dialogField.handleChange(e.target.value)}
                                        />
                                    </Field>
                                )
                            }}
                        />
                        <form.Field
                            name="endDate"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="endDate">End Date</FieldLabel>
                                        <Input
                                            id="endDate"
                                            type="month"
                                            value={dialogField.state.value}
                                            onChange={(e) => dialogField.handleChange(e.target.value)}
                                            placeholder="Present"
                                        />
                                    </Field>
                                )
                            }}
                        />
                    </FieldSet>
                    <FieldSet>
                        <form.Field
                            name="location"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="location">Location</FieldLabel>
                                        <Input
                                            id="location"
                                            value={dialogField.state.value}
                                            onChange={(e) => dialogField.handleChange(e.target.value)}
                                            placeholder="e.g. Remote / New York, NY"
                                        />
                                    </Field>
                                )
                            }}
                        />
                    </FieldSet>
                    <FieldSet>
                        <form.Field name="website.value">
                            {(valueField) => (
                                <form.Field name="website.label">
                                    {(labelField) => (
                                        <WebsiteField
                                            id="website"
                                            value={valueField.state.value}
                                            onValueChange={valueField.handleChange}
                                            linkLabel={labelField.state.value}
                                            onLinkLabelChange={labelField.handleChange}
                                        />
                                    )}
                                </form.Field>
                            )}
                        </form.Field>
                    </FieldSet>
                    <FieldSet>
                        <form.Field
                            name="content"
                            children={(dialogField) => {
                                return (
                                    <Field>
                                        <FieldLabel htmlFor="content">Description</FieldLabel>
                                        <Textarea
                                            id="content"
                                            value={dialogField.state.value}
                                            onChange={(e) => dialogField.handleChange(e.target.value)}
                                            placeholder="Describe your responsibilities and achievements..."
                                        />
                                    </Field>
                                )
                            }}
                        />
                    </FieldSet>
                </FieldSet>
                <DialogFooter>
                    <Button variant={"destructive"} onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <form.Subscribe
                        selector={(state) => [state.canSubmit, state.isSubmitting]}
                        children={([canSubmit, isSubmitting]) => (
                            <Button disabled={!canSubmit} type="submit">
                                {isSubmitting ? "Creating..." : "Create"}
                            </Button>
                        )}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export const ExperienceSection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => (
        <form.AppField
            name="sections.experience.items"
            mode="array"
            children={(field) => {
                return (
                    <FieldSet>
                        <FieldLegend className="font-bold text-2xl!">
                            {form.state.values.sections.experience.title}
                        </FieldLegend>
                        <FieldGroup>
                            <div className="border divide-y rounded-md">
                                <SortableDragProvider value={field.state.value} onChange={field.handleChange}>
                                    {(items) =>
                                        items.map((item, idx) => (
                                            <SortableItemRow
                                                key={item.id}
                                                sortableProps={{
                                                    index: idx,
                                                    id: item.id,
                                                }}
                                                title={item.company}
                                                subtitle={item.position}
                                                hidden={item.hidden}
                                                actions={{
                                                    onToggleVisibility: (nextHidden) => {
                                                        field.handleChange((prev) =>
                                                            prev.map((i) =>
                                                                i.id === item.id ? { ...i, hidden: nextHidden } : i,
                                                            ),
                                                        )
                                                    },

                                                    onEdit: () => {
                                                        alert("Update item " + item.id)
                                                    },

                                                    onDelete: () => {
                                                        field.handleChange((prev) =>
                                                            prev.filter((i) => i.id !== item.id),
                                                        )
                                                    },
                                                }}
                                            />
                                        ))
                                    }
                                </SortableDragProvider>
                            </div>
                            {/* <Button variant={"outline"} onClick={handleClickAddProject}>
                                <PlusIcon /> Add a new {form.state.values.sections.experience.title}
                            </Button> */}
                            <Create onCreate={field.pushValue} />
                        </FieldGroup>
                    </FieldSet>
                )
            }}
        />
    ),
})

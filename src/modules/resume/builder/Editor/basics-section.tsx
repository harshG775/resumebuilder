import { Button } from "#/components/ui/button"
import { Field, FieldLabel } from "#/components/ui/field"
import { Input } from "#/components/ui/input"
import { withForm } from "#/hooks/form"
import {
    PlusIcon,
    DotsSixVerticalIcon,
    LinkedinLogoIcon,
    GithubLogoIcon,
    TwitterLogoIcon,
    GlobeIcon,
    IdentificationBadgeIcon,
    LinkIcon,
} from "@phosphor-icons/react"
import { SectionFieldSet } from "../components/section-field-set"
import { SortableDragItem, SortableDragProvider } from "../components/sortable-item"
import { WebsiteField } from "./components/website-field"
import { LinkField } from "./components/link-field"
import { resumeFormOptions } from "../../data/resume-default-values"
import { Separator } from "#/components/ui/separator"
import { cn } from "#/lib/utils"
import type { CustomFieldVariantSchema } from "../../schema/resume.zod-schema"
import type { z } from "zod"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu"

const CUSTOM_FIELD_PLACEHOLDER: Record<z.infer<typeof CustomFieldVariantSchema>, string> = {
    linkedin: "linkedin.com/in/username",
    github: "github.com/username",
    twitter: "twitter.com/username",
    website: "yourwebsite.com",
    portfolio: "yourportfolio.com",
    text: "e.g. github.com/username",
}

const CUSTOM_FIELD_TYPES: {
    variant: z.infer<typeof CustomFieldVariantSchema>
    label: string
    icon: typeof PlusIcon
}[] = [
    { variant: "linkedin", label: "LinkedIn", icon: LinkedinLogoIcon },
    { variant: "github", label: "GitHub", icon: GithubLogoIcon },
    { variant: "twitter", label: "Twitter / X", icon: TwitterLogoIcon },
    { variant: "website", label: "Website", icon: GlobeIcon },
    { variant: "portfolio", label: "Portfolio", icon: IdentificationBadgeIcon },
    { variant: "text", label: "Other", icon: LinkIcon },
]

export const BasicsSection = withForm({
    ...resumeFormOptions,
    render: ({ form }) => (
        <SectionFieldSet title="Contact">
            <form.AppField
                name={`data.contactInfo.attributes.name.value`}
                children={(field) => (
                    <Field>
                        <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                        <Input
                            id={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="e.g. Alex Morgan"
                            autoComplete="off"
                        />
                    </Field>
                )}
            />

            <form.AppField
                name={`data.contactInfo.attributes.email.value`}
                children={(field) => (
                    <WebsiteField
                        id={field.name}
                        label="Email"
                        type="email"
                        prefix="mailto:"
                        value={field.state.value}
                        onValueChange={field.handleChange}
                        onBlur={field.handleBlur}
                        placeholder="you@example.com"
                    />
                )}
            />
            <form.AppField
                name={`data.contactInfo.attributes.phone.value`}
                children={(field) => (
                    <WebsiteField
                        id={field.name}
                        label="Phone"
                        type="tel"
                        prefix="tel:"
                        value={field.state.value}
                        onValueChange={field.handleChange}
                        onBlur={field.handleBlur}
                        placeholder="+1 (555) 000-0000"
                    />
                )}
            />

            <form.AppField
                name={`data.contactInfo.attributes.location.value`}
                children={(field) => (
                    <Field>
                        <FieldLabel htmlFor={field.name}>Location</FieldLabel>
                        <Input
                            id={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="e.g. San Francisco, CA"
                            autoComplete="off"
                        />
                    </Field>
                )}
            />
            <form.AppField
                name={`data.contactInfo.attributes.customFields`}
                mode="array"
                children={(field) => (
                    <Field>
                        <FieldLabel>Links</FieldLabel>
                        <div className="divide-y">
                            <SortableDragProvider
                                value={field.state.value}
                                onChange={field.handleChange}
                                children={(items) => {
                                    return items.map((item, idx: number) => {
                                        const realIndex = field.state.value.findIndex((i) => i.id === item.id)
                                        return (
                                            <SortableDragItem
                                                key={item.id}
                                                sortableProps={{
                                                    index: idx,
                                                    id: item.id,
                                                }}
                                                className={cn("flex items-stretch border")}
                                            >
                                                <div
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label={`Drag to reorder ${item.label}`}
                                                    className="flex justify-center items-center w-10 hover:bg-muted/80 cursor-grab focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                >
                                                    <DotsSixVerticalIcon aria-hidden="true" />
                                                </div>
                                                <Separator orientation="vertical" />

                                                <form.AppField
                                                    name={`data.contactInfo.attributes.customFields[${realIndex}].value`}
                                                    children={(valueField) => (
                                                        <form.AppField
                                                            name={`data.contactInfo.attributes.customFields[${realIndex}].label`}
                                                        >
                                                            {(labelField) => (
                                                                <LinkField
                                                                    id={valueField.name}
                                                                    value={valueField.state.value}
                                                                    onValueChange={valueField.handleChange}
                                                                    linkLabel={labelField.state.value}
                                                                    onLinkLabelChange={labelField.handleChange}
                                                                    onRemove={() => field.removeValue(realIndex)}
                                                                    placeholder={CUSTOM_FIELD_PLACEHOLDER[item.variant]}
                                                                    className="flex-1 p-1.5"
                                                                />
                                                            )}
                                                        </form.AppField>
                                                    )}
                                                />
                                            </SortableDragItem>
                                        )
                                    })
                                }}
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger render={<Button type="button" variant="outline" />}>
                                <PlusIcon />
                                Add Link
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuGroup>
                                    {CUSTOM_FIELD_TYPES.map(({ variant, label, icon: Icon }) => (
                                        <DropdownMenuItem
                                            key={variant}
                                            onClick={() =>
                                                field.pushValue({
                                                    id: crypto.randomUUID(),
                                                    isActive: true,
                                                    variant,
                                                    icon: variant,
                                                    label,
                                                    value: "",
                                                })
                                            }
                                        >
                                            <Icon />
                                            {label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </Field>
                )}
            />
        </SectionFieldSet>
    ),
})

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field"
import { useForm } from "@tanstack/react-form"
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Input } from "#/components/ui/input"
import { Textarea } from "#/components/ui/textarea"
import { Button } from "#/components/ui/button"
import { LinkIcon, Tag, X } from "lucide-react"

export default function Editor() {
    const form = useForm({
        defaultValues: {
            basics: {
                name: "",
                headline: "",
                email: "",
                phone: "",
                location: "",
                website: {
                    url: "",
                    label: "",
                },
                customFields: [
                    {
                        id: "custom-field-1",
                        url: "",
                        label: "",
                    },
                ],
            },
            summary: {
                title: "Summary",
                hidden: false,
                content: "",
            },
            sections: {
                experience: {
                    title: "Experience",
                    hidden: false,
                    columns: 1,
                    items: [
                        {
                            id: "exp-1",
                            hidden: false,
                            company: "",
                            position: "",
                            location: "",
                            period: "",
                            website: { showLink: false, url: "", label: "" },
                            description: "",
                            roles: [],
                        },
                    ],
                },
                projects: {
                    title: "Projects",
                    hidden: false,
                    columns: 1,
                    items: [
                        {
                            id: "pro-1",
                            hidden: false,
                            name: "",
                            period: "",
                            website: [{ id: "w-1", url: "", label: "" }],
                            description: "",
                        },
                    ],
                },
                skills: {
                    title: "Skills",
                    hidden: false,
                    columns: 1,
                    items: [
                        {
                            id: "skill-1",
                            hidden: false,
                            icon: "",
                            name: "",
                            proficiency: "",
                            level: 0,
                            keywords: [],
                        },
                    ],
                },
                education: {
                    title: "Education",
                    hidden: false,
                    columns: 1,
                    items: [
                        {
                            id: "edu-1",
                            hidden: false,
                            school: "",
                            degree: "",
                            area: "",
                            grade: "",
                            location: "",
                            period: "",
                            website: { id: "web-1", url: "", label: "" },
                            description: "",
                        },
                    ],
                },
                certifications: {
                    title: "Certifications",
                    hidden: false,
                    columns: 1,
                    items: [
                        {
                            id: "cert-1",
                            hidden: false,
                            title: "",
                            issuer: "",
                            date: "",
                            website: { id: "web-1", url: "", label: "" },
                            description: "",
                        },
                    ],
                },
            },
            order: ["experience", "projects", "skills", "education", "certifications"],
        },
    })

    console.log(form.state.values)

    return (
        <div className="p-4 mx-auto max-w-lg pb-24">
            <FieldGroup>
                <FieldSet>
                    <FieldLegend className="font-bold text-2xl!">Basics</FieldLegend>
                    <FieldGroup>
                        <form.Field
                            name={`basics.name`}
                            children={(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                    <Input
                                        id={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        autoComplete="off"
                                    />
                                </Field>
                            )}
                        />

                        <form.Field
                            name={`basics.headline`}
                            children={(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Headline</FieldLabel>
                                    <Input
                                        id={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        autoComplete="off"
                                    />
                                </Field>
                            )}
                        />

                        <form.Field
                            name={`basics.email`}
                            children={(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                    <Input
                                        type="email"
                                        id={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        autoComplete="off"
                                    />
                                </Field>
                            )}
                        />
                        <form.Field
                            name={`basics.phone`}
                            children={(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                                    <Input
                                        type="tel"
                                        id={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        autoComplete="off"
                                    />
                                </Field>
                            )}
                        />

                        <form.Field
                            name={`basics.location`}
                            children={(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Location</FieldLabel>
                                    <Input
                                        id={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        autoComplete="off"
                                    />
                                </Field>
                            )}
                        />
                        <div className="flex gap-2 items-end">
                            <form.Field name={`basics.website.url`}>
                                {(field) => (
                                    <Field>
                                        <FieldLabel htmlFor={field.name}>Website</FieldLabel>
                                        <Input
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            placeholder="https://"
                                        />
                                    </Field>
                                )}
                            </form.Field>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost">
                                        <Tag />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent>
                                    <FieldLabel>Label</FieldLabel>
                                    <form.Field name={`basics.website.label`}>
                                        {(field) => (
                                            <Input
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                            />
                                        )}
                                    </form.Field>
                                </PopoverContent>
                            </Popover>
                        </div>
                        <form.Field
                            name={`basics.customFields`}
                            mode="array"
                            children={(field) => (
                                <Field>
                                    <FieldLabel>Custom Fields</FieldLabel>

                                    {field.state.value.map((item: any, idx: number) => (
                                        <div key={`${idx}-${item.id}`} className="flex gap-2 mb-2">
                                            <form.Field name={`basics.customFields[${idx}].label`}>
                                                {(field) => (
                                                    <Input
                                                        value={field.state.value}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                    />
                                                )}
                                            </form.Field>

                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="ghost">
                                                        <LinkIcon />
                                                    </Button>
                                                </PopoverTrigger>

                                                <PopoverContent>
                                                    <FieldLabel>Enter The URL to link to</FieldLabel>
                                                    <form.Field name={`basics.customFields[${idx}].url`}>
                                                        {(field) => (
                                                            <Input
                                                                value={field.state.value}
                                                                onChange={(e) => field.handleChange(e.target.value)}
                                                            />
                                                        )}
                                                    </form.Field>
                                                </PopoverContent>
                                            </Popover>

                                            <Button
                                                type="button"
                                                variant="ghost"
                                                onClick={() => field.removeValue(idx)}
                                            >
                                                <X />
                                            </Button>
                                        </div>
                                    ))}

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            field.pushValue({
                                                id: crypto.randomUUID(),
                                                url: "",
                                                label: "",
                                            })
                                        }
                                    >
                                        Add Link
                                    </Button>
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </FieldSet>

                <FieldSeparator />

                <FieldSet>
                    <FieldLegend className="font-bold text-2xl!">Summary</FieldLegend>
                    <FieldGroup>
                        <form.Field
                            name={`summary.content`}
                            children={(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Summary</FieldLabel>
                                    <Textarea
                                        id={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        autoComplete="off"
                                        className="min-h-32"
                                    />
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </FieldSet>

                <FieldSeparator />

                <FieldSet>
                    <FieldLegend className="font-bold text-2xl!">Experience</FieldLegend>
                    <form.Field name="sections.experience.items" mode="array">
                        {(field) => (
                            <FieldGroup>
                                {field.state.value.map((_, idx) => (
                                    <div key={`exp-${idx}`} className="flex flex-col gap-3 p-4 border rounded-md relative">
                                        <Button type="button" variant="ghost" className="absolute top-2 right-2 w-8 h-8 p-0" onClick={() => field.removeValue(idx)}><X className="w-4 h-4" /></Button>
                                        
                                        <form.Field name={`sections.experience.items[${idx}].company`}>
                                            {(subField) => <Field><FieldLabel>Company</FieldLabel><Input value={subField.state.value} onChange={(e) => subField.handleChange(e.target.value)}/></Field>}
                                        </form.Field>
                                        
                                        <form.Field name={`sections.experience.items[${idx}].position`}>
                                            {(subField) => <Field><FieldLabel>Position</FieldLabel><Input value={subField.state.value} onChange={(e) => subField.handleChange(e.target.value)}/></Field>}
                                        </form.Field>

                                        <div className="grid grid-cols-2 gap-2">
                                            <form.Field name={`sections.experience.items[${idx}].location`}>
                                                {(subField) => <Field><FieldLabel>Location</FieldLabel><Input value={subField.state.value} onChange={(e) => subField.handleChange(e.target.value)}/></Field>}
                                            </form.Field>
                                            <form.Field name={`sections.experience.items[${idx}].period`}>
                                                {(subField) => <Field><FieldLabel>Period</FieldLabel><Input placeholder="e.g. 2020 - 2023" value={subField.state.value} onChange={(e) => subField.handleChange(e.target.value)}/></Field>}
                                            </form.Field>
                                        </div>

                                        <form.Field name={`sections.experience.items[${idx}].description`}>
                                            {(subField) => <Field><FieldLabel>Description</FieldLabel><Textarea className="min-h-24" value={subField.state.value} onChange={(e) => subField.handleChange(e.target.value)}/></Field>}
                                        </form.Field>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={() => field.pushValue({ id: crypto.randomUUID(), hidden: false, company: "", position: "", location: "", period: "", website: { showLink: false, url: "", label: "" }, description: "", roles: [] })}>
                                    Add Experience
                                </Button>
                            </FieldGroup>
                        )}
                    </form.Field>
                </FieldSet>

                <FieldSeparator />

                <FieldSet>
                    <FieldLegend className="font-bold text-2xl!">Projects</FieldLegend>
                    <form.Field name="sections.projects.items" mode="array">
                        {(field) => (
                            <FieldGroup>
                                {field.state.value.map((_, idx) => (
                                    <div key={`pro-${idx}`} className="flex flex-col gap-3 p-4 border rounded-md relative">
                                        <Button type="button" variant="ghost" className="absolute top-2 right-2 w-8 h-8 p-0" onClick={() => field.removeValue(idx)}><X className="w-4 h-4" /></Button>
                                        
                                        <div className="grid grid-cols-2 gap-2">
                                            <form.Field name={`sections.projects.items[${idx}].name`}>
                                                {(subField) => <Field><FieldLabel>Project Name</FieldLabel><Input value={subField.state.value} onChange={(e) => subField.handleChange(e.target.value)}/></Field>}
                                            </form.Field>
                                            <form.Field name={`sections.projects.items[${idx}].period`}>
                                                {(subField) => <Field><FieldLabel>Period</FieldLabel><Input value={subField.state.value} onChange={(e) => subField.handleChange(e.target.value)}/></Field>}
                                            </form.Field>
                                        </div>

                                        <form.Field name={`sections.projects.items[${idx}].description`}>
                                            {(subField) => <Field><FieldLabel>Description</FieldLabel><Textarea className="min-h-24" value={subField.state.value} onChange={(e) => subField.handleChange(e.target.value)}/></Field>}
                                        </form.Field>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={() => field.pushValue({ id: crypto.randomUUID(), hidden: false, name: "", period: "", website: [{ id: crypto.randomUUID(), url: "", label: "" }], description: "" })}>
                                    Add Project
                                </Button>
                            </FieldGroup>
                        )}
                    </form.Field>
                </FieldSet>

                <FieldSeparator />

                <FieldSet>
                    <FieldLegend className="font-bold text-2xl!">Skills</FieldLegend>
                    <form.Field name="sections.skills.items" mode="array">
                        {(field) => (
                            <FieldGroup>
                                {field.state.value.map((_, idx) => (
                                    <div key={`skill-${idx}`} className="flex gap-2 items-end mb-2">
                                        <form.Field name={`sections.skills.items[${idx}].name`}>
                                            {(subField) => <Field className="flex-1"><FieldLabel>Skill</FieldLabel><Input placeholder="e.g. React" value={subField.state.value} onChange={(e) => subField.handleChange(e.target.value)}/></Field>}
                                        </form.Field>
                                        <form.Field name={`sections.skills.items[${idx}].proficiency`}>
                                            {(subField) => <Field className="flex-1"><FieldLabel>Proficiency</FieldLabel><Input placeholder="e.g. Expert" value={subField.state.value} onChange={(e) => subField.handleChange(e.target.value)}/></Field>}
                                        </form.Field>
                                        <Button type="button" variant="ghost" onClick={() => field.removeValue(idx)}><X /></Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={() => field.pushValue({ id: crypto.randomUUID(), hidden: false, icon: "", name: "", proficiency: "", level: 0, keywords: [] })}>
                                    Add Skill
                                </Button>
                            </FieldGroup>
                        )}
                    </form.Field>
                </FieldSet>

                <FieldSeparator />

                <FieldSet>
                    <FieldLegend className="font-bold text-2xl!">Education</FieldLegend>
                    <form.Field name="sections.education.items" mode="array">
                        {(field) => (
                            <FieldGroup>
                                {field.state.value.map((_, idx) => (
                                    <div key={`edu-${idx}`} className="flex flex-col gap-3 p-4 border rounded-md relative">
                                        <Button type="button" variant="ghost" className="absolute top-2 right-2 w-8 h-8 p-0" onClick={() => field.removeValue(idx)}><X className="w-4 h-4" /></Button>
                                        
                                        <form.Field name={`sections.education.items[${idx}].school`}>
                                            {(subField) => <Field><FieldLabel>School</FieldLabel><Input value={subField.state.value} onChange={(e) => subField.handleChange(e.target.value)}/></Field>}
                                        </form.Field>

                                        <div className="grid grid-cols-2 gap-2">
                                            <form.Field name={`sections.education.items[${idx}].degree`}>
                                                {(subField) => <Field><FieldLabel>Degree</FieldLabel><Input value={subField.state.value} onChange={(e) => subField.handleChange(e.target.value)}/></Field>}
                                            </form.Field>
                                            <form.Field name={`sections.education.items[${idx}].area`}>
                                                {(subField) => <Field><FieldLabel>Area of Study</FieldLabel><Input value={subField.state.value} onChange={(e) => subField.handleChange(e.target.value)}/></Field>}
                                            </form.Field>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <form.Field name={`sections.education.items[${idx}].location`}>
                                                {(subField) => <Field><FieldLabel>Location</FieldLabel><Input value={subField.state.value} onChange={(e) => subField.handleChange(e.target.value)}/></Field>}
                                            </form.Field>
                                            <form.Field name={`sections.education.items[${idx}].period`}>
                                                {(subField) => <Field><FieldLabel>Period</FieldLabel><Input value={subField.state.value} onChange={(e) => subField.handleChange(e.target.value)}/></Field>}
                                            </form.Field>
                                        </div>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={() => field.pushValue({ id: crypto.randomUUID(), hidden: false, school: "", degree: "", area: "", grade: "", location: "", period: "", website: { id: crypto.randomUUID(), url: "", label: "" }, description: "" })}>
                                    Add Education
                                </Button>
                            </FieldGroup>
                        )}
                    </form.Field>
                </FieldSet>

                <FieldSeparator />

                <FieldSet>
                    <FieldLegend className="font-bold text-2xl!">Certifications</FieldLegend>
                    <form.Field name="sections.certifications.items" mode="array">
                        {(field) => (
                            <FieldGroup>
                                {field.state.value.map((_, idx) => (
                                    <div key={`cert-${idx}`} className="flex flex-col gap-3 p-4 border rounded-md relative">
                                        <Button type="button" variant="ghost" className="absolute top-2 right-2 w-8 h-8 p-0" onClick={() => field.removeValue(idx)}><X className="w-4 h-4" /></Button>
                                        
                                        <form.Field name={`sections.certifications.items[${idx}].title`}>
                                            {(subField) => <Field><FieldLabel>Title</FieldLabel><Input value={subField.state.value} onChange={(e) => subField.handleChange(e.target.value)}/></Field>}
                                        </form.Field>

                                        <div className="grid grid-cols-2 gap-2">
                                            <form.Field name={`sections.certifications.items[${idx}].issuer`}>
                                                {(subField) => <Field><FieldLabel>Issuer</FieldLabel><Input value={subField.state.value} onChange={(e) => subField.handleChange(e.target.value)}/></Field>}
                                            </form.Field>
                                            <form.Field name={`sections.certifications.items[${idx}].date`}>
                                                {(subField) => <Field><FieldLabel>Date</FieldLabel><Input value={subField.state.value} onChange={(e) => subField.handleChange(e.target.value)}/></Field>}
                                            </form.Field>
                                        </div>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={() => field.pushValue({ id: crypto.randomUUID(), hidden: false, title: "", issuer: "", date: "", website: { id: crypto.randomUUID(), url: "", label: "" }, description: "" })}>
                                    Add Certification
                                </Button>
                            </FieldGroup>
                        )}
                    </form.Field>
                </FieldSet>
                
            </FieldGroup>
        </div>
    )
}
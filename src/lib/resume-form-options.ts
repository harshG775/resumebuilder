import { formOptions } from "@tanstack/react-form"
import { ResumeSchema, type ResumeValues } from "#/lib/schemas/resume-schema"

const defaultValues: ResumeValues = {
    basics: {
        name: "",
        headline: "",
        email: "",
        phone: "",
        location: "",
        website: { showLink: false, url: "", label: "" },
        customFields: [],
    },
    sections: {
        summary: { title: "Summary", hidden: false, columns: 1, content: "" },
        skills: { title: "Skills", hidden: false, columns: 1, items: [] },
        experience: { title: "Experience", hidden: false, columns: 1, items: [] },
        projects: { title: "Projects", hidden: false, columns: 1, items: [] },
        education: { title: "Education", hidden: false, columns: 1, items: [] },
        certifications: { title: "Certifications", hidden: false, columns: 1, items: [] },
    },
    order: ["summary", "skills", "experience", "projects", "education", "certifications"],
}
export const resumeFormOptions = formOptions({
    defaultValues: defaultValues,
    validators: {
        onChange: ResumeSchema,
    },
})

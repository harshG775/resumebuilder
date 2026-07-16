import { formOptions } from "@tanstack/react-form"
import { ResumeZodSchema } from "../schema/resume.zod-schema"
import type { ResumeValues } from "../schema/resume.zod-schema"

export const resumeDefaultValues: ResumeValues = {
    basics: {
        name: "",
        headline: "",
        email: { hidden: false, label: "", value: "" },
        phone: { hidden: false, label: "", value: "" },
        location: "",
        website: { hidden: false, value: "", label: "" },
        customFields: [],
    },
    sections: {
        summary: { title: "Summary", hidden: false, columns: 1, icon: "", content: "" },
        skill: { title: "Skills", hidden: false, columns: 1, icon: "", items: [] },
        experience: { title: "Experience", hidden: false, columns: 1, icon: "", items: [] },
        project: { title: "Projects", hidden: false, columns: 1, icon: "", items: [] },
        education: { title: "Education", hidden: false, columns: 1, icon: "", items: [] },
        certification: { title: "Certifications", hidden: false, columns: 1, icon: "", items: [] },
    },
    meta: {
        template: "classic",
        layout: {
            pages: [
                {
                    main: ["summary", "skill", "experience", "project", "education", "certification"],
                },
            ],
        },
        design: {
            colors: {
                primary: "",
                text: "",
                background: "",
            },
        },
        typography: {
            heading: {
                fontFamily: "",
                fontWeight: "",
            },
            body: {
                fontFamily: "",
                fontWeight: "",
            },
        },
    },
}

export const resumeFormOptions = formOptions({
    defaultValues: resumeDefaultValues,
    validators: {
        onChange: ResumeZodSchema,
    },
})

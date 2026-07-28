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
        page: {
            gapX: 4,
            gapY: 4,
            marginX: 14,
            marginY: 12,
            format: "a4",
            locale: "en-US",
            hideLinkUnderline: false,
            hideIcons: false,
            hideSectionIcons: true,
        },
        design: {
            colors: {
                primary: "#1e3a8a",
                text: "#111827",
                background: "#ffffff",
            },
        },
        typography: {
            heading: {
                fontFamily: "New Computer Modern",
                fontWeight: "800",
                fontSize: 14,
                lineHeight: 1.5,
            },
            body: {
                fontFamily: "Libertinus Serif",
                fontWeight: "400",
                fontSize: 10,
                lineHeight: 1.5,
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

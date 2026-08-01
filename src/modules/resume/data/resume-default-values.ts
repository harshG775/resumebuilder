import { formOptions } from "@tanstack/react-form"
import { RESUME_THEME_VERSION, ResumeZodSchema } from "../schema/resume.zod-schema"
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
        theme: {
            version: RESUME_THEME_VERSION,
            color: {
                text: "#111827",
                textMuted: "#6b7280",
                primary: "#1e3a8a",
                background: "#ffffff",
                border: "#e5e7eb",
            },
            font: {
                body: "Libertinus Serif",
                heading: "New Computer Modern",
            },
            size: {
                name: 20,
                heading: 14,
                subheading: 10.5,
                body: 10,
                meta: 9,
            },
            weight: {
                heading: 800,
                subheading: 700,
            },
            space: {
                itemGap: 6,
            },
            border: {
                thickness: 0.5,
            },
            layout: {
                paper: "a4",
                margin: { x: 40, y: 34 },
            },
            lang: "en",
            leading: 1.5,
        },
        display: {
            hideLinkUnderline: false,
            hideIcons: false,
            hideSectionIcons: true,
        },
        layout: {
            pages: [
                {
                    main: ["summary", "skill", "experience", "project", "education", "certification"],
                },
            ],
        },
    },
}

export const resumeFormOptions = formOptions({
    defaultValues: resumeDefaultValues,
    validators: {
        onChange: ResumeZodSchema,
    },
})

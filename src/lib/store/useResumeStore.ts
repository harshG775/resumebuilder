import type { ResumeData } from "#/types/resume.type"
import { create } from "zustand"

type ResumeStore = ResumeData & {
    // Actions
}
export const useResumeStore = create<ResumeStore>((set, get) => ({
    metaData: {
        template: "basic",
        layout: {
            order: {
                1: "basics",
                2: "summary",
                3: "experience",
                4: "projects",
                5: "skills",
                6: "education",
                7: "certifications",
            },
        },
    },
    sections: {
        basics: {
            id: "id-basics",
            type: "basics",
            order: 1,
            props: {
                name: "",
                headline: "",
                email: "",
                phone: "",
                location: "",
                links: [],
            },
        },
        summary: {
            id: "id-summary",
            type: "summary",
            order: 2,
            props: {
                content: "",
            },
        },
        experience: {
            id: "id-experience",
            type: "experience",
            order: 3,
            props: {
                items: [],
            },
        },
        projects: {
            id: "id-projects",
            type: "projects",
            order: 4,
            props: {
                items: [],
            },
        },
        skills: {
            id: "id-skills",
            type: "skills",
            order: 5,
            props: {
                items: [],
            },
        },
        education: {
            id: "id-education",
            type: "education",
            order: 6,
            props: {
                items: [],
            },
        },
        certifications: {
            id: "id-certifications",
            type: "certifications",
            order: 7,
            props: {
                items: [],
            },
        },
    },
}))

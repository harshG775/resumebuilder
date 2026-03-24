import type { ResumeData } from "#/types/resume.type"
import { create } from "zustand"

type ResumeStore = {
    resume: ResumeData
    // Actions
}
export const useResumeStore = create<ResumeStore>((set) => ({
    resume: {
        head: { props: { title: "", description: "" } },
        content: [],
    },
    
}))

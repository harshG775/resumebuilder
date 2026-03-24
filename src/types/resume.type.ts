export type SectionUnionType =
    | "basics"
    | "summary"
    | "experience"
    | "projects"
    | "skills"
    | "education"
    | "certifications"

export type Link = {
    id: string
    label: string
    url: string
    order?: number
}

// Basics
export type BasicsProps = {
    name: string
    headline: string
    email: string
    phone: string
    location: string
    links: Link[]
}

// Summary
export type SummaryProps = {
    points: string[]
}

// Experience
export type ExperienceItem = {
    id: string
    order: number
    title: string
    organization: string
    location: string
    startDate: string
    endDate: string | null
    links?: Link[]
    points: string[]
}
export type ExperienceProps = {
    items: ExperienceItem[]
}

// Projects
export type ProjectItem = {
    id: string
    order: number
    title: string
    organization: string
    stack: string[]
    links?: Link[]
    points: string[]
}

export type ProjectsProps = {
    items: ProjectItem[]
}

// Skills
export type SkillGroup = {
    id: string
    order: number
    title: string
    items: string[]
}
export type SkillsProps = {
    groups: SkillGroup[]
}

// Education
export type EducationItem = {
    id: string
    order: number
    title: string
    organization: string
    startDate: string
    endDate: string | null
}
export type EducationProps = {
    items: EducationItem[]
}

// Certifications (optional extension)
export type CertificationItem = {
    id: string
    order: number
    title: string
    organization: string
    issueDate: string
    credentialUrl?: string
}
export type CertificationsProps = {
    items: CertificationItem[]
}

// Base Section Generic
export type BaseContent<T, K extends SectionUnionType> = {
    id: string
    type: K
    order: number
    props: T
}

// Section Mapping
export type SectionMap = {
    basics: BasicsProps
    summary: SummaryProps
    experience: ExperienceProps
    projects: ProjectsProps
    skills: SkillsProps
    education: EducationProps
    certifications: CertificationsProps
}
export type Section = {
    [K in keyof SectionMap]: BaseContent<SectionMap[K], K>
}[keyof SectionMap]

// Root Data Type
export type ResumeData = {
    head: {
        props: {
            title: string
            description: string
        }
    }
    content: Section[]
}

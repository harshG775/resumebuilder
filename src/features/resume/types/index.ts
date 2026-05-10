import type { ComponentType } from "react"
import type { ResumeValues } from "#/lib/schemas/resume-schema"

/**
 * Template IDs - Discriminated union
 * Add new template names here as they're created
 */
export type TemplateId = "default"

/**
 * Template Configuration
 * Controls what features this template supports
 */
export type TemplateConfig = {
    supportsPhoto: boolean
    supportsSidebar: boolean
    maxPages: number
}

/**
 * Template Metadata
 * UI and presentation info
 */
export type TemplateMeta = {
    id: string
    name: string
    description: string
    thumbnail?: string
}

/**
 * Template Definition
 * Complete template package with component, metadata, and config
 */
export type TemplateDefinition = {
    meta: TemplateMeta
    config: TemplateConfig
    component: ComponentType<{ data: ResumeValues }>
    styles: string
}

/**
 * Template Component Props
 * Standard props all template components receive
 */
export type TemplateComponentProps = {
    data: ResumeValues
}

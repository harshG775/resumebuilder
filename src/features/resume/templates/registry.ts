import type { TemplateDefinition, TemplateId } from "../types"
import defaultTemplate from "./default"


const TEMPLATES: Record<TemplateId, TemplateDefinition> = {
    default: defaultTemplate,
    // modern: modernTemplate,
    // minimalist: minimalistTemplate,
}

/**
 * Get a template by ID
 * Safely retrieve TEMPLATES with fallback to default
 */
export function getTemplate(id: TemplateId): TemplateDefinition {
    return TEMPLATES[id] ?? TEMPLATES.default
}

/**
 * List all available TEMPLATES
 * For UI dropdowns, template selection, etc.
 */
export function listTemplates(): TemplateDefinition[] {
    return Object.values(TEMPLATES)
}

/**
 * Get template IDs only
 * Useful for validation, form enums, etc.
 */
export function getTemplateIds(): string[] {
    return Object.keys(TEMPLATES)
}

/**
 * Check if a template exists
 */
export function hasTemplate(id: string): boolean {
    return id in TEMPLATES
}

export default TEMPLATES

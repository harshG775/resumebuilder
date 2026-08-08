import { z } from "zod"
import type { ResumeValues } from "../schema/resume.zod-schema"
import { ResumeZodSchema } from "../schema/resume.zod-schema"
import { formOptions } from "@tanstack/react-form"
import type { StandardSchemaV1 } from "@tanstack/react-form"

function getDefaults(schema: z.ZodType): unknown {
    if (schema instanceof z.ZodDefault) {
        return schema.parse(undefined)
    }

    if (schema instanceof z.ZodObject) {
        const shape = schema.shape as Record<string, z.ZodType>
        return Object.fromEntries(Object.entries(shape).map(([key, value]) => [key, getDefaults(value)]))
    }

    if (schema instanceof z.ZodArray) {
        return []
    }

    return undefined
}

export function getResumeDefaults(): ResumeValues {
    return getDefaults(ResumeZodSchema) as ResumeValues
}

export const resumeDefaultValues = getResumeDefaults()

export const resumeFormOptions = formOptions({
    defaultValues: resumeDefaultValues,
    validators: {
        onChange: ResumeZodSchema as unknown as StandardSchemaV1<ResumeValues, unknown>,
    },
})

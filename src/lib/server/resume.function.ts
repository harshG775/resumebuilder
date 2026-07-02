// src/lib/server/resume.function.ts
import { createServerFn } from "@tanstack/react-start"
import z from "zod"
import { db } from "../db"
import { resume } from "../db/schema"
import { eq, count } from "drizzle-orm"

const paginationSchema = z.object({
    id: z.string(),
    page: z.number().int().min(1).default(1),
    pageSize: z.number().int().min(1).max(100).default(10),
})

export const getAllResume = createServerFn({ method: "GET" })
    .validator(paginationSchema)
    .handler(async ({ data }) => {
        const { id, page, pageSize } = data
        const offset = (page - 1) * pageSize

        const [resumes, totalResult] = await Promise.all([
            db.select().from(resume).where(eq(resume.userId, id)).limit(pageSize).offset(offset),
            db.select({ count: count() }).from(resume).where(eq(resume.userId, id)),
        ])

        const total = totalResult[0]?.count ?? 0

        return {
            data: resumes,
            pagination: {
                page,
                pageSize,
                total,
                totalPages: Math.ceil(total / pageSize),
            },
        }
    })

export const getResume = createServerFn({ method: "GET" })
    .validator(z.object({ id: z.string() }))
    .handler(async () => {
        return
    })
export const createResume = createServerFn({ method: "POST" }).handler(async () => {
    return
})
export const updateResume = createServerFn({ method: "POST" })
    .validator(z.object({ id: z.string() }))
    .handler(async () => {
        return
    })
export const deleteResume = createServerFn({ method: "POST" })
    .validator(z.object({ id: z.string() }))
    .handler(async () => {
        return
    })

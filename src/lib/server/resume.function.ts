// src/lib/server/resume.function.ts
import { createServerFn } from "@tanstack/react-start"
import z from "zod"
import { db } from "../db"
import { resume } from "../db/schema"
import { eq, count, and } from "drizzle-orm"

const paginationSchema = z.object({
    userId: z.string(),
    page: z.number().int().min(1).default(1),
    pageSize: z.number().int().min(1).max(100).default(10),
})

export const getAllResume = createServerFn({ method: "GET" })
    .validator(paginationSchema)
    .handler(async ({ data }) => {
        const { userId, page, pageSize } = data
        const offset = (page - 1) * pageSize

        const [resumes, totalResult] = await Promise.all([
            db
                .select({
                    id: resume.id,
                    title: resume.title,
                    createdAt: resume.createdAt,
                    updatedAt: resume.updatedAt,
                })
                .from(resume)
                .where(eq(resume.userId, userId))
                .limit(pageSize)
                .offset(offset),
            db.select({ count: count() }).from(resume).where(eq(resume.userId, userId)),
        ])

        const total = totalResult[0]?.count ?? 0

        return {
            success: true,
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

const CreateResumePayloadSchema = z.object({
    userId: z.string(),
    title: z.string(),
    content: z.string().transform((str, ctx) => {
        try {
            return JSON.parse(str)
        } catch (e) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Content must be a valid JSON string",
            })
            return z.NEVER
        }
    }),
})

export const createResume = createServerFn({ method: "POST" })
    .validator(CreateResumePayloadSchema)
    .handler(async ({ data }) => {
        const newResume = await db
            .insert(resume)
            .values({
                id: crypto.randomUUID(),
                userId: data.userId,
                content: data.content,
                title: data.title,
            })
            .returning({
                id: resume.id,
                title: resume.title,
            })
        return {
            success: true,
            data: newResume[0],
        }
    })
export const updateResume = createServerFn({ method: "POST" })
    .validator(z.object({ id: z.string() }))
    .handler(async () => {
        return
    })
export const deleteResume = createServerFn({ method: "POST" })
    .validator(z.object({ id: z.string(), userId: z.string() }))
    .handler(async ({ data }) => {
        const resp = await db
            .delete(resume)
            .where(and(eq(resume.id, data.id), eq(resume.userId, data.userId)))
            .returning({
                id: resume.id,
                title: resume.title,
            })
        return {
            success: true,
            data: resp[0],
        }
    })

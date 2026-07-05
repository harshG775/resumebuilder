// src/lib/server/resume.function.ts
import { createServerFn } from "@tanstack/react-start"
import z from "zod"
import { db } from "../db"
import { resume, user } from "../db/schema"
import { eq, count, and, desc } from "drizzle-orm"
import { generateUniqueSlug } from "../utils"
import { authMiddleware } from "./auth.middleware"

const paginationSchema = z.object({
    page: z.number().int().min(1).default(1),
    pageSize: z.number().int().min(1).max(100).default(10),
})

export const getAllResumeFn = createServerFn({ method: "GET" })
    .validator(paginationSchema)
    .middleware([authMiddleware])
    .handler(async ({ data, context }) => {
        const { page, pageSize } = data
        const offset = (page - 1) * pageSize

        const [resumes, totalResult] = await Promise.all([
            db
                .select({
                    id: resume.id,
                    title: resume.title,
                    slug: resume.slug,
                    createdAt: resume.createdAt,
                    updatedAt: resume.updatedAt,
                })
                .from(resume)
                .where(eq(resume.userId, context.session.user.id))
                .limit(pageSize)
                .offset(offset)
                .orderBy(desc(resume.updatedAt)),
            db.select({ count: count() }).from(resume).where(eq(resume.userId, context.session.user.id)),
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

export const getResumeByIdFn = createServerFn({ method: "GET" })
    .validator(z.object({ id: z.string() }))
    .middleware([authMiddleware])
    .handler(async () => {
        return
    })

export const getResumeBySlugFn = createServerFn({ method: "GET" })
    .validator(z.object({ slug: z.string() }))
    .middleware([authMiddleware])
    .handler(async ({ data, context }) => {
        const result = await db
            .select({
                id: resume.id,
                title: resume.title,
                content: resume.content,
                slug: resume.slug,
                createdAt: resume.createdAt,
                updatedAt: resume.updatedAt,
            })
            .from(resume)
            .where(and(eq(resume.slug, data.slug), eq(resume.userId, context.session.user.id)))

        if (result.length === 0) {
            return {
                success: false,
            }
        }

        return { success: true, data: result[0] }
    })

export const createResumeFn = createServerFn({ method: "POST" })
    .validator(z.object({ title: z.string() }))
    .middleware([authMiddleware])
    .handler(async ({ data, context }) => {
        const id = crypto.randomUUID()
        const uniqueSlug = generateUniqueSlug(data.title, id)
        const content = {}
        const newResume = await db
            .insert(resume)
            .values({
                id: id,
                userId: context.session.user.id,
                title: data.title,
                slug: uniqueSlug,
                content: content,
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
export const updateResumeFn = createServerFn({ method: "POST" })
    .validator(
        z.object({
            id: z.string(),
            updatePayload: z.object({
                title: z.string(),
            }),
        }),
    )
    .middleware([authMiddleware])
    .handler(async ({ data, context }) => {
        const [updatedResume] = await db
            .update(resume)
            .set(data.updatePayload)
            .where(and(eq(resume.id, data.id), eq(resume.userId, context.session.user.id)))
            .returning({
                id: resume.id,
                title: resume.title,
                slug: resume.slug,
                createdAt: resume.createdAt,
                updatedAt: resume.updatedAt,
            })

        return {
            success: true,
            data: updatedResume,
        }
    })
export const deleteResumeFn = createServerFn({ method: "POST" })
    .validator(z.object({ id: z.string() }))
    .middleware([authMiddleware])
    .handler(async ({ data, context }) => {
        const resp = await db
            .delete(resume)
            .where(and(eq(resume.id, data.id), eq(resume.userId, context.session.user.id)))
            .returning({
                id: resume.id,
                title: resume.title,
            })
        return {
            success: true,
            data: resp[0],
        }
    })

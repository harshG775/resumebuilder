// src/lib/server/resume.function.ts
import { createServerFn } from "@tanstack/react-start"
import z from "zod"
import { db } from "../db"
import { resume, user } from "../db/schema"
import { eq, count, and, ne, desc } from "drizzle-orm"
import { authMiddleware } from "./auth.middleware"
import { resumeDefaultValues } from "#/modules/resume/data/resume-default-values"
import { ResumeZodSchema } from "#/modules/resume/schema/resume.zod-schema"

const paginationSchema = z.object({
    page: z.number().int().min(1).default(1),
    pageSize: z.number().int().min(1).max(100).default(10),
})

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const slugSchema = z
    .string()
    .min(1, "Slug is required")
    .max(60, "Slug is too long")
    .regex(slugRegex, "Use lowercase letters, numbers, and hyphens only")

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
            .where(and(eq(resume.id, data.id), eq(resume.userId, context.session.user.id)))
        if (result.length === 0) {
            return {
                success: false,
            }
        }
        return { success: true, data: result[0] }
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

export const getResumeByUsernameAndSlugFn = createServerFn({ method: "GET" })
    .validator(z.object({ username: z.string(), slug: z.string() }))
    .handler(async ({ data }) => {
        const result = await db
            .select({
                id: resume.id,
                title: resume.title,
                content: resume.content,
                slug: resume.slug,
                updatedAt: resume.updatedAt,
                ownerName: user.name,
            })
            .from(resume)
            .innerJoin(user, eq(resume.userId, user.id))
            .where(and(eq(user.username, data.username), eq(resume.slug, data.slug)))

        if (result.length === 0) {
            return {
                success: false,
            }
        }

        return { success: true, data: result[0] }
    })

export const createResumeFn = createServerFn({ method: "POST" })
    .validator(
        z.object({
            title: z.string().min(1, "Resume title is required"),
            slug: slugSchema,
        }),
    )
    .middleware([authMiddleware])
    .handler(async ({ data, context }) => {
        const existing = await db
            .select({ id: resume.id })
            .from(resume)
            .where(and(eq(resume.userId, context.session.user.id), eq(resume.slug, data.slug)))

        if (existing.length > 0) {
            return { success: false as const, error: "You already have a resume with this slug." }
        }

        const id = crypto.randomUUID()
        const newResume = await db
            .insert(resume)
            .values({
                id: id,
                userId: context.session.user.id,
                title: data.title,
                slug: data.slug,
                content: resumeDefaultValues,
            })
            .returning({
                id: resume.id,
                title: resume.title,
                slug: resume.slug,
            })
        return {
            success: true as const,
            data: newResume[0],
        }
    })

export const updateResumeFn = createServerFn({ method: "POST" })
    .validator(
        z.object({
            id: z.string(),
            updatePayload: z.object({
                title: z.string().min(1, "Resume title is required"),
                slug: slugSchema,
            }),
        }),
    )
    .middleware([authMiddleware])
    .handler(async ({ data, context }) => {
        const existing = await db
            .select({ id: resume.id })
            .from(resume)
            .where(
                and(
                    eq(resume.userId, context.session.user.id),
                    eq(resume.slug, data.updatePayload.slug),
                    ne(resume.id, data.id),
                ),
            )

        if (existing.length > 0) {
            return { success: false as const, error: "You already have a resume with this slug." }
        }

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
            success: true as const,
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

export const updateResumeContentFn = createServerFn({ method: "POST" })
    .validator(
        z.object({
            id: z.string(),
            updatePayload: z.object({
                content: ResumeZodSchema,
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

// src/lib/server/resume.function.ts
import { createServerFn } from "@tanstack/react-start"
import z from "zod"
import { db } from "../db"
import type { resume } from "../db/schema"

type ResumeType = typeof resume.$inferInsert
export const getAllResume = createServerFn({ method: "GET" }).handler(async (): Promise<any> => {
    const resumes = await db.query.resume.findMany()
    return resumes
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

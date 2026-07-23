import { createServerFn } from "@tanstack/react-start"
import { and, eq, ne } from "drizzle-orm"
import { z } from "zod"
import { db } from "../db"
import { user } from "../db/schema"
import { authMiddleware } from "./auth.middleware"

const usernameRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const userSelection = {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    username: user.username,
    createdAt: user.createdAt,
}

export const getCurrentUserFn = createServerFn({ method: "GET" })
    .middleware([authMiddleware])
    .handler(async ({ context }) => {
        const result = await db.select(userSelection).from(user).where(eq(user.id, context.session.user.id))

        return { success: true, data: result[0] }
    })

export const updateProfileFn = createServerFn({ method: "POST" })
    .validator(
        z.object({
            name: z.string().min(1, "Name is required").max(100),
            username: z
                .string()
                .min(3, "Must be at least 3 characters")
                .max(30, "Must be at most 30 characters")
                .regex(usernameRegex, "Use lowercase letters, numbers, and hyphens only"),
        }),
    )
    .middleware([authMiddleware])
    .handler(async ({ data, context }) => {
        const existing = await db
            .select({ id: user.id })
            .from(user)
            .where(and(eq(user.username, data.username), ne(user.id, context.session.user.id)))

        if (existing.length > 0) {
            return { success: false as const, error: "That username is already taken." }
        }

        const [updated] = await db
            .update(user)
            .set({ name: data.name, username: data.username })
            .where(eq(user.id, context.session.user.id))
            .returning(userSelection)

        return { success: true as const, data: updated }
    })

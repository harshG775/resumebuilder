import { betterAuth } from "better-auth"
import { tanstackStartCookies } from "better-auth/tanstack-start"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "../db"
import * as schema from "#/lib/db/schema/index"
import { env } from "#/env"
import { generateUniqueSlug } from "#/lib/utils"

export const auth = betterAuth({
    baseURL: env.SERVER_URL,
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema,
    }),
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60,
        },
    },
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        },
    },
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    return {
                        data: {
                            ...user,
                            username: generateUniqueSlug(user.name, crypto.randomUUID()),
                        },
                    }
                },
            },
        },
    },
    plugins: [tanstackStartCookies()],
})

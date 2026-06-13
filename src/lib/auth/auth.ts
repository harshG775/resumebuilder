import { betterAuth } from "better-auth"
import { tanstackStartCookies } from "better-auth/tanstack-start"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "../db"
import * as schema from "#/lib/db/schema/index"

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema,
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [tanstackStartCookies()],
})

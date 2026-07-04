import { createMiddleware } from "@tanstack/react-start"
import { getSessionFn } from "./auth.function"

export const authMiddleware = createMiddleware({ type: "function" }).server(async ({ next }) => {
    const session = await getSessionFn()
    if (!session?.user) {
        throw new Error("Unauthorized")
    }
    return await next({ context: { session } })
})

import * as schema from "#/lib/db/schema"
import { defineRelations } from "drizzle-orm"

export const relations = defineRelations(schema, (r) => ({
    user: {
        sessions: r.many.session(),
        accounts: r.many.account(),
        resumes: r.many.resume(),
    },
    session: {
        user: r.one.user({
            from: r.session.userId,
            to: r.user.id,
        }),
    },
    account: {
        user: r.one.user({
            from: r.account.userId,
            to: r.user.id,
        }),
    },
    resume: {
        user: r.one.user({
            from: r.resume.userId,
            to: r.user.id,
        }),
    },
}))

import { relations } from "drizzle-orm"
import { pgTable, text, timestamp, index, jsonb } from "drizzle-orm/pg-core"
import { user } from "./auth"
import z from "zod"

// This is where your resume data structure will live
const ResumeZSchema = z.object({})
export type ResumeValues = z.infer<typeof ResumeZSchema>

export const resume = pgTable(
    "resume",
    {
        id: text("id").primaryKey(),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        title: text("title").notNull().default("Untitled Resume"),

        content: jsonb("content").$type<ResumeValues>().notNull().default({}),

        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
    },
    (table) => [index("resume_userId_idx").on(table.userId)],
)

// Define the relation from the resume back to the user
export const resumeRelations = relations(resume, ({ one }) => ({
    user: one(user, {
        fields: [resume.userId],
        references: [user.id],
    }),
}))

import { pgTable, text, timestamp, index, jsonb } from "drizzle-orm/pg-core"
import { user } from "./auth"
import type { ResumeValues } from "#/modules/resume/schema/resume.zod-schema"
import { resumeDefaultValues } from "#/modules/resume/data/resume-default-values"

export const resume = pgTable(
    "resume",
    {
        id: text("id").primaryKey(),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        title: text("title").notNull().default("Untitled Resume"),
        slug: text("slug").notNull(),

        content: jsonb("content").$type<ResumeValues>().notNull().default(resumeDefaultValues),

        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
    },
    (table) => [index("resume_userId_idx").on(table.userId)],
)


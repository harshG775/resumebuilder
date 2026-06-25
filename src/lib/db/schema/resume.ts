import { relations } from "drizzle-orm"
import { pgTable, text, timestamp, index, jsonb } from "drizzle-orm/pg-core"
import { user } from "./auth" // Adjust import path if needed

export const resume = pgTable(
    "resume",
    {
        id: text("id").primaryKey(),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        title: text("title").notNull().default("Untitled Resume"),

        // This is where your resume data structure will live
        content: jsonb("content").notNull().default({}),

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

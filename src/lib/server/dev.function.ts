// src/lib/server/dev.function.ts
import { createServerFn } from "@tanstack/react-start"
import z from "zod"
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

// Dev-only: writes a rendered template preview SVG into public/templates/
// so it can be committed as the template's static thumbnail.
export const saveTemplatePreviewFn = createServerFn({ method: "POST" })
    .validator(z.object({ id: z.string(), svg: z.string() }))
    .handler(async ({ data }) => {
        if (process.env.NODE_ENV === "production") {
            throw new Error("saveTemplatePreviewFn is only available in development")
        }

        const dir = path.join(process.cwd(), "public", "templates")
        await mkdir(dir, { recursive: true })
        await writeFile(path.join(dir, `${data.id}.svg`), data.svg, "utf-8")

        return { success: true as const }
    })

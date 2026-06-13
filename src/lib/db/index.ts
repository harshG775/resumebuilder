import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema/index"

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) throw new Error(".env DATABASE_URL not found")

export const db = drizzle(neon(DATABASE_URL), { schema })

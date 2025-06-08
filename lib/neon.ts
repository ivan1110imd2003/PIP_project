import { neon } from "@neondatabase/serverless"

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error("Моля настройте DATABASE_URL в .env.local файла")
}

// Създаваме SQL клиент
export const sql = neon(databaseUrl)

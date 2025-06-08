import { NextResponse } from "next/server"
import { sql } from "@/lib/neon"

export async function GET() {
  try {
    const excursions = await sql`
      SELECT * FROM excursions 
      ORDER BY id
    `

    return NextResponse.json(excursions)
  } catch (error) {
    console.error("Error fetching excursions:", error)
    return NextResponse.json({ error: "Грешка при извличане на екскурзии" }, { status: 500 })
  }
}

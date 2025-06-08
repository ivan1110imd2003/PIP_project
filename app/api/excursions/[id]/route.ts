import { NextResponse } from "next/server"
import { sql } from "@/lib/neon"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const excursions = await sql`
      SELECT * FROM excursions 
      WHERE id = ${id}
    `

    if (excursions.length === 0) {
      return NextResponse.json({ error: "Екскурзията не е намерена" }, { status: 404 })
    }

    return NextResponse.json(excursions[0])
  } catch (error) {
    console.error("Error fetching excursion:", error)
    return NextResponse.json({ error: "Грешка при извличане на екскурзия" }, { status: 500 })
  }
}

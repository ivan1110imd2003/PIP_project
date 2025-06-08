import { NextResponse } from "next/server"
import { sql } from "@/lib/neon"

export async function GET() {
  try {
    const bookings = await sql`
      SELECT b.*, e.title as excursion_title, e.price as excursion_price
      FROM bookings b
      LEFT JOIN excursions e ON b.excursion_id = e.id
      ORDER BY b.created_at DESC
    `

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Грешка при извличане на резервации" }, { status: 500 })
  }
}

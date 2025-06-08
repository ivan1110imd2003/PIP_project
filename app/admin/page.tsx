import { sql } from "@/lib/neon"
import { getSession } from "@/app/actions/auth-actions"
import { redirect } from "next/navigation"
import AdminDashboard from "@/components/admin-dashboard"
import type { Excursion, Booking } from "@/types"

async function getExcursions() {
  try {
    const excursions = await sql`
      SELECT * FROM excursions ORDER BY id
    `
    return excursions as Excursion[]
  } catch (error) {
    console.error("Error fetching excursions:", error)
    return []
  }
}

async function getBookings() {
  try {
    const bookings = await sql`
      SELECT b.*, e.title as excursion_title, e.price as excursion_price
      FROM bookings b
      LEFT JOIN excursions e ON b.excursion_id = e.id
      ORDER BY b.created_at DESC
    `
    return bookings as Booking[]
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return []
  }
}

export default async function AdminPage() {
  const session = await getSession()

  if (!session || session.user.role !== "admin") {
    redirect("/login")
  }

  const [excursions, bookings] = await Promise.all([getExcursions(), getBookings()])

  return <AdminDashboard excursions={excursions} bookings={bookings} />
}

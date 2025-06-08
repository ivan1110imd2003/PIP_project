import { sql } from "@/lib/neon"
import { Booking, type IBooking } from "@/lib/models/booking"
import { ExcursionService } from "./excursion-service"

export class BookingService {
  static async getAll(): Promise<Booking[]> {
    try {
      const results = await sql`
        SELECT b.*, e.title as excursion_title, e.price as excursion_price
        FROM bookings b
        LEFT JOIN excursions e ON b.excursion_id = e.id
        ORDER BY b.created_at DESC
      `

      const bookings: Booking[] = []
      for (const data of results) {
        const booking = new Booking(data as any)
        if (data.excursion_title) {
          // Зареждаме пълната екскурзия
          const excursion = await ExcursionService.getById(booking.excursion_id)
          if (excursion) {
            booking.excursion = excursion
          }
        }
        bookings.push(booking)
      }

      return bookings
    } catch (error) {
      console.error("Error fetching bookings:", error)
      return []
    }
  }

  static async getById(id: number): Promise<Booking | null> {
    try {
      const results = await sql`SELECT * FROM bookings WHERE id = ${id}`
      if (results.length === 0) return null

      const booking = new Booking(results[0] as IBooking)
      const excursion = await ExcursionService.getById(booking.excursion_id)
      if (excursion) {
        booking.excursion = excursion
      }

      return booking
    } catch (error) {
      console.error("Error fetching booking:", error)
      return null
    }
  }

  static async create(bookingData: Omit<IBooking, "id" | "created_at">): Promise<Booking | null> {
    try {
      const booking = new Booking({ ...bookingData, id: 0 })

      if (!booking.validate()) {
        throw new Error("Невалидни данни за резервация")
      }

      // Проверяваме дали екскурзията съществува и има места
      const excursion = await ExcursionService.getById(booking.excursion_id)
      if (!excursion) {
        throw new Error("Екскурзията не съществува")
      }

      if (!excursion.hasAvailableSpots(booking.people)) {
        throw new Error(`Максималният брой хора за тази екскурзия е ${excursion.max_people}`)
      }

      const results = await sql`
        INSERT INTO bookings (excursion_id, customer_name, customer_email, customer_phone, people, date, notes, status)
        VALUES (${booking.excursion_id}, ${booking.customer_name}, ${booking.customer_email}, 
                ${booking.customer_phone}, ${booking.people}, ${booking.date}, ${booking.notes}, ${booking.status})
        RETURNING *
      `

      const newBooking = new Booking(results[0] as IBooking)
      newBooking.excursion = excursion
      return newBooking
    } catch (error) {
      console.error("Error creating booking:", error)
      return null
    }
  }

  static async updateStatus(id: number, status: "pending" | "confirmed" | "cancelled"): Promise<boolean> {
    try {
      const booking = await this.getById(id)
      if (!booking) {
        throw new Error("Резервацията не съществува")
      }

      if (status === "confirmed") {
        booking.confirm()
      } else if (status === "cancelled") {
        booking.cancel()
      }

      await sql`UPDATE bookings SET status = ${status} WHERE id = ${id}`
      return true
    } catch (error) {
      console.error("Error updating booking status:", error)
      return false
    }
  }

  static async getStatistics(): Promise<{
    total: number
    confirmed: number
    pending: number
    cancelled: number
    totalRevenue: number
  }> {
    try {
      const bookings = await this.getAll()

      const stats = {
        total: bookings.length,
        confirmed: 0,
        pending: 0,
        cancelled: 0,
        totalRevenue: 0,
      }

      for (const booking of bookings) {
        if (booking.isConfirmed()) {
          stats.confirmed++
          stats.totalRevenue += booking.calculateTotalPrice()
        } else if (booking.isPending()) {
          stats.pending++
        } else if (booking.isCancelled()) {
          stats.cancelled++
        }
      }

      return stats
    } catch (error) {
      console.error("Error calculating statistics:", error)
      return {
        total: 0,
        confirmed: 0,
        pending: 0,
        cancelled: 0,
        totalRevenue: 0,
      }
    }
  }
}

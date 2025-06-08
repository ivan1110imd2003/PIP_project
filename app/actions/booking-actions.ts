"use server"

import { sql } from "@/lib/neon"
import { revalidatePath } from "next/cache"

export async function createBooking(formData: FormData) {
  try {
    const excursionId = formData.get("excursionId")
    const name = formData.get("name")
    const email = formData.get("email")
    const phone = formData.get("phone")
    const people = formData.get("people")
    const date = formData.get("date")
    const notes = formData.get("notes")

    if (!excursionId || !name || !email || !phone || !people || !date) {
      return { success: false, message: "Моля попълнете всички задължителни полета!" }
    }

    const result = await sql`
      INSERT INTO bookings (excursion_id, customer_name, customer_email, customer_phone, people, date, notes, status)
      VALUES (${Number(excursionId)}, ${name}, ${email}, ${phone}, ${Number(people)}, ${date}, ${notes}, 'pending')
      RETURNING *
    `

    revalidatePath("/admin")
    return { success: true, message: "Резервацията е създадена успешно!", data: result }
  } catch (error) {
    console.error("Error creating booking:", error)
    return { success: false, message: "Възникна грешка при създаване на резервацията." }
  }
}

export async function updateBookingStatus(id: number, status: string) {
  try {
    await sql`
      UPDATE bookings 
      SET status = ${status}
      WHERE id = ${id}
    `

    revalidatePath("/admin")
    return { success: true, message: "Статусът е обновен успешно!" }
  } catch (error) {
    console.error("Error updating booking status:", error)
    return { success: false, message: "Възникна грешка при обновяване на статуса." }
  }
}

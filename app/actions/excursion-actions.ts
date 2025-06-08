"use server"

import { sql } from "@/lib/neon"
import { revalidatePath } from "next/cache"

export async function createExcursion(formData: FormData) {
  try {
    const title = formData.get("title")
    const description = formData.get("description")
    const price = formData.get("price")
    const duration = formData.get("duration")
    const maxPeople = formData.get("maxPeople")
    const location = formData.get("location")
    const includes = formData.get("includes")?.toString().split(",") || []
    const schedule = formData.get("schedule")?.toString().split(",") || []
    const imageUrl = formData.get("imageUrl") || "/placeholder.svg?height=400&width=600"

    if (!title || !description || !price || !duration || !maxPeople || !location) {
      return { success: false, message: "Моля попълнете всички задължителни полета!" }
    }

    const result = await sql`
      INSERT INTO excursions (title, description, price, duration, max_people, location, includes, schedule, image_url, rating)
      VALUES (${title}, ${description}, ${Number(price)}, ${duration}, ${Number(maxPeople)}, ${location}, 
              ${includes}, ${schedule}, ${imageUrl}, 0)
      RETURNING *
    `

    revalidatePath("/admin")
    return { success: true, message: "Екскурзията е създадена успешно!", data: result }
  } catch (error) {
    console.error("Error creating excursion:", error)
    return { success: false, message: "Възникна грешка при създаване на екскурзията." }
  }
}

export async function updateExcursion(id: number, formData: FormData) {
  try {
    const title = formData.get("title")
    const description = formData.get("description")
    const price = formData.get("price")
    const duration = formData.get("duration")
    const maxPeople = formData.get("maxPeople")
    const location = formData.get("location")
    const includes = formData.get("includes")?.toString().split(",") || []
    const schedule = formData.get("schedule")?.toString().split(",") || []
    const imageUrl = formData.get("imageUrl")

    if (!title || !description || !price || !duration || !maxPeople || !location) {
      return { success: false, message: "Моля попълнете всички задължителни полета!" }
    }

    await sql`
      UPDATE excursions 
      SET title = ${title}, description = ${description}, price = ${Number(price)}, 
          duration = ${duration}, max_people = ${Number(maxPeople)}, location = ${location},
          includes = ${includes}, schedule = ${schedule}, image_url = ${imageUrl}
      WHERE id = ${id}
    `

    revalidatePath("/admin")
    return { success: true, message: "Екскурзията е обновена успешно!" }
  } catch (error) {
    console.error("Error updating excursion:", error)
    return { success: false, message: "Възникна грешка при обновяване на екскурзията." }
  }
}

export async function deleteExcursion(id: number) {
  try {
    // Първо проверяваме дали има резервации за тази екскурзия
    const bookings = await sql`
      SELECT id FROM bookings WHERE excursion_id = ${id}
    `

    if (bookings.length > 0) {
      return {
        success: false,
        message: "Не можете да изтриете тази екскурзия, защото има резервации за нея.",
      }
    }

    await sql`
      DELETE FROM excursions WHERE id = ${id}
    `

    revalidatePath("/admin")
    return { success: true, message: "Екскурзията е изтрита успешно!" }
  } catch (error) {
    console.error("Error deleting excursion:", error)
    return { success: false, message: "Възникна грешка при изтриване на екскурзията." }
  }
}

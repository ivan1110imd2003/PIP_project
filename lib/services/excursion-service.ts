import { sql } from "@/lib/neon"
import { Excursion, type IExcursion } from "@/lib/models/excursion"

export class ExcursionService {
  static async getAll(): Promise<Excursion[]> {
    try {
      const results = await sql`SELECT * FROM excursions ORDER BY id`
      return results.map((data: any) => new Excursion(data))
    } catch (error) {
      console.error("Error fetching excursions:", error)
      return []
    }
  }

  static async getById(id: number): Promise<Excursion | null> {
    try {
      const results = await sql`SELECT * FROM excursions WHERE id = ${id}`
      if (results.length === 0) return null
      return new Excursion(results[0] as IExcursion)
    } catch (error) {
      console.error("Error fetching excursion:", error)
      return null
    }
  }

  static async getPopular(limit = 6): Promise<Excursion[]> {
    try {
      const results = await sql`
        SELECT * FROM excursions 
        WHERE rating >= 4.5 
        ORDER BY rating DESC, id 
        LIMIT ${limit}
      `
      return results.map((data: any) => new Excursion(data))
    } catch (error) {
      console.error("Error fetching popular excursions:", error)
      return []
    }
  }

  static async searchByLocation(location: string): Promise<Excursion[]> {
    try {
      const results = await sql`
        SELECT * FROM excursions 
        WHERE location ILIKE ${`%${location}%`}
        ORDER BY rating DESC
      `
      return results.map((data: any) => new Excursion(data))
    } catch (error) {
      console.error("Error searching excursions:", error)
      return []
    }
  }

  static async create(excursionData: Omit<IExcursion, "id" | "created_at">): Promise<Excursion | null> {
    try {
      const excursion = new Excursion({ ...excursionData, id: 0 })

      if (!excursion.validate()) {
        throw new Error("Невалидни данни за екскурзия")
      }

      const results = await sql`
        INSERT INTO excursions (title, description, price, duration, max_people, location, rating, image_url, includes, schedule)
        VALUES (${excursion.title}, ${excursion.description}, ${excursion.price}, ${excursion.duration}, 
                ${excursion.max_people}, ${excursion.location}, ${excursion.rating}, ${excursion.image_url}, 
                ${excursion.includes}, ${excursion.schedule})
        RETURNING *
      `

      return new Excursion(results[0] as IExcursion)
    } catch (error) {
      console.error("Error creating excursion:", error)
      return null
    }
  }

  static async update(id: number, excursionData: Partial<IExcursion>): Promise<boolean> {
    try {
      await sql`
        UPDATE excursions 
        SET title = ${excursionData.title}, 
            description = ${excursionData.description}, 
            price = ${excursionData.price}, 
            duration = ${excursionData.duration},
            max_people = ${excursionData.max_people}, 
            location = ${excursionData.location},
            includes = ${excursionData.includes}, 
            schedule = ${excursionData.schedule}, 
            image_url = ${excursionData.image_url}
        WHERE id = ${id}
      `
      return true
    } catch (error) {
      console.error("Error updating excursion:", error)
      return false
    }
  }

  static async delete(id: number): Promise<boolean> {
    try {
      // Проверяваме дали има резервации
      const bookings = await sql`SELECT id FROM bookings WHERE excursion_id = ${id}`

      if (bookings.length > 0) {
        throw new Error("Не можете да изтриете екскурзия с резервации")
      }

      await sql`DELETE FROM excursions WHERE id = ${id}`
      return true
    } catch (error) {
      console.error("Error deleting excursion:", error)
      return false
    }
  }
}

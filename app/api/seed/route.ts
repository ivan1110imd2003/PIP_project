import { NextResponse } from "next/server"
import { sql } from "@/lib/neon"

const excursionsData = [
  {
    title: "Рилски манастир и Боянската църква",
    description: "Еднодневна екскурзия до най-известния български манастир и UNESCO обект.",
    price: 45.0,
    duration: "8 часа",
    max_people: 25,
    location: "София област",
    rating: 4.8,
    image_url: "/placeholder.svg?height=400&width=600",
    includes: ["Транспорт с комфортен автобус", "Професионален гид", "Входни такси", "Застраховка"],
    schedule: ["08:00 - Тръгване от София", "10:00 - Пристигане в Рилски манастир", "18:00 - Пристигане в София"],
  },
  {
    title: "Велико Търново - древната столица",
    description: "Разходка из историческия център и крепостта Царевец.",
    price: 55.0,
    duration: "10 часа",
    max_people: 30,
    location: "Велико Търново",
    rating: 4.9,
    image_url: "/placeholder.svg?height=400&width=600",
    includes: ["Транспорт с комфортен автобус", "Професионален гид", "Входни такси", "Застраховка", "Обяд"],
    schedule: ["07:00 - Тръгване от София", "10:00 - Пристигане във Велико Търново", "20:00 - Пристигане в София"],
  },
]

const bookingsData = [
  {
    excursion_id: 1,
    customer_name: "Иван Петров",
    customer_email: "ivan.petrov@email.com",
    customer_phone: "0888123456",
    people: 2,
    date: "2024-07-15",
    notes: "Моля резервирайте места в предната част на автобуса",
    status: "confirmed",
  },
  {
    excursion_id: 2,
    customer_name: "Мария Георгиева",
    customer_email: "maria.georgieva@email.com",
    customer_phone: "0887654321",
    people: 4,
    date: "2024-07-20",
    notes: "Имаме дете на 8 години",
    status: "pending",
  },
]

export async function POST() {
  try {
    // Изчистване на стари данни
    await sql`DELETE FROM bookings`
    await sql`DELETE FROM excursions`
    await sql`ALTER SEQUENCE excursions_id_seq RESTART WITH 1`
    await sql`ALTER SEQUENCE bookings_id_seq RESTART WITH 1`

    // Добавяне на екскурзии
    for (const excursion of excursionsData) {
      await sql`
        INSERT INTO excursions (title, description, price, duration, max_people, location, rating, image_url, includes, schedule)
        VALUES (${excursion.title}, ${excursion.description}, ${excursion.price}, ${excursion.duration}, 
                ${excursion.max_people}, ${excursion.location}, ${excursion.rating}, ${excursion.image_url}, 
                ${excursion.includes}, ${excursion.schedule})
      `
    }

    // Добавяне на резервации
    for (const booking of bookingsData) {
      await sql`
        INSERT INTO bookings (excursion_id, customer_name, customer_email, customer_phone, people, date, notes, status)
        VALUES (${booking.excursion_id}, ${booking.customer_name}, ${booking.customer_email}, 
                ${booking.customer_phone}, ${booking.people}, ${booking.date}, ${booking.notes}, ${booking.status})
      `
    }

    return NextResponse.json({
      success: true,
      message: `Успешно добавени ${excursionsData.length} екскурзии и ${bookingsData.length} резервации!`,
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json(
      { success: false, message: "Възникна грешка при попълване на базата данни" },
      { status: 500 },
    )
  }
}

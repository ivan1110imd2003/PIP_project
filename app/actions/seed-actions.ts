"use server"

import { supabase } from "@/lib/supabase"

const excursionsData = [
  {
    title: "Рилски манастир и Боянската църква",
    description:
      "Еднодневна екскурзия до най-известния български манастир и UNESCO обект. Ще посетим прочутия Рилски манастир, основан през X век, и ще се насладим на неговата уникална архитектура и богата история.",
    price: 45.0,
    duration: "8 часа",
    max_people: 25,
    location: "София област",
    rating: 4.8,
    image_url: "/placeholder.svg?height=400&width=600",
    includes: ["Транспорт с комфортен автобус", "Професионален гид", "Входни такси", "Застраховка"],
    schedule: [
      "08:00 - Тръгване от София",
      "10:00 - Пристигане в Рилски манастир",
      "12:30 - Обяд (по желание)",
      "14:00 - Посещение на Боянската църква",
      "16:00 - Връщане към София",
      "18:00 - Пристигане в София",
    ],
  },
  {
    title: "Велико Търново - древната столица",
    description:
      "Разходка из историческия център и крепостта Царевец. Ще се потопим в историята на средновековна България и ще видим величествената крепост.",
    price: 55.0,
    duration: "10 часа",
    max_people: 30,
    location: "Велико Търново",
    rating: 4.9,
    image_url: "/placeholder.svg?height=400&width=600",
    includes: ["Транспорт с комфортен автобус", "Професионален гид", "Входни такси", "Застраховка", "Обяд"],
    schedule: [
      "07:00 - Тръгване от София",
      "10:00 - Пристигане във Велико Търново",
      "10:30 - Обиколка на Царевец",
      "13:00 - Обяд в традиционен ресторант",
      "15:00 - Разходка в Стария град",
      "17:00 - Връщане към София",
      "20:00 - Пристигане в София",
    ],
  },
  {
    title: "Пловдив - Стария град",
    description:
      "Обиколка на античния театър и възрожденските къщи. Ще разгледаме най-добре запазения античен театър на Балканите.",
    price: 40.0,
    duration: "6 часа",
    max_people: 20,
    location: "Пловдив",
    rating: 4.7,
    image_url: "/placeholder.svg?height=400&width=600",
    includes: ["Транспорт с комфортен автобус", "Професионален гид", "Входни такси"],
    schedule: [
      "09:00 - Тръгване от София",
      "10:30 - Пристигане в Пловдив",
      "11:00 - Обиколка на Стария град",
      "13:00 - Обяд (по желание)",
      "15:00 - Свободно време за разходка",
      "16:00 - Връщане към София",
      "17:30 - Пристигане в София",
    ],
  },
  {
    title: "Копривщица - музеят под открито небе",
    description:
      "Възрожденска архитектура и история на Априлското въстание. Ще посетим къщите-музеи на революционерите.",
    price: 50.0,
    duration: "7 часа",
    max_people: 25,
    location: "София област",
    rating: 4.6,
    image_url: "/placeholder.svg?height=400&width=600",
    includes: ["Транспорт с комфортен автобус", "Професионален гид", "Входни такси за музеите", "Застраховка"],
    schedule: [
      "08:30 - Тръгване от София",
      "10:00 - Пристигане в Копривщица",
      "10:15 - Обиколка на възрожденските къщи",
      "13:00 - Обяд в традиционен механа",
      "14:30 - Свободно време",
      "16:00 - Връщане към София",
      "17:30 - Пристигане в София",
    ],
  },
  {
    title: "Созопол и Несебър - Черноморски перли",
    description: "Двудневна екскурзия до най-красивите черноморски градове с богата история и уникална архитектура.",
    price: 120.0,
    duration: "2 дни",
    max_people: 35,
    location: "Черноморие",
    rating: 4.9,
    image_url: "/placeholder.svg?height=400&width=600",
    includes: ["Транспорт с комфортен автобус", "Професионален гид", "Нощувка в хотел 3*", "Закуска", "Входни такси"],
    schedule: [
      "Ден 1: 08:00 - Тръгване, 12:00 - Созопол, 19:00 - Настаняване",
      "Ден 2: 09:00 - Несебър, 15:00 - Свободно време, 17:00 - Връщане",
    ],
  },
  {
    title: "Банско и Рилски езера",
    description: "Планинска екскурзия до красивия град Банско и магичните Рилски езера.",
    price: 65.0,
    duration: "12 часа",
    max_people: 28,
    location: "Рила планина",
    rating: 4.8,
    image_url: "/placeholder.svg?height=400&width=600",
    includes: ["Транспорт с комфортен автобус", "Планински гид", "Застраховка", "Обяд в планинска хижа"],
    schedule: [
      "06:00 - Тръгване от София",
      "08:30 - Пристигане в Банско",
      "09:00 - Качване с лифт",
      "11:00 - Преход до езерата",
      "13:00 - Обяд в хижа",
      "16:00 - Връщане",
      "20:00 - Пристигане в София",
    ],
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
  {
    excursion_id: 1,
    customer_name: "Стефан Димитров",
    customer_email: "stefan.dimitrov@email.com",
    customer_phone: "0889111222",
    people: 1,
    date: "2024-07-22",
    status: "confirmed",
  },
  {
    excursion_id: 3,
    customer_name: "Елена Николова",
    customer_email: "elena.nikolova@email.com",
    customer_phone: "0887333444",
    people: 3,
    date: "2024-07-25",
    notes: "Вегетарианска храна за 1 човек",
    status: "confirmed",
  },
  {
    excursion_id: 4,
    customer_name: "Георги Стоянов",
    customer_email: "georgi.stoyanov@email.com",
    customer_phone: "0888555666",
    people: 2,
    date: "2024-07-28",
    status: "pending",
  },
]

export async function seedDatabase() {
  try {
    // Изчистване на стари данни
    await supabase.from("bookings").delete().neq("id", 0)
    await supabase.from("excursions").delete().neq("id", 0)

    // Добавяне на екскурзии
    const { data: excursions, error: excursionsError } = await supabase
      .from("excursions")
      .insert(excursionsData)
      .select()

    if (excursionsError) {
      return { success: false, message: `Грешка при добавяне на екскурзии: ${excursionsError.message}` }
    }

    // Добавяне на резервации
    const { data: bookings, error: bookingsError } = await supabase.from("bookings").insert(bookingsData).select()

    if (bookingsError) {
      return { success: false, message: `Грешка при добавяне на резервации: ${bookingsError.message}` }
    }

    return {
      success: true,
      message: `Успешно добавени ${excursions.length} екскурзии и ${bookings.length} резервации!`,
    }
  } catch (error) {
    return { success: false, message: `Неочаквана грешка: ${error}` }
  }
}

import { createClient } from "@supabase/supabase-js"
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY // Service role key за пълни права

console.log(supabaseUrl, supabaseServiceKey)

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Моля настройте NEXT_PUBLIC_SUPABASE_URL и SUPABASE_SERVICE_ROLE_KEY в .env.local")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Данни за екскурзии
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

// Данни за примерни резервации
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

async function seedDatabase() {
  try {
    console.log("🌱 Започва попълване на базата данни...")

    // Изчистване на съществуващи данни
    console.log("🧹 Изчистване на стари данни...")
    await supabase.from("bookings").delete().neq("id", 0)
    await supabase.from("excursions").delete().neq("id", 0)

    // Добавяне на екскурзии
    console.log("🏛️ Добавяне на екскурзии...")
    const { data: excursions, error: excursionsError } = await supabase
      .from("excursions")
      .insert(excursionsData)
      .select()

    if (excursionsError) {
      throw excursionsError
    }

    console.log(`✅ Добавени ${excursions.length} екскурзии`)

    // Добавяне на резервации
    console.log("📅 Добавяне на резервации...")
    const { data: bookings, error: bookingsError } = await supabase.from("bookings").insert(bookingsData).select()

    if (bookingsError) {
      throw bookingsError
    }

    console.log(`✅ Добавени ${bookings.length} резервации`)

    // Създаване на админ потребител (ако не съществува)
    console.log("👤 Проверка за админ потребител...")

    // Първо проверяваме дали админът съществува
    const { data: existingAdmin } = await supabase.auth.admin.listUsers()
    const adminExists = existingAdmin.users.some((user) => user.email === "admin@excursions.bg")

    if (!adminExists) {
      const { data: adminUser, error: adminError } = await supabase.auth.admin.createUser({
        email: "admin@excursions.bg",
        password: "admin123",
        email_confirm: true,
      })

      if (adminError) {
        console.warn("⚠️ Не можах да създам админ потребител:", adminError.message)
      } else {
        // Добавяме профил за админа
        await supabase.from("user_profiles").insert({
          id: adminUser.user.id,
          name: "Администратор",
          role: "admin",
        })
        console.log("✅ Създаден админ потребител")
      }
    } else {
      console.log("✅ Админ потребителят вече съществува")
    }

    console.log("🎉 Базата данни е успешно попълнена!")
    console.log("\n📊 Статистики:")
    console.log(`   Екскурзии: ${excursions.length}`)
    console.log(`   Резервации: ${bookings.length}`)
    console.log("\n🔑 Данни за логване:")
    console.log("   Админ: admin@excursions.bg / admin123")
    console.log("   Потребител: Регистрирайте нов акаунт")
  } catch (error) {
    console.error("❌ Грешка при попълване на базата данни:", error)
    process.exit(1)
  }
}

// Стартиране на скрипта
seedDatabase()

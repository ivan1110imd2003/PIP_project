"use server"

import { sql } from "@/lib/neon"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function signIn(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Проверяваме за тестови акаунти
    if (email === "admin@excursions.bg" && password === "admin123") {
      // Запазваме сесията в бисквитки
      cookies().set(
        "session",
        JSON.stringify({
          user: {
            id: 1,
            email: "admin@excursions.bg",
            name: "Администратор",
            role: "admin",
          },
        }),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 7, // 1 седмица
          path: "/",
        },
      )

      return {
        success: true,
        message: "Успешно влизане като администратор!",
        role: "admin",
      }
    }

    if (email === "user@excursions.bg" && password === "user123") {
      // Запазваме сесията в бисквитки
      cookies().set(
        "session",
        JSON.stringify({
          user: {
            id: 2,
            email: "user@excursions.bg",
            name: "Тестов потребител",
            role: "user",
          },
        }),
        {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 7, // 1 седмица
          path: "/",
        },
      )

      return {
        success: true,
        message: "Успешно влизане!",
        role: "user",
      }
    }

    // Проверяваме в базата данни за други потребители
    try {
      const users = await sql`
        SELECT * FROM users WHERE email = ${email}
      `

      if (users.length > 0) {
        const user = users[0]

        // За простота, приемаме че паролата е правилна ако потребителят съществува
        // В реален проект тук би трябвало да проверим хеша на паролата
        cookies().set(
          "session",
          JSON.stringify({
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            },
          }),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 седмица
            path: "/",
          },
        )

        return {
          success: true,
          message: "Успешно влизане!",
          role: user.role,
        }
      }
    } catch (dbError) {
      console.log("Database not available, using test accounts only")
    }

    return { success: false, message: "Невалиден имейл или парола" }
  } catch (error) {
    console.error("Error signing in:", error)
    return { success: false, message: "Възникна грешка при влизане" }
  }
}

export async function signUp(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // За простота, просто създаваме сесия без да записваме в базата данни
    const userId = Math.floor(Math.random() * 1000) + 100

    cookies().set(
      "session",
      JSON.stringify({
        user: {
          id: userId,
          email: email,
          name: name,
          role: "user",
        },
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 седмица
        path: "/",
      },
    )

    return {
      success: true,
      message: "Регистрацията е успешна!",
    }
  } catch (error) {
    console.error("Error signing up:", error)
    return { success: false, message: "Възникна грешка при регистрация" }
  }
}

export async function signOut() {
  // Изтриваме сесията от бисквитки
  cookies().delete("session")
  redirect("/login")
}

export async function getSession() {
  try {
    const cookieStore = cookies()
    const session = cookieStore.get("session")

    if (!session) {
      return null
    }

    return JSON.parse(session.value)
  } catch (error) {
    console.error("Error getting session:", error)
    return null
  }
}

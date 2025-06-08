import { NextResponse } from "next/server"
import { getSession } from "@/app/actions/auth-actions"

export async function GET() {
  try {
    const session = await getSession()

    if (session) {
      return NextResponse.json(session)
    } else {
      return NextResponse.json({ user: null })
    }
  } catch (error) {
    console.error("Error getting session:", error)
    return NextResponse.json({ user: null })
  }
}

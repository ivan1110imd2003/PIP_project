"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, User, LogOut, Settings } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { signOut } from "@/app/actions/auth-actions"

export function Navigation() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Проверяваме за сесия
    const checkSession = async () => {
      try {
        const response = await fetch("/api/session")
        if (response.ok) {
          const sessionData = await response.json()
          if (sessionData.user) {
            setUser(sessionData.user)
          }
        }
      } catch (error) {
        console.error("Error checking session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [pathname])

  const handleLogout = async () => {
    try {
      await signOut()
      setUser(null)
    } catch (error) {
      // Ако има грешка, просто пренасочваме
      router.push("/")
    }
  }

  if (isLoading) {
    return (
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Екскурзии БГ</span>
            </Link>
            <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Екскурзии БГ</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Здравей, {user.name || user.email}</span>
                {user.role === "admin" && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Админ
                    </Button>
                  </Link>
                )}
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Изход
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="outline">
                  <User className="w-4 h-4 mr-2" />
                  Вход
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, User, LogOut, Settings } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

export function Navigation() {
  const [userRole, setUserRole] = useState("")
  const [userName, setUserName] = useState("")
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    const name = localStorage.getItem("userName")
    if (role) setUserRole(role)
    if (name) setUserName(name)
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("userName")
    setUserRole("")
    setUserName("")
    router.push("/")
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
            {userRole ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Здравей, {userName}</span>
                {userRole === "admin" && (
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

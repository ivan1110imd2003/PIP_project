"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, MapPin } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn, signUp } from "@/app/actions/auth-actions"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    const formData = new FormData()
    formData.append("email", loginData.email)
    formData.append("password", loginData.password)

    const result = await signIn(formData)

    setMessage(result.message)
    setIsSubmitting(false)

    if (result.success) {
      if (result.role === "admin") {
        setTimeout(() => router.push("/admin"), 1000)
      } else {
        setTimeout(() => router.push("/"), 1000)
      }
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (registerData.password !== registerData.confirmPassword) {
      setMessage("Паролите не съвпадат!")
      return
    }

    if (registerData.password.length < 3) {
      setMessage("Паролата трябва да е поне 3 символа!")
      return
    }

    setIsSubmitting(true)
    setMessage("")

    const formData = new FormData()
    formData.append("name", registerData.name)
    formData.append("email", registerData.email)
    formData.append("password", registerData.password)

    const result = await signUp(formData)

    setMessage(result.message)
    setIsSubmitting(false)

    if (result.success) {
      setTimeout(() => router.push("/"), 1000)
    }
  }

  const fillAdminData = () => {
    setLoginData({ email: "admin@excursions.bg", password: "admin123" })
  }

  const fillUserData = () => {
    setLoginData({ email: "user@excursions.bg", password: "user123" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-2xl font-bold text-blue-600">
            <MapPin className="w-8 h-8 mr-2" />
            Екскурзии БГ
          </Link>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Вход</TabsTrigger>
            <TabsTrigger value="register">Регистрация</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Влезте в профила си</CardTitle>
                <CardDescription>Въведете вашите данни за да влезете в системата</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Имейл</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Парола</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Въведете парола"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Изчакайте..." : "Влез"}
                  </Button>
                </form>

                {/* Тестови данни */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">🔑 Тестови данни за логване:</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <strong>Админ:</strong> admin@excursions.bg / admin123
                      </div>
                      <Button variant="outline" size="sm" onClick={fillAdminData}>
                        Попълни
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <strong>Потребител:</strong> user@excursions.bg / user123
                      </div>
                      <Button variant="outline" size="sm" onClick={fillUserData}>
                        Попълни
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Създайте профил</CardTitle>
                <CardDescription>Регистрирайте се за да можете да резервирате екскурзии</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Име</Label>
                    <Input
                      id="name"
                      placeholder="Вашето име"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Имейл</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="your@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Парола</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      placeholder="Въведете парола (поне 3 символа)"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                      minLength={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Потвърдете паролата</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Потвърдете паролата"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Изчакайте..." : "Регистрирай се"}
                  </Button>
                </form>

                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-700">
                    💡 <strong>Съвет:</strong> Можете да се регистрирате с всеки имейл и парола. Системата ще ви създаде
                    акаунт автоматично.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {message && (
          <Alert className={`mt-4 ${message.includes("Успешно") ? "border-green-200 bg-green-50" : ""}`}>
            <AlertDescription className={message.includes("Успешно") ? "text-green-700" : ""}>
              {message}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}

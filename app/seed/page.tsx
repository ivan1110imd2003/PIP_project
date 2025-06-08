"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Database, Loader2 } from "lucide-react"

export default function SeedPage() {
  const [isSeeding, setIsSeeding] = useState(false)
  const [message, setMessage] = useState("")

  const handleSeed = async () => {
    setIsSeeding(true)
    setMessage("")

    try {
      const response = await fetch("/api/seed", {
        method: "POST",
      })

      const result = await response.json()
      setMessage(result.message)
    } catch (error) {
      setMessage("Възникна грешка при попълване на базата данни")
    } finally {
      setIsSeeding(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Database className="w-16 h-16 mx-auto mb-4 text-blue-600" />
          <CardTitle>Попълване на базата данни</CardTitle>
          <CardDescription>Този скрипт ще попълни базата данни с примерни екскурзии и резервации</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Внимание</h4>
            <p className="text-sm text-yellow-700">
              Този процес ще изтрие всички съществуващи екскурзии и резервации и ще ги замени с нови данни.
            </p>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <strong>Ще бъдат добавени:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>6 екскурзии с пълна информация</li>
              <li>5 примерни резервации</li>
              <li>Различни статуси на резервации</li>
            </ul>
          </div>

          <Button onClick={handleSeed} disabled={isSeeding} className="w-full">
            {isSeeding ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Попълване...
              </>
            ) : (
              <>
                <Database className="w-4 h-4 mr-2" />
                Попълни базата данни
              </>
            )}
          </Button>

          {message && (
            <Alert>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <div className="text-xs text-gray-500 text-center">
            След попълване можете да отидете на{" "}
            <a href="/" className="text-blue-600 hover:underline">
              началната страница
            </a>{" "}
            или{" "}
            <a href="/admin" className="text-blue-600 hover:underline">
              админ панела
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

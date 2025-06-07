"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, Star, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

const excursions = [
  {
    id: 1,
    title: "Рилски манастир и Боянската църква",
    description:
      "Еднодневна екскурзия до най-известния български манастир и UNESCO обект. Ще посетим прочутия Рилски манастир, основан през X век, и ще се насладим на неговата уникална архитектура и богата история. След това ще продължим към Боянската църква - един от най-важните паметници на средновековното изкуство в България.",
    price: 45,
    duration: "8 часа",
    maxPeople: 25,
    rating: 4.8,
    image: "/placeholder.svg?height=400&width=600",
    location: "София област",
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
    id: 2,
    title: "Велико Търново - древната столица",
    description: "Разходка из историческия център и крепостта Царевец",
    price: 55,
    duration: "10 часа",
    maxPeople: 30,
    rating: 4.9,
    image: "/placeholder.svg?height=400&width=600",
    location: "Велико Търново",
    includes: ["Транспорт с комфортен автобус", "Професионален гид", "Входни такси", "Застраховка"],
    schedule: [
      "07:00 - Тръгване от София",
      "10:00 - Пристигане във Велико Търново",
      "10:30 - Обиколка на Царевец",
      "13:00 - Обяд",
      "15:00 - Разходка в Стария град",
      "17:00 - Връщане към София",
    ],
  },
]

export default function BookingPage({ params }: { params: { id: string } }) {
  const [excursion, setExcursion] = useState<any>(null)
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    people: 1,
    date: "",
    notes: "",
  })
  const [message, setMessage] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const id = Number.parseInt(params.id)
    const foundExcursion = excursions.find((e) => e.id === id)
    if (foundExcursion) {
      setExcursion(foundExcursion)
    } else {
      router.push("/")
    }
  }, [params.id, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (bookingData.name && bookingData.email && bookingData.phone && bookingData.date) {
      // Симулация на запазване на резервацията
      setMessage("Вашата резервация е изпратена успешно! Ще се свържем с вас скоро.")
      setIsSubmitted(true)
    } else {
      setMessage("Моля попълнете всички задължителни полета!")
    }
  }

  if (!excursion) {
    return <div>Зареждане...</div>
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-green-600">Успешна резервация!</CardTitle>
            <CardDescription>Благодарим ви за резервацията. Ще се свържем с вас в рамките на 24 часа.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-2 mb-6">
              <p>
                <strong>Екскурзия:</strong> {excursion.title}
              </p>
              <p>
                <strong>Дата:</strong> {bookingData.date}
              </p>
              <p>
                <strong>Брой хора:</strong> {bookingData.people}
              </p>
              <p>
                <strong>Обща цена:</strong> {excursion.price * bookingData.people} лв
              </p>
            </div>
            <Link href="/">
              <Button className="w-full">Към началната страница</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад към екскурзиите
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Excursion Details */}
          <div className="space-y-6">
            <div className="relative">
              <Image
                src={excursion.image || "/placeholder.svg"}
                alt={excursion.title}
                width={600}
                height={400}
                className="w-full h-64 object-cover rounded-lg"
              />
              <Badge className="absolute top-4 right-4 bg-green-500 text-lg px-3 py-1">
                {excursion.price} лв/човек
              </Badge>
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-4">{excursion.title}</h1>
              <p className="text-gray-600 mb-4">{excursion.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  {excursion.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  {excursion.duration}
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2" />
                  До {excursion.maxPeople} души
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="w-5 h-5 mr-2 fill-yellow-400 text-yellow-400" />
                  {excursion.rating} звезди
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Включено в цената</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {excursion.includes.map((item: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Програма</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {excursion.schedule.map((item: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Резервирайте сега</CardTitle>
                <CardDescription>Попълнете формата за да резервирате вашето място</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Име и фамилия *</Label>
                    <Input
                      id="name"
                      placeholder="Вашето име"
                      value={bookingData.name}
                      onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Имейл *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      placeholder="0888123456"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="people">Брой хора *</Label>
                      <Input
                        id="people"
                        type="number"
                        min="1"
                        max={excursion.maxPeople}
                        value={bookingData.people}
                        onChange={(e) => setBookingData({ ...bookingData, people: Number.parseInt(e.target.value) })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">Желана дата *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={bookingData.date}
                        onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Допълнителни бележки</Label>
                    <Textarea
                      id="notes"
                      placeholder="Специални изисквания или въпроси..."
                      value={bookingData.notes}
                      onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                    />
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg">Обща цена:</span>
                      <span className="text-2xl font-bold text-green-600">
                        {excursion.price * bookingData.people} лв
                      </span>
                    </div>
                    <Button type="submit" className="w-full text-lg py-3">
                      Резервирай сега
                    </Button>
                  </div>
                </form>

                {message && (
                  <Alert className="mt-4">
                    <AlertDescription>{message}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

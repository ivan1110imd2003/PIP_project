"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { createBooking } from "@/app/actions/booking-actions"
import type { Excursion } from "@/types"

export default function BookingForm({ excursion }: { excursion: Excursion }) {
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    people: 1,
    date: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("excursionId", excursion.id.toString())
    formData.append("name", bookingData.name)
    formData.append("email", bookingData.email)
    formData.append("phone", bookingData.phone)
    formData.append("people", bookingData.people.toString())
    formData.append("date", bookingData.date)
    formData.append("notes", bookingData.notes)

    const result = await createBooking(formData)

    setIsSubmitting(false)
    setMessage(result.message)

    if (result.success) {
      setIsSubmitted(true)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="sticky top-8">
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
    )
  }

  return (
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
                max={excursion.max_people}
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
              <span className="text-2xl font-bold text-green-600">{excursion.price * bookingData.people} лв</span>
            </div>
            <Button type="submit" className="w-full text-lg py-3" disabled={isSubmitting}>
              {isSubmitting ? "Изпращане..." : "Резервирай сега"}
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
  )
}

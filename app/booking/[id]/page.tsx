import { sql } from "@/lib/neon"
import BookingForm from "@/components/booking-form"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { MapPin, Calendar, Users, Star } from "lucide-react"
import type { Excursion } from "@/types"

async function getExcursion(id: string): Promise<Excursion | null> {
  try {
    const excursions = await sql`
      SELECT * FROM excursions WHERE id = ${Number.parseInt(id)}
    `

    if (excursions.length === 0) {
      return null
    }

    return excursions[0] as Excursion
  } catch (error) {
    console.error("Error fetching excursion:", error)
    return null
  }
}

export default async function BookingPage({ params }: { params: { id: string } }) {
  const excursion = await getExcursion(params.id)

  if (!excursion) {
    notFound()
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
                src={excursion.image_url || "/placeholder.svg"}
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
                  До {excursion.max_people} души
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
          <BookingForm excursion={excursion} />
        </div>
      </div>
    </div>
  )
}

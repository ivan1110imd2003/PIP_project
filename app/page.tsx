import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ExcursionService } from "@/lib/services/excursion-service"

export default async function HomePage() {
  const excursions = await ExcursionService.getAll()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Открийте България</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Присъединете се към нашите незабравими екскурзии и разкрийте красотата на българските забележителности
          </p>
          <Button size="lg" className="text-lg px-8 py-3">
            Разгледайте екскурзиите
          </Button>
        </div>
      </section>

      {/* Excursions Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Популярни екскурзии</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {excursions.map((excursion) => (
              <Card key={excursion.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={excursion.image_url || "/placeholder.svg"}
                    alt={excursion.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-500">{excursion.getFormattedPrice()}</Badge>
                  {excursion.isPopular() && <Badge className="absolute top-2 left-2 bg-yellow-500">Популярна</Badge>}
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{excursion.title}</CardTitle>
                  <CardDescription className="text-sm">{excursion.getShortDescription(80)}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {excursion.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    {excursion.duration} ({excursion.getDurationInHours()}ч)
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    До {excursion.max_people} души
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {excursion.rating} звезди
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/booking/${excursion.id}`} className="w-full">
                    <Button className="w-full">Резервирай</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Защо да изберете нас?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Опитни гидове</h3>
              <p className="text-gray-600">Професионални гидове с дълбоки познания за българската история и култура</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Високо качество</h3>
              <p className="text-gray-600">Над 4.7 звезди средна оценка от нашите доволни клиенти</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Уникални места</h3>
              <p className="text-gray-600">Посещение на скрити съкровища и най-красивите места в България</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Edit, Trash2, Users, Calendar, MapPin, DollarSign } from "lucide-react"
import { createExcursion, updateExcursion, deleteExcursion } from "@/app/actions/excursion-actions"
import { updateBookingStatus } from "@/app/actions/booking-actions"
import type { Excursion, Booking } from "@/types"

interface AdminDashboardProps {
  excursions: Excursion[]
  bookings: Booking[]
}

export default function AdminDashboard({
  excursions: initialExcursions,
  bookings: initialBookings,
}: AdminDashboardProps) {
  const [excursions, setExcursions] = useState<Excursion[]>(initialExcursions)
  const [bookings, setBookings] = useState<Booking[]>(initialBookings)
  const [newExcursion, setNewExcursion] = useState<Partial<Excursion>>({
    title: "",
    description: "",
    price: 0,
    duration: "",
    max_people: 0,
    location: "",
    includes: [],
    schedule: [],
    image_url: "/placeholder.svg?height=400&width=600",
  })
  const [editingExcursion, setEditingExcursion] = useState<Excursion | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [includesText, setIncludesText] = useState("")
  const [scheduleText, setScheduleText] = useState("")

  const handleAddExcursion = async () => {
    if (newExcursion.title && newExcursion.description && newExcursion.price && newExcursion.price > 0) {
      const formData = new FormData()
      formData.append("title", newExcursion.title as string)
      formData.append("description", newExcursion.description as string)
      formData.append("price", newExcursion.price.toString())
      formData.append("duration", newExcursion.duration as string)
      formData.append("maxPeople", newExcursion.max_people?.toString() || "0")
      formData.append("location", newExcursion.location as string)
      formData.append("includes", includesText)
      formData.append("schedule", scheduleText)
      formData.append("imageUrl", newExcursion.image_url as string)

      const result = await createExcursion(formData)

      if (result.success && result.data) {
        // Refresh the page to get updated data
        window.location.reload()
      }

      setMessage(result.message)
    } else {
      setMessage("Моля попълнете всички задължителни полета!")
    }
  }

  const handleEditExcursion = async () => {
    if (editingExcursion) {
      const formData = new FormData()
      formData.append("title", editingExcursion.title)
      formData.append("description", editingExcursion.description)
      formData.append("price", editingExcursion.price.toString())
      formData.append("duration", editingExcursion.duration)
      formData.append("maxPeople", editingExcursion.max_people.toString())
      formData.append("location", editingExcursion.location)
      formData.append("includes", includesText || editingExcursion.includes.join(","))
      formData.append("schedule", scheduleText || editingExcursion.schedule.join(","))
      formData.append("imageUrl", editingExcursion.image_url)

      const result = await updateExcursion(editingExcursion.id, formData)

      if (result.success) {
        // Refresh the page to get updated data
        window.location.reload()
      }

      setMessage(result.message)
    }
  }

  const handleDeleteExcursion = async (id: number) => {
    const result = await deleteExcursion(id)

    if (result.success) {
      setExcursions(excursions.filter((e) => e.id !== id))
    }

    setMessage(result.message)
  }

  const handleUpdateBookingStatus = async (id: number, status: string) => {
    const result = await updateBookingStatus(id, status)

    if (result.success) {
      setBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)))
    }

    setMessage(result.message)
  }

  // Изчисляване на статистики
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed")
  const totalRevenue = confirmedBookings.reduce((sum, b) => {
    const excursion = excursions.find((e) => e.id === b.excursion_id)
    return sum + (excursion ? excursion.price * b.people : 0)
  }, 0)

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Админ панел</h1>
          <p className="text-gray-600">Управление на екскурзии и резервации</p>
        </div>

        {message && (
          <Alert className="mb-6">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Общо екскурзии</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{excursions.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Общо резервации</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Потвърдени</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{confirmedBookings.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Приходи</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRevenue.toFixed(2)} лв</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="excursions" className="space-y-4">
          <TabsList>
            <TabsTrigger value="excursions">Екскурзии</TabsTrigger>
            <TabsTrigger value="bookings">Резервации</TabsTrigger>
          </TabsList>

          <TabsContent value="excursions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Управление на екскурзии</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      setEditingExcursion(null)
                      setNewExcursion({
                        title: "",
                        description: "",
                        price: 0,
                        duration: "",
                        max_people: 0,
                        location: "",
                        includes: [],
                        schedule: [],
                        image_url: "/placeholder.svg?height=400&width=600",
                      })
                      setIncludesText("")
                      setScheduleText("")
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Добави екскурзия
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingExcursion ? "Редактиране на екскурзия" : "Добавяне на нова екскурзия"}
                    </DialogTitle>
                    <DialogDescription>Попълнете информацията за екскурзията</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Заглавие</Label>
                      <Input
                        id="title"
                        value={editingExcursion ? editingExcursion.title : newExcursion.title}
                        onChange={(e) =>
                          editingExcursion
                            ? setEditingExcursion({ ...editingExcursion, title: e.target.value })
                            : setNewExcursion({ ...newExcursion, title: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Описание</Label>
                      <Textarea
                        id="description"
                        value={editingExcursion ? editingExcursion.description : newExcursion.description}
                        onChange={(e) =>
                          editingExcursion
                            ? setEditingExcursion({ ...editingExcursion, description: e.target.value })
                            : setNewExcursion({ ...newExcursion, description: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Цена (лв)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={editingExcursion ? editingExcursion.price : newExcursion.price}
                          onChange={(e) =>
                            editingExcursion
                              ? setEditingExcursion({ ...editingExcursion, price: Number(e.target.value) })
                              : setNewExcursion({ ...newExcursion, price: Number(e.target.value) })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="maxPeople">Макс. хора</Label>
                        <Input
                          id="maxPeople"
                          type="number"
                          value={editingExcursion ? editingExcursion.max_people : newExcursion.max_people}
                          onChange={(e) =>
                            editingExcursion
                              ? setEditingExcursion({ ...editingExcursion, max_people: Number(e.target.value) })
                              : setNewExcursion({ ...newExcursion, max_people: Number(e.target.value) })
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="duration">Продължителност</Label>
                      <Input
                        id="duration"
                        value={editingExcursion ? editingExcursion.duration : newExcursion.duration}
                        onChange={(e) =>
                          editingExcursion
                            ? setEditingExcursion({ ...editingExcursion, duration: e.target.value })
                            : setNewExcursion({ ...newExcursion, duration: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Локация</Label>
                      <Input
                        id="location"
                        value={editingExcursion ? editingExcursion.location : newExcursion.location}
                        onChange={(e) =>
                          editingExcursion
                            ? setEditingExcursion({ ...editingExcursion, location: e.target.value })
                            : setNewExcursion({ ...newExcursion, location: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="includes">Включено (разделено със запетая)</Label>
                      <Textarea
                        id="includes"
                        placeholder="Транспорт, Гид, Входни такси"
                        value={includesText || (editingExcursion ? editingExcursion.includes.join(", ") : "")}
                        onChange={(e) => setIncludesText(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="schedule">Програма (разделено със запетая)</Label>
                      <Textarea
                        id="schedule"
                        placeholder="08:00 - Тръгване, 10:00 - Пристигане"
                        value={scheduleText || (editingExcursion ? editingExcursion.schedule.join(", ") : "")}
                        onChange={(e) => setScheduleText(e.target.value)}
                      />
                    </div>
                    <Button onClick={editingExcursion ? handleEditExcursion : handleAddExcursion} className="w-full">
                      {editingExcursion ? "Запази промените" : "Добави екскурзия"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {excursions.map((excursion) => (
                <Card key={excursion.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{excursion.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-2">{excursion.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingExcursion(excursion)
                            setIncludesText(excursion.includes.join(", "))
                            setScheduleText(excursion.schedule.join(", "))
                            setIsDialogOpen(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteExcursion(excursion.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>Цена: {excursion.price} лв</span>
                      <span>Продължителност: {excursion.duration}</span>
                      <span>Макс. хора: {excursion.max_people}</span>
                      <span>Локация: {excursion.location}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <h2 className="text-2xl font-bold">Управление на резервации</h2>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Клиент</TableHead>
                      <TableHead>Екскурзия</TableHead>
                      <TableHead>Дата</TableHead>
                      <TableHead>Хора</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{booking.customer_name}</div>
                            <div className="text-sm text-gray-600">{booking.customer_email}</div>
                            <div className="text-sm text-gray-600">{booking.customer_phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{booking.excursion_title || "Неизвестна екскурзия"}</TableCell>
                        <TableCell>{booking.date ? booking.date.toString().slice(0, 10) : "Неизвестна дата"}</TableCell>
                        <TableCell>{booking.people}</TableCell>
                        <TableCell>
                          <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                            {booking.status === "confirmed"
                              ? "Потвърдена"
                              : booking.status === "pending"
                                ? "В очакване"
                                : "Отказана"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {booking.status !== "confirmed" && (
                              <Button size="sm" onClick={() => handleUpdateBookingStatus(booking.id, "confirmed")}>
                                Потвърди
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateBookingStatus(booking.id, "cancelled")}
                            >
                              Откажи
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

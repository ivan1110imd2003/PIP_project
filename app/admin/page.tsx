"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { useRouter } from "next/navigation"

interface Excursion {
  id: number
  title: string
  description: string
  price: number
  duration: string
  maxPeople: number
  location: string
}

interface Booking {
  id: number
  excursionId: number
  excursionTitle: string
  customerName: string
  customerEmail: string
  customerPhone: string
  people: number
  date: string
  status: string
}

export default function AdminPage() {
  const [userRole, setUserRole] = useState("")
  const [excursions, setExcursions] = useState<Excursion[]>([
    {
      id: 1,
      title: "Рилски манастир и Боянската църква",
      description: "Еднодневна екскурзия до най-известния български манастир и UNESCO обект",
      price: 45,
      duration: "8 часа",
      maxPeople: 25,
      location: "София област",
    },
    {
      id: 2,
      title: "Велико Търново - древната столица",
      description: "Разходка из историческия център и крепостта Царевец",
      price: 55,
      duration: "10 часа",
      maxPeople: 30,
      location: "Велико Търново",
    },
  ])

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      excursionId: 1,
      excursionTitle: "Рилски манастир и Боянската църква",
      customerName: "Иван Петров",
      customerEmail: "ivan@email.com",
      customerPhone: "0888123456",
      people: 2,
      date: "2024-07-15",
      status: "Потвърдена",
    },
    {
      id: 2,
      excursionId: 2,
      excursionTitle: "Велико Търново - древната столица",
      customerName: "Мария Георгиева",
      customerEmail: "maria@email.com",
      customerPhone: "0887654321",
      people: 4,
      date: "2024-07-20",
      status: "В очакване",
    },
  ])

  const [newExcursion, setNewExcursion] = useState<Omit<Excursion, "id">>({
    title: "",
    description: "",
    price: 0,
    duration: "",
    maxPeople: 0,
    location: "",
  })

  const [editingExcursion, setEditingExcursion] = useState<Excursion | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "admin") {
      router.push("/login")
    } else {
      setUserRole(role)
    }
  }, [router])

  const handleAddExcursion = () => {
    if (newExcursion.title && newExcursion.description && newExcursion.price > 0) {
      const excursion: Excursion = {
        ...newExcursion,
        id: Math.max(...excursions.map((e) => e.id)) + 1,
      }
      setExcursions([...excursions, excursion])
      setNewExcursion({
        title: "",
        description: "",
        price: 0,
        duration: "",
        maxPeople: 0,
        location: "",
      })
      setIsDialogOpen(false)
      setMessage("Екскурзията е добавена успешно!")
    }
  }

  const handleEditExcursion = () => {
    if (editingExcursion) {
      setExcursions(excursions.map((e) => (e.id === editingExcursion.id ? editingExcursion : e)))
      setEditingExcursion(null)
      setIsDialogOpen(false)
      setMessage("Екскурзията е редактирана успешно!")
    }
  }

  const handleDeleteExcursion = (id: number) => {
    setExcursions(excursions.filter((e) => e.id !== id))
    setMessage("Екскурзията е изтрита успешно!")
  }

  const updateBookingStatus = (id: number, status: string) => {
    setBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)))
    setMessage("Статусът на резервацията е обновен!")
  }

  if (userRole !== "admin") {
    return <div>Зареждане...</div>
  }

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
              <div className="text-2xl font-bold">{bookings.filter((b) => b.status === "Потвърдена").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Приходи</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {bookings
                  .filter((b) => b.status === "Потвърдена")
                  .reduce((sum, b) => {
                    const excursion = excursions.find((e) => e.id === b.excursionId)
                    return sum + (excursion ? excursion.price * b.people : 0)
                  }, 0)}{" "}
                лв
              </div>
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
                        maxPeople: 0,
                        location: "",
                      })
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Добави екскурзия
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
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
                          value={editingExcursion ? editingExcursion.maxPeople : newExcursion.maxPeople}
                          onChange={(e) =>
                            editingExcursion
                              ? setEditingExcursion({ ...editingExcursion, maxPeople: Number(e.target.value) })
                              : setNewExcursion({ ...newExcursion, maxPeople: Number(e.target.value) })
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
                        <CardDescription>{excursion.description}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingExcursion(excursion)
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
                      <span>Макс. хора: {excursion.maxPeople}</span>
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
                            <div className="font-medium">{booking.customerName}</div>
                            <div className="text-sm text-gray-600">{booking.customerEmail}</div>
                            <div className="text-sm text-gray-600">{booking.customerPhone}</div>
                          </div>
                        </TableCell>
                        <TableCell>{booking.excursionTitle}</TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>{booking.people}</TableCell>
                        <TableCell>
                          <Badge variant={booking.status === "Потвърдена" ? "default" : "secondary"}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {booking.status !== "Потвърдена" && (
                              <Button size="sm" onClick={() => updateBookingStatus(booking.id, "Потвърдена")}>
                                Потвърди
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateBookingStatus(booking.id, "Отказана")}
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

export interface Excursion {
  id: number
  title: string
  description: string
  price: number
  duration: string
  max_people: number
  location: string
  rating: number
  image_url: string
  includes: string[]
  schedule: string[]
  created_at?: string
}

export interface Booking {
  id: number
  excursion_id: number
  customer_name: string
  customer_email: string
  customer_phone: string
  people: number
  date: string
  notes?: string
  status: "pending" | "confirmed" | "cancelled"
  created_at?: string
  excursion?: Excursion
}

export interface User {
  id: string
  email: string
  name: string
  role: "user" | "admin"
}

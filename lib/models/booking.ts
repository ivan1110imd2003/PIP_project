import { BaseModel } from "./base"
import { Excursion } from "./excursion"

export type BookingStatus = "pending" | "confirmed" | "cancelled"

export interface IBooking {
  id: number
  excursion_id: number
  customer_name: string
  customer_email: string
  customer_phone: string
  people: number
  date: string
  notes?: string
  status: BookingStatus
  created_at?: string
  excursion?: Excursion
}

export class Booking extends BaseModel implements IBooking {
  public excursion_id: number
  public customer_name: string
  public customer_email: string
  public customer_phone: string
  public people: number
  public date: string
  public notes?: string
  public status: BookingStatus
  public excursion?: Excursion

  constructor(data: IBooking) {
    super(data)
    this.excursion_id = data.excursion_id
    this.customer_name = data.customer_name
    this.customer_email = data.customer_email
    this.customer_phone = data.customer_phone
    this.people = data.people
    this.date = data.date
    this.notes = data.notes
    this.status = data.status || "pending"
    this.excursion = data.excursion ? new Excursion(data.excursion) : undefined
  }

  validate(): boolean {
    return (
      this.customer_name.length > 0 &&
      this.validateEmail(this.customer_email) &&
      this.validatePhone(this.customer_phone) &&
      this.people > 0 &&
      this.date.length > 0 &&
      this.excursion_id > 0
    )
  }

  toJSON(): Record<string, any> {
    return {
      id: this.id,
      excursion_id: this.excursion_id,
      customer_name: this.customer_name,
      customer_email: this.customer_email,
      customer_phone: this.customer_phone,
      people: this.people,
      date: this.date,
      notes: this.notes,
      status: this.status,
      created_at: this.created_at,
    }
  }

  // Бизнес логика методи
  calculateTotalPrice(): number {
    if (!this.excursion) {
      throw new Error("Екскурзията не е заредена")
    }
    return this.excursion.calculateTotalPrice(this.people)
  }

  confirm(): void {
    if (this.status === "cancelled") {
      throw new Error("Не можете да потвърдите отказана резервация")
    }
    this.status = "confirmed"
  }

  cancel(): void {
    if (this.status === "confirmed") {
      // Можем да добавим проверка за дата
      const bookingDate = new Date(this.date)
      const today = new Date()
      const daysDiff = Math.ceil((bookingDate.getTime() - today.getTime()) / (1000 * 3600 * 24))

      if (daysDiff < 2) {
        throw new Error("Не можете да отмените резервация по-малко от 2 дни преди датата")
      }
    }
    this.status = "cancelled"
  }

  isPending(): boolean {
    return this.status === "pending"
  }

  isConfirmed(): boolean {
    return this.status === "confirmed"
  }

  isCancelled(): boolean {
    return this.status === "cancelled"
  }

  getFormattedDate(): string {
    const date = new Date(this.date)
    return date.toLocaleDateString("bg-BG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  getStatusText(): string {
    switch (this.status) {
      case "pending":
        return "В очакване"
      case "confirmed":
        return "Потвърдена"
      case "cancelled":
        return "Отказана"
      default:
        return "Неизвестен"
    }
  }

  getDaysUntilTrip(): number {
    const bookingDate = new Date(this.date)
    const today = new Date()
    return Math.ceil((bookingDate.getTime() - today.getTime()) / (1000 * 3600 * 24))
  }
}

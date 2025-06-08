import { BaseModel } from "./base"

export interface IExcursion {
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

export class Excursion extends BaseModel implements IExcursion {
  public title: string
  public description: string
  public price: number
  public duration: string
  public max_people: number
  public location: string
  public rating: number
  public image_url: string
  public includes: string[]
  public schedule: string[]

  constructor(data: IExcursion) {
    super(data)
    this.title = data.title
    this.description = data.description
    this.price = data.price
    this.duration = data.duration
    this.max_people = data.max_people
    this.location = data.location
    this.rating = data.rating || 0
    this.image_url = data.image_url || "/placeholder.svg?height=400&width=600"
    this.includes = data.includes || []
    this.schedule = data.schedule || []
  }

  validate(): boolean {
    return (
      this.title.length > 0 &&
      this.description.length > 0 &&
      this.price > 0 &&
      this.duration.length > 0 &&
      this.max_people > 0 &&
      this.location.length > 0
    )
  }

  toJSON(): Record<string, any> {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      price: this.price,
      duration: this.duration,
      max_people: this.max_people,
      location: this.location,
      rating: this.rating,
      image_url: this.image_url,
      includes: this.includes,
      schedule: this.schedule,
      created_at: this.created_at,
    }
  }

  // Бизнес логика методи
  calculateTotalPrice(people: number): number {
    if (people <= 0 || people > this.max_people) {
      throw new Error(`Броят хора трябва да е между 1 и ${this.max_people}`)
    }
    return this.price * people
  }

  hasAvailableSpots(requestedPeople: number): boolean {
    return requestedPeople <= this.max_people
  }

  getFormattedPrice(): string {
    return `${(+this.price || 0).toFixed(2)} лв`;
  }


  getShortDescription(maxLength = 100): string {
    if (this.description.length <= maxLength) {
      return this.description
    }
    return this.description.substring(0, maxLength) + "..."
  }

  isPopular(): boolean {
    return this.rating >= 4.5
  }

  getDurationInHours(): number {
    const match = this.duration.match(/(\d+)\s*час/)
    return match ? Number.parseInt(match[1]) : 0
  }
}

export interface IModel {
  id: number
  created_at?: string
}

export abstract class BaseModel implements IModel {
  public id: number
  public created_at?: string

  constructor(data: any) {
    this.id = data.id
    this.created_at = data.created_at
  }

  abstract validate(): boolean
  abstract toJSON(): Record<string, any>

  protected validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  protected validatePhone(phone: string): boolean {
    const phoneRegex = /^[0-9+\-\s()]+$/
    return phoneRegex.test(phone) && phone.length >= 8
  }
}

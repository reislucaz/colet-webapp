import { Chat } from './chat'
import { User } from './users'

export interface Offer {
  id?: string
  amount: number
  status: string
  senderId: string
  recipientId: string
  chatId?: string
  productId?: string
  stripePaymentIntentId?: string | null
  sender?: User
  chat?: Chat
  createdAt: Date
  updatedAt?: Date
}

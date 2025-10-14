import { Chat } from './chat'
import { User } from './users'

export interface Offer {
  id?: string
  amount: number
  status: string
  sender: User
  recipientId: string
  senderId: string
  chat: Chat
  createdAt: Date
}

import { Chat } from './chat'
import { User } from './users'

export interface Offer {
  amount: number
  status: string
  sender: User
  recipient: User
  chat: Chat
}

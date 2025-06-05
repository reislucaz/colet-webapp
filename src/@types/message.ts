import { Chat } from './chat'
import { User } from './users'

export interface Message {
  id?: string
  text: string
  fromUser: User
  toUser: User
  chat: Chat
  createdAt: Date
}

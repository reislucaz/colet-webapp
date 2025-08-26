import { Chat } from './chat'

export interface Message {
  id?: string
  text: string
  fromUserId?: string
  toUserId?: string
  user?: string
  chat: Chat
  createdAt: Date
}

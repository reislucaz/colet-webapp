import { Chat } from './chat'
import { User } from './users'

export interface Message {
  text: string
  fromUser: User
  toUser: User
  chat: Chat
}

import { Chat } from '@/@types/chat'
import { coletApi } from './axios'
import { Pagination } from '@/@types/pagination'

export class ChatService {
  public static baseUrl = '/chats'

  static async create(data: {
    productId: string
    userId: string
    sellerId: string
  }): Promise<string> {
    return await coletApi.post(ChatService.baseUrl, data)
  }

  static async findMany(): Promise<Chat[]> {
    return (await coletApi.get(`${ChatService.baseUrl}`)).data.data
  }
}

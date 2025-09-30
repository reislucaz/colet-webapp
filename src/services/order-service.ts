import { Chat } from '../@types/chat'
import { Order } from '../@types/order'
import { coletApi } from './axios'

export class OrderService {
  public static baseUrl = '/orders'

  static async create(chatId: string, data: {amount: number}): Promise<Chat> {
    return (await coletApi.post(`${OrderService.baseUrl}/chat/${chatId}`, data)).data
  }

  static async getManyByUserId(userId: string): Promise<Order[]> {
    return (await coletApi.get(`${OrderService.baseUrl}/user/${userId}`)).data
  }
}

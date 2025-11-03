import { Chat } from '../@types/chat'
import { Order } from '../@types/order'
import { coletApi } from './axios'

export class OrderService {
  public static baseUrl = '/orders'

  static async create(chatId: string, data: { amount: number }): Promise<Chat> {
    return (await coletApi.post(`${OrderService.baseUrl}/chat/${chatId}`, data))
      .data
  }

  static async getManyByUserId(userId: string): Promise<Order[]> {
    return (await coletApi.get(`${OrderService.baseUrl}`)).data
  }

  static async updateStatus(orderId: string, status: string): Promise<Order> {
    return (
      await coletApi.put(`${OrderService.baseUrl}/${orderId}`, { status })
    ).data
  }

  static async getByStatus(userId: string, status: string): Promise<Order[]> {
    return (
      await coletApi.get(
        `${OrderService.baseUrl}/user/${userId}?status=${status}`,
      )
    ).data
  }

  static async getById(orderId: string): Promise<Order> {
    return (await coletApi.get(`${OrderService.baseUrl}/${orderId}`)).data
  }

  static async deleteOrder(orderId: string): Promise<void> {
    return (await coletApi.delete(`${OrderService.baseUrl}/${orderId}`)).data
  }
}

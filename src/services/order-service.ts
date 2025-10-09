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

  static async updateStatus(orderId: string, status: string): Promise<Order> {
    return (await coletApi.patch(`${OrderService.baseUrl}/${orderId}`, { status })).data
  }

  static async getByStatus(userId: string, status: string): Promise<Order[]> {
    return (await coletApi.get(`${OrderService.baseUrl}/user/${userId}?status=${status}`)).data
  }

  static async getById(orderId: string): Promise<Order> {
    return (await coletApi.get(`${OrderService.baseUrl}/${orderId}`)).data
  }
}

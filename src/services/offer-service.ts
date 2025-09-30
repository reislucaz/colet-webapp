import { Chat } from '../@types/chat'
import { Offer } from '../@types/offer'
import { coletApi } from './axios'

export class OfferService {
  public static baseUrl = '/offers'

  static async create(chatId: string, data: {amount: number}): Promise<Chat> {
    return (await coletApi.post(`${OfferService.baseUrl}/chat/${chatId}`, data)).data
  }

  static async getManyByUserId(userId: string): Promise<Offer[]> {
    return (await coletApi.get(`${OfferService.baseUrl}/`)).data
  }

  static async getByChatId(chatId: string): Promise<Offer> {
    return (await coletApi.get(`${OfferService.baseUrl}/chat/${chatId}`)).data
  }

  static async accept(id: string): Promise<Offer> {
    return (await coletApi.post(`${OfferService.baseUrl}/${id}/accept`)).data
  }

  static async decline(id: string): Promise<Offer> {
    return (await coletApi.post(`${OfferService.baseUrl}/${id}/decline`)).data
  }
}

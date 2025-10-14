import { Chat } from '../@types/chat'
import { Offer } from '../@types/offer'
import { coletApi } from './axios'

export class OfferService {
  public static baseUrl = '/offers'

  static async create(
    chatId: string,
    data: { amount: number; productId: string },
  ): Promise<Chat> {
    return (await coletApi.post(`${OfferService.baseUrl}/chat/${chatId}`, data))
      .data
  }

  static async getManyByUserId(userId: string): Promise<Offer[]> {
    return (await coletApi.get(`${OfferService.baseUrl}/user/${userId}`)).data
  }

  static async getByChatId(chatId: string): Promise<Offer> {
    return (await coletApi.get(`${OfferService.baseUrl}/chat/${chatId}`)).data
  }

  static async getById(offerId: string): Promise<Offer> {
    return (await coletApi.get(`${OfferService.baseUrl}/${offerId}`)).data
  }

  static async accept(id: string): Promise<Offer> {
    return (await coletApi.post(`${OfferService.baseUrl}/${id}/accept`)).data
  }

  static async decline(id: string): Promise<Offer> {
    return (await coletApi.post(`${OfferService.baseUrl}/${id}/decline`)).data
  }

  static async getReceivedOffers(userId: string): Promise<Offer[]> {
    return (await coletApi.get(`${OfferService.baseUrl}/received/${userId}`))
      .data
  }

  static async getSentOffers(userId: string): Promise<Offer[]> {
    return (await coletApi.get(`${OfferService.baseUrl}/sent/${userId}`)).data
  }

  static async getPendingOffers(userId: string): Promise<Offer[]> {
    return (await coletApi.get(`${OfferService.baseUrl}/pending/${userId}`))
      .data
  }
}

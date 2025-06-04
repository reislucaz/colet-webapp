import { Chat } from '../@types/chat'
import { Offer } from '../@types/offer'
import { coletApi } from './axios'

export class OfferService {
  public static baseUrl = '/offers'

  static async create(chatId: string, data: {amount: number}): Promise<Chat> {
    return (await coletApi.post(`${OfferService.baseUrl}/chat/${chatId}`, data)).data
  }

   static async getManyByUserId(): Promise<Offer[]> {
    return (await coletApi.get(OfferService.baseUrl)).data
  }
}

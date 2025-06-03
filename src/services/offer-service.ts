import { coletApi } from './axios'

export class OfferService {
  public static baseUrl = '/offers'

  static async create(chatId: string, data: {amount: number}): Promise<string> {
    return await coletApi.post(`${OfferService.baseUrl}/chat/${chatId}`, data)
  }
}

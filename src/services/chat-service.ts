import { coletApi } from './axios'

export class ChatService {
  public static baseUrl = '/chats'

  static async create(data: {productId: string, buyerId: string, sellerId: string}): Promise<string> {
    return await coletApi.post(ChatService.baseUrl, data)
  }
}

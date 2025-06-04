import { coletApi } from './axios'

export class ChatService {
  public static baseUrl = '/chats'

  static async create(data: {productId: string, userId: string, sellerId: string}): Promise<string> {
    return await coletApi.post(ChatService.baseUrl, data)
  }
}

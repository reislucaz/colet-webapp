import { coletApi } from "./axios"

export class StripeService {
  public static baseUrl = '/stripe'

  static async createCheckoutSession(productId: string) {
    return (await coletApi.post(`${StripeService.baseUrl}/checkout-session`, { productId })).data
  }
}
import { Offer } from './offer'
import { Product } from './product'
import { User } from './users'

export interface Order {
  id: string
  amount: number
  status: string
  sellerId: string
  purchaserId: string
  productId: string
  offerId?: string
  seller: User
  purchaser: User
  product: Product
  Offer?: Offer
  createdAt: string
  updatedAt: string
}

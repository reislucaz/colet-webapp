import { Offer } from './offer'
import { Product } from './product'
import { User } from './users'

export interface Order {
  id: string
  amount: number
  status: string
  seller: User
  purchaser: User
  product: Product
  offer: Offer
  createdAt: string
  updatedAt: string
}

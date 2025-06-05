import { Message } from './message'
import { Offer } from './offer'
import { Product } from './product'
import { User } from './users'

export interface Chat {
  id?: string
  product: Product
  participants: User[]
  offers: Offer[]
  messages: Message[]
}

import { Message } from './message'
import { Offer } from './offer'
import { Product } from './product'
import { User } from './users'

export interface Chat {
  product: Product
  participants: User[]
  offers: Offer[]
  messages: Message
}

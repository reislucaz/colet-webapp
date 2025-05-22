import { Category } from './category'
import { Image } from './image'

export interface Product {
  id: string
  name: string
  price: number
  status: string
  description: string
  category: Category
  authorId: string
  neighborhood: string
  city: string
  state: string
  images: Image[]
  createdAt: Date
}

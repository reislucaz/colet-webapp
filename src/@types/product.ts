import { Image } from './image'

export interface Product {
  id: string
  name: string
  price: number
  description: string
  categoryId: string
  authorId: string
  neighborhood: string
  city: string
  state: string
  images: Image[]
  createdAt: Date
}

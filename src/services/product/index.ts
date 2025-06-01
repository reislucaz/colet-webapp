import { Product } from '@/@types/product'
import { coletApi } from '../axios'

export class ProductService {
  public static baseUrl = '/products'

  static async update(id: string, data: Partial<Product>) {
    await coletApi.put(`${ProductService.baseUrl}/${id}`, data)
  }
}

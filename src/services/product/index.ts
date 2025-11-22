import { Product } from '@/@types/product'
import { coletApi } from '../axios'

export class ProductService {
  public static baseUrl = '/products'

  static async update(id: string, data: Partial<Product>) {
    await coletApi.put(`${ProductService.baseUrl}/${id}`, data)
  }

  static async getList(params?: any) {
    return await coletApi.get(ProductService.baseUrl, { params })
  }

  static async getOne(id: string): Promise<Product> {
    const response = await coletApi.get(`${ProductService.baseUrl}/${id}`)
    return response.data
  }

  static async uploadImages(productId: string, files: File[]): Promise<Product> {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('images', file)
    })

    const response = await coletApi.post(
      `${ProductService.baseUrl}/${productId}/images`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    return response.data
  }
}

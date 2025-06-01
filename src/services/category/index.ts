import { Pagination } from '@/@types/pagination'
import { coletApi } from '../axios'
import { Category } from '@/@types/category'

export class CategoryService {
  public static baseUrl = '/categories'

  public static async getMany() {
    const { data } = await coletApi.get<Pagination<Category>>(
      CategoryService.baseUrl,
    )
    return data.data
  }
}

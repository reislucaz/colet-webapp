export interface Pagination<T> {
  total: number
  data: T[]
  perPage: number
  currentPage: number
}

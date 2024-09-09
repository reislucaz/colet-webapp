export interface Pagination<T> {
  total: number
  items: T[]
  perPage: number
  currentPage: number
}

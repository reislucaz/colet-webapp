export interface TableProps<T> {
  data: T[]
  total: number
  page: number
  perPage: number
  isLoading: boolean
}

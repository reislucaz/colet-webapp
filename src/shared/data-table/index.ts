import { DataTableFilters } from './data-table-filters'
import { DataTableMain } from './data-table-main'
import { DataTablePagination } from './data-table-pagination'
import { DataTableProvider, useDataTableContext } from './data-table-provider'

export const DataTable = {
  Root: DataTableProvider,
  Main: DataTableMain,
  Filters: DataTableFilters,
  Pagination: DataTablePagination,
  useDataTableContext,
}

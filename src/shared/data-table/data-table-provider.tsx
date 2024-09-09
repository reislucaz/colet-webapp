'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'
import {
  Table,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table'

interface DataTableContextProps<TData> {
  table: Table<TData>
  isLoading?: boolean
  total: number
}

interface DataTableProviderProps<TData, TValue> {
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
  columnsVisibility?: [
    VisibilityState,
    Dispatch<SetStateAction<VisibilityState>>,
  ]
  total: number
  page?: number
  perPage?: number
  children: ReactNode
  isLoading?: boolean
}

export const DataTableContext = createContext<DataTableContextProps<any>>(
  {} as any,
)

export function DataTableProvider<TData, TValue>({
  children,
  data,
  columns,
  columnsVisibility,
  total,
  perPage,
  isLoading = false,
}: DataTableProviderProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    pageCount: Math.ceil(total / (perPage ?? 10)),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: (u) => {
      if (columnsVisibility) {
        columnsVisibility[1](u)
      }

      setColumnVisibility(u)
    },
  })

  useEffect(() => {
    if (columnsVisibility) {
      setColumnVisibility(columnsVisibility[0])
    }
  }, [columnsVisibility])

  return (
    <DataTableContext.Provider value={{ table, isLoading, total }}>
      {children}
    </DataTableContext.Provider>
  )
}

export function useDataTableContext<TData>() {
  const context = useContext(DataTableContext) as DataTableContextProps<TData>

  if (!context) {
    throw new Error(
      'useDataTableContext must be used within a DataTableProvider',
    )
  }

  return context
}

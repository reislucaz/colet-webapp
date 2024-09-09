'use client'

import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  TableHead,
} from '@/components/ui/table'
import { flexRender } from '@tanstack/react-table'

import { useDataTableContext } from './data-table-provider'
import { Skeleton } from '@/components/ui/skeleton'

interface DataTableMainProps {
  isDraggable?: boolean
}

export function DataTableMain({ isDraggable }: DataTableMainProps) {
  const { table, isLoading } = useDataTableContext()
  const columns = table.getAllColumns()

  return (
    <Table isDraggable={isDraggable}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  className="whitespace-nowrap text-center text-sm font-bold text-foreground"
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell className="h-24 text-center" colSpan={columns.length}>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => {
                  return <Skeleton className="h-6 w-full" key={index} />
                })}
              </div>
            </TableCell>
          </TableRow>
        ) : table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              data-state={row.getIsSelected() ? 'selected' : null}
              key={row.id}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell className="text-center text-sm" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell className="h-24 text-center" colSpan={columns.length}>
              Nenhum dado encontrado!
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

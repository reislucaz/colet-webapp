'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Badge } from '@/components/ui/badge'

export type DataTableAppliedFilters = {
  id: string
  title: string
  label?: string | undefined | null
  value: string | undefined | null
}

type Props = {
  filters: DataTableAppliedFilters[]
}

type TagProps = {
  filter: DataTableAppliedFilters
}

function RenderTag({ filter: { id, title, value, label } }: TagProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function removeFilter(key: string) {
    const newParams = new URLSearchParams(searchParams)
    newParams.delete(key)
    router.push(`${pathname}?${newParams.toString()}`)
  }

  return (
    <Badge
      className="flex min-w-[100px] cursor-pointer items-center justify-start"
      key={id}
      onClick={() => removeFilter(id)}
    >
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm">{title}:</p>
          <p className="text-sm">{label ?? value ?? '?'}</p>
        </div>

        <span className="ml-2">x</span>
      </div>
    </Badge>
  )
}

export function DataTableFilters({ filters }: Props) {
  return (
    <div className="flex w-full flex-col">
      <div className="mx-4 my-2 flex flex-wrap gap-2">
        {filters.map((filter, index) =>
          filter.value ? (
            <RenderTag filter={filter} key={`${filter.id}:${index}`} />
          ) : null,
        )}
      </div>
    </div>
  )
}

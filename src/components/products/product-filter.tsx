'use client'

import { X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

export async function ProductFilter({
  filters,
}: {
  filters: {
    name: string
    value: string | undefined
  }[]
}) {
  const pathname = usePathname()
  const router = useRouter()

  const filteredItems = filters.map(async (item, index) => {
    if (item.value) {
      const categories = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/categories',
      ).then((res) => res.json())

      const category = categories.data.find(
        (category: any) => category.id === item.value,
      )

      return (
        <div
          key={index}
          className="flex w-fit items-center gap-2 rounded-full bg-primary p-2 px-5 text-white"
        >
          <h5>{item.name}</h5>
          <p>{category.name}</p>
          <X
            className="size-4 cursor-pointer fill-white"
            onClick={() => router.push(pathname)}
          />
        </div>
      )
    }
  })

  return <div className="flex gap-2">{filteredItems}</div>
}

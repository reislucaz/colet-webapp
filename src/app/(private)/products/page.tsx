'use client'
import { ProductList } from '@/components/products/product-list'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function ProductListPage() {
  const productsList = Array.from({ length: 12 }).map((_, index) => {
    return {
      name: `item-${index}`,
    }
  })
  const router = useRouter()
  const searchParam = useSearchParams()
  const pathname = usePathname()
  const filters = [
    { name: 'Vendedor', value: searchParam.get('salesPerson') },
    { name: 'Categoria', value: searchParam.get('category') },
  ]
  return (
    <section className="flex size-full flex-col gap-5">
      <h2 className="border-l-2 border-l-primary pl-2 text-2xl">Produtos</h2>
      {/* Filters list */}
      {/* Tags indicating filter */}

      {filters.map((item, index) => {
        return item.value ? (
          <div
            key={index}
            className="flex w-fit items-center gap-2 rounded-full bg-primary p-2 px-5 text-white"
          >
            <h5>{item.name}</h5>
            <p>{item.value}</p>
            <X
              className="size-4 cursor-pointer fill-white"
              onClick={() => router.push(pathname)}
            />
          </div>
        ) : (
          <></>
        )
      })}

      <ProductList data={productsList} />
      <Button variant="outline" className="w-fit self-center">
        Mostrar mais
      </Button>
    </section>
  )
}

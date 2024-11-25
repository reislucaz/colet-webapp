import { ProductFilter } from '@/components/products/product-filter'
import { ProductList } from '@/components/products/product-list'
import { Button } from '@/components/ui/button'
import { Suspense } from 'react'

export default async function ProductListPage({
  searchParams,
}: {
  searchParams: {
    category?: string
    take?: string
  }
}) {
  const params = new URLSearchParams()

  if (searchParams.category) {
    params.append('category', searchParams.category)
  }

  if (searchParams.take) {
    params.append('take', searchParams.take)
  }

  const fetchProducts = await fetch(
    process.env.NEXT_PUBLIC_API_URL + '/products' + '?' + params.toString(),
    { cache: 'no-cache' },
  )

  const productsList = await fetchProducts.json()

  const filters = [{ name: 'Categoria', value: searchParams.category }]

  return (
    <section className="flex size-full flex-col gap-5">
      <h2 className="border-l-2 border-l-primary pl-2 text-2xl">Produtos</h2>
      {/* Filters list */}
      {/* Tags indicating filter */}

      <Suspense
        fallback={
          <div className="flex space-x-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-10 w-64 rounded-full bg-gray-200" />
            ))}
          </div>
        }
      >
        <ProductFilter filters={filters} />
      </Suspense>

      <ProductList data={productsList.data} />
      {productsList.total > 0 &&
        productsList.data.length < productsList.total && (
          <Button
            className="w-full"
            onClick={() => {
              window.location.href = '/'
            }}
          >
            Voltar
          </Button>
        )}
    </section>
  )
}

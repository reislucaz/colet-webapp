import { ProductList } from '@/components/products/product-list'
import { ProductsCategories } from '@/components/products/products-categories'

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

interface Category {
  id: string
  name: string
  description: string
  image?: string
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  rating?: number
  image?: string
}

export default async function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

  const fetchCategories = fetch(`${apiUrl}/categories`, {
    cache: 'no-store',
    next: { revalidate: 60 }, // Revalidate every minute
  })

  const fetchProducts = fetch(`${apiUrl}/products`, {
    cache: 'no-store',
    next: { revalidate: 60 }, // Revalidate every minute
  })

  const [responseCategories, responseProducts] = await Promise.all([
    fetchCategories,
    fetchProducts,
  ])

  const [productsCategories, productsList] = await Promise.all([
    responseCategories.json() as Promise<PaginatedResponse<Category>>,
    responseProducts.json() as Promise<PaginatedResponse<Product>>,
  ])

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Categories Section */}
        {productsCategories.total > 0 && (
          <section className="container py-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold">Categorias</h2>
              <p className="text-muted-foreground">
                Explore nossos serviços por categoria
              </p>
            </div>
            <ProductsCategories categories={productsCategories.data} />
          </section>
        )}

        {/* Products Section */}
        {productsList.total > 0 && (
          <section className="container py-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold">Serviços em Destaque</h2>
              <p className="text-muted-foreground">
                Conheça nossos serviços mais populares
              </p>
            </div>
            <ProductList data={productsList.data} />
          </section>
        )}
      </main>

      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} Colet. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

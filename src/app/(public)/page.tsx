import { Category } from '@/@types/category'
import { Product } from '@/@types/product'
import { ProductCarousel } from '@/components/products/product-carousel'
import { ProductList } from '@/components/products/product-list'
import { ProductsCategories } from '@/components/products/products-categories'

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export default async function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

  const fetchCategories = fetch(`${apiUrl}/categories`, {
    next: { revalidate: 60 }, // Revalidate every minute
  })

  const fetchProducts = fetch(`${apiUrl}/products`, {
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
      <main className="flex flex-col items-center justify-center gap-5 py-4">
        <ProductCarousel products={productsList.data} />

        {/* Categories Section */}
        {productsCategories.total > 0 && (
          <section className="container">
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
          <section className="container">
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
    </div>
  )
}

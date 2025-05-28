import { Category } from '@/@types/category'
import { Product } from '@/@types/product'
import { ProductsCategories } from '@/components/products/products-categories'
import { Hero } from '../../components/hero'
import { HowItWorks } from '../../components/how-it-works'

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
    <div className="flex flex-col">
      <Hero />
      <HowItWorks />
      <main className="flex flex-col items-center justify-center gap-5 py-4">
        {/* Categories Section */}
        {productsCategories.total > 0 && (
          <section className="container mt-8">
            <div className="mb-8 text-center">
              <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                Categorias Populares
              </h2>
              <p className="text-xl text-gray-600">
                Explore produtos por categoria
              </p>
            </div>
            <ProductsCategories categories={productsCategories.data} />
          </section>
        )}
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
      </main>
    </div>
  )
}

import { Category } from '@/@types/category'
import { Product } from '@/@types/product'
import { ProductItem } from '@/components/products/product-item'
import { ProductsCategories } from '@/components/products/products-categories'
import { Button } from '@/components/ui/button'
import { ArrowRight, Package } from 'lucide-react'
import Link from 'next/link'
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
    next: { revalidate: 60 },
  })

  const fetchProducts = fetch(`${apiUrl}/products?limit=6`, {
    next: { revalidate: 60 },
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
        {productsCategories.total > 0 && (
          <section className="container mt-8">
            <div className="mb-8 text-center">
              <h2 className="mb-4 bg-gradient-to-r from-green-600 via-primary to-blue-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                Categorias Populares
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Explore produtos por categoria
              </p>
            </div>
            <ProductsCategories categories={productsCategories.data} />
          </section>
        )}

        {productsList.total > 0 && (
          <section className="container mt-16">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="mb-4 bg-gradient-to-r from-green-600 via-primary to-blue-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                  Produtos Disponíveis
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Confira os produtos mais recentes
                </p>
              </div>
              <Link href="/products">
                <Button
                  size="lg"
                  className="group rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg transition-all duration-300 hover:scale-105 hover:from-green-600 hover:to-emerald-700 hover:shadow-2xl"
                >
                  Ver Todos
                  <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {productsList.data.map((product, index) => (
                <ProductItem key={product.id} idx={index} product={product} />
              ))}
            </div>

            {productsList.total > 6 && (
              <div className="mt-12 text-center">
                <Link href="/products">
                  <Button
                    size="lg"
                    variant="outline"
                    className="group rounded-xl border-2 px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:border-primary hover:bg-primary/5"
                  >
                    <Package className="mr-2 size-5 transition-transform group-hover:rotate-12" />
                    Ver Todos os Produtos
                    <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            )}
          </section>
        )}

        <footer className="mt-16 w-full border-t">
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

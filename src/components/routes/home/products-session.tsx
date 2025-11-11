import { Product } from '@/@types/product'
import { ProductItem } from '@/components/products/product-item'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function ProductsSession({ products }: { products: Product[] }) {
  return (
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
        <Link href="/marketplace">
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
        {products.map((product, index) => (
          <ProductItem key={product.id} idx={index} product={product} />
        ))}
      </div>
    </section>
  )
}

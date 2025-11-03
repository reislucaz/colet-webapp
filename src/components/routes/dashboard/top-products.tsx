import { Package, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '../../../@types/product'
import { formatCurrency } from '../../../utils/format-currency'
import { Button } from '../../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card'

interface TopProductsProps {
  products: Product[]
}

export function TopProducts({ products }: TopProductsProps) {
  if (products.length === 0) {
    return (
      <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-lg dark:from-gray-900 dark:to-gray-800/50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <CardHeader className="relative">
          <CardTitle>Produtos Mais Vendidos</CardTitle>
          <CardDescription>Top 5 produtos com mais vendas</CardDescription>
        </CardHeader>

        <CardContent className="relative">
          <div className="flex h-[200px] items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Package className="mx-auto mb-2 size-12 text-gray-400 dark:text-gray-600" />
              <p>Nenhum produto vendido ainda</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 dark:from-gray-900 dark:to-gray-800/50">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-5 text-green-600 dark:text-green-400" />
              Produtos Mais Vendidos
            </CardTitle>
            <CardDescription>Top 5 produtos com mais vendas</CardDescription>
          </div>
          <Link href="/products">
            <Button variant="outline" size="sm">
              Ver Todos
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent className="relative">
        <div className="space-y-4">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="relative size-16 overflow-hidden rounded-lg">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <Package className="size-8 text-gray-400 dark:text-gray-600" />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 dark:bg-green-900/30">
                    <TrendingUp className="size-3 text-green-600 dark:text-green-400" />
                    <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                      #{index + 1}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {product.category?.name || 'Sem categoria'}
                  </span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    {formatCurrency(product.price || 0)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 h-1 w-full rounded-full bg-gradient-to-r from-green-500 to-primary opacity-20 transition-opacity duration-300 group-hover:opacity-100" />
      </CardContent>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Card>
  )
}

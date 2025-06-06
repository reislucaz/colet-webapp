'use client'
import { Product } from '@/@types/product'
import { coletApi } from '@/services/axios'
import { Edit, Eye, Trash2, MapPin, Clock } from 'lucide-react'
import { toast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Button } from '../ui/button'
import { timeAgo } from '@/utils/time-ago'

export function ProductItem({
  product,
  idx,
}: {
  product: Product
  idx: number
}) {
  const handleDelete = async (id: string) => {
    try {
      await coletApi.delete(`/products/${id}`)
      toast({
        title: 'Produto excluído com sucesso',
      })
    } catch (error) {
      toast({
        title: 'Erro ao excluir produto',
        variant: 'destructive',
      })
    }
  }

  const navigate = useRouter()

  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  })

  return (
    <div className="group">
      <Card
        key={product.id}
        onClick={() => navigate.push(`/product/${product.id}`)}
        className="relative cursor-pointer overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 dark:from-gray-900 dark:to-gray-800/50"
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Category badge */}
        <div className="absolute left-4 top-4 z-10">
          <span className="inline-flex items-center rounded-full bg-gradient-to-r from-green-500 to-green-800 px-3 py-1 text-xs font-semibold text-white shadow-lg">
            {product.category.name}
          </span>
        </div>

        {/* Action buttons */}
        <div className="absolute right-4 top-4 z-10 flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <Button
            variant="secondary"
            size="icon"
            className="size-8 bg-white/90 shadow-lg backdrop-blur-sm hover:bg-white"
            onClick={(e) => {
              e.stopPropagation()
              navigate.push(`/product/${product.id}`)
            }}
          >
            <Eye className="size-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="size-8 bg-white/90 shadow-lg backdrop-blur-sm hover:bg-white"
            onClick={(e) => {
              e.stopPropagation()
              navigate.push(`/edit-product/${product.id}`)
            }}
          >
            <Edit className="size-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            className="size-8 shadow-lg"
            onClick={(e) => {
              e.stopPropagation()
              handleDelete(product.id)
            }}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>

        <CardHeader className="pb-3 pt-12">
          <CardTitle className="line-clamp-2 text-xl font-bold text-gray-800 transition-colors group-hover:text-green-600 dark:text-white dark:group-hover:text-green-400">
            {product.name}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
            {product.description && product.description.length > 100
              ? `${product.description.substring(0, 100)}...`
              : product.description || 'Sem descrição'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Price section */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Preço:
            </span>
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              {product.price
                ? currencyFormatter.format(product.price)
                : 'Grátis'}
            </span>
          </div>

          {/* Location and time info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="size-4" />
              <span>
                {product.city}, {product.state}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="size-4" />
              <span>Publicado {timeAgo(product.createdAt)}</span>
            </div>
          </div>

          {/* Bottom gradient line */}
          <div className="h-1 w-full rounded-full bg-gradient-to-r from-green-500 to-green-800 opacity-20 transition-opacity duration-300 group-hover:opacity-100" />
        </CardContent>
      </Card>
    </div>
  )
}

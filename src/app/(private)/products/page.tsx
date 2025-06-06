'use client'

import { Product } from '@/@types/product'
import { ProductItem } from '@/components/products/product-item'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ProductSkeleton } from '@/components/ui/product-skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  StatusProduct,
  formattedStatusProduct,
} from '@/constants/product/product-status-enum'
import { coletApi } from '@/services/axios'
import { useQuery } from '@tanstack/react-query'
import { Plus, Search } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusProduct | 'ALL'>('ALL')
  const [page, setPage] = useState(1)
  const limit = 9

  const { data: products, isLoading } = useQuery<PaginatedResponse<Product>>({
    queryKey: ['products', search, status, page],
    queryFn: async () => {
      const response = await coletApi.get('/products', {
        params: {
          search,
          status: status !== 'ALL' ? status : undefined,
          page,
          limit,
        },
      })
      return response.data
    },
  })

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Produtos</h1>
          <p className="mt-2 text-muted-foreground">
            Gerencie seus produtos e resíduos
          </p>
        </div>
        <Button
          asChild
          className="mt-4 rounded-full bg-gradient-to-r from-green-500 to-primary"
        >
          <a href="/create-product">
            <Plus className="mr-2 size-4" />
            Novo Produto
          </a>
        </Button>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select
          value={status}
          onValueChange={(value) => setStatus(value as StatusProduct | 'ALL')}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos</SelectItem>
            {Object.entries(formattedStatusProduct).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductSkeleton key={i} index={i} />
          ))}
        </div>
      ) : products?.total ? (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.data.map((product, index) => (
              <ProductItem idx={index} product={product} key={product.id} />
            ))}
          </div>

          {products.total > limit && (
            <div className="mt-8 flex justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                onClick={() => setPage((p) => p + 1)}
                disabled={products.data.length < limit}
              >
                Próxima
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-muted-foreground">
            Você ainda não tem produtos cadastrados
          </p>
          <Button
            asChild
            className="mt-4 rounded-full bg-gradient-to-r from-green-500 to-primary"
          >
            <a href="/create-product">
              <Plus className="mr-2 size-4" />
              Novo Produto
            </a>
          </Button>
        </div>
      )}
    </div>
  )
}

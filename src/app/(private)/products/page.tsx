'use client'

import { Product } from '@/@types/product'
import { ProductItem } from '@/components/products/product-item'
import { ProductsHeader } from '@/components/routes/products/products-header'
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
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'
import Loading from '../loading'

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

const getUserId = (session: any) => {
  return session?.user?.id || session?.user?.email || ''
}

export default function MyProductsPage() {
  const { data: session } = useSession()
  const userId = getUserId(session)

  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)
  const [status, setStatus] = useState<StatusProduct | 'ALL'>('ALL')
  const [page, setPage] = useState(1)

  const limit = 9

  const { data: products, isLoading } = useQuery<PaginatedResponse<Product>>({
    queryKey: ['myProducts', userId, debouncedSearch, status, page],
    queryFn: async () => {
      const response = await coletApi.get('/products', {
        params: {
          search: debouncedSearch,
          status: status !== 'ALL' ? status : undefined,
          userId,
          page,
          limit,
        },
      })
      return response.data
    },
    enabled: !!userId,
  })

  if (!userId) {
    return <Loading />
  }

  return (
    <div className="container py-8">
      <div className="m-4 flex flex-col gap-6">
        <ProductsHeader />

        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              {products?.total || 0} produto(s) encontrado(s)
            </p>
          </div>
          <Link href="/create-product">
            <Button className="group rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg transition-all duration-300 hover:scale-105 hover:from-green-600 hover:to-emerald-700 hover:shadow-2xl">
              <Plus className="mr-2 size-4 transition-transform group-hover:rotate-90" />
              Novo Produto
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar meus produtos..."
              className="pl-10"
              value={search}
              disabled={isLoading}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select
            value={status}
            onValueChange={(value) => setStatus(value as StatusProduct | 'ALL')}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductSkeleton key={i} index={i} />
            ))}
          </div>
        ) : products?.total ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  className="transition-all duration-300 hover:scale-105"
                >
                  Anterior
                </Button>
                <span className="flex items-center px-4 text-sm text-muted-foreground">
                  Página {page}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={products.data.length < limit}
                  className="transition-all duration-300 hover:scale-105"
                >
                  Próxima
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 py-16 dark:border-gray-700">
            <div className="rounded-full bg-gray-100 p-6 dark:bg-gray-800">
              <Plus className="size-12 text-gray-400 dark:text-gray-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
              Nenhum produto encontrado
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {search
                ? 'Tente ajustar seus filtros de busca.'
                : 'Comece criando seu primeiro produto.'}
            </p>
            {!search && (
              <Link href="/create-product">
                <Button className="mt-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg transition-all duration-300 hover:scale-105 hover:from-green-600 hover:to-emerald-700 hover:shadow-2xl">
                  <Plus className="mr-2 size-4" />
                  Criar Primeiro Produto
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

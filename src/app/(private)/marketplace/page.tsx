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
import { StatusProduct, formattedStatusProduct } from '@/constants/product/product-status-enum'
import { ProductService } from '@/services/product'
import { useQuery } from '@tanstack/react-query'
import { Search, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export default function MarketplacePage() {
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)
  const [status, setStatus] = useState<StatusProduct | 'ALL'>('ALL')
  const [page, setPage] = useState(1)

  const limit = 9

  const { data: products, isLoading } = useQuery<PaginatedResponse<Product>>({
    queryKey: ['marketplace', debouncedSearch, status, page],
    queryFn: async () => {
      const response = await ProductService.getList({
        status,
        page,
        search: debouncedSearch,
      })
      return response.data
    },
  })

  return (
    <div className='container py-8'>
      <div className='m-4 flex flex-col gap-6'>
        <div className='space-y-4'>
          <div className='group relative overflow-hidden rounded-lg bg-gradient-to-br from-primary to-primary/80 p-6 shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20'>
            <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

            <div className='relative flex items-center gap-4'>
              <div className='rounded-full bg-primary-foreground/20 p-3 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110'>
                <ShoppingBag className='size-8 text-primary-foreground' />
              </div>

              <div>
                <h1 className='text-3xl font-bold text-primary-foreground transition-transform duration-300 group-hover:translate-x-1'>
                  Marketplace
                </h1>
                <p className='mt-1 text-sm text-primary-foreground/90'>
                  Explore e compre produtos recicláveis disponíveis
                </p>
              </div>
            </div>

            <div className='absolute bottom-0 right-0 size-32 rounded-full bg-primary-foreground/10 blur-3xl' />
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex-1'>
            <p className='text-sm text-muted-foreground'>
              {products?.total || 0} produto(s) disponível(is)
            </p>
          </div>
        </div>

        <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-3 size-4 text-muted-foreground' />
            <Input
              placeholder='Buscar produtos disponíveis...'
              className='pl-10'
              value={search}
              disabled={isLoading}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select
            value={status}
            onValueChange={(value) => setStatus(value as StatusProduct | 'ALL')}
          >
            <SelectTrigger className='w-full sm:w-[180px]'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='ALL'>Todos</SelectItem>
              {Object.entries(formattedStatusProduct).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductSkeleton key={i} index={i} />
            ))}
          </div>
        ) : products?.total ? (
          <>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {products.data.map((product, index) => (
                <ProductItem idx={index} product={product} key={product.id} />
              ))}
            </div>

            {products.total > limit && (
              <div className='mt-8 flex justify-center gap-2'>
                <Button
                  variant='outline'
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className='transition-all duration-300 hover:scale-105'
                >
                  Anterior
                </Button>
                <span className='flex items-center px-4 text-sm text-muted-foreground'>
                  Página {page}
                </span>
                <Button
                  variant='outline'
                  onClick={() => setPage((p) => p + 1)}
                  disabled={products.data.length < limit}
                  className='transition-all duration-300 hover:scale-105'
                >
                  Próxima
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className='flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-16'>
            <div className='rounded-full bg-muted p-6'>
              <ShoppingBag className='size-12 text-muted-foreground' />
            </div>
            <h3 className='mt-4 text-lg font-semibold text-foreground'>
              Nenhum produto disponível
            </h3>
            <p className='mt-2 text-sm text-muted-foreground'>
              {search
                ? 'Tente ajustar seus filtros de busca.'
                : 'Não há produtos disponíveis no momento.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

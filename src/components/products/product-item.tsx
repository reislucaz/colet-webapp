'use client'
import { Product } from '@/@types/product'
import { productsQueryKey } from '@/constants/query-key/products-query-key'
import { coletApi } from '@/services/axios'
import { currencyFormatter } from '@/utils/format-currency'
import { queryClient } from '@/utils/query-client'
import { timeAgo } from '@/utils/time-ago'
import { Clock, Edit, Eye, MapPin, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { toast } from '../ui/use-toast'
import { useMutation } from '@tanstack/react-query'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')

export function ProductItem({ product, idx }: { product: Product; idx: number }) {
  const { mutate: deleteProduct } = useMutation({
    mutationFn: async (id: string) => {
      await coletApi.delete(`/products/${id}`)
    },
    onSuccess: async () => {
      toast({
        title: 'Produto excluído com sucesso',
      })
      await queryClient.invalidateQueries({ queryKey: [productsQueryKey.LIST_PRODUCTS] })
      await queryClient.invalidateQueries({ queryKey: [productsQueryKey.PAGED_PRODUCTS] })
    },
    onError: (error) => {
      toast({
        title: 'Erro ao excluir produto',
        variant: 'destructive',
      })
    },
  })

  const navigate = useRouter()

  return (
    <div className='group'>
      <Card
        key={product.id}
        onClick={() => navigate.push(`/products/${product.id}/details`)}
        className='relative cursor-pointer overflow-hidden border-0 bg-card shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10'
      >
        <div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

        <div className='relative aspect-video overflow-hidden'>
          {product.images && product.images.length > 0 ? (
            <Image
              src={`${BACKEND_URL}/${product.images[0].key}`}
              alt={product.name}
              fill
              className='object-cover transition-transform duration-500 group-hover:scale-105'
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center bg-muted'>
              <span className='text-sm text-muted-foreground'>Sem imagem</span>
            </div>
          )}
        </div>

        <div className='absolute left-4 top-4 z-10'>
          <span className='inline-flex items-center rounded-full bg-gradient-to-r from-green-500 to-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-lg'>
            {product?.category?.name}
          </span>
        </div>

        <div className='absolute right-4 top-4 z-10 flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100'>
          <Button
            variant='secondary'
            size='icon'
            className='size-8 bg-background/90 shadow-lg backdrop-blur-sm hover:bg-background'
            onClick={(e) => {
              e.stopPropagation()
              navigate.push(`/products/${product.id}/details`)
            }}
          >
            <Eye className='size-4' />
          </Button>
          <Button
            variant='secondary'
            size='icon'
            className='size-8 bg-background/90 shadow-lg backdrop-blur-sm hover:bg-background'
            onClick={(e) => {
              e.stopPropagation()
              navigate.push(`/products/${product.id}/edit`)
            }}
          >
            <Edit className='size-4' />
          </Button>
          <Button
            variant='destructive'
            size='icon'
            className='size-8 shadow-lg'
            onClick={(e) => {
              e.stopPropagation()
              deleteProduct(product.id)
            }}
          >
            <Trash2 className='size-4' />
          </Button>
        </div>

        <CardHeader className='pb-3 pt-4'>
          <CardTitle className='line-clamp-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary'>
            {product.name}
          </CardTitle>
          <CardDescription className='text-sm text-muted-foreground'>
            {product.description && product.description.length > 100
              ? `${product.description.substring(0, 100)}...`
              : product.description || 'Sem descrição'}
          </CardDescription>
        </CardHeader>

        <CardContent className='space-y-4'>
          <div className='flex items-center justify-between'>
            <span className='text-sm font-medium text-muted-foreground'>Preço:</span>
            <span className='text-2xl font-bold text-primary'>
              {product.price ? currencyFormatter.format(product.price) : 'Grátis'}
            </span>
          </div>

          <div className='space-y-2'>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <MapPin className='size-4' />
              <span>
                {product.city}, {product.state}
              </span>
            </div>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <Clock className='size-4' />
              <span>Publicado {timeAgo(product.createdAt)}</span>
            </div>
          </div>

          <div className='h-1 w-full rounded-full bg-gradient-to-r from-green-500 to-primary opacity-20 transition-opacity duration-300 group-hover:opacity-100' />
        </CardContent>
      </Card>
    </div>
  )
}

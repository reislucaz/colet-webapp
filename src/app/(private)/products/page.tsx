'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Plus, Search, Filter, Edit, Trash2 } from 'lucide-react'
import { timeAgo } from '@/utils/time-ago'
import { useQuery } from '@tanstack/react-query'
import { coletApi } from '@/services/axios'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { ProductSkeleton } from '@/components/ui/product-skeleton'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: {
    name: string
  }
  status: StatusProduct
  createdAt: string
}

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export default function ProductsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusProduct | 'ALL'>('ALL')
  const [page, setPage] = useState(1)
  const limit = 9

  const { data: products, isLoading } = useQuery<PaginatedResponse<Product>>({
    queryKey: ['products', search, status, page],
    queryFn: async () => {
      const response = await coletApi.get('/products/my-products', {
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

  const handleDelete = async (id: string) => {
    try {
      await coletApi.delete(`/products/${id}`)
      toast({
        title: 'Produto excluído com sucesso',
        variant: 'success',
      })
    } catch (error) {
      toast({
        title: 'Erro ao excluir produto',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Produtos</h1>
          <p className="mt-2 text-muted-foreground">
            Gerencie seus produtos e resíduos
          </p>
        </div>
        <Button asChild>
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
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : products?.total ? (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.data.map((product) => (
              <Card key={product.id} className="group relative">
                <CardHeader>
                  <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                  <CardDescription>{product.category.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Preço:</span>
                      <span className="font-medium">
                        {product.price
                          ? `R$ ${product.price.toFixed(2)}`
                          : 'Grátis'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <span
                        className={`font-medium ${
                          product.status === StatusProduct.ACTIVE
                            ? 'text-green-600'
                            : product.status === StatusProduct.INACTIVE
                              ? 'text-yellow-600'
                              : 'text-red-600'
                        }`}
                      >
                        {formattedStatusProduct[product.status]}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Criado:</span>
                      <span className="font-medium">
                        {timeAgo(new Date(product.createdAt))}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <div className="absolute right-2 top-2 hidden gap-2 group-hover:flex">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push(`/products/${product.id}/edit`)}
                  >
                    <Edit className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </Card>
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
          <Button asChild className="mt-4">
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

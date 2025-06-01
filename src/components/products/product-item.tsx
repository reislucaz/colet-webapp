'use client'
import { Product } from '@/@types/product'
import { coletApi } from '@/services/axios'
import { Edit, Eye, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { timeAgo } from '../../utils/time-ago'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { toast } from '../ui/use-toast'
import { useSession } from 'next-auth/react'

export function ProductItem({ product }: { product: Product }) {
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
  const router = useRouter()
  return (
    <div className="group">
      <Card
        key={product.id}
        onClick={() => router.push(`/products/${product.id}/details`)}
        className="relative cursor-pointer transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-accent group-hover:to-background"
      >
        <CardHeader>
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          <CardDescription>{product.category.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Preço:</span>
              <span className="font-medium">
                {product.price ? `R$ ${product.price.toFixed(2)}` : 'Grátis'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-light text-muted-foreground">Criado:</span>
              <span className="font-light">
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
    </div>
  )
}

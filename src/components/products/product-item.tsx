import { Product } from '@/@types/product'
import { coletApi } from '@/services/axios'
import { timeAgo } from '@/utils/time-ago'
import { Edit, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { toast } from '../ui/use-toast'

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
              {product.price ? `R$ ${product.price.toFixed(2)}` : 'Grátis'}
            </span>
          </div>
          {/* <div className="flex justify-between text-sm">
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
              {formattedStatusProduct?.[product.status as never]}
            </span>
          </div> */}
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
  )
}

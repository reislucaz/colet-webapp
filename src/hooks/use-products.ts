import { Product } from '@/@types/product'
import { toast } from '@/components/ui/use-toast'
import { ProductService } from '@/services/product'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export function useProducts() {
  const params = useParams()
  const id = params.id.toString()
  const updateProductMutation = useMutation({
    mutationFn: async (data: Partial<Product>) =>
      await ProductService.update(id, data),
    onSuccess: () => {
      toast({
        description: 'Produto atualizado com sucesso!',
      })
    },
  })

  return {
    updateProductMutation,
  }
}

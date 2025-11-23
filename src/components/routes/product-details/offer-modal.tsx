import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { HandCoins, Tag } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Product } from '../../../@types/product'
import { useOfferConstant } from '../../../hooks/use-offer-constant'
import { ChatService } from '../../../services/chat-service'
import { OfferService } from '../../../services/offer-service'
import { queryClient } from '../../../utils/query-client'
import { createOfferSchema, CreateOfferType } from '../../../validations/create-offer-schema'
import Loading from '../../loading'
import { FormRender } from '../../shared/form/form-field-dynamic/FormRender'
import { Button } from '../../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog'
import { formatCurrency } from '@/utils/format-currency'

export function OfferModal(product: Product) {
  const session = useSession()
  const userId = session.data?.user.id
  const { OFFER_CONSTANT } = useOfferConstant(product.price)
  const [isOpen, setIsOpen] = useState(false)
  const methods = useForm<CreateOfferType>({
    resolver: zodResolver(createOfferSchema),
  })

  const { mutateAsync: createChat, isPending: isCreatingChat } = useMutation({
    mutationFn: ChatService.create,
  })

  const { mutateAsync: createOffer, isPending: isCreatingOffer } = useMutation({
    mutationFn: async (data: { amount: number; chatId: string; productId: string }) => {
      await OfferService.create(data.chatId, data)
    },
    onSuccess: async () => {
      toast.success('Oferta criada com sucesso')
      setIsOpen(false)
      methods.reset()
      await queryClient.invalidateQueries({ queryKey: ['offers', product.id] })
    },
    onError: (error) => {
      toast.error(`Erro ao criar oferta: ${error.message}`)
    },
  })

  async function createChatAndOffer(data: { amount: number }) {
    try {
      const chat: any = await createChat({
        userId: userId!,
        productId: product.id,
        sellerId: product.authorId,
      })
      await createOffer({
        ...data,
        chatId: chat.data.id,
        productId: product.id,
      })
    } catch (error) {
      toast.error('Não foi possível iniciar a negociação.')
    }
  }

  const isPending = isCreatingOffer || isCreatingChat

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen} modal>
      <DialogTrigger asChild>
        <Button className='w-full'>
          <HandCoins className='mr-2 size-4' />
          Realizar oferta
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <HandCoins className='size-5 text-primary' />
            Faça sua oferta
          </DialogTitle>
          <DialogDescription>
            Proponha um novo valor para o produto. Uma negociação será iniciada com o vendedor.
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4 py-4'>
          <div className='flex items-center justify-between rounded-lg border bg-muted p-3'>
            <span className='text-sm font-medium text-muted-foreground'>
              Valor original do produto:
            </span>
            <span className='flex items-center font-semibold text-primary'>
              <Tag className='mr-2 size-4' />
              {formatCurrency(product.price)}
            </span>
          </div>
          <FormRender<CreateOfferType>
            constant={OFFER_CONSTANT}
            form={methods}
            onSubmit={createChatAndOffer}
            className='w-full'
          >
            <div className='mt-4 flex w-full justify-end gap-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => setIsOpen(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button type='submit' disabled={isPending} isLoading={isPending}>
                Confirmar Oferta
              </Button>
            </div>
          </FormRender>
        </div>
        {isPending && (
          <div className='absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm'>
            <Loading />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

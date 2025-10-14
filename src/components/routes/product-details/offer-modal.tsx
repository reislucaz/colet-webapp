import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Product } from '../../../@types/product'
import { useOfferConstant } from '../../../hooks/use-offer-constant'
import { ChatService } from '../../../services/chat-service'
import { OfferService } from '../../../services/offer-service'
import { queryClient } from '../../../utils/query-client'
import {
  createOfferSchema,
  CreateOfferType,
} from '../../../validations/create-offer-schema'
import Loading from '../../loading'
import { FormRender } from '../../shared/form/form-field-dynamic/FormRender'
import { Button } from '../../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../../ui/dialog'

export function OfferModal(product: Product) {
  const session = useSession()
  const userId = session.data?.user.id
  const { OFFER_CONSTANT } = useOfferConstant()
  const [isOpen, setIsOpen] = useState(false)
  const methods = useForm<CreateOfferType>({
    resolver: zodResolver(createOfferSchema),
  })

  const { mutateAsync: createChat, isPending: isCreatingChat } = useMutation({
    mutationFn: ChatService.create,
  })

  const { mutateAsync: createOffer, isPending: isCreatingOffer } = useMutation({
    mutationFn: async (data: { amount: number; chatId: string, productId: string }) => {
      await OfferService.create(data.chatId, data)
    },
    onSuccess: async () => {
      toast.success('Oferta criada com sucesso')
      setIsOpen(false)
      await queryClient.invalidateQueries({ queryKey: ['offers', product.id] })
    },
  })

  async function createChatAndOffer(data: { amount: number }) {
    return await createChat({
      userId: userId!,
      productId: product.id,
      sellerId: product.authorId,
    }).then(async (chat: any) => {
      await createOffer({ ...data, chatId: chat.data.id, productId: product.id })
    })
  }

  if (isCreatingOffer || isCreatingChat) {
    return (
      <Loading />
    )
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen} modal>
      <DialogTrigger asChild>
        <Button
          onClick={async () => {
            setIsOpen(true)
          }}
          className="w-full"
        >
          Realizar oferta
        </Button>
      </DialogTrigger>
      <DialogContent>
        <FormRender
          constant={OFFER_CONSTANT}
          form={methods}
          onSubmit={createChatAndOffer}
          className="w-full"
        >
          <div className="mt-2 flex items-center justify-end">
            <Button className="self-end">Confirmar</Button>
          </div>
        </FormRender>
      </DialogContent>
    </Dialog>
  )
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Product } from "../../../@types/product";
import { useOfferConstant } from "../../../hooks/use-offer-constant";
import { ChatService } from "../../../services/chat-service";
import { OfferService } from "../../../services/offer-service";
import { createOfferSchema, CreateOfferType } from "../../../validations/create-offer-schema";
import { FormRender } from "../../shared/form/form-field-dynamic/FormRender";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";

export function OfferModal(product: Product) {
  const session = useSession()
  const userId = session.data?.user.id
  const { OFFER_CONSTANT } = useOfferConstant();
  const [isOpen, setIsOpen] = useState(false)
  const methods = useForm<CreateOfferType>({
    resolver: zodResolver(createOfferSchema)
  })

  const { mutateAsync: createChat, isPending: isCreatingChat } = useMutation({
    mutationFn: ChatService.create
  })

  const { mutateAsync: createOffer, isPending: isCreatingOffer } = useMutation({
    mutationFn: async (data: { amount: number, chatId: string }) => {
      await OfferService.create(data.chatId, data)
    }
  })

  async function createChatAndOffer(data: { amount: number }) {
    return await createChat({
      userId: userId!,
      productId: product.id,
      sellerId: product.authorId,
    }).then(async (chat: any) => {
      console.log('chat', chat)
      await createOffer({ ...data, chatId: chat.data.id })
    })
  }

  if (isCreatingChat) {
    return <div className="w-full h-full flex items-center justify-center">
      <span className="w-full">Criando chat...</span>
    </div>
  }

  if (isCreatingOffer) {
    return <div className="w-full h-full flex items-center justify-center">
      <span className="w-full">Criando oferta...</span>
    </div>
  }

  return <Dialog onOpenChange={setIsOpen} open={isOpen} modal>
    <DialogTrigger asChild>
      <Button onClick={async () => {
        setIsOpen(true)
      }} className="w-full">Realizar oferta</Button>
    </DialogTrigger>
    <DialogContent>
      <FormRender constant={OFFER_CONSTANT} form={methods} onSubmit={createChatAndOffer} className="w-full">
        <div className="flex mt-2 items-center justify-end">
          <Button className="self-end">Confirmar</Button>
        </div>
      </FormRender>
    </DialogContent>
  </Dialog>
} 
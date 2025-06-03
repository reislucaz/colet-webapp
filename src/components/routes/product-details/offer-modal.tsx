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
  const [chatId, setChatId] = useState<string | null>(null)

  const { mutateAsync: createChat } = useMutation({
    mutationFn: ChatService.create
  })

  const { mutateAsync: createOffer } = useMutation({
    mutationFn: async (data: { amount: number }) => {
      if (chatId) {
        await OfferService.create(chatId, data)
      }
      return null
    }
  })

  return <Dialog onOpenChange={setIsOpen} open={isOpen} modal>
    <DialogTrigger asChild>
      <Button onClick={async () => {
        setIsOpen(true)
        userId && setChatId(await createChat({ buyerId: userId, productId: product.id, sellerId: product.authorId }))
        console.log(userId)
      }} className="w-full">Realizar oferta</Button>
    </DialogTrigger>
    <DialogContent>
      <FormRender constant={OFFER_CONSTANT} form={methods} onSubmit={createOffer} className="w-full">
        <div className="flex mt-2 items-center justify-end">
          <Button className="self-end">Confirmar</Button>
        </div>
      </FormRender>
    </DialogContent>
  </Dialog>
} 
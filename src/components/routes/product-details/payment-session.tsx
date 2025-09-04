'use client'
import { EmbeddedCheckout } from "@stripe/react-stripe-js"
import { Product } from "../../../@types/product"
import { Button } from "../../ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog"

export function PaymentSession({ product }: { product: Product }) {
  return (
    <Dialog>
      <DialogTrigger className="self-start">
        <Button variant='outline'>Realizar pagamento</Button>
      </DialogTrigger>
      <DialogContent>
        <EmbeddedCheckout />
      </DialogContent>
    </Dialog>
  )
}
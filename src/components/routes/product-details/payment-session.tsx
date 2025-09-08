'use client'
import Loading from "@/components/loading"
import { coletApi } from "@/services/axios"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useMutation } from "@tanstack/react-query"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Product } from "../../../@types/product"
import { Button } from "../../ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog"

export function PaymentSession({ product }: { product: Product }) {
  const [clientSecret, setClientSecret] = useState("")
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    coletApi.post('/stripe/create-payment-session', { productId: product.id })
      .then(({ data }) => setClientSecret(data))
  }, [product])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    console.log('stripe', stripe)
    console.log('elements', elements)
    if (!stripe || !elements) {
      return
    }

    const { error: submitError } = await elements.submit()

    if (submitError) {
      setErrorMessage(submitError?.message)
      setLoading(false)
      return
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3004/payment-success?amount=${product.price}`
      }
    })

    if (error) {
      setErrorMessage(error.message)
      setLoading(false)
      return
    }

    setLoading(false)
  }

  if (!clientSecret || !stripe || !elements) {
    return <Loading />
  }

  return (
    <Dialog>
      <DialogTrigger className="self-start">
        <Button variant='outline'>Realizar pagamento</Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          {clientSecret && <PaymentElement />}
          <Button>Pagar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
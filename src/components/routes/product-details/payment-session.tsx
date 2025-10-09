'use client'

import Loading from "@/components/loading"
import { coletApi } from "@/services/axios"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import { AnimatePresence } from "framer-motion"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Order } from "../../../@types/order"
import { Product } from "../../../@types/product"
import { Button } from "../../ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog"
import {
  OrderCreationStep,
  PaymentInfoStep,
  PaymentResultStep,
  StepIndicator,
  type OrderData,
  type PaymentStatus,
  type PaymentStep
} from "./order-steps"

export function PaymentSession({
  product,
  order,
  onPaymentSuccess
}: {
  product: Product,
  order?: Order,
  onPaymentSuccess?: () => void
}) {
  const [clientSecret, setClientSecret] = useState("")
  const [currentStep, setCurrentStep] = useState<PaymentStep>('order-creation')
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(null)
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (order) {
      setCurrentStep('payment-info')
      setOrderData({
        amount: order.amount,
        productId: order.product.id,
        purchaserId: order.purchaser.id ?? '',
        sellerId: order.seller.id ?? '',
        id: order.id
      })
    }
  }, [order])

  const stripe = useStripe()
  const elements = useElements()
  const { data: session } = useSession()

  // Inicializar Stripe quando o pedido for criado
  useEffect(() => {
    if (orderData && !clientSecret) {
      coletApi.post('/stripe/create-payment-session', { productId: product.id })
        .then(({ data }) => setClientSecret(data))
        .catch(() => setErrorMessage('Erro ao inicializar pagamento'))
    }
  }, [orderData, clientSecret, product.id])

  const createOrder = async () => {
    if (!session?.user?.id) {
      setErrorMessage('Usuário não autenticado')
      return
    }

    try {
      setLoading(true)
      setErrorMessage(undefined)

      const orderPayload = {
        productId: product.id,
        purchaserId: session.user.id,
        sellerId: product.authorId,
        amount: product.price,
      }

      const response = await coletApi.post('/orders', orderPayload)
      setOrderData({ ...orderPayload, id: response.data.id })
    } catch (error) {
      setErrorMessage('Erro ao criar pedido')
    } finally {
      setLoading(false)
    }
  }

  const handleNextToPayment = () => {
    if (orderData) {
      setCurrentStep('payment-info')
    }
  }

  const handleOrderUpdate = async () => {
    if (!orderData?.id) return

    try {
      await coletApi.patch(`/orders/${orderData.id}`, { status: 'FINISHED' })
      // Chama o callback de sucesso se fornecido
      if (onPaymentSuccess) {
        onPaymentSuccess()
      }
    } catch (error) {
      console.log('Erro ao atualizar pedido:', error)
    }
  }

  const handleBackToOrder = () => {
    setCurrentStep('order-creation')
  }

  const handlePaymentSubmit = async () => {
    if (!stripe || !elements || !orderData) return

    setLoading(true)
    setPaymentStatus('processing')
    setCurrentStep('payment-result')

    try {
      const { error: submitError } = await elements.submit()

      if (submitError) {
        setPaymentStatus('error')
        setErrorMessage(submitError.message)
        await deleteOrder()
        return
      }

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-result?amount=${product.price}&product=${product.name}`
        }
      })

      if (error) {
        setPaymentStatus('error')
        setErrorMessage(error.message)
        await deleteOrder()
      } else {
        setPaymentStatus('success')
        await handleOrderUpdate()
      }
    } catch (error) {
      setPaymentStatus('error')
      setErrorMessage('Erro inesperado no pagamento')
      console.log('error', error)
      await deleteOrder()
    } finally {
      setLoading(false)
    }
  }

  const deleteOrder = async () => {
    if (orderData?.id) {
      try {
        await coletApi.delete(`/orders/${orderData.id}`)
      } catch (error) {
        console.log('Erro ao deletar pedido:', error)
      }
    }
  }

  const handleCancel = async () => {
    if (currentStep === 'payment-info' && orderData) {
      await deleteOrder()
    }
    setPaymentStatus('error')
    setCurrentStep('payment-result')
  }

  const resetPayment = () => {
    setCurrentStep('order-creation')
    setPaymentStatus(null)
    setOrderData(null)
    setErrorMessage(undefined)
    setClientSecret('')
    setIsDialogOpen(false)
  }

  const handleCloseDialog = () => {
    if (orderData && currentStep !== 'payment-result') {
      // Se há um pedido criado mas não finalizado, deletar
      deleteOrder()
    }
    resetPayment()
  }

  if (!isDialogOpen) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger className="self-start">
          <Button variant='outline' className="w-full">
            {order ? 'Pagar Pedido' : 'Realizar Pagamento'}
          </Button>
        </DialogTrigger>
      </Dialog>
    )
  }

  // Loading inicial apenas se não temos dados do pedido
  if (!orderData && currentStep === 'payment-info') {
    return <Loading />
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
      <DialogTrigger className="self-start">
        <Button variant='outline' className="w-full">
          {order ? 'Pagar Pedido' : 'Realizar Pagamento'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <StepIndicator currentStep={currentStep} />

        <AnimatePresence mode="wait">
          {currentStep === 'order-creation' && (
            <OrderCreationStep
              key="order-creation"
              product={product}
              orderData={orderData}
              loading={loading}
              errorMessage={errorMessage}
              onCreateOrder={createOrder}
              onNext={handleNextToPayment}
              onCancel={handleCloseDialog}
            />
          )}

          {currentStep === 'payment-info' && orderData && (
            <PaymentInfoStep
              key="payment-info"
              product={product}
              orderData={orderData}
              clientSecret={clientSecret}
              loading={loading}
              errorMessage={errorMessage}
              onBack={handleBackToOrder}
              onSubmitPayment={handlePaymentSubmit}
              onCancel={handleCancel}
            />
          )}

          {currentStep === 'payment-result' && orderData && (
            <PaymentResultStep
              key="payment-result"
              product={product}
              orderData={orderData}
              paymentStatus={paymentStatus}
              errorMessage={errorMessage}
              onClose={resetPayment}
            />
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
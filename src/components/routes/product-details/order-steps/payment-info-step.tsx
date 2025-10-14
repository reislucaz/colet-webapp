'use client'

import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { motion } from 'framer-motion'
import { AlertCircle, ArrowLeft, CreditCard } from 'lucide-react'
import { Product } from '../../../../@types/product'
import { Button } from '../../../ui/button'
import { OrderData } from './types'

interface PaymentInfoStepProps {
  product: Product
  orderData: OrderData
  clientSecret: string
  loading: boolean
  errorMessage?: string
  onBack: () => void
  onSubmitPayment: () => void
  onCancel: () => void
}

const stepperVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
}

export function PaymentInfoStep({
  product,
  orderData,
  clientSecret,
  loading,
  errorMessage,
  onBack,
  onSubmitPayment,
  onCancel,
}: PaymentInfoStepProps) {
  const stripe = useStripe()
  const elements = useElements()

  const isPaymentReady = stripe && elements && clientSecret

  return (
    <motion.div
      variants={stepperVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <div className="mb-6 flex items-center gap-3">
        <CreditCard className="size-5 text-primary" />
        <h3 className="text-lg font-semibold">Informações de Pagamento</h3>
      </div>

      <div className="rounded-lg border bg-muted/50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-sm text-muted-foreground">
              Pedido #{orderData.id}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-primary">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </p>
          </div>
        </div>
      </div>

      {clientSecret && <PaymentElement />}

      {errorMessage && (
        <div className="flex items-center gap-2 rounded-md border border-destructive/20 bg-destructive/10 p-3">
          <AlertCircle className="size-4 text-destructive" />
          <p className="text-sm text-destructive">{errorMessage}</p>
        </div>
      )}

      <div className="flex justify-between gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="size-4" />
          Voltar
        </Button>
        <div className="flex gap-3">
          <Button variant="destructive" onClick={onCancel}>
            Cancelar Pedido
          </Button>
          <Button
            onClick={onSubmitPayment}
            disabled={!isPaymentReady || loading}
            className="flex items-center gap-2"
          >
            {loading ? (
              <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : null}
            Confirmar Pagamento
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

'use client'

import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle, X, XCircle } from "lucide-react"
import { Product } from "../../../../@types/product"
import { Button } from "../../../ui/button"
import { OrderData, PaymentStatus } from "./types"

interface PaymentResultStepProps {
  product: Product
  orderData: OrderData
  paymentStatus: PaymentStatus
  errorMessage?: string
  onClose: () => void
}

const stepperVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 }
}

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 200, damping: 15 }
  }
}

export function PaymentResultStep({
  product,
  orderData,
  paymentStatus,
  errorMessage,
  onClose
}: PaymentResultStepProps) {
  return (
    <motion.div
      variants={stepperVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="text-center space-y-6"
    >
      <AnimatePresence mode="wait">
        {paymentStatus === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="space-y-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full"
            />
            <h3 className="text-lg font-semibold">Processando Pagamento...</h3>
            <p className="text-muted-foreground">Aguarde enquanto confirmamos seu pagamento</p>
          </motion.div>
        )}

        {paymentStatus === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="space-y-4"
          >
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </motion.div>
            <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">
              Pagamento Realizado com Sucesso!
            </h3>
            <p className="text-muted-foreground">
              Seu pagamento foi processado e o vendedor foi notificado
            </p>
            <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm font-medium">Valor pago: R$ {product.price.toFixed(2).replace('.', ',')}</p>
              <p className="text-sm text-muted-foreground">Produto: {product.name}</p>
              <p className="text-xs text-muted-foreground">Pedido: #{orderData.id}</p>
            </div>
          </motion.div>
        )}

        {paymentStatus === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="space-y-4"
          >
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center"
            >
              <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </motion.div>
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
              Pagamento Não Realizado
            </h3>
            <p className="text-muted-foreground">
              {errorMessage || 'Houve um problema ao processar seu pagamento'}
            </p>
            <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400">
                O pedido foi cancelado. Tente novamente ou entre em contato com o suporte
              </p>
              {orderData.id && (
                <p className="text-xs text-muted-foreground mt-1">
                  Pedido cancelado: #{orderData.id}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {paymentStatus !== 'processing' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button onClick={onClose} className="flex items-center gap-2">
            <X className="w-4 h-4" />
            Fechar
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}

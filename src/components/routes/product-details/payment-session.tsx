'use client'
import Loading from "@/components/loading"
import { coletApi } from "@/services/axios"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle, CreditCard, DollarSign, FileText, Package, User, X, XCircle } from "lucide-react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Product } from "../../../@types/product"
import { Button } from "../../ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog"
import { Separator } from "../../ui/separator"

interface OrderData {
  id?: string
  productId: string
  purchaserId: string
  sellerId: string
  amount: number
}

type PaymentStep = 'payment-info' | 'order-confirmation' | 'payment-result'
type PaymentStatus = 'processing' | 'success' | 'error' | null

export function PaymentSession({ product }: { product: Product }) {
  const [clientSecret, setClientSecret] = useState("")
  const [currentStep, setCurrentStep] = useState<PaymentStep>('payment-info')
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(null)
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)

  const stripe = useStripe()
  const elements = useElements()
  const { data: session } = useSession()

  useEffect(() => {
    if (isDialogOpen && !clientSecret) {
      coletApi.post('/stripe/create-payment-session', { productId: product.id })
        .then(({ data }) => setClientSecret(data))
        .catch(() => setErrorMessage('Erro ao inicializar pagamento'))
    }
  }, [product, isDialogOpen, clientSecret])

  const createOrder = async () => {
    if (!session?.user?.id) {
      setErrorMessage('Usuário não autenticado')
      return
    }

    try {
      setLoading(true)
      const orderPayload = {
        productId: product.id,
        purchaserId: session.user.id,
        sellerId: product.authorId,
        amount: product.price,
      }

      // Simular criação do pedido - substituir pela API real
      const response = await coletApi.post('/orders', orderPayload)
      setOrderData({ ...orderPayload, id: response.data.id })
      setCurrentStep('order-confirmation')
    } catch (error) {
      setErrorMessage('Erro ao criar pedido')
    } finally {
      setLoading(false)
    }
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
      } else {
        setPaymentStatus('success')
      }
    } catch (error) {
      setPaymentStatus('error')
      setErrorMessage('Erro inesperado no pagamento')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setPaymentStatus('error')
    setCurrentStep('payment-result')
  }

  const resetPayment = () => {
    setCurrentStep('payment-info')
    setPaymentStatus(null)
    setOrderData(null)
    setErrorMessage(undefined)
    setIsDialogOpen(false)
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

  const StepIndicator = ({ isActive, isCompleted }: { isActive: boolean, isCompleted: boolean }) => (
    <div className="flex items-center">
      <motion.div
        className={`w-4 h-4 rounded-full flex items-center justify-center text-sm font-medium ${isCompleted ? 'bg-primary text-primary-foreground' :
          isActive ? 'bg-primary' :
            'bg-muted text-muted-foreground'
          }`}
        animate={isCompleted ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {isCompleted ? <CheckCircle className="w-4 h-4" /> : ''}
      </motion.div>
    </div>
  )

  const PaymentInfoStep = () => (
    <motion.div
      variants={stepperVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Informações de Pagamento</h3>
      </div>

      {clientSecret && <PaymentElement />}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center justify-center w-full gap-4">
          <StepIndicator
            isActive={currentStep === 'payment-info'}
            isCompleted={currentStep !== 'payment-info'}
          />
          <div className="w-12 h-px bg-border" />
          <StepIndicator
            isActive={currentStep === 'order-confirmation'}
            isCompleted={currentStep === 'payment-result'}
          />
          <div className="w-12 h-px bg-border" />
          <StepIndicator
            isActive={currentStep === 'payment-result'}
            isCompleted={false}
          />
        </div>
      </div>
      {errorMessage && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <AlertCircle className="w-4 h-4 text-destructive" />
          <p className="text-sm text-destructive">{errorMessage}</p>
        </div>
      )}

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
          Cancelar
        </Button>
        <Button
          onClick={createOrder}
          disabled={!clientSecret || loading}
          className="flex items-center gap-2"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
          Próximo
        </Button>
      </div>
    </motion.div>
  )

  const OrderConfirmationStep = () => (
    <motion.div
      variants={stepperVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Confirmação do Pedido</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
          <User className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium">Comprador</p>
            <p className="text-sm text-muted-foreground">{session?.user?.name}</p>
            <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
          <Package className="w-5 h-5 text-primary" />
          <div className="flex-1">
            <p className="font-medium">Produto</p>
            <p className="text-sm text-muted-foreground">{product.name}</p>
            <p className="text-xs text-muted-foreground">{product.city}, {product.state}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
          <DollarSign className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium">Valor Total</p>
            <p className="text-lg font-bold text-primary">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </p>
            <p className="text-sm text-muted-foreground">Cartão de Crédito</p>
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex justify-between gap-3">
        <Button
          variant="outline"
          onClick={() => setCurrentStep('payment-info')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
        <div className="flex gap-3">
          <Button variant="destructive" onClick={handleCancel}>
            Cancelar Pedido
          </Button>
          <Button
            onClick={handlePaymentSubmit}
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : null}
            Confirmar Pagamento
          </Button>
        </div>
      </div>
    </motion.div>
  )

  const PaymentResultStep = () => (
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
                Tente novamente ou entre em contato com o suporte
              </p>
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
          <Button onClick={resetPayment} className="flex items-center gap-2">
            <X className="w-4 h-4" />
            Fechar
          </Button>
        </motion.div>
      )}
    </motion.div>
  )

  if (!clientSecret && isDialogOpen) {
    return <Loading />
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="self-start">
        <Button variant='outline'>Realizar pagamento</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <AnimatePresence mode="wait">
          {currentStep === 'payment-info' && <PaymentInfoStep key="payment-info" />}
          {currentStep === 'order-confirmation' && <OrderConfirmationStep key="order-confirmation" />}
          {currentStep === 'payment-result' && <PaymentResultStep key="payment-result" />}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
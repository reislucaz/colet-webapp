'use client'

import { motion } from "framer-motion"
import { AlertCircle, ArrowRight, DollarSign, FileText, Package, User } from "lucide-react"
import { useSession } from "next-auth/react"
import { Product } from "../../../../@types/product"
import { Button } from "../../../ui/button"
import { Separator } from "../../../ui/separator"
import { OrderData } from "./types"

interface OrderCreationStepProps {
  product: Product
  orderData: OrderData | null
  loading: boolean
  errorMessage?: string
  onCreateOrder: () => void
  onNext: () => void
  onCancel: () => void
}

const stepperVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 }
}

export function OrderCreationStep({
  product,
  orderData,
  loading,
  errorMessage,
  onCreateOrder,
  onNext,
  onCancel
}: OrderCreationStepProps) {
  const { data: session } = useSession()

  return (
    <motion.div
      variants={stepperVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Criar Pedido</h3>
      </div>

      {!orderData ? (
        <div className="space-y-4">
          <div className="p-6 bg-card rounded-lg border">
            <h4 className="font-semibold mb-4">Resumo do Pedido</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Produto:</span>
                <span className="font-medium">{product.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Localização:</span>
                <span className="text-sm">{product.city}, {product.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Valor:</span>
                <span className="font-bold text-primary">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <AlertCircle className="w-4 h-4 text-destructive" />
              <p className="text-sm text-destructive">{errorMessage}</p>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button
              onClick={onCreateOrder}
              disabled={loading}
              className="flex items-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              Criar Pedido
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
              ✓ Pedido criado com sucesso!
            </p>
            <p className="text-xs text-muted-foreground">ID: {orderData.id}</p>
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
                <p className="text-sm text-muted-foreground">A ser pago via cartão</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onCancel}>
              Cancelar Pedido
            </Button>
            <Button
              onClick={onNext}
              className="flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              Prosseguir para Pagamento
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  )
}

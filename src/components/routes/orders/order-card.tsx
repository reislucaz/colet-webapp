import { Elements } from "@stripe/react-stripe-js"
import { StripeElementsOptions } from "@stripe/stripe-js"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { Order } from "../../../@types/order"
import { OrderService } from "../../../services/order-service"
import { Badge } from "../../ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { PaymentSession } from "../product-details/payment-session"

interface OrderCardProps {
  order: Order
  stripe: any
}

async function handlePaymentSuccess(order: Order) {
  await OrderService.updateStatus(order.id, 'PAID')
  toast.success('Pagamento realizado com sucesso')
}

export function OrderCard({ order, stripe }: OrderCardProps) {

  const formattedDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formattedAmount = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount)
  }

  const getStatusConfig = (status: string) => {
    const statusLower = status.toLowerCase()
    switch (statusLower) {
      case 'pending':
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-700',
          border: 'border-l-yellow-500',
          badge: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
          label: 'Pendente'
        }
      case 'finished':
        return {
          bg: 'bg-green-50',
          text: 'text-green-700',
          border: 'border-l-green-500',
          badge: 'bg-green-100 text-green-800 hover:bg-green-200',
          label: 'Finalizado'
        }
      case 'cancelled':
        return {
          bg: 'bg-red-50',
          text: 'text-red-700',
          border: 'border-l-red-500',
          badge: 'bg-red-100 text-red-800 hover:bg-red-200',
          label: 'Cancelado'
        }
      default:
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-l-blue-500',
          badge: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
          label: status
        }
    }
  }

  const statusConfig = getStatusConfig(order.status)
  const { data: session } = useSession()
  const isOwner = order.product.authorId === session?.user?.id

  return (
    <Card
      className={`${statusConfig.bg} ${statusConfig.border} border-l-4 transition-all duration-200 hover:shadow-md`}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className={`${statusConfig.text} text-xl`}>
            {formattedAmount(order.amount)}
          </CardTitle>
          <Badge className={statusConfig.badge}>
            {statusConfig.label}
          </Badge>
        </div>
        <CardDescription className="text-xs text-muted-foreground">
          Pedido #{order.id.slice(-8)}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-600">Produto:</span>
            <span className={`${statusConfig.text} font-medium`}>
              {order.product.name}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-600">Vendedor:</span>
            <span className={statusConfig.text}>
              {order.seller.name}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-600">Criado em:</span>
            <span className={statusConfig.text}>
              {formattedDate(order.createdAt)}
            </span>
          </div>
        </div>

        {order.status.toLowerCase() === 'pending' && (
          <div className="pt-3 border-t">
            <Elements
              stripe={stripe}
              options={{
                mode: 'payment',
                currency: 'brl',
                amount: (order.product.price ?? order.amount) * 100,
              } as StripeElementsOptions}
            >
              {!isOwner &&
                <PaymentSession
                  product={order.product}
                  order={order}
                  onPaymentSuccess={() => {
                    handlePaymentSuccess(order)
                  }}
                />
              }
            </Elements>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

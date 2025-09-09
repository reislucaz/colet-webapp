export interface OrderData {
  id?: string
  productId: string
  purchaserId: string
  sellerId: string
  amount: number
}

export type PaymentStep = 'order-creation' | 'payment-info' | 'payment-result'
export type PaymentStatus = 'processing' | 'success' | 'error' | null

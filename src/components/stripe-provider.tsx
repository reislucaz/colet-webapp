'use client'

import { EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { coletApi } from '../services/axios';

export function StripeProvider({ children, productId }: { children: React.ReactNode, productId: string }) {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  const fetchClientSecret = async () => {
    const { data } = await coletApi.post('/stripe/create-checkout-session', { productId })
    return data.checkoutSessionClientSecret
  }
  return <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>{children}</EmbeddedCheckoutProvider>
}
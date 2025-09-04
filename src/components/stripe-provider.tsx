'use client'

import {
  EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

export function StripeProvider({ children }: { children: React.ReactNode }) {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  const fetchClientSecret = async () => {
    const response = await fetch('/create-checkout-session', { method: 'POST' })
    const json = await response.json()
    return json.checkoutSessionClientSecret
  }
  return <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>{children}</EmbeddedCheckoutProvider>
}
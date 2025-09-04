import { Navbar } from '@/components/layout/navbar'
import { authOptions } from '@/lib/auth/auth-options'
import { Providers } from '@/providers'
import { AnimatePresence } from 'motion/react'
import * as motion from 'motion/react-client'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'
import { StripeProvider } from '../components/stripe-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Colet - Gestão de Resíduos',
  description: 'Plataforma de gestão de resíduos e coletas',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers session={session}>
          <AnimatePresence mode="popLayout">
            <StripeProvider>
              <motion.div
                animate={{
                  translateY: [-20, 0],
                  opacity: [0, 1],
                  transition: { duration: 0.5, delay: 0.2 },
                }}
                className=" bg-background"
              >
                <Navbar />
                <main>{children}</main>
              </motion.div>
            </StripeProvider>
          </AnimatePresence>
        </Providers>
      </body>
    </html>
  )
}

import { Navbar } from '@/components/layout/navbar'
import { Providers } from '@/providers'
import { AnimatePresence } from 'motion/react'
import * as motion from 'motion/react-client'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Colet - Gestão de Resíduos',
  description: 'Plataforma de gestão de resíduos e coletas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <AnimatePresence mode='popLayout'>
            <motion.div animate={{ translateY: [-20, 0], opacity: [0, 1], transition: { duration: 0.5, delay: 0.2 } }} className=" bg-background">
              <Navbar />
              <main>{children}</main>
            </motion.div>
          </AnimatePresence>
        </Providers>
      </body>
    </html>
  )
}

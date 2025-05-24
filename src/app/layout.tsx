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
            <motion.div animate={{ translateY: [-20, 0], opacity: [0, 1], transition: { duration: 0.5, delay: 0.2 } }} className="min-h-screen bg-background">
              <Navbar />
              <main className="flex-1">{children}</main>
              <footer className="border-t">
                <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                  <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                      &copy; {new Date().getFullYear()} Colet. Todos os direitos
                      reservados.
                    </p>
                  </div>
                </div>
              </footer>
            </motion.div>
          </AnimatePresence>
        </Providers>
      </body>
    </html>
  )
}

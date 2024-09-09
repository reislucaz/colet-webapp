import SessionWrapper from '@/components/session-provider'
import { Noto_Sans } from 'next/font/google'
import './globals.css'

import { Toaster } from '@/components/ui/toaster'
import { Metadata } from 'next'
import { QueryClientProvider } from '@/providers/query-client'

const mainFontFamily = Noto_Sans({
  weight: ['300', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-family-main',
})

export const metadata: Metadata = {
  title: { default: 'Colet', template: 'Colet - %s' },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" className={mainFontFamily.variable}>
      <body>
        <SessionWrapper>
          <QueryClientProvider>
            {children}
            <Toaster />
          </QueryClientProvider>
        </SessionWrapper>
        <Toaster />
      </body>
    </html>
  )
}

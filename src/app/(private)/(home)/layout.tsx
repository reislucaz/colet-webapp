import { type ReactNode } from 'react'

import ThemeContext from '@/providers/theme'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Content } from '@/components/layout/content/content'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header/header'

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <ThemeContext>
      <div className="flex min-h-screen w-full px-2 pb-5 pt-24 md:px-8">
        <TooltipProvider delayDuration={0}>
          {/* <header className="fixed left-0 top-0 z-30 w-full bg-header py-5 ">
            <div className="flex h-12 w-full items-center justify-between px-10 pt-2">
              
            </div>
          </header> */}
          <Header />
          <Content>{children}</Content>
        </TooltipProvider>
      </div>
    </ThemeContext>
  )
}

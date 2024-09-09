'use client'

import { type ReactNode } from 'react'

import { Content } from './content/content'
import { Header } from './header/header'
import { Sidebar } from './sidebar/sidebar'
import ThemeContext from '@/providers/theme'
import { TooltipProvider } from '../ui/tooltip'

type LayoutContentProps = {
  children: ReactNode
}

export function LayoutContent({ children }: LayoutContentProps) {
  return (
    <ThemeContext>
      <div className="flex min-h-screen w-full px-2 pb-5 pt-24 md:px-8">
        <TooltipProvider delayDuration={0}>
          <Sidebar />
          <Header />
          <Content>{children}</Content>
        </TooltipProvider>
      </div>
    </ThemeContext>
  )
}

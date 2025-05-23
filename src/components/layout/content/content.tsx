'use client'

import { type ReactNode } from 'react'

import { cn } from '@/utils/class-name'

export function Content({ children }: { children: ReactNode }) {
  return (
    <main
      className={cn(
        'w-full transition-all bg-background md:p-0 scrollbar-thin',
      )}
    >
      {children}
    </main>
  )
}

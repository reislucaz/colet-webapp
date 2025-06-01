'use client'

import { queryClient } from '@/utils/query-client'
import { QueryClientProvider as TanstackQueryClientProvider } from '@tanstack/react-query'

export function QueryClientProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  )
}

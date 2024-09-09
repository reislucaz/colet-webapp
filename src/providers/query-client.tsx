import { QueryClientProvider as TanstackQueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/utils/query-client'
import { ReactNode } from 'react'

export function QueryClientProvider({ children }: { children: ReactNode }) {
  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </TanstackQueryClientProvider>
  )
}

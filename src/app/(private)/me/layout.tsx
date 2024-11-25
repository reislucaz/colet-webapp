import { type ReactNode } from 'react'

import { LayoutContent } from '@/components/layout/layout-content'
import { authOptions } from '@/lib/auth/auth-options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/sign-in')
  }

  return <LayoutContent>{children}</LayoutContent>
}

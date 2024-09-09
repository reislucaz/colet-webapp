import { type ReactNode } from 'react'
import { HomeIcon } from 'lucide-react'

import { PrivateRoutes } from '@/constants/routes/private-routes'

export interface NavItem {
  title?: string
  href: string
  disabled?: boolean
  external?: boolean
  items?: NavItem[]
  icon?: ReactNode
}

export interface Shortcuts extends NavItem {
  partialKey?: string
  completeKey?: string
  items?: Shortcuts[]
}

export interface SidebarConfig {
  mainNav: NavItem[]
  sidebarNav: NavItem[]
  shortcuts: Shortcuts[]
}

export const sidebarConfig: SidebarConfig = {
  mainNav: [],
  shortcuts: [
    {
      href: '',
      title: 'Atalhos',
      items: [],
    },
  ],
  sidebarNav: [
    {
      href: '',
      items: [
        {
          title: 'Início',
          href: PrivateRoutes.HOME,
          items: [],
          icon: <HomeIcon className="size-4" />,
        },
      ],
    },
  ],
}

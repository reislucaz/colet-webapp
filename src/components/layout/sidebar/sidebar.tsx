'use client'

import { DrawerContent, Drawer, DrawerTrigger } from '@/components/ui/drawer'
import { Menu } from 'lucide-react'

import { useSidebar } from '@/hooks/layout/use-sidebar'
import { cn } from '@/utils/class-name'

import { sidebarConfig, type NavItem } from '../util/sidebar-config'
import { SidebarItem } from './sidebar-item'

export interface DocsSidebarNavProps {
  items: NavItem[]
}

export function Sidebar() {
  const { isCollapse } = useSidebar()

  return (
    <>
      <Drawer>
        <DrawerTrigger className="fixed left-0 top-1 z-50 mx-2 mt-5 flex items-start justify-start md:hidden">
          <Menu />
        </DrawerTrigger>
        <DrawerContent className="flex w-full items-center justify-center">
          <SidebarItem items={sidebarConfig.sidebarNav} />
        </DrawerContent>
      </Drawer>
      <div
        className={cn(
          'fixed left-0 top-0 z-10 hidden h-[100vh] md:block',
          isCollapse ? 'w-[80px]' : 'w-[220px]',
        )}
      >
        <SidebarItem items={sidebarConfig.sidebarNav} />
      </div>
    </>
  )
}

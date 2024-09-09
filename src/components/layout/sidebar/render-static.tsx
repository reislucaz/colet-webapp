/* eslint-disable react-hooks/rules-of-hooks */
import { usePathname } from 'next/navigation'

import { CustomLink } from '@/shared/custom-link'
import { useSidebar } from '@/hooks/layout/use-sidebar'
import { cn } from '@/utils/class-name'

import { type NavItem } from '../util/sidebar-config'

export function renderStatic(item: NavItem) {
  const { isCollapse } = useSidebar()
  const pathname = usePathname()

  return (
    <CustomLink
      className={cn(
        'flex items-center w-full gap-x-2 p-2.5 text-xs font-light dark:hover:bg-secondary',
        item?.disabled && 'cursor-not-allowed opacity-60',
        isCollapse && 'justify-center',
        pathname.endsWith(item.href) || pathname.endsWith(`${item.href}`)
          ? 'border-l-4 border-l-primary bg-background'
          : 'border-l-4 border-transparent',
      )}
      href={item?.href}
      rel={item?.external ? 'noreferrer' : ''}
      target={item?.external ? '_blank' : ''}
      title={item.title}
    >
      {item?.icon}
      {!isCollapse && <span className="font-normal">{item.title}</span>}
    </CustomLink>
  )
}

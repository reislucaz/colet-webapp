/* eslint-disable react-hooks/rules-of-hooks */
import { usePathname } from 'next/navigation'
import {
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { MoreVertical } from 'lucide-react'

import { CustomLink } from '@/shared/custom-link'
import { cn } from '@/utils/class-name'

import { type NavItem } from '../util/sidebar-config'
import { SidebarMenu } from './sidebar-menu'

export function renderTooltip(item: NavItem, parent?: NavItem) {
  const pathname = usePathname()

  if (!parent) {
    return (
      <TooltipRoot>
        <TooltipTrigger
          className={cn(
            'group flex w-full items-center justify-center rounded-md border-none px-3 py-4 transition-colors duration-300 ease-in-out hover:bg-accent',
            item?.disabled && 'cursor-not-allowed opacity-60',
            pathname.includes(item.href) &&
              'bg-primary text-white hover:bg-primary',
          )}
          title={item.title}
        >
          <span>{item.icon}</span>
          <MoreVertical className="absolute right-4" size={15} />
        </TooltipTrigger>
        <TooltipContent side="right">
          {item.items?.map((child, index) => (
            <SidebarMenu item={child} key={index} parent={item} />
          ))}
        </TooltipContent>
      </TooltipRoot>
    )
  }
  return (
    <CustomLink
      className={cn(
        'group flex w-full items-center gap-2 rounded-md border-none px-3 py-4 transition-colors duration-300 ease-in-out hover:bg-accent',
        item?.disabled && 'cursor-not-allowed opacity-60',
        pathname.endsWith(item.href) &&
          'bg-primary text-white hover:bg-primary',
      )}
      href={item?.href}
      rel={item?.external ? 'noreferrer' : ''}
      target={item?.external ? '_blank' : ''}
    >
      {item?.icon}
      <span>{item.title}</span>
    </CustomLink>
  )
}

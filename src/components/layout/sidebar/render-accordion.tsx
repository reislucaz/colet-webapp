/* eslint-disable react-hooks/rules-of-hooks */
import { usePathname } from 'next/navigation'
import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { CustomLink } from '@/shared/custom-link'
import { cn } from '@/utils/class-name'

import { type NavItem } from '../util/sidebar-config'
import { SidebarMenu } from './sidebar-menu'

export function renderAccordion(item: NavItem, parent?: NavItem) {
  const pathname = usePathname()

  if (!parent) {
    return (
      <AccordionRoot
        className={cn(
          'group flex w-full items-center rounded-md border-none px-3 transition-colors duration-300 ease-in-out',
          item?.disabled && 'cursor-not-allowed opacity-60',
        )}
        collapsible={!pathname.startsWith(`${item.href}/`)}
        disabled={item.disabled}
        type="single"
      >
        <AccordionItem className="w-full py-0" value={item.title ?? ''}>
          <AccordionTrigger className="hover:no-underline">
            <p className="inline-flex items-center justify-center gap-2 font-normal">
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </p>
          </AccordionTrigger>
          {item.items?.map((child, index) => (
            <SidebarMenu item={child} key={index} parent={item} />
          ))}
        </AccordionItem>
      </AccordionRoot>
    )
  }

  return (
    <AccordionContent className="h-10" key={item.title}>
      <CustomLink
        className={cn(
          'group flex w-full items-center rounded-md border-none p-2 transition-colors duration-300 ease-in-out hover:bg-accent',
          item?.disabled && 'cursor-not-allowed opacity-60',
          pathname.endsWith(item.href) &&
            'bg-primary text-white hover:bg-primary',
        )}
        href={item?.href}
        rel={item?.external ? 'noreferrer' : ''}
        target={item?.external ? '_blank' : ''}
      >
        <p className="inline-flex items-center gap-2 font-normal">
          <span>{item?.icon}</span>
          <span>{item.title}</span>
        </p>
      </CustomLink>
    </AccordionContent>
  )
}

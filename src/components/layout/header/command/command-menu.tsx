'use client'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from '@/components/ui/command'
import { useEffect, useState } from 'react'
import { SidebarConfig } from '../../util/sidebar-config'
import { usePathname, useRouter } from 'next/navigation'
import { CommandItem } from 'cmdk'
import { cn } from '@/utils/class-name'
import { Circle } from 'lucide-react'

interface CommandProps {
  placehoder: string
  innerPlaceholder: string
  sideBarConfig: SidebarConfig
}

export function CommandMenu({
  placehoder,
  innerPlaceholder,
  sideBarConfig,
}: CommandProps) {
  const router = useRouter()
  const pathname = usePathname()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
      sideBarConfig.shortcuts.forEach((shortcut) => {
        if (e.key === shortcut.partialKey && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          router.push(shortcut.href)
        }
      })
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  function handleNavigate(href: string) {
    setOpen(false)
    router.push(href)
  }

  return (
    <div>
      <button
        className="flex h-9 w-[300px] items-center justify-between rounded-full border-none bg-gray-100 px-4 dark:bg-black/20"
        onClick={() => setOpen((state) => !state)}
      >
        {placehoder}
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={innerPlaceholder} />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>

          {sideBarConfig.commandNav.map((item, index) => (
            <CommandGroup key={index} heading={item.title}>
              {item?.items?.map(({ icon, href, title }, index) => (
                <CommandItem
                  key={index}
                  className={cn(
                    'flex items-center border-l-4 border-transparent gap-2 my-1 text-md rounded-md transition-all hover:bg-background hover:text-foreground hover:cursor-pointer',
                    pathname === href &&
                      'border-l-4 border-primary bg-background brightness-90 hover:bg-input hover:brightness-100 rounded-l-none',
                  )}
                  onSelect={() => handleNavigate(href)}
                >
                  {icon}
                  <p className="text-[12px]">{title}</p>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
          {sideBarConfig.shortcuts.map((item, index) => (
            <CommandGroup key={index} heading={item.title}>
              {item?.items?.map(
                ({ href, title, partialKey, completeKey }, index) => (
                  <CommandItem
                    key={index}
                    className="my-1 flex items-center justify-between gap-2 rounded-md border-l-4 border-transparent transition-all hover:cursor-pointer hover:bg-background hover:text-foreground"
                    onSelect={() => handleNavigate(href)}
                  >
                    <div className="flex items-center gap-2">
                      <Circle className="!size-3" />
                      <p className="text-[12px]">{title}</p>
                    </div>
                    <kbd className="rounded-md bg-accent p-1 text-xs font-bold brightness-[80%] dark:brightness-[140%]">
                      {partialKey} + {completeKey}
                    </kbd>
                  </CommandItem>
                ),
              )}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </div>
  )
}

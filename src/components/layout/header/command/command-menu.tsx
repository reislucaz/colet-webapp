'use client'

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from '@/components/ui/command'
import { useEffect, useState } from 'react'
import { SidebarConfig } from '../../util/sidebar-config'
import { useRouter } from 'next/navigation'

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
  }, [router, sideBarConfig.shortcuts])

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
        </CommandList>
      </CommandDialog>
    </div>
  )
}

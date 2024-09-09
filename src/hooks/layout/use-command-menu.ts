import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { sidebarConfig } from '../../components/layout/util/sidebar-config'

export function useCommandMenu() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
      sidebarConfig.shortcuts.forEach((shortcut) => {
        if (e.key === shortcut.partialKey && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          router.push(shortcut.href)
        }
      })
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return {
    open,
    setOpen,
    runCommand,
  }
}

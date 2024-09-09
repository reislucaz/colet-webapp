'use client'

import { useLayoutEffect, useState } from 'react'

export function useLayoutReady() {
  const [ready, setReady] = useState(false)

  useLayoutEffect(() => {
    setReady(true)
  }, [])

  return ready
}

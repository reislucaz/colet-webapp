'use client'

import { useRouter } from 'next/navigation'
import { Button } from '../../ui/button'

export function BackButton() {
  const { push } = useRouter()

  return (
    <Button
      className="self-start"
      variant="outline"
      onClick={() => push('/products')}
    >
      Voltar
    </Button>
  )
}

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import { type ControllerRenderProps } from 'react-hook-form'

import { FormFields } from '@/@types/form-field'

interface FormFieldPasswordProps {
  field: ControllerRenderProps<any>
  slot: FormFields<any>
}

export function FormFieldPassword({ field, slot }: FormFieldPasswordProps) {
  const [showPassword, setShowPassword] = useState(false)

  function handleTogglePassword() {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className="relative">
      <Input
        className="h-12 bg-white placeholder:text-gray-400 dark:bg-background"
        disabled={slot.disabled}
        onChange={field.onChange}
        placeholder={slot.placeholder}
        type={showPassword ? 'text' : 'password'}
        value={field.value}
        width="full"
        id={field.name}
      />
      {slot.type === 'password' && (
        <Button
          className="absolute right-1 top-1/2 -translate-y-1/2"
          onClick={handleTogglePassword}
          size="icon"
          type="button"
          variant="ghost"
        >
          {showPassword ? (
            <Eye className="size-4" />
          ) : (
            <EyeOff className="size-4" />
          )}
        </Button>
      )}
    </div>
  )
}

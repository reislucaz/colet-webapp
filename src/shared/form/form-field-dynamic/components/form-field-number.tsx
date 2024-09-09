import { Input } from '@/components/ui/input'
import { type ControllerRenderProps } from 'react-hook-form'

import { type FormFields } from '@/@types/form-field'

interface FormFieldNumberProps {
  slot: FormFields<any>
  field: ControllerRenderProps<any>
}

export function FormFieldNumber({ field, slot }: FormFieldNumberProps) {
  return (
    <Input
      className="h-12  bg-white placeholder:text-gray-400 dark:bg-background"
      disabled={slot.disabled}
      inputMode="numeric"
      id={field.name}
      onChange={field.onChange}
      placeholder={slot && 'placeholder' in slot ? slot.placeholder : ''}
      type="number"
      value={field.value}
      width="full"
    />
  )
}

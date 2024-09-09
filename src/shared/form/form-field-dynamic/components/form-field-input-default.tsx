import { Input } from '@/components/ui/input'
import { type ControllerRenderProps } from 'react-hook-form'

import {
  IFormFieldInputDefaultSlot,
  type FormFields,
} from '@/@types/form-field'

interface FormFieldInputDefaultProps {
  field: ControllerRenderProps<any>
  slot: FormFields<any>
}

export function FormFieldInputDefault({
  field,
  slot,
}: FormFieldInputDefaultProps) {
  const { autoComplete } = slot as IFormFieldInputDefaultSlot

  return (
    <Input
      className="h-12 bg-white placeholder:text-gray-400 dark:bg-background"
      id={field.name as string}
      disabled={slot.disabled}
      autoComplete={autoComplete ?? 'off'}
      onChange={field.onChange}
      placeholder={'placeholder' in slot ? slot.placeholder : ''}
      value={field.value}
      width="full"
    />
  )
}

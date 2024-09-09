import { Switch } from '@/components/ui/switch'
import { type ControllerRenderProps } from 'react-hook-form'

import { type IFormFieldSwitchSlot } from '@/@types/form-field'

interface FormFieldSwitchProps {
  field: ControllerRenderProps<any>
  slot: IFormFieldSwitchSlot
}

export function FormFieldSwitch({ field }: FormFieldSwitchProps) {
  return (
    <Switch
      id={field.name}
      defaultChecked={field.value}
      onCheckedChange={field.onChange}
      value={field.value}
    />
  )
}

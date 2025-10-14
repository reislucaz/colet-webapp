import { IFormFieldSlot } from '@/@types/form-field'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface RenderFieldProps<T> {
  form: any
  slot: IFormFieldSlot<T | any>
}

export function RenderField<T>({ form, slot }: RenderFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={slot.name as string}
      render={({ field }) => (
        <FormItem>
          {slot.label && <FormLabel>{slot.label}</FormLabel>}
          <FormControl>
            <Input
              {...field}
              type={slot.type}
              placeholder={slot.placeholder}
              disabled={slot.disabled}
              className={slot.className}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

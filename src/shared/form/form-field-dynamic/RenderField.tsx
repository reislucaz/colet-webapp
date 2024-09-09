import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { type UseFormReturn } from 'react-hook-form'

import { FormFields } from '@/@types/form-field'
import { cn } from '@/utils/class-name'

import { FormMessage } from '../form-message'
import { FormFieldDynamic } from './form-field-dynamic'

interface RenderFieldProps<T> {
  form: UseFormReturn<T | any>
  slot: FormFields<any>
}

export function RenderField<T>({ form, slot }: RenderFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      key={slot.name as string}
      name={slot.name as string}
      render={({ field }) => {
        return (
          <FormItem className={cn('className' in slot && slot.className)}>
            <FormLabel className="font-normal" htmlFor={slot.name as string}>
              {'label' in slot ? slot.label : null}
            </FormLabel>
            <FormControl>
              <FormFieldDynamic<T> field={field} slot={slot} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

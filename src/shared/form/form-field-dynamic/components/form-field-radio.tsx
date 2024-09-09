import { FormControl, FormItem, FormLabel } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { type ControllerRenderProps } from 'react-hook-form'

import { type IFormFieldRadioSlot } from '@/@types/form-field'
import { cn } from '@/utils/class-name'

interface FormFieldRadioProps {
  slot: IFormFieldRadioSlot
  field: ControllerRenderProps<any>
}

export function FormFieldRadio({ field, slot }: FormFieldRadioProps) {
  return (
    <RadioGroup
      className={cn(
        'options' in slot && slot.options.length > 2
          ? 'space-y-2'
          : 'flex justify-start gap-4',
      )}
      onValueChange={field.onChange}
      value={field.value}
    >
      {'options' in slot &&
        slot.options?.map((option) => (
          <FormItem
            className="flex w-auto items-center space-x-2"
            key={option.value.toString()}
          >
            <FormControl>
              <RadioGroupItem
                aria-label={option.translateKey}
                title={option.translateKey}
                value={option.value as any}
              />
            </FormControl>
            <FormLabel
              className="cursor-pointer font-normal"
              title={option.translateKey}
            >
              {option.translateKey}
            </FormLabel>
          </FormItem>
        ))}
    </RadioGroup>
  )
}

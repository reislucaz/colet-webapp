import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type ControllerRenderProps } from 'react-hook-form'

import { type IFormFieldSelectSlot } from '@/@types/form-field'

interface FormFieldSelectProps {
  field: ControllerRenderProps<any>
  slot: IFormFieldSelectSlot
}

export function FormFieldSelect({ field, slot }: FormFieldSelectProps) {
  return (
    <Select
      disabled={slot.disabled}
      onValueChange={field.onChange}
      value={field.value}
    >
      <SelectTrigger
        id={field.name}
        className="h-12 bg-white dark:bg-background [&[data-placeholder='']]:text-gray-300 dark:[&[data-placeholder='']]:text-gray-600"
      >
        <SelectValue
          placeholder={
            <span className="text-gray-400">{slot.placeHolder}</span> ?? ''
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="max-h-52">
          {slot.options.map((item, index) => {
            return (
              <SelectItem key={index} value={String(item.value)}>
                {item.label}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

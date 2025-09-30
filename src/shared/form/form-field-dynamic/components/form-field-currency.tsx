import CurrencyInput from 'react-currency-input-field'
import { type ControllerRenderProps } from 'react-hook-form'

import { IFormFieldCurrencySlot, type FormFields } from '@/@types/form-field'

interface FormFieldCurrencyProps {
  field: ControllerRenderProps<any>
  slot: FormFields<any>
}

export function FormFieldCurrency({ field, slot }: FormFieldCurrencyProps) {
  const { currency = 'BRL' } = slot as IFormFieldCurrencySlot

  return (
    <div className="relative">
      <CurrencyInput
        id={field.name as string}
        name={field.name as string}
        placeholder={slot.placeholder || '0,00'}
        value={field.value}
        onValueChange={(value) => {
          field.onChange(value || '')
        }}
        decimalsLimit={2}
        decimalSeparator=","
        groupSeparator="."
        prefix={currency === 'BRL' ? 'R$' : currency}
        disabled={slot.disabled}
        className="h-12 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-background"
      />
    </div>
  )
}

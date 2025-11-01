import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { type ControllerRenderProps } from 'react-hook-form'

import { type FormFields } from '@/@types/form-field'

import { FormFieldCombobox } from './components/form-field-combobox'
import { FormFieldCurrency } from './components/form-field-currency'
import { FormFieldInputDefault } from './components/form-field-input-default'
import { FormFieldMaskedInput } from './components/form-field-masked-input'
import { FormFieldNumber } from './components/form-field-number'
import { FormFieldPassword } from './components/form-field-password'
import { FormFieldRadio } from './components/form-field-radio'
import { FormFieldRangeDatePicker } from './components/form-field-range-date-picker'
import { FormFieldSelect } from './components/form-field-select'
import { FormFieldSingleDatePicker } from './components/form-field-single-date-picker'
import { FormFieldSwitch } from './components/form-field-switch'
import { FormFieldTextarea } from './components/form-field-textarea'

interface Props<T> {
  field: ControllerRenderProps<T | any>
  slot: FormFields<any>
}

export function FormFieldDynamic<T>({ field, slot }: Props<T | any>) {
  switch (slot.type) {
    case 'masked':
      return (
        <FormFieldMaskedInput
          {...field}
          {...(slot as any)}
          onChange={(e) => {
            slot.onChange?.(e)
            field.onChange(e)
          }}
          autoComplete={slot.autoComplete}
          title={slot.label}
          value={field.value ?? ''}
        />
      )
    case 'radio':
      return <FormFieldRadio field={field} slot={slot} />
    case 'select':
      return slot?.isLoading ? (
        <Skeleton className="h-8" />
      ) : (
        <FormFieldSelect field={field} slot={slot} />
      )
    case 'switch':
      return <FormFieldSwitch field={field} slot={slot} />
    case 'textarea':
      return <FormFieldTextarea field={field} slot={slot} />
    case 'number':
      return <FormFieldNumber field={field} slot={slot} />
    case 'password':
      return <FormFieldPassword field={field} slot={slot} />
    case 'hidden':
      return <Input {...field} type="hidden" />
    case 'combobox':
      return <FormFieldCombobox field={field} slot={slot} />
    case 'currency':
      return <FormFieldCurrency field={field} slot={slot} />
    case 'date-range':
      return (
        <FormFieldRangeDatePicker
          date={field.value}
          disabled={slot.disabled}
          placeholder={slot.placeholder}
          setDate={field.onChange}
        />
      )
    case 'date-single':
      return (
        <FormFieldSingleDatePicker
          date={field.value}
          disabled={slot.disabled}
          placeholder={slot.placeholder}
          setDate={field.onChange}
        />
      )
    default:
      return slot.isLoading ? (
        <Skeleton className="h-8" />
      ) : (
        <FormFieldInputDefault field={field} slot={slot} />
      )
  }
}

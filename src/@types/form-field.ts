/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-undef */
import { FieldValues, UseFormReturn } from 'react-hook-form'

export type FormRadioOption = {
  value: string | number | boolean
  translateKey: string
}

export type SelectOptions = {
  label: string
  value: string | number
}

export type IFormMaskedInputSlot = {
  className?: string
  readOnly?: boolean
  required?: boolean
  disabled?: boolean
  label?: string
  value?: string | number
  placeholder?: string
  onChange?: (value: string) => void
  onBlur?: (value: string) => void
  mask?: any
  title?: string
  autoComplete?: string
  type: 'masked'
}

export type IFormFieldComboboxSlot = {
  label: string
  className?: string
  type: 'combobox'
  placeholder?: string
  loading?: boolean
  multiple: boolean
  options: SelectOptions[]
  contentSize?: string
  addCombobox?: boolean
  addComboboxFn?: Function
  onInputChange?: (value: string) => void
}

export type IFormFieldRadioSlot = {
  label: string
  className?: string
  type: 'radio'
  options: FormRadioOption[]
}

export type IFormFieldSelectSlot = {
  label: string
  className?: string
  type: 'select'
  options: SelectOptions[]
  isLoading?: boolean
  placeHolder?: string
  disabled?: boolean
}

export type IFormFieldSelectTextareaSlot = {
  label: string
  className?: string
  placeholder: string
  type?: 'textarea'
  disabled?: boolean
}

export type IFormFieldDateSingleSlot = {
  label: string
  placeholder: string
  className?: string
  type: 'date-single'
  mode?: 'default' | 'range' | 'single'
}

export type IFormFieldDateRangeSlot = {
  label: string
  placeholder: string
  className?: string
  type: 'date-range'
  mode?: 'default' | 'range' | 'single'
}

export interface IFormFieldInputDefaultSlot {
  type?: string
  className?: string
  disabled?: boolean
  isLoading?: boolean
  placeholder?: string
}

export type IFormFieldSwitchSlot = {
  label: string
  className?: string
  type?: 'switch'
  disabled?: boolean
}

export type FormFields<T> = {
  name: keyof T
  disabled?: boolean
  label?: string
  isLoading?: boolean
  placeholder?: string
} & (
  | IFormFieldInputDefaultSlot
  | IFormMaskedInputSlot
  | IFormFieldSelectTextareaSlot
  | IFormFieldRadioSlot
  | IFormFieldSelectSlot
  | IFormFieldComboboxSlot
  | IFormFieldDateRangeSlot
  | IFormFieldDateSingleSlot
  | IFormFieldSwitchSlot
  | {
      type: 'hidden'
    }
)

export interface IFormFieldSlot<T extends FieldValues> {
  name: keyof T
  label?: string
  disabled?: boolean
  isLoading?: boolean
  placeholder?: string
  className?: string
  type?: string
  options?: SelectOptions[]
}

export type FormFieldsConstant<T extends FieldValues> = IFormFieldSlot<T>[]

export interface IFormRenderProps<T extends FieldValues> {
  form: UseFormReturn<T>
  constant: FormFieldsConstant<T>
  onSubmit: (data: T) => void
  children?: React.ReactNode
  className?: string
}

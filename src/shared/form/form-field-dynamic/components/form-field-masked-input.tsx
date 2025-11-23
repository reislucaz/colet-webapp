'use client'

import {
  forwardRef,
  useEffect,
  useRef,
  type ChangeEvent,
  type FocusEvent,
  type ForwardedRef,
} from 'react'
import { Input } from '@/components/ui/input'
import IMask, { type InputMask } from 'imask'

import { type masker } from '@/utils/masker'

type Props = {
  className?: string
  readOnly?: boolean
  required?: boolean
  disabled?: boolean
  label?: string
  value?: string
  name: string | number | symbol
  placeholder?: string
  onChange?: (value: string) => void
  onBlur?: (value: string) => void
  mask?: ReturnType<typeof masker>
  type?: string
  title?: string
  autoComplete?: string
}

export const FormFieldMaskedInput = forwardRef(
  (
    { mask, onChange, onBlur, value, ...props }: Props,

    _: ForwardedRef<HTMLInputElement | null>,
  ) => {
    const inputRef = useRef(null)
    const maskRef = useRef<InputMask<any> | null>(null)

    function handleOnBlur(e: FocusEvent<HTMLInputElement>) {
      onBlur?.(mask?.unmask(e.target.value) || e.target.value)
    }

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
      onChange?.(mask?.unmask(e.target.value) || e.target.value)
    }

    useEffect(() => {
      if (inputRef.current) {
        maskRef.current = IMask(
          inputRef.current,
          mask?.config ?? {
            mask: String,
          },
        )

        if (value !== undefined && value !== null && value !== '') {
          maskRef.current.value = mask?.mask(String(value)) ?? String(value)
        }

        return () => {
          maskRef.current?.destroy()
        }
      }
    }, [mask, value])

    return (
      <Input
        {...props}
        autoComplete={props.autoComplete ?? 'off'}
        className="h-12 bg-white placeholder:text-gray-400 disabled:opacity-80 dark:bg-background"
        name={String(props.name)}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        id={props.name as string}
        ref={inputRef}
      />
    )
  },
)

FormFieldMaskedInput.displayName = 'FormFieldMaskedInput'

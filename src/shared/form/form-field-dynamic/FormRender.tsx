import { type ReactNode } from 'react'
import { FormProvider, type UseFormReturn } from 'react-hook-form'

import { cn } from '@/utils/class-name'

import { RenderField } from './RenderField'
import { FormFieldsConstant } from '@/@types/form-field'

type Props<T> = {
  form: UseFormReturn<T | any>
  constant: FormFieldsConstant<T | any>
  onSubmit?: (data: any) => void
  children?: ReactNode
  className?: string
}

export function FormRender<T>({
  constant,
  form,
  onSubmit,
  children,
  className,
}: Props<T>) {
  return (
    <FormProvider {...form}>
      <form
        className={cn(className, 'space-y-4')}
        onSubmit={form.handleSubmit((data) => onSubmit?.(data))}
      >
        {constant.map((slot, key) => {
          if (Array.isArray(slot)) {
            return (
              <div key={key} className="grid grid-cols-12 items-baseline gap-4">
                {slot.map((s) => (
                  <RenderField<T> form={form} key={s.name as string} slot={s} />
                ))}
              </div>
            )
          }
          return <RenderField<T> form={form} key={key} slot={slot} />
        })}
        {children}
      </form>
    </FormProvider>
  )
}

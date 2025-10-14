import { IFormRenderProps } from '@/@types/form-field'
import { FormProvider } from 'react-hook-form'
import { RenderField } from './RenderField'

export function FormRender<T>({
  form,
  constant,
  onSubmit,
  children,
  className,
}: IFormRenderProps<T | any>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        <div className="grid gap-4">
          {constant.map((slot, index) => (
            <RenderField key={index} form={form} slot={slot} />
          ))}
        </div>
        {children}
      </form>
    </FormProvider>
  )
}

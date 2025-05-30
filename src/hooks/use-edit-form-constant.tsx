import { FormFieldsConstant } from '@/@types/form-field'
import { EditProductSchemaType } from '../validations/edit-product-schema'

export function useEditFormConstant() {
  const EDIT_FORM_CONSTANT: FormFieldsConstant<EditProductSchemaType> = [
    {
      name: 'name',
      label: 'Nome do produto',
      type: 'text',
      placeholder: 'Digite o nome do produto',
      className: 'col-span-full',
    },
    {
      name: 'price',
      label: 'Preço',
      type: 'number',
      placeholder: 'Digite o preço do produto',
      className: 'col-span-full',
    },
    {
      name: 'description',
      label: 'Descrição',
      type: 'textarea',
      placeholder: 'Digite a descrição do produto',
      className: 'col-span-full',
    },
    {
      name: 'neighborhood',
      label: 'Bairro',
      type: 'text',
      placeholder: 'Digite o bairro onde o produto está localizado',
      className: 'col-span-full',
    },
    {
      name: 'city',
      label: 'Cidade',
      type: 'text',
      placeholder: 'Digite a cidade onde o produto está localizado',
      className: 'col-span-full',
    },
    {
      name: 'state',
      label: 'Estado',
      type: 'text',
      placeholder: 'Digite o estado onde o produto está localizado',
      className: 'col-span-full',
    },
    {
      name: 'images',
      label: 'Imagens do produto',
      type: 'file', // Assuming you have a file input handler
      className: 'col-span-full',
    },
  ]

  return {
    EDIT_FORM_CONSTANT,
  }
}

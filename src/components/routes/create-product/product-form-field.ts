import { FormFieldsConstant, IFormFieldSelectSlot } from '@/@types/form-field'
import { States } from '@/constants/state'
import {
  CreateProductInput,
  createProductSchema,
  CreateProductType,
} from '@/validations/create-product-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

export function useProductFormField() {
  const form = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
  })

  const [categories, setCategories] = useState<
    {
      value: string
      label: string
    }[]
  >([])

  // convert states enum to array of objects
  const states = Object.values(States).map((value) => ({
    value,
    label: value,
  }))

  const PRODUCT_FORM_FIELD: FormFieldsConstant<CreateProductType> = [
    {
      name: 'name',
      label: 'Nome do Produto',
      className: 'col-span-full',
      placeholder: 'Ex: Coleta de Óleo Usado',
      type: 'text',
    },
    {
      name: 'category',
      label: 'Categoria',
      className: 'col-span-full',
      placeholder: 'Ex: Óleo de Cozinha',
      type: 'select',
      options: categories,
    },
    {
      name: 'description',
      label: 'Descrição',
      className: 'col-span-full',
      placeholder: 'Ex: Serviço de coleta de óleo de cozinha usado.',
      type: 'text',
    },
    {
      name: 'price',
      label: 'Preço',
      className: 'col-span-6',
      placeholder: 'Ex: 29.99',
      type: 'number',
    },
    {
      name: 'recurring',
      label: 'É Recorrente?',
      className: 'col-span-6',
      type: 'switch',
    },
    {
      name: 'neighborhood',
      label: 'Bairro',
      className: 'col-span-4',
      placeholder: 'Ex: Vila Mariana',
      type: 'text',
    },
    {
      name: 'city',
      label: 'Cidade',
      className: 'col-span-4',
      placeholder: 'Ex: São Paulo',
      type: 'text',
    },
    {
      name: 'state',
      label: 'Estado',
      className: 'col-span-4',
      placeholder: 'Ex: SP',
      type: 'select',
      options: states,
    },
  ]

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + '/categories',
        )
        const data = await response.json()

        setCategories(
          data.data.map((category: { name: string; id: string }) => ({
            value: category.id,
            label: category.name,
          })),
        )
      } catch (error) {
        console.error('Erro ao buscar categorias:', error)
      }
    }

    fetchCategories()
  }, []) // Array vazio significa que só executa uma vez na montagem do componente

  return {
    form,
    PRODUCT_FORM_FIELD,
  }
}

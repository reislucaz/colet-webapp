import { FormFieldsConstant } from '../@types/form-field'
import { CreateOfferType } from '../validations/create-offer-schema'
import { formatCurrency } from '@/utils/format-currency'

export function useOfferConstant(originalPrice: number) {
  const OFFER_CONSTANT: FormFieldsConstant<CreateOfferType> = [
    {
      name: 'amount',
      label: 'Sua oferta',
      type: 'currency',
      placeholder: `Ex: ${formatCurrency(originalPrice * 0.9)}`,
      className: 'col-span-full',
    },
  ]

  return {
    OFFER_CONSTANT,
  }
}

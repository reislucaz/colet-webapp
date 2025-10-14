import { FormFieldsConstant } from '../@types/form-field'
import { CreateOfferType } from '../validations/create-offer-schema'

export function useOfferConstant() {
  const OFFER_CONSTANT: FormFieldsConstant<CreateOfferType> = [
    {
      name: 'amount',
      label: 'Valor da oferta',
      type: 'number',
      placeholder: 'Digite o valor da oferta',
      className: 'col-span-full',
    },
  ]

  return {
    OFFER_CONSTANT,
  }
}

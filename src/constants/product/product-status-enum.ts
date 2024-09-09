export enum StatusProduct {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

export type FormattedStatusProduct = {
  [key in StatusProduct]: string
}

export const formattedStatusProduct: FormattedStatusProduct = {
  [StatusProduct.ACTIVE]: 'Ativo',
  [StatusProduct.INACTIVE]: 'Inativo',
  [StatusProduct.OUT_OF_STOCK]: 'Fora de estoque',
}

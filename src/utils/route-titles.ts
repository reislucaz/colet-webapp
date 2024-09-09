import { PrivateRoutes } from '@/constants/routes/private-routes'

export type RouteTitles = {
  [key in PrivateRoutes]: string
}

export const routeTitles: RouteTitles = {
  [PrivateRoutes.HOME]: 'Início',
  [PrivateRoutes.CATEGORY]: 'Categorias',
  [PrivateRoutes.COMPANY]: 'Empresa',
  [PrivateRoutes.PROFILE]: 'Perfil',
  [PrivateRoutes.PRODUCT]: 'Produto',
  [PrivateRoutes.CREATE_PRODUCT]: 'Criação de produto',
}

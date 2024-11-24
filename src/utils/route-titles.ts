import { PrivateRoutes } from '@/constants/routes/private-routes'

export type RouteTitles = {
  [key in PrivateRoutes]: string
}

export const routeTitles: RouteTitles = {
  [PrivateRoutes.HOME]: 'Início',
  [PrivateRoutes.PRODUCT]: 'Categorias',
}

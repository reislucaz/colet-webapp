import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { PrivateRoutes } from '@/constants/routes/private-routes'
import { routeTitles } from './route-titles'

const defaultTitle = 'Aplicação'

export function usePageTitle() {
  const [title, setTitle] = useState('')
  const pathname = usePathname()
  const slicedPathname = pathname.split('/').map((item) => `/${item}`)

  useEffect(() => {
    const newTitle =
      routeTitles[slicedPathname[slicedPathname.length - 1] as PrivateRoutes] ||
      defaultTitle
    setTitle(newTitle)
  }, [slicedPathname])

  return title
}

'use client'
import { cn } from '@/utils/class-name'
import { HeaderContent } from './header-content'
import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  // const pageTitle = usePageTitle()
  // const pathname = usePathname()

  // const breadcrumb = pathname === '/' ? [] : pathname.split('/')

  return (
    <header
      className={cn(
        'fixed left-0 top-0 z-30 w-full py-5 bg-background/60 backdrop-blur-sm',
        // isCollapse
        //   ? 'md:ml-[80px] md:max-w-[calc(100vw_-_80px)]'
        //   : 'md:ml-[220px] md:max-w-[calc(100vw_-_220px)]',
      )}
    >
      <div className="flex h-12 w-full items-center justify-between px-10 pt-2">
        <div className="flex items-center justify-center">
          {/* <div className="space-y-1">
            <Breadcrumb>
              <BreadcrumbList className="text-sm text-gray-400">
                {breadcrumb.length === 0 ? (
                  <React.Fragment>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href={PrivateRoutes.HOME}>
                          {routeTitles[PrivateRoutes.HOME]}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {breadcrumb[1] && <BreadcrumbSeparator />}
                  </React.Fragment>
                ) : (
                  breadcrumb.map((item, index, arr) => (
                    <React.Fragment key={item}>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link href={`/${item}`}>
                            {routeTitles[`/${item}` as PrivateRoutes]}
                          </Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {arr[index + 1] && <BreadcrumbSeparator />}
                    </React.Fragment>
                  ))
                )}
              </BreadcrumbList>
            </Breadcrumb>
            <h3 className="mt-2 text-2xl font-semibold text-textPrimary">
              {pageTitle}
            </h3>
          </div> */}
          <div className="w-40">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo - Colet"
                width={200}
                height={160}
                sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                style={{ height: '100%', width: '100%' }}
              />
            </Link>
          </div>
        </div>

        <nav className="flex items-center justify-center gap-3">
          <HeaderContent />
        </nav>
      </div>
    </header>
  )
}

import { type AnchorHTMLAttributes, type ReactNode } from 'react'
import Link from 'next/link'

interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  locale?: string
  prefetch?: boolean
  children: ReactNode
}

export function CustomLink({
  href,
  locale,
  children,
  prefetch = false,
  ...props
}: CustomLinkProps) {
  return (
    <Link href={href} locale={locale} prefetch={prefetch} {...props}>
      {children}
    </Link>
  )
}

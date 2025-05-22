'use client'

import { JSX, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/utils/class-name'
import { PrivateRoutes } from '@/constants/routes/private-routes'
import { PublicRoutes } from '@/constants/routes/public-routes'
import {
  Home,
  MessageSquare,
  Package,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Image from 'next/image'
import { ModeToggle } from './header/mode-toggle'

const navigation = [
  { name: 'Início', href: PrivateRoutes.HOME, icon: Home },
  { name: 'Produtos', href: PrivateRoutes.PRODUCTS, icon: Package },
  { name: 'Mensagens', href: PrivateRoutes.CHAT, icon: MessageSquare },
]

function Logo() {
  return (
    <Link href="/">
      <Image
        src="/logo.png"
        alt="Logo - Colet"
        width={75}
        height={75}
        style={{ height: '100%', width: '100%' }}
      />
    </Link>
  )
}

export function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isAuthPage = [PublicRoutes.SIGN_IN, PublicRoutes.REGISTER].includes(
    pathname as PublicRoutes,
  )

  if (isAuthPage) return null

  if (!session) {
    return (
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between gap-2 py-6">
          <Logo />
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link href={PublicRoutes.SIGN_IN}>
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link href={PublicRoutes.REGISTER}>
              <Button>Criar Conta</Button>
            </Link>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <div className="ml-auto hidden md:flex md:gap-6">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary',
                  isActive ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                <item.icon className="size-4" />
                {item.name}
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex items-center gap-4">
          {/* User Menu */}
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative size-8 rounded-full">
                <Avatar className="size-8">
                  <AvatarImage
                    src={session.user?.image || ''}
                    alt={session.user?.name || ''}
                  />
                  <AvatarFallback>
                    {session.user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {session.user?.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session.user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={PrivateRoutes.PROFILE} className="cursor-pointer">
                  <User className="mr-2 size-4" />
                  <span>Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer text-red-600"
                onClick={() => signOut()}
              >
                <LogOut className="mr-2 size-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary',
                        isActive ? 'text-primary' : 'text-muted-foreground',
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="size-4" />
                      {item.name}
                    </Link>
                  )
                })}
                <div className="mt-4 border-t pt-4">
                  <Link
                    href={PrivateRoutes.PROFILE}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="size-4" />
                    Perfil
                  </Link>
                  <button
                    className="mt-2 flex w-full items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700"
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      signOut()
                    }}
                  >
                    <LogOut className="size-4" />
                    Sair
                  </button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

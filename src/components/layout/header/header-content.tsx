import { ModeToggle } from './mode-toggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import { fallback } from '@/utils/fallback'

export function HeaderContent() {
  const { data: session } = useSession()

  const userPhoto = session?.user?.image
  const username = session?.user?.name

  function handleSignOut() {
    signOut()
  }

  return (
    <div className="flex items-center justify-center space-x-4 rounded-full bg-accent py-2 pl-4 pr-6 shadow-default">
      <p>Colet</p>
      <ModeToggle />
      <Button size="icon" variant="link" onClick={handleSignOut}>
        <LogOut className="size-5" />
      </Button>
      <button className="rounded-full">
        <Avatar className="size-7">
          {userPhoto ? (
            <AvatarImage src={userPhoto} />
          ) : (
            username && <AvatarFallback>{fallback(username)}</AvatarFallback>
          )}
        </Avatar>
      </button>
    </div>
  )
}

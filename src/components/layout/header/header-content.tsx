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
    <div className="flex items-center justify-center space-x-4 rounded-full bg-accent px-4 py-2 shadow-default">
      <ModeToggle />
      {/* <Button
        size="icon"
        className="text-foreground"
        variant="link"
        onClick={handleSignOut}
      >
        <LogOut className="size-5" />
      </Button>
      <button className="rounded-full text-foreground">
        <Avatar className="size-7">
          {userPhoto ? (
            <AvatarImage src={userPhoto} />
          ) : (
            username && <AvatarFallback>{fallback(username)}</AvatarFallback>
          )}
        </Avatar>
      </button> */}
    </div>
  )
}

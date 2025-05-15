import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Search, Send } from 'lucide-react'

export default function MessagesPage() {
  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mensagens</h1>
          <p className="mt-2 text-muted-foreground">
            Gerencie suas conversas e mensagens
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-12">
        <Card className="md:col-span-4">
          <CardHeader>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
              <Input placeholder="Buscar conversas..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex cursor-pointer items-center gap-4 rounded-lg p-2 hover:bg-muted"
                >
                  <Avatar>
                    <AvatarImage src={`https://avatar.vercel.sh/user${i}`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium leading-none">
                      Usuário {i}
                    </p>
                    <p className="truncate text-sm text-muted-foreground">
                      Última mensagem da conversa...
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {i}h atrás
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-8">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://avatar.vercel.sh/user1" />
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>Usuário 1</CardTitle>
                <CardDescription>Online</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] space-y-4 overflow-y-auto">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`flex gap-4 ${
                    i % 2 === 0 ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {i % 2 === 0 && (
                    <Avatar>
                      <AvatarImage src="https://avatar.vercel.sh/me" />
                      <AvatarFallback>ME</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-4 ${
                      i % 2 === 0
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">
                      Mensagem de exemplo {i}. Esta é uma mensagem de teste para
                      demonstrar o layout da conversa.
                    </p>
                    <p className="mt-1 text-xs opacity-70">{i}:00</p>
                  </div>
                  {i % 2 !== 0 && (
                    <Avatar>
                      <AvatarImage src="https://avatar.vercel.sh/user1" />
                      <AvatarFallback>U1</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <Input placeholder="Digite sua mensagem..." className="flex-1" />
              <Button>
                <Send className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

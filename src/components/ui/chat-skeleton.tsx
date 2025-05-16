import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function ChatSkeleton() {
  return (
    <div className="flex h-[calc(100vh-200px)] w-full gap-4">
      {/* Chat list skeleton */}
      <div className="h-full w-1/4 overflow-y-auto rounded-lg border">
        <div className="border-b p-4 font-medium">Conversas</div>
        <div className="space-y-4 p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="animate-pulse bg-muted" />
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted" />
                <div className="h-3 w-1/2 animate-pulse rounded-md bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat messages skeleton */}
      <Card className="flex h-full w-3/4 flex-col">
        <div className="border-b p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="animate-pulse bg-muted" />
            </Avatar>
            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse rounded-md bg-muted" />
              <div className="h-3 w-24 animate-pulse rounded-md bg-muted" />
            </div>
          </div>
        </div>
        <CardContent className="flex-1 space-y-4 overflow-y-auto p-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`h-16 w-48 animate-pulse rounded-lg ${
                  i % 2 === 0 ? 'bg-primary/20' : 'bg-muted'
                }`}
              />
            </div>
          ))}
        </CardContent>
        <div className="border-t p-4">
          <div className="flex gap-2">
            <div className="h-10 flex-1 animate-pulse rounded-md bg-muted" />
            <div className="h-10 w-24 animate-pulse rounded-md bg-muted" />
          </div>
        </div>
      </Card>
    </div>
  )
}

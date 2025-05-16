import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function FormSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-8 w-1/3 animate-pulse rounded-md bg-muted" />
        <div className="mt-2 h-5 w-2/3 animate-pulse rounded-md bg-muted" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
          <div className="h-32 w-full animate-pulse rounded-md bg-muted" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
        </div>
        <div className="flex justify-end">
          <div className="h-10 w-24 animate-pulse rounded-md bg-muted" />
        </div>
      </CardContent>
    </Card>
  )
}

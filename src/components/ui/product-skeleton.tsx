import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function ProductSkeleton() {
  return (
    <Card className="group relative">
      <CardHeader>
        <div className="h-6 w-3/4 animate-pulse rounded-md bg-muted" />
        <div className="mt-2 h-4 w-1/2 animate-pulse rounded-md bg-muted" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <div className="h-4 w-16 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-16 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
          </div>
          <div className="flex justify-between">
            <div className="h-4 w-16 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

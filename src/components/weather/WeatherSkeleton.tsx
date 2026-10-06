import { Skeleton } from '@/components/ui/skeleton'

export function WeatherSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading weather">
      <Skeleton className="h-72 w-full rounded-3xl" />
      <Skeleton className="h-80 w-full rounded-2xl" />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Skeleton className="h-96 rounded-2xl" />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="h-32 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
}

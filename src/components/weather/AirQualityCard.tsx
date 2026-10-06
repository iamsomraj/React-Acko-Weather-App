import { Wind } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { AirQuality } from '@/frontendTypes'
import { cn } from '@/lib/utils'

const AQI_TONE: Record<AirQuality['aqi'], string> = {
  1: 'bg-emerald-500',
  2: 'bg-lime-500',
  3: 'bg-amber-500',
  4: 'bg-orange-500',
  5: 'bg-rose-600',
}

interface AirQualityCardProps {
  airQuality: AirQuality | null | undefined
  isLoading: boolean
}

export function AirQualityCard({ airQuality, isLoading }: AirQualityCardProps) {
  return (
    <Card className="gap-3 rounded-2xl glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wind className="size-4 text-muted-foreground" aria-hidden /> Air
          quality
        </CardTitle>
        {airQuality && (
          <CardDescription>{airQuality.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-2 w-full" />
          </div>
        ) : airQuality ? (
          <>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold">{airQuality.label}</span>
              <span className="text-sm text-muted-foreground">
                AQI {airQuality.aqi} of 5
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1" aria-hidden>
              {([1, 2, 3, 4, 5] as const).map((level) => (
                <span
                  key={level}
                  className={cn(
                    'h-1.5 rounded-full',
                    level <= airQuality.aqi
                      ? AQI_TONE[airQuality.aqi]
                      : 'bg-muted'
                  )}
                />
              ))}
            </div>
            <dl className="grid grid-cols-3 gap-x-3 gap-y-2 text-xs">
              {airQuality.pollutants.map((pollutant) => (
                <div key={pollutant.key}>
                  <dt className="text-muted-foreground">{pollutant.label}</dt>
                  <dd className="font-medium tabular">
                    {pollutant.value.toFixed(pollutant.value < 10 ? 1 : 0)}
                    <span className="font-normal text-muted-foreground">
                      {' '}
                      {pollutant.unit}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Air quality data is unavailable for this location.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

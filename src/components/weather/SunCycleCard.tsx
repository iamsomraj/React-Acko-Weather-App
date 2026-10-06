import { Sunrise, Sunset } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNow } from '@/hooks'
import { formatLocalTime } from '@/lib/format'

interface SunCycleCardProps {
  sunrise: number
  sunset: number
  timezoneOffset: number
}

const formatDuration = (ms: number) => {
  const totalMinutes = Math.round(ms / 60_000)
  return `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`
}

/** Daylight arc showing where the sun is between sunrise and sunset. */
export function SunCycleCard({
  sunrise,
  sunset,
  timezoneOffset,
}: SunCycleCardProps) {
  const now = useNow()
  const progress = Math.min(
    Math.max((now - sunrise) / (sunset - sunrise), 0),
    1
  )
  const isDaytime = now >= sunrise && now <= sunset
  // Point on a semicircle from (10,60) to (110,60), radius 50, centre (60,60).
  const angle = Math.PI * (1 - progress)
  const sunX = 60 + 50 * Math.cos(angle)
  const sunY = 60 - 50 * Math.sin(angle)

  return (
    <Card className="gap-3 rounded-2xl glass">
      <CardHeader>
        <CardTitle>Sun</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <svg
          viewBox="0 0 120 70"
          className="mx-auto w-full max-w-60"
          aria-hidden
        >
          <path
            d="M10 60 A50 50 0 0 1 110 60"
            fill="none"
            className="stroke-border"
            strokeWidth="2"
            strokeDasharray="3 4"
          />
          <path
            d="M10 60 A50 50 0 0 1 110 60"
            fill="none"
            stroke="oklch(0.8 0.15 80)"
            strokeWidth="2.5"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={`${progress} 1`}
          />
          <line
            x1="2"
            y1="60"
            x2="118"
            y2="60"
            className="stroke-border"
            strokeWidth="1"
          />
          {isDaytime && (
            <circle
              cx={sunX}
              cy={sunY}
              r="5.5"
              fill="oklch(0.85 0.16 85)"
              stroke="white"
              strokeWidth="1.5"
            />
          )}
        </svg>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div className="space-y-1">
            <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Sunrise className="size-3.5" aria-hidden /> Sunrise
            </dt>
            <dd className="font-semibold tabular">
              {formatLocalTime(sunrise, timezoneOffset)}
            </dd>
          </div>
          <div className="space-y-1 text-right">
            <dt className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
              <Sunset className="size-3.5" aria-hidden /> Sunset
            </dt>
            <dd className="font-semibold tabular">
              {formatLocalTime(sunset, timezoneOffset)}
            </dd>
          </div>
        </dl>
        <p className="text-center text-xs text-muted-foreground">
          {formatDuration(sunset - sunrise)} of daylight
        </p>
      </CardContent>
    </Card>
  )
}

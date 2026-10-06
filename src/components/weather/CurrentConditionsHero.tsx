import { ArrowDown, ArrowUp, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { CurrentConditions } from '@/frontendTypes'
import { useNow, useUnits } from '@/hooks'
import {
  formatLocalTime,
  formatLocation,
  formatTemp,
  formatUtcOffset,
  formatWindSpeed,
  tempUnit,
} from '@/lib/format'
import { WeatherIcon } from './WeatherIcon'

interface CurrentConditionsHeroProps {
  current: CurrentConditions
  /** Preferred display name (from search) — falls back to the API's station name. */
  displayName?: { name: string; state?: string; country?: string }
  /** Today's forecast high/low, more meaningful than the API's instantaneous min/max. */
  todayRange?: { min: number; max: number }
}

export function CurrentConditionsHero({
  current,
  displayName,
  todayRange,
}: CurrentConditionsHeroProps) {
  const { units } = useUnits()
  const now = useNow()
  const place = displayName?.name
    ? formatLocation({
        name: displayName.name,
        state: displayName.state,
        country: displayName.country || current.location.country,
      })
    : formatLocation(current.location)
  const high = todayRange?.max ?? current.tempMax
  const low = todayRange?.min ?? current.tempMin

  return (
    <section
      aria-labelledby="current-heading"
      data-condition={current.condition.group}
      className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-sky-from to-sky-to p-6 shadow-sm sm:p-8"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-white/30 blur-3xl dark:bg-white/5"
      />
      <div className="relative flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-4">
          <div className="space-y-1">
            <h1
              id="current-heading"
              className="flex items-center gap-2 text-xl font-semibold tracking-tight sm:text-2xl"
            >
              <MapPin className="size-5 shrink-0 text-primary" aria-hidden />
              {place}
            </h1>
            <p className="text-sm text-muted-foreground">
              Local time{' '}
              {formatLocalTime(now, current.timezoneOffset, {
                weekday: 'long',
                hour: 'numeric',
                minute: '2-digit',
              })}{' '}
              · {formatUtcOffset(current.timezoneOffset)}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-7xl font-semibold tracking-tighter tabular sm:text-8xl">
              {formatTemp(current.temperature)}
              <span className="sr-only">{tempUnit(units)}</span>
            </p>
            <WeatherIcon
              condition={current.condition}
              className="size-16 sm:size-20"
            />
          </div>

          <div className="space-y-1">
            <p className="text-lg font-medium">
              {current.condition.description}
            </p>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground tabular">
              <span>Feels like {formatTemp(current.feelsLike)}</span>
              <span className="inline-flex items-center gap-0.5">
                <ArrowUp className="size-3.5" aria-label="High" />
                {formatTemp(high)}
              </span>
              <span className="inline-flex items-center gap-0.5">
                <ArrowDown className="size-3.5" aria-label="Low" />
                {formatTemp(low)}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:max-w-56 sm:justify-end">
          <Badge variant="secondary" className="bg-background/60 backdrop-blur">
            Humidity {current.humidity}%
          </Badge>
          <Badge variant="secondary" className="bg-background/60 backdrop-blur">
            Wind {formatWindSpeed(current.wind.speed, units)}{' '}
            {current.wind.direction}
          </Badge>
          <Badge variant="secondary" className="bg-background/60 backdrop-blur">
            Clouds {current.cloudCover}%
          </Badge>
          <Badge variant="outline" className="bg-background/40 backdrop-blur">
            Updated{' '}
            {formatLocalTime(current.observedAt, current.timezoneOffset)}
          </Badge>
        </div>
      </div>
    </section>
  )
}

import { Droplets } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Forecast } from '@/frontendTypes'
import { useUnits } from '@/hooks'
import { formatDayLabel, formatTemp } from '@/lib/format'
import { temperatureColor } from '@/lib/temperature'
import { cn } from '@/lib/utils'
import { WeatherIcon } from './WeatherIcon'

interface DailyForecastListProps {
  forecast: Forecast
  selectedDate: string
  onSelect: (date: string) => void
}

export function DailyForecastList({
  forecast,
  selectedDate,
  onSelect,
}: DailyForecastListProps) {
  const { units } = useUnits()
  const overallMin = Math.min(...forecast.daily.map((day) => day.tempMin))
  const overallMax = Math.max(...forecast.daily.map((day) => day.tempMax))
  const span = Math.max(overallMax - overallMin, 1)

  return (
    <Card className="gap-3 rounded-2xl glass">
      <CardHeader>
        <CardTitle>{forecast.daily.length}-day forecast</CardTitle>
      </CardHeader>
      <CardContent className="px-3 sm:px-4">
        <ul
          className="space-y-1"
          aria-label="Daily forecast — select a day for hourly details"
        >
          {forecast.daily.map((day) => {
            const left = ((day.tempMin - overallMin) / span) * 100
            const width = ((day.tempMax - day.tempMin) / span) * 100
            const selected = day.date === selectedDate
            return (
              <li key={day.date}>
                <button
                  type="button"
                  onClick={() => onSelect(day.date)}
                  aria-pressed={selected}
                  className={cn(
                    'grid w-full grid-cols-[5.5rem_2rem_3rem_1fr] items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
                    selected ? 'bg-accent' : 'hover:bg-accent/50'
                  )}
                >
                  <span className="truncate font-medium">
                    {formatDayLabel(day.date, forecast.timezoneOffset)}
                  </span>
                  <WeatherIcon
                    condition={day.condition}
                    className="size-6"
                    label={day.condition.description}
                  />
                  <span className="flex items-center gap-0.5 text-xs text-sky-600 tabular dark:text-sky-300">
                    {day.precipitationChance >= 10 && (
                      <>
                        <Droplets className="size-3" aria-hidden />
                        {day.precipitationChance}%
                        <span className="sr-only">
                          {' '}
                          chance of precipitation
                        </span>
                      </>
                    )}
                  </span>
                  <span className="flex items-center gap-3 tabular">
                    <span className="w-8 text-right text-muted-foreground">
                      <span className="sr-only">Low </span>
                      {formatTemp(day.tempMin)}
                    </span>
                    <span
                      className="relative h-1.5 flex-1 rounded-full bg-muted"
                      aria-hidden
                    >
                      <span
                        className="absolute inset-y-0 rounded-full"
                        style={{
                          left: `${left}%`,
                          width: `${Math.max(width, 4)}%`,
                          background: `linear-gradient(90deg, ${temperatureColor(day.tempMin, units)}, ${temperatureColor(day.tempMax, units)})`,
                        }}
                      />
                    </span>
                    <span className="w-8 font-medium">
                      <span className="sr-only">High </span>
                      {formatTemp(day.tempMax)}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}

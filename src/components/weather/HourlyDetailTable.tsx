import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { DailySummary } from '@/frontendTypes'
import { useUnits } from '@/hooks'
import {
  formatDateKey,
  formatLocalTime,
  formatPrecipitation,
  formatPressure,
  formatTemp,
  formatVisibility,
  formatWindSpeed,
} from '@/lib/format'
import { WeatherIcon } from './WeatherIcon'

interface HourlyDetailTableProps {
  day: DailySummary
  timezoneOffset: number
  locationName: string
}

export function HourlyDetailTable({
  day,
  timezoneOffset,
  locationName,
}: HourlyDetailTableProps) {
  const { units } = useUnits()

  return (
    <div className="overflow-hidden rounded-2xl glass">
      <Table>
        <TableCaption className="sr-only">
          Three-hourly forecast for {locationName} on{' '}
          {formatDateKey(day.date, { dateStyle: 'full' })}
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead className="pl-4">Time</TableHead>
            <TableHead>Conditions</TableHead>
            <TableHead className="text-right">Temp</TableHead>
            <TableHead className="text-right">Feels like</TableHead>
            <TableHead className="text-right">Precip.</TableHead>
            <TableHead className="text-right">Wind</TableHead>
            <TableHead className="text-right">Humidity</TableHead>
            <TableHead className="text-right">Pressure</TableHead>
            <TableHead className="pr-4 text-right">Visibility</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="tabular">
          {day.hours.map((hour) => (
            <TableRow key={hour.time}>
              <TableCell className="pl-4 font-medium">
                {formatLocalTime(hour.time, timezoneOffset)}
              </TableCell>
              <TableCell>
                <span className="flex items-center gap-2">
                  <WeatherIcon condition={hour.condition} className="size-5" />
                  {hour.condition.description}
                </span>
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatTemp(hour.temperature)}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {formatTemp(hour.feelsLike)}
              </TableCell>
              <TableCell className="text-right">
                {hour.precipitationChance}%
                {hour.precipitation > 0 && (
                  <span className="block text-xs text-muted-foreground">
                    {formatPrecipitation(hour.precipitation, units)}
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right">
                {formatWindSpeed(hour.wind.speed, units)}{' '}
                <span className="text-muted-foreground">
                  {hour.wind.direction}
                </span>
              </TableCell>
              <TableCell className="text-right">{hour.humidity}%</TableCell>
              <TableCell className="text-right">
                {formatPressure(hour.pressure)}
              </TableCell>
              <TableCell className="pr-4 text-right">
                {formatVisibility(hour.visibility, units)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

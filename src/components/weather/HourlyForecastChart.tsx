import { useMemo } from 'react'
import { Area, Bar, CartesianGrid, ComposedChart, XAxis, YAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import type { Forecast } from '@/frontendTypes'
import { useUnits } from '@/hooks'
import { formatLocalHour, formatTemp, tempUnit } from '@/lib/format'
import { WeatherIcon } from './WeatherIcon'

const chartConfig = {
  temperature: { label: 'Temperature', color: 'var(--chart-1)' },
  precipitationChance: { label: 'Chance of rain', color: 'var(--chart-3)' },
} satisfies ChartConfig

const SLOTS = 16 // 16 × 3h = 48 hours

export function HourlyForecastChart({ forecast }: { forecast: Forecast }) {
  const { units } = useUnits()
  const points = useMemo(
    () =>
      forecast.hourly.slice(0, SLOTS).map((hour) => ({
        ...hour,
        label: formatLocalHour(hour.time, forecast.timezoneOffset),
        temperature: Math.round(hour.temperature * 10) / 10,
      })),
    [forecast]
  )

  return (
    <Card className="gap-4 rounded-2xl glass">
      <CardHeader>
        <CardTitle>Next 48 hours</CardTitle>
        <CardDescription>
          Temperature ({tempUnit(units)}) and chance of precipitation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-2 sm:px-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-56 w-full"
        >
          <ComposedChart data={points} margin={{ left: 0, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="fill-temperature" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-temperature)"
                  stopOpacity={0.45}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-temperature)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
              minTickGap={24}
            />
            <YAxis
              yAxisId="temp"
              tickLine={false}
              axisLine={false}
              width={36}
              tickFormatter={(value: number) => `${Math.round(value)}°`}
              domain={['dataMin - 2', 'dataMax + 2']}
            />
            <YAxis yAxisId="pop" orientation="right" domain={[0, 100]} hide />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  formatter={(value, name) => (
                    <div className="flex w-full items-center justify-between gap-4">
                      <span className="text-muted-foreground">
                        {chartConfig[name as keyof typeof chartConfig]?.label}
                      </span>
                      <span className="font-medium tabular">
                        {name === 'temperature'
                          ? formatTemp(Number(value))
                          : `${value}%`}
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Bar
              yAxisId="pop"
              dataKey="precipitationChance"
              fill="var(--color-precipitationChance)"
              fillOpacity={0.35}
              radius={[4, 4, 0, 0]}
              maxBarSize={18}
            />
            <Area
              yAxisId="temp"
              dataKey="temperature"
              type="monotone"
              stroke="var(--color-temperature)"
              strokeWidth={2.5}
              fill="url(#fill-temperature)"
              activeDot={{ r: 4 }}
            />
          </ComposedChart>
        </ChartContainer>

        <ScrollArea className="w-full">
          <ol className="flex gap-1 pb-3" aria-label="Hourly conditions">
            {points.map((point) => (
              <li
                key={point.time}
                className="flex min-w-16 flex-col items-center gap-1.5 rounded-xl px-2 py-2 text-sm transition-colors hover:bg-accent/60"
              >
                <span className="text-xs text-muted-foreground">
                  {point.label}
                </span>
                <WeatherIcon
                  condition={point.condition}
                  className="size-6"
                  label={point.condition.description}
                />
                <span className="font-medium tabular">
                  {formatTemp(point.temperature)}
                </span>
                <span className="text-xs text-sky-600 tabular dark:text-sky-300">
                  {point.precipitationChance > 0
                    ? `${point.precipitationChance}%`
                    : ' '}
                </span>
              </li>
            ))}
          </ol>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

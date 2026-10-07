import { useMemo, useState } from 'react'
import { CloudSun } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { Seo } from '@/components/layout/Seo'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  AirQualityCard,
  CitySearch,
  CurrentConditionsHero,
  DailyForecastList,
  ErrorState,
  HourlyDetailTable,
  HourlyForecastChart,
  MetricsGrid,
  PopularLocations,
  SunCycleCard,
  WeatherSkeleton,
} from '@/components/weather'
import type { Location } from '@/frontendTypes'
import { useAirQuality, useCurrentWeather, useForecast } from '@/hooks'
import { formatDayLabel } from '@/lib/format'
import { parseWeatherParams, weatherPath } from '@/lib/routes'

function EmptyWeatherState() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 py-16 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
        <CloudSun className="size-7" aria-hidden />
      </span>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Where are you headed?
        </h1>
        <p className="text-muted-foreground">
          Search for a city or use your current location to see the forecast.
        </p>
      </div>
      <CitySearch size="lg" className="w-full text-left" autoFocus />
      <PopularLocations />
    </div>
  )
}

function WeatherDashboard({ location }: { location: Location }) {
  const coords = useMemo(
    () => ({ lat: location.lat, lon: location.lon }),
    [location.lat, location.lon]
  )
  const current = useCurrentWeather(coords)
  const forecast = useForecast(coords)
  const airQuality = useAirQuality(coords)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const name = location.name || current.data?.location.name || 'Your location'
  const seo = (
    <Seo
      title={`${name} weather`}
      description={`Current conditions, 48-hour chart and 5-day forecast for ${name}.`}
      path={weatherPath({ ...location, name })}
    />
  )

  const error = current.error ?? forecast.error
  if (error) {
    return (
      <>
        {seo}
        <ErrorState
          message={error.message}
          onRetry={() => {
            void current.refetch()
            void forecast.refetch()
          }}
        />
      </>
    )
  }

  if (!current.data || !forecast.data) {
    return (
      <>
        {seo}
        <WeatherSkeleton />
      </>
    )
  }

  const { daily, timezoneOffset } = forecast.data
  const activeDate = selectedDate ?? daily[0]?.date ?? ''
  const today = daily[0]

  return (
    <div className="animate-in space-y-6 duration-500 fade-in slide-in-from-bottom-2">
      {seo}
      <CurrentConditionsHero
        current={current.data}
        displayName={location}
        todayRange={
          today ? { min: today.tempMin, max: today.tempMax } : undefined
        }
      />

      <HourlyForecastChart forecast={forecast.data} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <DailyForecastList
          forecast={forecast.data}
          selectedDate={activeDate}
          onSelect={(date) => {
            setSelectedDate(date)
            document
              .getElementById('hourly-details')
              ?.scrollIntoView({ block: 'start' })
          }}
        />
        <MetricsGrid current={current.data} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SunCycleCard
          sunrise={current.data.sunrise}
          sunset={current.data.sunset}
          timezoneOffset={current.data.timezoneOffset}
        />
        <AirQualityCard
          airQuality={airQuality.data}
          isLoading={airQuality.isPending}
        />
      </div>

      <section
        id="hourly-details"
        aria-labelledby="hourly-heading"
        className="space-y-4"
      >
        <h2
          id="hourly-heading"
          className="text-xl font-semibold tracking-tight"
        >
          Hourly details
        </h2>
        <Tabs value={activeDate} onValueChange={setSelectedDate}>
          {/* One scrollable row: TabsList has a fixed height, so wrapping overflows it. */}
          <ScrollArea className="w-full">
            <div className="pb-2.5">
              <TabsList>
                {daily.map((day) => (
                  <TabsTrigger
                    key={day.date}
                    value={day.date}
                    className="flex-none px-3"
                  >
                    {formatDayLabel(day.date, timezoneOffset)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          {daily.map((day) => (
            <TabsContent key={day.date} value={day.date} className="mt-2">
              <HourlyDetailTable
                day={day}
                timezoneOffset={timezoneOffset}
                locationName={name}
              />
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  )
}

export default function WeatherPage() {
  const [searchParams] = useSearchParams()
  const location = useMemo(
    () => parseWeatherParams(searchParams),
    [searchParams]
  )

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6 sm:py-10">
      {location ? (
        <>
          <CitySearch className="mx-auto max-w-xl" />
          <WeatherDashboard
            key={`${location.lat},${location.lon}`}
            location={location}
          />
        </>
      ) : (
        <>
          <Seo
            title="Forecast"
            description="Search any city worldwide for current conditions and a 5-day forecast."
            path="/weather"
          />
          <EmptyWeatherState />
        </>
      )}
    </div>
  )
}

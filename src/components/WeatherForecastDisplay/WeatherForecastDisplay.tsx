import { useCallback, useMemo, useState, useId } from 'react'
import { useAppSelector } from '@/hooks'
import { ActionButton } from '@/components/ActionButton/ActionButton'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import HourlyForecastTable from '@/components/HourlyForecastTable/HourlyForecastTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function WeatherForecastDisplay() {
  const [selectedDate, setSelectedDate] = useState('')
  const selectId = useId()
  const errorId = useId()

  const forecast = useAppSelector((state) => state.weather)

  const handleDateChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedDate(event.target.value)
    },
    []
  )

  const uniqueDays = useMemo(() => {
    if (!forecast.data?.list) return ['']

    const days = forecast.data.list
      .map((item) => item.dt_txt.split(' ')[0])
      .filter((item, index, arr) => arr.indexOf(item) === index)

    return ['', ...days]
  }, [forecast.data?.list])

  if (forecast.loading || !forecast.data) {
    if (forecast.error) {
      return (
        <Card className="m-5" role="alert">
          <CardContent className="pt-6">
            <div
              id={errorId}
              className="text-destructive font-semibold text-center p-4 bg-destructive/10 rounded-lg"
              role="status"
              aria-live="assertive"
            >
              <span className="block text-lg mb-2">
                ⚠️ Error Loading Forecast
              </span>
              {forecast.error}
            </div>
          </CardContent>
        </Card>
      )
    }

    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingSpinner text="Loading forecast data..." size="lg" />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-4 animate-slide-up">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-primary">
            Forecast for {forecast.data.city.name}
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            {forecast.data.city.country} • {forecast.data.list.length} forecasts
            available
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label
                htmlFor={selectId}
                className="block text-sm font-medium text-foreground mb-2"
              >
                Select Forecast Date
              </label>
              <select
                id={selectId}
                className="w-full rounded-lg py-3 px-4 bg-background border border-input text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                value={selectedDate}
                onChange={handleDateChange}
                aria-describedby={`${selectId}-help`}
              >
                {uniqueDays.map((day) => (
                  <option key={day || 'empty'} value={day}>
                    {day
                      ? new Date(day).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'Choose a forecast date...'}
                  </option>
                ))}
              </select>
              <p
                id={`${selectId}-help`}
                className="text-xs text-muted-foreground mt-1"
              >
                Select a date to view detailed hourly forecasts
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedDate && (
        <div className="w-full space-y-6 animate-fade-in">
          <HourlyForecastTable selectedDate={selectedDate} />
          <div className="flex justify-center">
            <ActionButton path="/" body="Return Home" variant="outline" />
          </div>
        </div>
      )}
    </div>
  )
}

export default WeatherForecastDisplay

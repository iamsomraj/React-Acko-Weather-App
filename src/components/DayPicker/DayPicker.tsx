
import { useCallback, useMemo, useState } from 'react'
import { IDayTimeSelectorProps } from '@/types'
import { addPath } from '@/util'
import { ActionButton } from '@/components/ActionButton/ActionButton'
import { Spinner } from '@/components/Spinner/Spinner'
import Table from '@/components/Table/Table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function DayPicker({ forecast }: IDayTimeSelectorProps) {
  const [selectedDate, setSelectedDate] = useState('')

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

  // Loading state
  if (forecast.loading || !forecast.data) {
    if (forecast.error) {
      return (
        <Card className="m-5">
          <CardContent className="pt-6">
            <div className="text-destructive font-bold tracking-widest uppercase text-center">
              {forecast.error}
            </div>
          </CardContent>
        </Card>
      )
    }
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spinner text="Loading weather data..." size="lg" />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-primary-600">
            Weather Data for {forecast.data.city.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <label
              htmlFor="date-select"
              className="block text-sm font-medium text-foreground"
            >
              Select Date
            </label>
            <select
              id="date-select"
              className="w-full rounded-lg py-3 px-4 bg-background border border-input focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              value={selectedDate}
              onChange={handleDateChange}
            >
              {uniqueDays.map((day) => (
                <option key={day || 'empty'} value={day}>
                  {day || 'Select a date...'}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {selectedDate && (
        <div className="w-full space-y-6">
          <Table selected={selectedDate} forecast={forecast} />
          <div className="flex justify-center">
            <ActionButton
              path={addPath('')}
              body="Go Back Home"
              variant="outline"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default DayPicker

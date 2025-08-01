import { useAppSelector } from '@/hooks'
import { getTimeFromTimestamp } from '@/util'
import TableBody from '@/components/TableBody/TableBody'
import TableHeader from '@/components/TableHeader/TableHeader'

interface HourlyForecastTableProps {
  selectedDate: string
}

/**
 * HourlyForecastTable - Displays hourly weather forecast data in a table
 * Replaces the old Table component with more descriptive naming and direct Redux connection
 */
const HourlyForecastTable: React.FC<HourlyForecastTableProps> = ({
  selectedDate,
}) => {
  const forecast = useAppSelector((state) => state.weather)

  if (!forecast.data) {
    return null
  }

  /**
   * filters the forecast data based on user selected value from drop down
   */
  const filteredForecast = forecast.data.list.filter((item) =>
    item.dt_txt.includes(selectedDate)
  )

  const rowData = filteredForecast.map((item) => {
    return {
      Time: item.dt_txt,
      Temperature: item.main.temp,
      RealFeel: item.main.feels_like,
      Description: item.weather[0].description.toUpperCase(),
      Visibility: item.visibility,
      Humidity: item.main.humidity,
      Pressure: item.main.pressure,
      WindSpeed: item.wind.speed,
      CloudCover: item.clouds.all,
    }
  })

  if (rowData.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center p-12 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20"
        role="status"
        aria-live="polite"
      >
        <span className="text-4xl mb-4 block" role="img" aria-label="no data">
          📊
        </span>
        <p className="text-lg font-medium mb-2">No forecast data available</p>
        <p className="text-sm">
          Please select a different date or try again later.
        </p>
      </div>
    )
  }

  const selectedDateFormatted = new Date(selectedDate).toLocaleDateString(
    'en-US',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  )

  return (
    <div className="flex flex-col space-y-6 animate-slide-up">
      <div className="text-center space-y-3">
        <h2
          className="text-2xl lg:text-4xl font-bold text-primary"
          id="forecast-heading"
        >
          {forecast.data.city.name}
          <span className="text-sm font-normal text-muted-foreground ml-2 block lg:inline">
            {forecast.data.city.country}
          </span>
        </h2>
        <p className="text-lg text-foreground font-medium">
          Weather forecast for {selectedDateFormatted}
        </p>
        <div
          className="flex justify-center items-center space-x-6 text-sm"
          role="group"
          aria-label="Sun information"
        >
          <div className="flex items-center space-x-2 text-primary">
            <span role="img" aria-label="sunrise">
              🌅
            </span>
            <span>
              <span className="font-medium">Sunrise:</span>{' '}
              <time dateTime={getTimeFromTimestamp(forecast.data.city.sunrise)}>
                {getTimeFromTimestamp(forecast.data.city.sunrise)}
              </time>
            </span>
          </div>
          <div className="flex items-center space-x-2 text-primary">
            <span role="img" aria-label="sunset">
              🌇
            </span>
            <span>
              <span className="font-medium">Sunset:</span>{' '}
              <time dateTime={getTimeFromTimestamp(forecast.data.city.sunset)}>
                {getTimeFromTimestamp(forecast.data.city.sunset)}
              </time>
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-border">
        <table
          className="min-w-full divide-y divide-border bg-background"
          role="table"
          aria-labelledby="forecast-heading"
          aria-describedby="forecast-description"
        >
          <caption id="forecast-description" className="sr-only">
            Hourly weather forecast table for {forecast.data.city.name} on{' '}
            {selectedDateFormatted}. Contains temperature, conditions, and
            meteorological data for each time period.
          </caption>
          <thead className="bg-muted/30">
            <tr role="row">
              <TableHeader rows={Object.keys(rowData[0])} />
            </tr>
          </thead>
          <tbody className="bg-background divide-y divide-border">
            <TableBody row={rowData} />
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default HourlyForecastTable

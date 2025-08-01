import { IWeatherState } from '@/types'
import WeatherForecastDisplay from '@/components/WeatherForecastDisplay/WeatherForecastDisplay'
import LocationSearchForm from '@/components/LocationSearchForm/LocationSearchForm'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'

interface WeatherDataProviderProps {
  weatherData: IWeatherState
  isLocationDenied: boolean | undefined
  searchTerm: string
  onSearchTermChange: (value: string) => void
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onClear: () => void
}

const WeatherDataProvider: React.FC<WeatherDataProviderProps> = ({
  weatherData,
  isLocationDenied,
  searchTerm,
  onSearchTermChange,
  onSearchSubmit,
  onClear,
}) => {
  // When user denies location permission, show search form + forecast if available
  if (isLocationDenied) {
    return (
      <div>
        <div className="flex justify-center">
          <LocationSearchForm
            term={searchTerm}
            onChange={onSearchTermChange}
            onSubmit={onSearchSubmit}
            onClear={onClear}
            state={weatherData}
          />
        </div>
        {weatherData.data && (
          <div>
            <WeatherForecastDisplay />
          </div>
        )}
      </div>
    )
  }

  // When user grants location permission, show loading or forecast
  return weatherData.loading ? (
    <LoadingSpinner />
  ) : (
    <div>
      <WeatherForecastDisplay />
    </div>
  )
}

export default WeatherDataProvider

import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks'
import {
  fetchWeatherData,
  fetchWeatherDataByCoords,
  initState,
} from '@/state/reducers/weatherReducer'
import WeatherDataProvider from '@/components/WeatherDataProvider/WeatherDataProvider'

interface GeolocationError {
  code: number
  message: string
}

/**
 * WeatherService - Handles geolocation, API calls, and provides weather data to children
 * Replaces the old WeatherBody component with better separation of concerns
 */
export function WeatherService() {
  const [geoError, setGeoError] = useState<GeolocationError | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const dispatch = useAppDispatch()
  const weatherState = useAppSelector((state) => state.weather)

  const handleLocationSuccess = useCallback(
    (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords
      dispatch(fetchWeatherDataByCoords({ lat: latitude, lng: longitude }))
    },
    [dispatch]
  )

  const handleLocationError = useCallback((error: GeolocationPositionError) => {
    setGeoError({
      code: error.code,
      message: error.message,
    })
  }, [])

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError({
        code: 0,
        message: 'Location services are not supported by this browser.',
      })
      return
    }

    navigator.geolocation.getCurrentPosition(
      handleLocationSuccess,
      handleLocationError,
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    )
  }, [handleLocationSuccess, handleLocationError])

  const handleSearchSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (!searchTerm.trim()) return

      dispatch(initState())
      dispatch(fetchWeatherData(searchTerm.trim()))
    },
    [dispatch, searchTerm]
  )

  const handleClear = useCallback(() => {
    dispatch(initState())
    setSearchTerm('')
  }, [dispatch])

  useEffect(() => {
    requestLocation()
  }, [requestLocation])

  if (geoError && geoError.code !== 1) {
    return (
      <div className="flex items-center justify-center min-h-[200px] p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-red-600 mb-2">
            Location Access Error
          </h3>
          <p className="text-gray-600">{geoError.message}</p>
        </div>
      </div>
    )
  }

  return (
    <WeatherDataProvider
      weatherData={weatherState}
      isLocationDenied={geoError?.code === 1}
      searchTerm={searchTerm}
      onSearchTermChange={setSearchTerm}
      onSearchSubmit={handleSearchSubmit}
      onClear={handleClear}
    />
  )
}

export default WeatherService


import { useCallback, useEffect, useState } from 'react'
import { INITIAL_LAT_AND_LONG_VALUE } from '@/data'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { WeatherActionType } from '@/state/action-types'
import {
  fetchWeatherData,
  fetchWeatherDataByCoords,
  initState,
} from '@/state/reducers/weatherReducer'
import ForecastSection from '@/components/ForecastSection/ForecastSection'

interface GeolocationError {
  code: number
  message: string
}

export function WeatherBody() {
  const [, setCoordinates] = useState({
    lat: INITIAL_LAT_AND_LONG_VALUE,
    lng: INITIAL_LAT_AND_LONG_VALUE,
  })
  const [geoError, setGeoError] = useState<GeolocationError | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const dispatch = useAppDispatch()
  const weatherState = useAppSelector((state) => state.weather)

  const handleLocationSuccess = useCallback(
    (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords
      setCoordinates({ lat: latitude, lng: longitude })
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
        message: 'Geolocation is not supported by this browser.',
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

  const handleReset = useCallback(() => {
    dispatch(initState())
    return { type: WeatherActionType.INIT_STATE }
  }, [dispatch])

  useEffect(() => {
    requestLocation()
  }, [requestLocation])

  if (geoError && geoError.code !== 1) {
    return (
      <div className="flex items-center justify-center min-h-[200px] p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-red-600 mb-2">
            Location Error
          </h3>
          <p className="text-gray-600">{geoError.message}</p>
        </div>
      </div>
    )
  }

  return (
    <ForecastSection
      forecastData={weatherState}
      isUserDenied={geoError?.code === 1}
      onChange={setSearchTerm}
      onInit={handleReset}
      onSubmit={handleSearchSubmit}
      term={searchTerm}
      state={weatherState}
    />
  )
}

export default WeatherBody

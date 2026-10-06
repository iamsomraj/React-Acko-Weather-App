import { useCallback, useState } from 'react'
import type { Coordinates } from '@/api'

export type GeolocationStatus = 'idle' | 'locating' | 'success' | 'error'

interface GeolocationState {
  status: GeolocationStatus
  coords: Coordinates | null
  error: string | null
}

const messageFor = (error: GeolocationPositionError) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return 'Location permission was denied. You can search for a city instead.'
    case error.POSITION_UNAVAILABLE:
      return 'Your location is currently unavailable.'
    case error.TIMEOUT:
      return 'Finding your location took too long. Please try again.'
    default:
      return 'Could not determine your location.'
  }
}

/** On-demand browser geolocation. Resolves with coordinates for convenience. */
export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    status: 'idle',
    coords: null,
    error: null,
  })

  const locate = useCallback(
    () =>
      new Promise<Coordinates>((resolve, reject) => {
        if (!('geolocation' in navigator)) {
          const error = 'Location services are not supported by this browser.'
          setState({ status: 'error', coords: null, error })
          reject(new Error(error))
          return
        }

        setState((previous) => ({
          ...previous,
          status: 'locating',
          error: null,
        }))
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords = {
              lat: Number(position.coords.latitude.toFixed(4)),
              lon: Number(position.coords.longitude.toFixed(4)),
            }
            setState({ status: 'success', coords, error: null })
            resolve(coords)
          },
          (positionError) => {
            const error = messageFor(positionError)
            setState({ status: 'error', coords: null, error })
            reject(new Error(error))
          },
          {
            enableHighAccuracy: false,
            timeout: 10_000,
            maximumAge: 5 * 60 * 1000,
          }
        )
      }),
    []
  )

  return { ...state, locate }
}

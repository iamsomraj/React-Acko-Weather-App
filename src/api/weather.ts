import type {
  OwmAirPollutionResponse,
  OwmCurrentWeatherResponse,
  OwmForecastResponse,
  OwmGeocodingResponse,
} from '@/apiTypes'
import type { Units } from '@/frontendTypes'
import { owmFetch } from './client'

export interface Coordinates {
  lat: number
  lon: number
}

export const getCurrentWeather = (
  { lat, lon }: Coordinates,
  units: Units,
  signal?: AbortSignal
) =>
  owmFetch<OwmCurrentWeatherResponse>(
    '/data/2.5/weather',
    { lat, lon, units },
    signal
  )

export const getForecast = (
  { lat, lon }: Coordinates,
  units: Units,
  signal?: AbortSignal
) =>
  owmFetch<OwmForecastResponse>(
    '/data/2.5/forecast',
    { lat, lon, units },
    signal
  )

export const getAirPollution = (
  { lat, lon }: Coordinates,
  signal?: AbortSignal
) =>
  owmFetch<OwmAirPollutionResponse>(
    '/data/2.5/air_pollution',
    { lat, lon },
    signal
  )

export const searchLocations = (
  query: string,
  signal?: AbortSignal,
  limit = 5
) =>
  owmFetch<OwmGeocodingResponse>('/geo/1.0/direct', { q: query, limit }, signal)

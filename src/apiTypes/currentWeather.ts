import type { OwmCondition, OwmCoord, OwmWind } from './common'

/** GET /data/2.5/weather */
export interface OwmCurrentWeatherResponse {
  coord: OwmCoord
  weather: OwmCondition[]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level?: number
    grnd_level?: number
  }
  visibility?: number
  wind: OwmWind
  clouds: { all: number }
  rain?: { '1h'?: number; '3h'?: number }
  snow?: { '1h'?: number; '3h'?: number }
  /** Unix seconds, UTC */
  dt: number
  sys: {
    country?: string
    sunrise: number
    sunset: number
  }
  /** Shift in seconds from UTC */
  timezone: number
  id: number
  name: string
  cod: number
}

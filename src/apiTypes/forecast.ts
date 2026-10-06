import type { OwmCondition, OwmCoord, OwmWind } from './common'

/** One 3-hour slot from GET /data/2.5/forecast */
export interface OwmForecastItem {
  /** Unix seconds, UTC */
  dt: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level?: number
    grnd_level?: number
    humidity: number
    temp_kf?: number
  }
  weather: OwmCondition[]
  clouds: { all: number }
  wind: OwmWind
  visibility?: number
  /** Probability of precipitation, 0..1 */
  pop: number
  rain?: { '3h'?: number }
  snow?: { '3h'?: number }
  sys: { pod: 'd' | 'n' }
  dt_txt: string
}

/** GET /data/2.5/forecast — 5 day / 3 hour forecast */
export interface OwmForecastResponse {
  cod: string
  message: number
  cnt: number
  list: OwmForecastItem[]
  city: {
    id: number
    name: string
    coord: OwmCoord
    country: string
    population?: number
    /** Shift in seconds from UTC */
    timezone: number
    sunrise: number
    sunset: number
  }
}

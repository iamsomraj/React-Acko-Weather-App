/** Raw shapes shared by several OpenWeather endpoints. */

export interface OwmCoord {
  lat: number
  lon: number
}

export interface OwmCondition {
  /** Condition code, see https://openweathermap.org/weather-conditions */
  id: number
  main: string
  description: string
  icon: string
}

export interface OwmWind {
  speed: number
  deg: number
  gust?: number
}

export interface OwmErrorResponse {
  cod: number | string
  message: string
}

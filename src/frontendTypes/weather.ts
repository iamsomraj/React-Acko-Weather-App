/**
 * UI-facing domain types. Components only ever consume these — never the raw
 * OpenWeather shapes in `@/apiTypes`. Converters translate between the two.
 */

export type Units = 'metric' | 'imperial'

export type ConditionGroup =
  | 'thunderstorm'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'atmosphere'
  | 'clear'
  | 'clouds'

export interface Condition {
  code: number
  group: ConditionGroup
  label: string
  description: string
  isDay: boolean
}

export interface Location {
  name: string
  country: string
  state?: string
  lat: number
  lon: number
}

export interface CurrentConditions {
  location: Location
  /** Epoch ms of the observation */
  observedAt: number
  /** UTC offset in seconds for the location */
  timezoneOffset: number
  temperature: number
  feelsLike: number
  tempMin: number
  tempMax: number
  humidity: number
  pressure: number
  /** metres, capped at 10 000 by the API */
  visibility: number | null
  cloudCover: number
  wind: Wind
  /** mm in the last hour, rain + snow */
  precipitationLastHour: number
  sunrise: number
  sunset: number
  condition: Condition
}

export interface Wind {
  speed: number
  gust: number | null
  degrees: number
  /** 16-point compass, e.g. "NNE" */
  direction: string
}

export interface HourlyPoint {
  /** Epoch ms */
  time: number
  /** YYYY-MM-DD in the location's local time */
  localDate: string
  temperature: number
  feelsLike: number
  humidity: number
  pressure: number
  visibility: number | null
  cloudCover: number
  wind: Wind
  /** 0..100 */
  precipitationChance: number
  /** mm over the 3h slot */
  precipitation: number
  condition: Condition
}

export interface DailySummary {
  /** YYYY-MM-DD in the location's local time */
  date: string
  tempMin: number
  tempMax: number
  /** Highest precipitation chance of the day, 0..100 */
  precipitationChance: number
  /** Total mm over the day */
  precipitation: number
  humidity: number
  windMax: number
  /** The most representative condition for the day */
  condition: Condition
  hours: HourlyPoint[]
}

export interface Forecast {
  location: Location
  timezoneOffset: number
  sunrise: number
  sunset: number
  hourly: HourlyPoint[]
  daily: DailySummary[]
}

export type AqiLevel = 1 | 2 | 3 | 4 | 5

export interface AirQuality {
  aqi: AqiLevel
  label: string
  description: string
  pollutants: {
    key: string
    label: string
    value: number
    unit: string
  }[]
}

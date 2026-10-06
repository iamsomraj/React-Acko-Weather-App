import type { OwmCurrentWeatherResponse } from '@/apiTypes'
import type { CurrentConditions } from '@/frontendTypes'
import { toCondition, toWind } from './shared'

export const toCurrentConditions = (
  response: OwmCurrentWeatherResponse
): CurrentConditions => ({
  location: {
    name: response.name,
    country: response.sys.country ?? '',
    lat: response.coord.lat,
    lon: response.coord.lon,
  },
  observedAt: response.dt * 1000,
  timezoneOffset: response.timezone,
  temperature: response.main.temp,
  feelsLike: response.main.feels_like,
  tempMin: response.main.temp_min,
  tempMax: response.main.temp_max,
  humidity: response.main.humidity,
  pressure: response.main.pressure,
  visibility: response.visibility ?? null,
  cloudCover: response.clouds.all,
  wind: toWind(response.wind),
  precipitationLastHour:
    (response.rain?.['1h'] ?? 0) + (response.snow?.['1h'] ?? 0),
  sunrise: response.sys.sunrise * 1000,
  sunset: response.sys.sunset * 1000,
  condition: toCondition(response.weather[0]),
})

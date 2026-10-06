import type { OwmForecastItem, OwmForecastResponse } from '@/apiTypes'
import type { DailySummary, Forecast, HourlyPoint } from '@/frontendTypes'
import {
  CONDITION_SEVERITY,
  toCondition,
  toLocalDateKey,
  toWind,
} from './shared'

export const toHourlyPoint = (
  item: OwmForecastItem,
  timezoneOffset: number
): HourlyPoint => ({
  time: item.dt * 1000,
  localDate: toLocalDateKey(item.dt, timezoneOffset),
  temperature: item.main.temp,
  feelsLike: item.main.feels_like,
  humidity: item.main.humidity,
  pressure: item.main.pressure,
  visibility: item.visibility ?? null,
  cloudCover: item.clouds.all,
  wind: toWind(item.wind),
  precipitationChance: Math.round(item.pop * 100),
  precipitation: (item.rain?.['3h'] ?? 0) + (item.snow?.['3h'] ?? 0),
  condition: toCondition(item.weather[0]),
})

/**
 * Picks the condition that best represents a day: the most frequent group
 * across daytime slots (all slots if none are daytime), ties going to the
 * more severe group.
 */
export const pickRepresentativeCondition = (hours: HourlyPoint[]) => {
  const daytime = hours.filter((hour) => hour.condition.isDay)
  const pool = daytime.length > 0 ? daytime : hours

  const counts = new Map<string, number>()
  for (const hour of pool) {
    counts.set(
      hour.condition.group,
      (counts.get(hour.condition.group) ?? 0) + 1
    )
  }

  const [best] = [...pool].sort((a, b) => {
    const byCount =
      (counts.get(b.condition.group) ?? 0) -
      (counts.get(a.condition.group) ?? 0)
    if (byCount !== 0) return byCount
    return (
      CONDITION_SEVERITY[b.condition.group] -
      CONDITION_SEVERITY[a.condition.group]
    )
  })

  // A daily summary should always use the daytime icon.
  return { ...best!.condition, isDay: true }
}

export const toDailySummaries = (hourly: HourlyPoint[]): DailySummary[] => {
  const byDate = new Map<string, HourlyPoint[]>()
  for (const hour of hourly) {
    const bucket = byDate.get(hour.localDate)
    if (bucket) bucket.push(hour)
    else byDate.set(hour.localDate, [hour])
  }

  return [...byDate.entries()].map(([date, hours]) => ({
    date,
    tempMin: Math.min(...hours.map((hour) => hour.temperature)),
    tempMax: Math.max(...hours.map((hour) => hour.temperature)),
    precipitationChance: Math.max(
      ...hours.map((hour) => hour.precipitationChance)
    ),
    precipitation: hours.reduce((sum, hour) => sum + hour.precipitation, 0),
    humidity: Math.round(
      hours.reduce((sum, hour) => sum + hour.humidity, 0) / hours.length
    ),
    windMax: Math.max(...hours.map((hour) => hour.wind.speed)),
    condition: pickRepresentativeCondition(hours),
    hours,
  }))
}

export const toForecast = (response: OwmForecastResponse): Forecast => {
  const { city } = response
  const hourly = response.list.map((item) => toHourlyPoint(item, city.timezone))

  return {
    location: {
      name: city.name,
      country: city.country,
      lat: city.coord.lat,
      lon: city.coord.lon,
    },
    timezoneOffset: city.timezone,
    sunrise: city.sunrise * 1000,
    sunset: city.sunset * 1000,
    hourly,
    daily: toDailySummaries(hourly),
  }
}

import { describe, expect, it } from 'vitest'
import { toForecast } from '@/converters'
import { forecastResponse, makeForecastItem } from '@/test/fixtures/weather'

describe('toForecast', () => {
  it('maps location, timezone and sun times', () => {
    const forecast = toForecast(forecastResponse())
    expect(forecast.location).toEqual({
      name: 'Mumbai',
      country: 'IN',
      lat: 19.0761,
      lon: 72.8775,
    })
    expect(forecast.timezoneOffset).toBe(19_800)
    expect(forecast.sunrise).toBe(forecastResponse().city.sunrise * 1000)
  })

  it('groups 3-hour slots into days using the location timezone, not UTC', () => {
    // UTC+5:30: slots 0–6 fall on Oct 6 local, 7–14 on Oct 7, 15 on Oct 8.
    const { daily } = toForecast(forecastResponse())
    expect(daily.map((day) => [day.date, day.hours.length])).toEqual([
      ['2026-10-06', 7],
      ['2026-10-07', 8],
      ['2026-10-08', 1],
    ])
  })

  it('aggregates min/max temperature, max precipitation chance and total precipitation', () => {
    const items = [
      makeForecastItem(0, { pop: 0.2, rain: { '3h': 1.2 } }),
      makeForecastItem(1, {
        pop: 0.75,
        rain: { '3h': 0.8 },
        snow: { '3h': 0.5 },
      }),
      makeForecastItem(2, { pop: 0.1 }),
    ]
    const [day] = toForecast(forecastResponse(items)).daily
    expect(day).toMatchObject({
      tempMin: 20,
      tempMax: 22,
      precipitationChance: 75,
      windMax: 4,
    })
    expect(day!.precipitation).toBeCloseTo(2.5)
  })

  it('converts hourly wind and precipitation fields', () => {
    const [hour] = toForecast(
      forecastResponse([makeForecastItem(0, { pop: 0.456 })])
    ).hourly
    expect(hour).toMatchObject({
      time: forecastResponse().list[0]!.dt * 1000,
      precipitationChance: 46,
      wind: { speed: 4, gust: 6, degrees: 90, direction: 'E' },
      condition: { group: 'clear', isDay: true, description: 'Clear sky' },
    })
  })

  it('summarises a day with its most frequent daytime condition, breaking ties by severity', () => {
    const rain = {
      id: 500,
      main: 'Rain',
      description: 'light rain',
      icon: '10d',
    }
    const clouds = {
      id: 803,
      main: 'Clouds',
      description: 'broken clouds',
      icon: '04d',
    }
    const nightStorm = {
      id: 211,
      main: 'Thunderstorm',
      description: 'thunderstorm',
      icon: '11n',
    }
    const items = [
      makeForecastItem(0, { weather: [clouds] }),
      makeForecastItem(1, { weather: [rain] }),
      makeForecastItem(2, { weather: [nightStorm] }),
    ]
    const [day] = toForecast(forecastResponse(items)).daily
    // clouds and rain tie on daytime frequency; rain is more severe. Night storm is ignored.
    expect(day!.condition.group).toBe('rain')
    expect(day!.condition.isDay).toBe(true)
  })
})

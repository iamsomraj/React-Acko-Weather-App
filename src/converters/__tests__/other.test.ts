import { describe, expect, it } from 'vitest'
import { toAirQuality, toCurrentConditions, toLocations } from '@/converters'
import {
  airPollutionResponse,
  currentWeatherResponse,
  geocodingResponse,
} from '@/test/fixtures/weather'

describe('toCurrentConditions', () => {
  it('maps the current weather response into UI types', () => {
    const current = toCurrentConditions(currentWeatherResponse)
    expect(current).toMatchObject({
      location: { name: 'Mumbai', country: 'IN' },
      temperature: 28.4,
      feelsLike: 32.1,
      humidity: 78,
      visibility: 6000,
      precipitationLastHour: 0.4,
      wind: { speed: 5.1, gust: null, direction: 'WSW' },
      condition: { group: 'clouds', isDay: false },
    })
    expect(current.observedAt).toBe(currentWeatherResponse.dt * 1000)
  })
})

describe('toLocations', () => {
  it('prefers English names, rounds coordinates and removes near-duplicates', () => {
    expect(toLocations(geocodingResponse)).toEqual([
      {
        name: 'London',
        country: 'GB',
        state: 'England',
        lat: 51.5074,
        lon: -0.1278,
      },
      {
        name: 'London',
        country: 'CA',
        state: 'Ontario',
        lat: 42.9834,
        lon: -81.233,
      },
    ])
  })
})

describe('toAirQuality', () => {
  it('labels the AQI and lists key pollutants', () => {
    const airQuality = toAirQuality(airPollutionResponse)
    expect(airQuality?.label).toBe('Moderate')
    expect(airQuality?.pollutants.map((p) => p.label)).toEqual([
      'PM2.5',
      'PM10',
      'O₃',
      'NO₂',
      'SO₂',
      'CO',
    ])
    expect(airQuality?.pollutants[0]?.value).toBe(35.6)
  })

  it('returns null when there are no readings', () => {
    expect(toAirQuality({ ...airPollutionResponse, list: [] })).toBeNull()
  })
})

import { describe, expect, it } from 'vitest'
import { parseWeatherParams, weatherPath } from '@/lib/routes'

describe('weather route helpers', () => {
  it('round-trips a location through the URL', () => {
    const location = {
      name: 'São Paulo',
      state: 'SP',
      country: 'BR',
      lat: -23.5505,
      lon: -46.6333,
    }
    const path = weatherPath(location)
    expect(path.startsWith('/weather?')).toBe(true)
    expect(
      parseWeatherParams(new URL(path, 'https://x.test').searchParams)
    ).toEqual(location)
  })

  it.each(['', 'lat=abc&lon=1', 'lat=91&lon=0', 'lat=0&lon=181', 'lat=10'])(
    'rejects invalid params "%s"',
    (query) => {
      expect(parseWeatherParams(new URLSearchParams(query))).toBeNull()
    }
  )
})

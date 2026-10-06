import type { Location } from '@/frontendTypes'

export const routes = {
  home: '/',
  weather: '/weather',
  about: '/about',
  privacy: '/privacy',
} as const

/** Builds a shareable /weather URL for a location. */
export const weatherPath = (
  location: Pick<Location, 'lat' | 'lon' | 'name'> &
    Partial<Pick<Location, 'country' | 'state'>>
) => {
  const params = new URLSearchParams({
    lat: location.lat.toFixed(4),
    lon: location.lon.toFixed(4),
    name: location.name,
  })
  if (location.country) params.set('country', location.country)
  if (location.state) params.set('state', location.state)
  return `${routes.weather}?${params.toString()}`
}

/** Parses /weather search params back into a location, or null if invalid. */
export const parseWeatherParams = (
  params: URLSearchParams
): Location | null => {
  const lat = Number(params.get('lat'))
  const lon = Number(params.get('lon'))
  if (
    !params.has('lat') ||
    !params.has('lon') ||
    !Number.isFinite(lat) ||
    !Number.isFinite(lon) ||
    Math.abs(lat) > 90 ||
    Math.abs(lon) > 180
  ) {
    return null
  }
  return {
    lat,
    lon,
    name: params.get('name') ?? '',
    country: params.get('country') ?? '',
    state: params.get('state') ?? undefined,
  }
}

import type { OwmGeocodingResponse, OwmGeocodingResult } from '@/apiTypes'
import type { Location } from '@/frontendTypes'

export const toLocation = (result: OwmGeocodingResult): Location => ({
  name: result.local_names?.en ?? result.name,
  country: result.country,
  state: result.state,
  lat: Number(result.lat.toFixed(4)),
  lon: Number(result.lon.toFixed(4)),
})

/** OpenWeather often returns near-duplicates (same city, slightly different coords). */
export const toLocations = (response: OwmGeocodingResponse): Location[] => {
  const seen = new Set<string>()
  return response.map(toLocation).filter((location) => {
    const key = `${location.name}|${location.state ?? ''}|${location.country}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

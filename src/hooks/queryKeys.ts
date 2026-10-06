import type { Coordinates } from '@/api'
import type { Units } from '@/frontendTypes'

/** Query key factory — one place to see every cached resource. */
export const weatherKeys = {
  all: ['weather'] as const,
  current: (coords: Coordinates, units: Units) =>
    [...weatherKeys.all, 'current', coords.lat, coords.lon, units] as const,
  forecast: (coords: Coordinates, units: Units) =>
    [...weatherKeys.all, 'forecast', coords.lat, coords.lon, units] as const,
  airQuality: (coords: Coordinates) =>
    [...weatherKeys.all, 'air-quality', coords.lat, coords.lon] as const,
  search: (query: string) => [...weatherKeys.all, 'search', query] as const,
}

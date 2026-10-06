import type { Location } from '@/frontendTypes'

export const APP_NAME = 'WeatherNow'
export const APP_TAGLINE =
  'Live conditions, hourly charts and a 5-day outlook for any city on Earth — free, fast and ad-free.'

export const STORAGE_KEYS = {
  theme: 'weathernow:theme',
  units: 'weathernow:units',
  recents: 'weathernow:recent-locations',
} as const

export const MAX_RECENT_LOCATIONS = 6

export const POPULAR_LOCATIONS: Location[] = [
  { name: 'London', country: 'GB', lat: 51.5073, lon: -0.1276 },
  {
    name: 'New York',
    country: 'US',
    state: 'New York',
    lat: 40.7128,
    lon: -74.006,
  },
  { name: 'Tokyo', country: 'JP', lat: 35.6828, lon: 139.759 },
  {
    name: 'Mumbai',
    country: 'IN',
    state: 'Maharashtra',
    lat: 19.0761,
    lon: 72.8775,
  },
  {
    name: 'Sydney',
    country: 'AU',
    state: 'New South Wales',
    lat: -33.8688,
    lon: 151.2093,
  },
  { name: 'Reykjavík', country: 'IS', lat: 64.1466, lon: -21.9426 },
]

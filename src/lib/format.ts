import type { Location, Units } from '@/frontendTypes'

/**
 * Formatting helpers. Times are rendered in the *location's* local time by
 * shifting the epoch by its UTC offset and formatting in UTC.
 */

export const formatTemp = (value: number) => `${Math.round(value)}°`

export const tempUnit = (units: Units) => (units === 'metric' ? '°C' : '°F')

/** OpenWeather returns m/s for metric and mph for imperial; show km/h for metric. */
export const formatWindSpeed = (speed: number, units: Units) =>
  units === 'metric'
    ? `${Math.round(speed * 3.6)} km/h`
    : `${Math.round(speed)} mph`

export const formatVisibility = (metres: number | null, units: Units) => {
  if (metres === null) return '—'
  return units === 'metric'
    ? `${(metres / 1000).toFixed(metres >= 10_000 ? 0 : 1)} km`
    : `${(metres / 1609.34).toFixed(1)} mi`
}

export const formatPressure = (hPa: number) => `${Math.round(hPa)} hPa`

export const formatPercent = (value: number) => `${Math.round(value)}%`

export const formatPrecipitation = (mm: number, units: Units) =>
  units === 'metric' ? `${mm.toFixed(1)} mm` : `${(mm / 25.4).toFixed(2)} in`

const shift = (epochMs: number, offsetSeconds: number) =>
  new Date(epochMs + offsetSeconds * 1000)

export const formatLocalTime = (
  epochMs: number,
  offsetSeconds: number,
  options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit' }
) =>
  new Intl.DateTimeFormat(undefined, { ...options, timeZone: 'UTC' }).format(
    shift(epochMs, offsetSeconds)
  )

export const formatLocalHour = (epochMs: number, offsetSeconds: number) =>
  formatLocalTime(epochMs, offsetSeconds, { hour: 'numeric' })

/** Formats a YYYY-MM-DD key without letting the browser's timezone shift it. */
export const formatDateKey = (
  dateKey: string,
  options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }
) =>
  new Intl.DateTimeFormat(undefined, { ...options, timeZone: 'UTC' }).format(
    new Date(`${dateKey}T00:00:00Z`)
  )

export const todayKey = (offsetSeconds: number, now = Date.now()) =>
  shift(now, offsetSeconds).toISOString().slice(0, 10)

export const formatDayLabel = (
  dateKey: string,
  offsetSeconds: number,
  now = Date.now()
) => {
  const today = todayKey(offsetSeconds, now)
  if (dateKey === today) return 'Today'
  const tomorrow = todayKey(offsetSeconds, now + 86_400_000)
  if (dateKey === tomorrow) return 'Tomorrow'
  return formatDateKey(dateKey, { weekday: 'long' })
}

export const formatLocation = (
  location: Pick<Location, 'name' | 'state' | 'country'>
) =>
  [location.name, location.state, location.country].filter(Boolean).join(', ')

export const formatUtcOffset = (offsetSeconds: number) => {
  const sign = offsetSeconds >= 0 ? '+' : '−'
  const abs = Math.abs(offsetSeconds)
  const hours = Math.floor(abs / 3600)
  const minutes = Math.floor((abs % 3600) / 60)
  return `UTC${sign}${hours}${minutes ? `:${String(minutes).padStart(2, '0')}` : ''}`
}

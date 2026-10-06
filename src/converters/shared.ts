import type { OwmCondition, OwmWind } from '@/apiTypes'
import type { Condition, ConditionGroup, Wind } from '@/frontendTypes'

const COMPASS = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
] as const

export const toCompass = (degrees: number): string => {
  const normalised = ((degrees % 360) + 360) % 360
  return COMPASS[Math.round(normalised / 22.5) % 16] ?? 'N'
}

/** Maps an OpenWeather condition code to a coarse group used for icons and theming. */
export const toConditionGroup = (code: number): ConditionGroup => {
  if (code >= 200 && code < 300) return 'thunderstorm'
  if (code >= 300 && code < 400) return 'drizzle'
  if (code >= 500 && code < 600) return 'rain'
  if (code >= 600 && code < 700) return 'snow'
  if (code >= 700 && code < 800) return 'atmosphere'
  if (code === 800) return 'clear'
  return 'clouds'
}

/** Higher = more noteworthy. Used to break ties when summarising a day. */
export const CONDITION_SEVERITY: Record<ConditionGroup, number> = {
  clear: 0,
  clouds: 1,
  atmosphere: 2,
  drizzle: 3,
  rain: 4,
  snow: 5,
  thunderstorm: 6,
}

const capitalise = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1)

export const toCondition = (raw: OwmCondition | undefined): Condition => {
  const code = raw?.id ?? 800
  return {
    code,
    group: toConditionGroup(code),
    label: raw?.main ?? 'Clear',
    description: capitalise(raw?.description ?? 'clear sky'),
    isDay: !raw?.icon?.endsWith('n'),
  }
}

export const toWind = (raw: OwmWind): Wind => ({
  speed: raw.speed,
  gust: raw.gust ?? null,
  degrees: raw.deg,
  direction: toCompass(raw.deg),
})

/** YYYY-MM-DD for a UTC epoch (seconds) shifted into the location's timezone. */
export const toLocalDateKey = (epochSeconds: number, offsetSeconds: number) =>
  new Date((epochSeconds + offsetSeconds) * 1000).toISOString().slice(0, 10)

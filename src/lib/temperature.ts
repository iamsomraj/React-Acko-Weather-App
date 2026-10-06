import type { Units } from '@/frontendTypes'

const toCelsius = (value: number, units: Units) =>
  units === 'metric' ? value : ((value - 32) * 5) / 9

/** Maps a temperature to a semantic CSS colour token for range bars and accents. */
export const temperatureColor = (value: number, units: Units) => {
  const celsius = toCelsius(value, units)
  if (celsius < 5) return 'var(--temp-cold)'
  if (celsius < 18) return 'var(--temp-mild)'
  if (celsius < 28) return 'var(--temp-warm)'
  return 'var(--temp-hot)'
}

import type { OwmAirPollutionResponse } from '@/apiTypes'
import type { AirQuality, AqiLevel } from '@/frontendTypes'

export const AQI_SCALE: Record<
  AqiLevel,
  { label: string; description: string }
> = {
  1: {
    label: 'Good',
    description: 'Air quality is great — enjoy the outdoors.',
  },
  2: { label: 'Fair', description: 'Acceptable for most people.' },
  3: {
    label: 'Moderate',
    description: 'Sensitive groups may want to limit long outdoor exertion.',
  },
  4: { label: 'Poor', description: 'Consider reducing time spent outdoors.' },
  5: {
    label: 'Very poor',
    description: 'Avoid outdoor activity where possible.',
  },
}

const POLLUTANTS = [
  { key: 'pm2_5', label: 'PM2.5' },
  { key: 'pm10', label: 'PM10' },
  { key: 'o3', label: 'O₃' },
  { key: 'no2', label: 'NO₂' },
  { key: 'so2', label: 'SO₂' },
  { key: 'co', label: 'CO' },
] as const

export const toAirQuality = (
  response: OwmAirPollutionResponse
): AirQuality | null => {
  const latest = response.list[0]
  if (!latest) return null

  const aqi = latest.main.aqi
  return {
    aqi,
    ...AQI_SCALE[aqi],
    pollutants: POLLUTANTS.map(({ key, label }) => ({
      key,
      label,
      value: latest.components[key],
      unit: 'μg/m³',
    })),
  }
}

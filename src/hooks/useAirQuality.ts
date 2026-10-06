import { skipToken, useQuery } from '@tanstack/react-query'
import { getAirPollution, type Coordinates } from '@/api'
import { toAirQuality } from '@/converters'
import { weatherKeys } from './queryKeys'

export function useAirQuality(coords: Coordinates | null) {
  return useQuery({
    queryKey: coords ? weatherKeys.airQuality(coords) : weatherKeys.all,
    queryFn: coords
      ? async ({ signal }) =>
          toAirQuality(await getAirPollution(coords, signal))
      : skipToken,
  })
}

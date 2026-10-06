import { skipToken, useQuery } from '@tanstack/react-query'
import { getCurrentWeather, type Coordinates } from '@/api'
import { toCurrentConditions } from '@/converters'
import { useUnits } from '@/providers/UnitsProvider'
import { weatherKeys } from './queryKeys'

export function useCurrentWeather(coords: Coordinates | null) {
  const { units } = useUnits()
  return useQuery({
    queryKey: coords ? weatherKeys.current(coords, units) : weatherKeys.all,
    queryFn: coords
      ? async ({ signal }) =>
          toCurrentConditions(await getCurrentWeather(coords, units, signal))
      : skipToken,
  })
}

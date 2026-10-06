import { skipToken, useQuery } from '@tanstack/react-query'
import { getForecast, type Coordinates } from '@/api'
import { toForecast } from '@/converters'
import { useUnits } from '@/providers/UnitsProvider'
import { weatherKeys } from './queryKeys'

export function useForecast(coords: Coordinates | null) {
  const { units } = useUnits()
  return useQuery({
    queryKey: coords ? weatherKeys.forecast(coords, units) : weatherKeys.all,
    queryFn: coords
      ? async ({ signal }) =>
          toForecast(await getForecast(coords, units, signal))
      : skipToken,
    staleTime: 30 * 60 * 1000,
  })
}

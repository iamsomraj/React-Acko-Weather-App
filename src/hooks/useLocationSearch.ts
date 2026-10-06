import { keepPreviousData, skipToken, useQuery } from '@tanstack/react-query'
import { searchLocations } from '@/api'
import { toLocations } from '@/converters'
import { useDebounce } from './useDebounce'
import { weatherKeys } from './queryKeys'

export const MIN_SEARCH_LENGTH = 2

/** Debounced city autocomplete backed by OpenWeather's geocoding API. */
export function useLocationSearch(term: string) {
  const query = useDebounce(term.trim(), 300)
  const enabled = query.length >= MIN_SEARCH_LENGTH

  const result = useQuery({
    queryKey: weatherKeys.search(query.toLowerCase()),
    queryFn: enabled
      ? async ({ signal }) => toLocations(await searchLocations(query, signal))
      : skipToken,
    placeholderData: keepPreviousData,
    staleTime: 24 * 60 * 60 * 1000,
  })

  return {
    ...result,
    query,
    isDebouncing: term.trim() !== query,
    isEnabled: enabled,
  }
}

import { useCallback } from 'react'
import type { Location } from '@/frontendTypes'
import { MAX_RECENT_LOCATIONS, STORAGE_KEYS } from '@/lib/constants'
import { useLocalStorage } from './useLocalStorage'

const EMPTY: Location[] = []

const sameLocation = (a: Location, b: Location) =>
  Math.abs(a.lat - b.lat) < 0.01 && Math.abs(a.lon - b.lon) < 0.01

export function useRecentLocations() {
  const [recents, setRecents] = useLocalStorage<Location[]>(
    STORAGE_KEYS.recents,
    EMPTY
  )

  const addRecent = useCallback(
    (location: Location) =>
      setRecents((previous) =>
        [
          location,
          ...previous.filter((item) => !sameLocation(item, location)),
        ].slice(0, MAX_RECENT_LOCATIONS)
      ),
    [setRecents]
  )

  const removeRecent = useCallback(
    (location: Location) =>
      setRecents((previous) =>
        previous.filter((item) => !sameLocation(item, location))
      ),
    [setRecents]
  )

  const clearRecents = useCallback(() => setRecents(EMPTY), [setRecents])

  return { recents, addRecent, removeRecent, clearRecents }
}

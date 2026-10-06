import { useCallback, useSyncExternalStore } from 'react'

const LOCAL_EVENT = 'weathernow:storage'

const read = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

const subscribe = (callback: () => void) => {
  window.addEventListener('storage', callback)
  window.addEventListener(LOCAL_EVENT, callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener(LOCAL_EVENT, callback)
  }
}

/**
 * JSON-serialised localStorage state that stays in sync across components and
 * tabs. Storage failures (private mode, quota) fall back to the default.
 */
export function useLocalStorage<T>(key: string, fallback: T) {
  const raw = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => null
  )

  let value = fallback
  if (raw !== null) {
    try {
      value = JSON.parse(raw) as T
    } catch {
      value = fallback
    }
  }

  const setValue = useCallback(
    (next: T | ((previous: T) => T)) => {
      const current = read(key)
      let previous = fallback
      if (current !== null) {
        try {
          previous = JSON.parse(current) as T
        } catch {
          previous = fallback
        }
      }
      const resolved =
        typeof next === 'function' ? (next as (p: T) => T)(previous) : next
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved))
      } catch {
        // Ignore — storage may be unavailable.
      }
      window.dispatchEvent(new Event(LOCAL_EVENT))
    },
    [key, fallback]
  )

  return [value, setValue] as const
}

import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useGeolocation, useRecentLocations } from '@/hooks'
import { MAX_RECENT_LOCATIONS } from '@/lib/constants'

const place = (name: string, lat: number) => ({
  name,
  country: 'XX',
  lat,
  lon: lat,
})

describe('useRecentLocations', () => {
  it('adds most-recent-first, de-duplicates and caps the list', () => {
    const { result } = renderHook(() => useRecentLocations())
    act(() => {
      for (let i = 0; i < MAX_RECENT_LOCATIONS + 2; i++)
        result.current.addRecent(place(`City ${i}`, i))
    })
    act(() => result.current.addRecent(place('City 3 again', 3.001)))

    expect(result.current.recents).toHaveLength(MAX_RECENT_LOCATIONS)
    expect(result.current.recents[0]?.name).toBe('City 3 again')
    expect(
      result.current.recents.filter((r) => Math.round(r.lat) === 3)
    ).toHaveLength(1)
  })

  it('stays in sync between hook instances', () => {
    const a = renderHook(() => useRecentLocations())
    const b = renderHook(() => useRecentLocations())
    act(() => a.result.current.addRecent(place('Paris', 48.85)))
    expect(b.result.current.recents[0]?.name).toBe('Paris')
    act(() => b.result.current.clearRecents())
    expect(a.result.current.recents).toEqual([])
  })
})

describe('useGeolocation', () => {
  const mockGeolocation = (impl: Geolocation['getCurrentPosition']) =>
    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: { getCurrentPosition: vi.fn(impl) },
    })

  it('resolves rounded coordinates on success', async () => {
    mockGeolocation((success) =>
      success({
        coords: { latitude: 51.507351, longitude: -0.127758 },
      } as GeolocationPosition)
    )
    const { result } = renderHook(() => useGeolocation())
    let coords
    await act(async () => {
      coords = await result.current.locate()
    })
    expect(coords).toEqual({ lat: 51.5074, lon: -0.1278 })
    expect(result.current.status).toBe('success')
  })

  it('reports a friendly message when permission is denied', async () => {
    mockGeolocation((_success, error) =>
      error?.({
        code: 1,
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
        message: '',
      } as GeolocationPositionError)
    )
    const { result } = renderHook(() => useGeolocation())
    await act(() => result.current.locate().catch(() => undefined))
    expect(result.current.status).toBe('error')
    expect(result.current.error).toMatch(/permission was denied/)
  })
})

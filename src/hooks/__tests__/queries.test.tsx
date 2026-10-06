import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useForecast, useLocationSearch, useUnits } from '@/hooks'
import { forecastResponse, geocodingResponse } from '@/test/fixtures/weather'
import { createWrapper, mockFetchByPath } from '@/test/utils'

const coords = { lat: 19.0761, lon: 72.8775 }

describe('useForecast', () => {
  it('fetches and converts the forecast', async () => {
    mockFetchByPath({ '/data/2.5/forecast': forecastResponse() })
    const { result } = renderHook(() => useForecast(coords), {
      wrapper: createWrapper(),
    })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data?.location.name).toBe('Mumbai')
    expect(result.current.data?.daily).toHaveLength(3)
  })

  it('does not fetch without coordinates', () => {
    const fetchSpy = mockFetchByPath({})
    const { result } = renderHook(() => useForecast(null), {
      wrapper: createWrapper(),
    })
    expect(result.current.fetchStatus).toBe('idle')
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('refetches with the new unit system when units change', async () => {
    localStorage.setItem('weathernow:units', '"metric"')
    const fetchSpy = mockFetchByPath({
      '/data/2.5/forecast': forecastResponse(),
    })
    const { result } = renderHook(
      () => ({ forecast: useForecast(coords), units: useUnits() }),
      {
        wrapper: createWrapper(),
      }
    )
    await waitFor(() => expect(result.current.forecast.isSuccess).toBe(true))

    act(() => result.current.units.setUnits('imperial'))
    await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(2))
    expect(
      new URL(String(fetchSpy.mock.calls[1]![0])).searchParams.get('units')
    ).toBe('imperial')
  })

  it('surfaces friendly API errors', async () => {
    mockFetchByPath({
      '/data/2.5/forecast': () => new Response('{"cod":401}', { status: 401 }),
    })
    const { result } = renderHook(() => useForecast(coords), {
      wrapper: createWrapper(),
    })
    await waitFor(() => expect(result.current.isError).toBe(true))
    expect(result.current.error?.message).toMatch(/API key was rejected/)
  })
})

describe('useLocationSearch', () => {
  it('debounces input and needs at least two characters', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const fetchSpy = mockFetchByPath({ '/geo/1.0/direct': geocodingResponse })
    const { result, rerender } = renderHook(
      ({ term }) => useLocationSearch(term),
      {
        wrapper: createWrapper(),
        initialProps: { term: 'L' },
      }
    )
    expect(result.current.isEnabled).toBe(false)

    rerender({ term: 'Lon' })
    rerender({ term: 'London' })
    expect(result.current.isDebouncing).toBe(true)

    await act(() => vi.advanceTimersByTimeAsync(350))
    await waitFor(() => expect(result.current.data).toHaveLength(2))
    expect(fetchSpy).toHaveBeenCalledTimes(1)
    expect(
      new URL(String(fetchSpy.mock.calls[0]![0])).searchParams.get('q')
    ).toBe('London')
    vi.useRealTimers()
  })
})

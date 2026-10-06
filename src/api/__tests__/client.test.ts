import { describe, expect, it, vi } from 'vitest'
import { ApiError, owmFetch } from '@/api'

const respond = (status: number, body: unknown = {}) =>
  vi
    .spyOn(globalThis, 'fetch')
    .mockResolvedValue(new Response(JSON.stringify(body), { status }))

describe('owmFetch', () => {
  it('adds the API key and params, skipping undefined values', async () => {
    const fetchSpy = respond(200, { ok: true })
    await expect(
      owmFetch('/data/2.5/weather', { lat: 1.5, lon: 2, units: undefined })
    ).resolves.toEqual({ ok: true })

    const url = new URL(String(fetchSpy.mock.calls[0]![0]))
    expect(url.origin + url.pathname).toBe(
      'https://api.openweathermap.org/data/2.5/weather'
    )
    expect(Object.fromEntries(url.searchParams)).toEqual({
      lat: '1.5',
      lon: '2',
      appid: 'test-key',
    })
  })

  it.each([
    [401, 'unauthorized', false],
    [404, 'not-found', false],
    [429, 'rate-limited', false],
    [503, 'server', true],
  ] as const)(
    'maps HTTP %i to a %s ApiError',
    async (status, kind, retryable) => {
      respond(status, { cod: status, message: 'nope' })
      const error = await owmFetch('/x', {}).catch((e: unknown) => e)
      expect(error).toBeInstanceOf(ApiError)
      expect(error).toMatchObject({ kind, status, isRetryable: retryable })
    }
  )

  it('wraps network failures', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(
      new TypeError('Failed to fetch')
    )
    await expect(owmFetch('/x', {})).rejects.toMatchObject({
      kind: 'network',
      isRetryable: true,
    })
  })

  it('rethrows aborts untouched so React Query can cancel', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(
      new DOMException('aborted', 'AbortError')
    )
    await expect(owmFetch('/x', {})).rejects.toHaveProperty(
      'name',
      'AbortError'
    )
  })
})

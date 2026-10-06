import { env, hasApiKey } from '@/config/env'
import type { OwmErrorResponse } from '@/apiTypes'

export type ApiErrorKind =
  | 'missing-key'
  | 'unauthorized'
  | 'not-found'
  | 'rate-limited'
  | 'server'
  | 'network'

const FRIENDLY_MESSAGES: Record<ApiErrorKind, string> = {
  'missing-key':
    'No OpenWeather API key configured. Add VITE_OPENWEATHER_API_KEY to your .env file.',
  unauthorized:
    'The OpenWeather API key was rejected. Check that it is valid and active.',
  'not-found':
    "We couldn't find that location. Try a different spelling or a nearby city.",
  'rate-limited':
    'Too many requests right now. Please wait a moment and try again.',
  server: 'The weather service is having trouble. Please try again shortly.',
  network: 'Network error — check your connection and try again.',
}

export class ApiError extends Error {
  readonly kind: ApiErrorKind
  readonly status: number | null

  constructor(
    kind: ApiErrorKind,
    status: number | null = null,
    detail?: string
  ) {
    super(FRIENDLY_MESSAGES[kind])
    this.name = 'ApiError'
    this.kind = kind
    this.status = status
    if (detail) this.cause = detail
  }

  /** Client errors are not worth retrying. */
  get isRetryable() {
    return this.kind === 'server' || this.kind === 'network'
  }
}

const kindFromStatus = (status: number): ApiErrorKind => {
  if (status === 401) return 'unauthorized'
  if (status === 404) return 'not-found'
  if (status === 429) return 'rate-limited'
  return 'server'
}

type QueryValue = string | number | undefined

/**
 * Thin typed wrapper over `fetch` for OpenWeather. This is the only module in
 * the app that performs network I/O.
 */
export async function owmFetch<T>(
  path: string,
  params: Record<string, QueryValue>,
  signal?: AbortSignal
): Promise<T> {
  if (!hasApiKey()) throw new ApiError('missing-key')

  const url = new URL(path, env.openWeatherBaseUrl)
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.searchParams.set(key, String(value))
  }
  url.searchParams.set('appid', env.openWeatherApiKey)

  let response: Response
  try {
    response = await fetch(url, { signal })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError')
      throw error
    throw new ApiError('network', null, String(error))
  }

  if (!response.ok) {
    const body = (await response
      .json()
      .catch(() => null)) as OwmErrorResponse | null
    throw new ApiError(
      kindFromStatus(response.status),
      response.status,
      body?.message
    )
  }

  return (await response.json()) as T
}

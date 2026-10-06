import { QueryClient } from '@tanstack/react-query'
import { ApiError } from '@/api'

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // Forecast data updates every few hours; current conditions every ~10 min.
        staleTime: 10 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          if (error instanceof ApiError && !error.isRetryable) return false
          return failureCount < 2
        },
      },
    },
  })

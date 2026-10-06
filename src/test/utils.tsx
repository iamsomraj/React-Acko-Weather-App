import type { ReactElement, ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { UnitsProvider } from '@/providers/UnitsProvider'

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: Infinity } },
  })

export function createWrapper({
  route = '/',
  queryClient = createTestQueryClient(),
}: { route?: string; queryClient?: QueryClient } = {}) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <UnitsProvider>
            <TooltipProvider>
              <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
            </TooltipProvider>
          </UnitsProvider>
        </ThemeProvider>
      </QueryClientProvider>
    )
  }
}

export const renderWithProviders = (
  ui: ReactElement,
  options?: Parameters<typeof createWrapper>[0]
) => render(ui, { wrapper: createWrapper(options) })

/** Routes mocked fetch calls by OpenWeather path. */
export const mockFetchByPath = (
  routes: Record<string, unknown | (() => Response)>
) =>
  vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
    const url = new URL(input instanceof Request ? input.url : String(input))
    const handler = routes[url.pathname]
    if (handler === undefined) {
      return new Response(JSON.stringify({ cod: 404, message: 'not mocked' }), {
        status: 404,
      })
    }
    if (typeof handler === 'function') return (handler as () => Response)()
    return new Response(JSON.stringify(handler), { status: 200 })
  })

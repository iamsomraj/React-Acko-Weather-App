import { lazy, Suspense, useState, type ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { createQueryClient } from './queryClient'
import { ThemeProvider } from './ThemeProvider'
import { UnitsProvider } from './UnitsProvider'

const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-query-devtools').then((module) => ({
        default: module.ReactQueryDevtools,
      }))
    )
  : () => null

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(createQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UnitsProvider>
          <TooltipProvider delayDuration={200}>
            <BrowserRouter>{children}</BrowserRouter>
            <Toaster position="bottom-center" />
          </TooltipProvider>
        </UnitsProvider>
      </ThemeProvider>
      <Suspense fallback={null}>
        <ReactQueryDevtools buttonPosition="bottom-left" />
      </Suspense>
    </QueryClientProvider>
  )
}

import { Suspense, type ReactNode } from 'react'
import { useLocation } from 'react-router'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorState } from '@/components/weather/ErrorState'
import { ErrorBoundary } from './ErrorBoundary'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

function PageFallback() {
  return (
    <div
      className="mx-auto max-w-6xl space-y-6 px-4 py-10 sm:px-6"
      aria-busy="true"
    >
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-64 w-full rounded-2xl" />
    </div>
  )
}

export function RootLayout({ children }: { children: ReactNode }) {
  const location = useLocation()

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <ErrorBoundary
          key={location.pathname}
          fallback={(error, reset) => (
            <div className="mx-auto max-w-xl px-4 py-16">
              <ErrorState
                title="Something went wrong"
                message={error.message}
                onRetry={reset}
              />
            </div>
          )}
        >
          <Suspense fallback={<PageFallback />}>{children}</Suspense>
        </ErrorBoundary>
      </main>
      <SiteFooter />
    </div>
  )
}

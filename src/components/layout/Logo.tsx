import { Link } from 'react-router'
import { APP_NAME } from '@/lib/constants'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn('size-7', className)}
    >
      <defs>
        <linearGradient id="logo-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.12 225)" />
          <stop offset="100%" stopColor="oklch(0.55 0.16 245)" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#logo-sky)" />
      <circle cx="12.5" cy="12.5" r="4.5" fill="oklch(0.92 0.13 85)" />
      <path
        d="M10 23.5h11.5a4 4 0 0 0 .4-7.98 5.5 5.5 0 0 0-10.6 1.6A3.2 3.2 0 0 0 10 23.5Z"
        fill="white"
        fillOpacity="0.95"
      />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to={routes.home}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg font-semibold tracking-tight outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
        className
      )}
      aria-label={`${APP_NAME} home`}
    >
      <LogoMark />
      <span className="text-lg">{APP_NAME}</span>
    </Link>
  )
}

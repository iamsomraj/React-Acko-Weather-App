import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { POPULAR_LOCATIONS } from '@/lib/constants'
import { weatherPath } from '@/lib/routes'

export function PopularLocations() {
  return (
    <nav
      aria-label="Popular cities"
      className="flex flex-wrap justify-center gap-2"
    >
      {POPULAR_LOCATIONS.map((location) => (
        <Link
          key={location.name}
          to={weatherPath(location)}
          className="group inline-flex items-center gap-1 rounded-full glass px-3.5 py-1.5 text-sm transition-colors outline-none hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          {location.name}
          <ArrowUpRight
            className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </Link>
      ))}
    </nav>
  )
}

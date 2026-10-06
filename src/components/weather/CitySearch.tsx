import { useState, type FocusEvent } from 'react'
import { Clock, Loader2, LocateFixed, MapPin, X } from 'lucide-react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import type { Location } from '@/frontendTypes'
import {
  MIN_SEARCH_LENGTH,
  useGeolocation,
  useLocationSearch,
  useRecentLocations,
} from '@/hooks'
import { formatLocation } from '@/lib/format'
import { weatherPath } from '@/lib/routes'
import { cn } from '@/lib/utils'

interface CitySearchProps {
  size?: 'default' | 'lg'
  className?: string
  autoFocus?: boolean
}

/**
 * City autocomplete with recent searches and a "use my location" shortcut.
 * Selecting a result navigates to its shareable /weather URL.
 */
export function CitySearch({
  size = 'default',
  className,
  autoFocus,
}: CitySearchProps) {
  const navigate = useNavigate()
  const [term, setTerm] = useState('')
  const [open, setOpen] = useState(false)

  const search = useLocationSearch(term)
  const { recents, addRecent, removeRecent } = useRecentLocations()
  const geolocation = useGeolocation()

  const results = search.isEnabled ? (search.data ?? []) : []
  const isSearching =
    search.isEnabled && (search.isFetching || search.isDebouncing)
  const showRecents = !search.isEnabled && recents.length > 0

  const goTo = (location: Location) => {
    addRecent(location)
    setTerm('')
    setOpen(false)
    navigate(weatherPath(location))
  }

  const useMyLocation = async () => {
    try {
      const coords = await geolocation.locate()
      setOpen(false)
      navigate(weatherPath({ ...coords, name: '' }))
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Could not get your location'
      )
    }
  }

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
  }

  return (
    <Command
      label="Search for a city"
      shouldFilter={false}
      loop
      onBlur={handleBlur}
      onKeyDown={(event) => event.key === 'Escape' && setOpen(false)}
      className={cn(
        'relative overflow-visible rounded-xl glass',
        // `glass` (backdrop-filter) creates a stacking context, so the dropdown's
        // z-index only applies inside it. Lift the whole search above later
        // siblings (e.g. the popular-city chips) while the list is open.
        open && 'z-30',
        size === 'lg' && 'rounded-2xl shadow-lg shadow-sky-900/5',
        '[&_[data-slot=command-input-wrapper]]:border-0',
        size === 'lg' &&
          '[&_[data-slot=command-input-wrapper]]:h-14 [&_[data-slot=command-input-wrapper]]:px-4 [&_[data-slot=command-input-wrapper]_svg]:size-5',
        className
      )}
    >
      <div className="flex items-center">
        <CommandInput
          value={term}
          onValueChange={(value) => {
            setTerm(value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search for a city…"
          autoFocus={autoFocus}
          className={cn(size === 'lg' && 'h-14 text-base')}
          wrapperClassName="flex-1"
        />
        {isSearching && (
          <Loader2
            className="mr-3 size-4 animate-spin text-muted-foreground"
            aria-hidden
          />
        )}
      </div>

      {open && (
        <CommandList
          label="Locations"
          className="absolute top-[calc(100%+0.5rem)] right-0 left-0 z-50 max-h-80 rounded-xl border bg-popover p-1 text-popover-foreground shadow-xl"
          onMouseDown={(event) => event.preventDefault()}
        >
          <CommandGroup>
            <CommandItem
              value="__current-location"
              onSelect={useMyLocation}
              disabled={geolocation.status === 'locating'}
            >
              {geolocation.status === 'locating' ? (
                <Loader2 className="animate-spin" />
              ) : (
                <LocateFixed className="text-primary" />
              )}
              Use my current location
            </CommandItem>
          </CommandGroup>

          {showRecents && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Recent">
                {recents.map((location) => (
                  <CommandItem
                    key={`${location.lat},${location.lon}`}
                    value={`recent-${location.lat},${location.lon}`}
                    onSelect={() => goTo(location)}
                    className="group"
                  >
                    <Clock />
                    <span className="truncate">{formatLocation(location)}</span>
                    <button
                      type="button"
                      className="ml-auto rounded p-0.5 text-muted-foreground opacity-0 group-data-[selected=true]:opacity-100 hover:text-foreground focus-visible:opacity-100"
                      aria-label={`Remove ${location.name} from recent searches`}
                      onClick={(event) => {
                        event.stopPropagation()
                        removeRecent(location)
                      }}
                    >
                      <X className="size-3.5" />
                    </button>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          {search.isEnabled && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Results">
                {results.map((location) => (
                  <CommandItem
                    key={`${location.lat},${location.lon}`}
                    value={`result-${location.lat},${location.lon}`}
                    onSelect={() => goTo(location)}
                  >
                    <MapPin />
                    <span className="truncate">
                      {location.name}
                      <span className="text-muted-foreground">
                        {location.state ? `, ${location.state}` : ''},{' '}
                        {location.country}
                      </span>
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
              {!isSearching && results.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                  {search.isError
                    ? search.error.message
                    : `No places match "${search.query}".`}
                </p>
              )}
            </>
          )}

          {!search.isEnabled && term.trim().length > 0 && (
            <p className="px-3 py-2 text-xs text-muted-foreground">
              Type at least {MIN_SEARCH_LENGTH} characters to search.
            </p>
          )}
          <div aria-live="polite" className="sr-only">
            {search.isEnabled && !isSearching
              ? `${results.length} results`
              : ''}
          </div>
        </CommandList>
      )}
    </Command>
  )
}

import React, { useCallback, useId } from 'react'
import { IWeatherState } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/util/cn'

interface LocationSearchFormProps {
  term: string
  onChange: (value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  state: IWeatherState
  onClear: () => void
  className?: string
}

/**
 * LocationSearchForm - Form for searching weather by city name
 * Replaces the old Form component with more descriptive naming
 */
export function LocationSearchForm({
  term,
  onChange,
  onSubmit,
  state,
  onClear,
  className,
}: LocationSearchFormProps) {
  const inputId = useId()
  const errorId = useId()

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value)
    },
    [onChange]
  )

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      onSubmit(event)
    },
    [onSubmit]
  )

  const handleClear = useCallback(() => {
    onClear()
  }, [onClear])

  return (
    <Card className={cn('w-full max-w-md animate-fade-in', className)}>
      <CardHeader>
        <CardTitle className="text-center text-primary">
          Weather Lookup
        </CardTitle>
        <p className="text-center text-sm text-muted-foreground">
          Enter a city name to get current weather and forecast
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor={inputId}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              City Name
            </label>
            <Input
              id={inputId}
              type="text"
              value={term}
              onChange={handleInputChange}
              placeholder="Enter city name (e.g., London, Paris)"
              disabled={state.loading}
              aria-invalid={!!state.error}
              aria-describedby={state.error ? errorId : undefined}
              autoComplete="off"
              required
            />
            {state.error && (
              <div
                id={errorId}
                role="alert"
                className="text-sm text-destructive bg-destructive/10 p-2 rounded-md"
                aria-live="polite"
              >
                {state.error}
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <Button
              type="submit"
              disabled={!term.trim() || state.loading}
              className="flex-1"
              loading={state.loading}
              aria-describedby={state.loading ? 'loading-status' : undefined}
            >
              {state.loading ? 'Getting forecast...' : 'Get Forecast'}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              disabled={state.loading}
              aria-label="Clear location input and reset form"
            >
              Clear
            </Button>
          </div>

          {state.loading && (
            <div
              id="loading-status"
              role="status"
              aria-live="polite"
              className="sr-only"
            >
              Loading weather forecast data...
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

export default LocationSearchForm

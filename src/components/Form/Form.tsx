import React, { useCallback, useId } from 'react'
import { IFormProps } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/util/cn'

interface FormProps extends IFormProps {
  className?: string
}

export function Form({
  term,
  onChange,
  onSubmit,
  state,
  onClear,
  className,
}: FormProps) {
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
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
            <label
              htmlFor={inputId}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              City or Location
            </label>
            <Input
              id={inputId}
              type="text"
              placeholder="Enter city or location name..."
              value={term}
              onChange={handleInputChange}
              disabled={state.loading}
              className="w-full"
              error={!!state.error}
              helperText={state.error || undefined}
              aria-describedby={state.error ? errorId : undefined}
              aria-required="true"
              autoComplete="address-level2"
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={state.loading || !term.trim()}
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

export default Form

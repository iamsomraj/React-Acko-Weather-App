import React, { useCallback } from 'react'
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
  onInit,
  className,
}: FormProps) {
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

  const handleInit = useCallback(() => {
    onInit()
  }, [onInit])

  return (
    <Card className={cn('w-full max-w-md', className)}>
      <CardHeader>
        <CardTitle className="text-center">Weather Lookup</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter city or location name..."
              value={term}
              onChange={handleInputChange}
              disabled={state.loading}
              className="w-full"
            />
            {state.error && (
              <p className="text-sm text-red-500">{state.error}</p>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={state.loading || !term.trim()}
              className="flex-1"
            >
              {state.loading ? 'Fetching weather...' : 'Get Forecast'}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleInit}
              disabled={state.loading}
            >
              Use My Location
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default Form

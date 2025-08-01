import React from 'react'
import { cn } from '@/util/cn'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      error = false,
      helperText,
      id,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const helperId = helperText ? `${id}-helper` : undefined
    const errorId = error ? `${id}-error` : undefined
    const describedBy = [ariaDescribedBy, helperId, errorId]
      .filter(Boolean)
      .join(' ')

    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-destructive focus-visible:ring-destructive'
              : 'border-input hover:border-ring/50',
            className
          )}
          ref={ref}
          id={id}
          aria-describedby={describedBy || undefined}
          aria-invalid={error}
          {...props}
        />
        {helperText && (
          <p
            id={helperId}
            className={cn(
              'mt-1 text-xs',
              error ? 'text-destructive' : 'text-muted-foreground'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }

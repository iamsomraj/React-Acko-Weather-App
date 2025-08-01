import React from 'react'
import { cn } from '@/util/cn'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          // Variant styles
          {
            'bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg active:scale-95':
              variant === 'default',
            'bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90 hover:shadow-lg active:scale-95':
              variant === 'destructive',
            'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground active:scale-95':
              variant === 'outline',
            'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 active:scale-95':
              variant === 'secondary',
            'hover:bg-accent hover:text-accent-foreground active:scale-95':
              variant === 'ghost',
            'text-primary underline-offset-4 hover:underline focus:underline active:no-underline':
              variant === 'link',
          },
          // Size styles
          {
            'h-10 px-4 py-2 min-w-[2.5rem]': size === 'default',
            'h-9 rounded-md px-3 text-xs min-w-[2rem]': size === 'sm',
            'h-11 rounded-md px-8 text-base min-w-[3rem]': size === 'lg',
            'h-10 w-10 p-0': size === 'icon',
          },
          // Loading state
          loading && 'cursor-wait',
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className={cn(
              'animate-spin h-4 w-4',
              size === 'sm' && 'h-3 w-3',
              size === 'lg' && 'h-5 w-5',
              children && 'mr-2'
            )}
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }

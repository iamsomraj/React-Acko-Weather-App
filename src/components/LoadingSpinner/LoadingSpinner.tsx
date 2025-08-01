import { cn } from '@/util/cn'

interface LoadingSpinnerProps {
  text?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * LoadingSpinner - Reusable loading spinner component
 * Replaces the old Spinner component with more descriptive naming
 */
export function LoadingSpinner({
  text = 'Loading...',
  size = 'md',
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 space-y-4',
        className
      )}
      role="status"
      aria-label={text}
    >
      <div
        className={cn(
          'animate-spin rounded-full border-4 border-muted border-t-primary',
          sizeClasses[size]
        )}
        aria-hidden="true"
      />
      <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
    </div>
  )
}

export default LoadingSpinner

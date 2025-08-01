import { IActionButtonProps } from '@/types'
import { cn } from '@/util/cn'
import { Link } from 'react-router-dom'

interface ModernActionButtonProps extends IActionButtonProps {
  className?: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function ActionButton({
  body,
  path,
  className,
  variant = 'default',
  size = 'md',
}: ModernActionButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transform hover:scale-105 active:scale-95'

  const variantStyles = {
    default:
      'bg-gradient-to-br from-primary-500 to-primary-700 hover:from-primary-400 hover:to-primary-600 text-primary-foreground shadow-lg hover:shadow-xl',
    outline:
      'border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground shadow-sm hover:shadow-md',
    ghost: 'text-primary hover:bg-primary/10 hover:text-primary-foreground',
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <Link
      to={path}
      className={cn(
        baseClasses,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      role="button"
      aria-label={`Navigate to ${body}`}
    >
      {body}
    </Link>
  )
}

export default ActionButton

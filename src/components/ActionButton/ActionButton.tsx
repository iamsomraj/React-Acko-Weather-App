import { IActionButtonProps } from '@/types'
import { cn } from '@/util/cn'
import { Link } from 'react-router-dom'

interface ModernActionButtonProps extends IActionButtonProps {
  className?: string
  variant?: 'default' | 'outline' | 'ghost'
}

export function ActionButton({
  body,
  path,
  className,
  variant = 'default',
}: ModernActionButtonProps) {
  const variantStyles = {
    default:
      'bg-gradient-to-br from-primary-500 to-primary-700 hover:to-primary-600 text-white shadow-lg hover:shadow-2xl',
    outline:
      'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
    ghost: 'text-primary-500 hover:bg-primary-50',
  }

  return (
    <Link
      to={path}
      className={cn(
        'inline-block mt-4 mb-8 lg:mb-16 py-3 px-12 rounded font-bold text-md tracking-wide transition-all duration-500 transform hover:scale-105',
        variantStyles[variant],
        className
      )}
    >
      {body}
    </Link>
  )
}

export default ActionButton

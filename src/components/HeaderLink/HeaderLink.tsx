import { Link, useLocation } from 'react-router-dom'
import { IHeaderLinkProps } from '@/types'
import { cn } from '@/util/cn'

const HeaderLink: React.FC<IHeaderLinkProps> = ({
  path,
  text,
  isPrimary,
  isMobile = false,
  onClick,
}) => {
  const location = useLocation()
  const isActive = location.pathname === path

  const baseClasses = cn(
    'transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md font-medium',
    isMobile
      ? 'block px-3 py-2 text-base w-full text-left'
      : 'inline-flex items-center px-4 py-2 text-sm'
  )

  /**
   * Primary Link Variant
   */
  if (isPrimary) {
    return (
      <Link
        to={path}
        onClick={onClick}
        className={cn(
          baseClasses,
          isActive
            ? 'bg-primary text-primary-foreground shadow-md'
            : 'bg-primary/90 text-primary-foreground hover:bg-primary hover:shadow-lg transform hover:scale-105',
          isMobile && 'justify-center'
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        {text}
      </Link>
    )
  }

  /**
   * Basic Link Variant
   */
  return (
    <Link
      to={path}
      onClick={onClick}
      className={cn(
        baseClasses,
        isActive
          ? 'text-primary bg-primary/10 border border-primary/20'
          : 'text-muted-foreground hover:text-primary hover:bg-accent'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {text}
    </Link>
  )
}

export default HeaderLink

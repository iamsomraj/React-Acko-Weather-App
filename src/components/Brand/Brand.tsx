import { Link, useLocation } from 'react-router'
import { IBrandProps } from '@/types'

const Brand: React.FC<IBrandProps> = ({ homePage, brandName }) => {
  const location = useLocation()
  const isHome = location.pathname === homePage

  /**
   * Brand or Logo component for Navigation
   */
  return (
    <Link
      data-testid="brand-link"
      to={homePage}
      className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 hover:from-primary-500 hover:via-primary-400 hover:to-secondary-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md p-1"
      aria-label={`${brandName} - Go to homepage`}
      aria-current={isHome ? 'page' : undefined}
    >
      {brandName}
    </Link>
  )
}

export default Brand

import { IUtilContainerProps } from '@/types'

const UtilContainer: React.FC<IUtilContainerProps> = ({ children, isHome }) => {
  /**
   * reusable parent container
   */

  /**
   * handling for home page
   */
  if (isHome) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50">
        {children}
      </div>
    )
  }

  /**
   * container for all rest scenarios
   */
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-10 py-12 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">{children}</div>
      </div>
    </div>
  )
}

export default UtilContainer

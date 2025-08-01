import { IFunElementProps } from '@/types'

const FunElement: React.FC<IFunElementProps> = ({ position, translate }) => {
  /**
   * Animated Decorative Element for adding visual interest to the UI
   * Features floating, rotating, and pulsing animations
   */
  return (
    <div className="hidden lg:block">
      <div className={`absolute ${position} transform ${translate} opacity-30`}>
        {/* Primary floating element with gentle rotation */}
        <div className="absolute bg-gradient-to-br from-primary-300 to-primary-400 w-48 h-48 rounded-3xl transform -rotate-2 animate-float-slow shadow-lg"></div>

        {/* Secondary element with opposite rotation and floating */}
        <div className="absolute ml-10 mt-10 bg-gradient-to-br from-secondary-300 to-secondary-400 w-48 h-48 rounded-3xl transform rotate-3 animate-float-medium shadow-md"></div>

        {/* Tertiary element with faster floating animation - high contrast */}
        <div className="absolute ml-20 mt-6 bg-gradient-to-br from-purple-500 to-purple-700 w-48 h-48 rounded-3xl transform -rotate-6 animate-float-fast shadow-xl border border-purple-400/30"></div>

        {/* Additional small floating dots for extra visual interest */}
        <div className="absolute ml-32 mt-8 bg-gradient-to-br from-warning-300 to-warning-400 w-12 h-12 rounded-full animate-bounce-gentle opacity-70"></div>
        <div className="absolute ml-4 mt-32 bg-gradient-to-br from-info-300 to-info-400 w-8 h-8 rounded-full animate-float-slow opacity-60"></div>
      </div>
    </div>
  )
}

export default FunElement

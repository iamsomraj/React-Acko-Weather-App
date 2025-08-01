import { cn } from '@/util/cn'

export function WeatherHeader({ className }: { className?: string }) {
  return (
    <div
      data-testid="weather-header-element"
      className={cn(
        'uppercase tracking-wider my-2 font-medium text-2xl text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-800',
        className
      )}
    >
      Check Forecast
    </div>
  )
}

export default WeatherHeader

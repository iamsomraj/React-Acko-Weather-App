import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  Cloudy,
  Moon,
  Sun,
  type LucideIcon,
} from 'lucide-react'
import type { Condition } from '@/frontendTypes'
import { cn } from '@/lib/utils'

const ICONS = {
  thunderstorm: CloudLightning,
  drizzle: CloudDrizzle,
  rain: CloudRain,
  snow: CloudSnow,
  atmosphere: CloudFog,
  'clear-day': Sun,
  'clear-night': Moon,
  'partly-cloudy-day': CloudSun,
  'partly-cloudy-night': CloudMoon,
  overcast: Cloudy,
  cloudy: Cloud,
} satisfies Record<string, LucideIcon>

const iconKeyFor = ({ group, code, isDay }: Condition): keyof typeof ICONS => {
  switch (group) {
    case 'clear':
      return isDay ? 'clear-day' : 'clear-night'
    case 'clouds':
      if (code === 801 || code === 802)
        return isDay ? 'partly-cloudy-day' : 'partly-cloudy-night'
      return code === 804 ? 'overcast' : 'cloudy'
    default:
      return group
  }
}

const toneFor = ({ group, isDay }: Condition) => {
  if (group === 'clear') return isDay ? 'text-amber-400' : 'text-indigo-300'
  if (group === 'thunderstorm') return 'text-violet-500 dark:text-violet-300'
  if (group === 'rain' || group === 'drizzle')
    return 'text-sky-500 dark:text-sky-300'
  if (group === 'snow') return 'text-cyan-400 dark:text-cyan-200'
  return 'text-slate-400 dark:text-slate-300'
}

interface WeatherIconProps {
  condition: Condition
  className?: string
  /** Provide when the icon conveys information not present in nearby text. */
  label?: string
}

export function WeatherIcon({ condition, className, label }: WeatherIconProps) {
  const Icon = ICONS[iconKeyFor(condition)]
  return (
    <Icon
      className={cn('shrink-0', toneFor(condition), className)}
      strokeWidth={1.75}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
    />
  )
}

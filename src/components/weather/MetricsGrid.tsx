import type { ReactNode } from 'react'
import {
  Cloud,
  Droplet,
  Eye,
  Gauge,
  Navigation,
  Thermometer,
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import type { CurrentConditions } from '@/frontendTypes'
import { useUnits } from '@/hooks'
import {
  formatPressure,
  formatTemp,
  formatVisibility,
  formatWindSpeed,
} from '@/lib/format'

interface MetricTileProps {
  icon: ReactNode
  label: string
  value: ReactNode
  hint?: ReactNode
  children?: ReactNode
}

function MetricTile({ icon, label, value, hint, children }: MetricTileProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl glass p-4">
      <dt className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {icon}
        {label}
      </dt>
      <dd className="space-y-2">
        <p className="text-2xl font-semibold tracking-tight tabular">{value}</p>
        {children}
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </dd>
    </div>
  )
}

const feelsLikeHint = (current: CurrentConditions) => {
  const delta = current.feelsLike - current.temperature
  if (Math.abs(delta) < 1.5) return 'Similar to the actual temperature.'
  return delta > 0
    ? 'Humidity makes it feel warmer.'
    : 'Wind makes it feel colder.'
}

const humidityHint = (humidity: number) => {
  if (humidity < 30) return 'Dry air.'
  if (humidity < 60) return 'Comfortable.'
  if (humidity < 80) return 'A little muggy.'
  return 'Very humid.'
}

const pressureHint = (hPa: number) => {
  if (hPa < 1000) return 'Low — unsettled weather likely.'
  if (hPa > 1022) return 'High — generally settled.'
  return 'Normal.'
}

export function MetricsGrid({ current }: { current: CurrentConditions }) {
  const { units } = useUnits()
  const iconClass = 'size-3.5'

  return (
    <section aria-labelledby="metrics-heading" className="space-y-3">
      <h2 id="metrics-heading" className="sr-only">
        Current details
      </h2>
      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <MetricTile
          icon={<Thermometer className={iconClass} aria-hidden />}
          label="Feels like"
          value={formatTemp(current.feelsLike)}
          hint={feelsLikeHint(current)}
        />
        <MetricTile
          icon={<Droplet className={iconClass} aria-hidden />}
          label="Humidity"
          value={`${current.humidity}%`}
          hint={humidityHint(current.humidity)}
        >
          <Progress
            value={current.humidity}
            className="h-1.5"
            aria-label="Humidity"
          />
        </MetricTile>
        <MetricTile
          icon={<Navigation className={iconClass} aria-hidden />}
          label="Wind"
          value={formatWindSpeed(current.wind.speed, units)}
          hint={
            current.wind.gust
              ? `Gusts up to ${formatWindSpeed(current.wind.gust, units)}`
              : `From the ${current.wind.direction}`
          }
        >
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Navigation
              className="size-4 text-primary transition-transform"
              // The arrow points where the wind is blowing *to*.
              style={{
                transform: `rotate(${current.wind.degrees + 180 - 45}deg)`,
              }}
              aria-hidden
            />
            {current.wind.direction} · {current.wind.degrees}°
          </span>
        </MetricTile>
        <MetricTile
          icon={<Gauge className={iconClass} aria-hidden />}
          label="Pressure"
          value={formatPressure(current.pressure)}
          hint={pressureHint(current.pressure)}
        />
        <MetricTile
          icon={<Eye className={iconClass} aria-hidden />}
          label="Visibility"
          value={formatVisibility(current.visibility, units)}
          hint={
            current.visibility !== null && current.visibility >= 10_000
              ? 'Perfectly clear.'
              : 'Reduced visibility.'
          }
        />
        <MetricTile
          icon={<Cloud className={iconClass} aria-hidden />}
          label="Cloud cover"
          value={`${current.cloudCover}%`}
        >
          <Progress
            value={current.cloudCover}
            className="h-1.5"
            aria-label="Cloud cover"
          />
        </MetricTile>
      </dl>
    </section>
  )
}

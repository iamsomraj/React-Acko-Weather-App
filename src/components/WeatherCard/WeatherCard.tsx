import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/util/cn'

interface WeatherCardProps {
  title: string
  temperature?: number
  description?: string
  humidity?: number
  windSpeed?: number
  pressure?: number
  icon?: string
  className?: string
}

export function WeatherCard({
  title,
  temperature,
  description,
  humidity,
  windSpeed,
  pressure,
  icon,
  className,
}: WeatherCardProps) {
  const temperatureLabel =
    temperature !== undefined
      ? `${Math.round(temperature)} degrees Celsius`
      : undefined

  return (
    <Card
      className={cn(
        'w-full transition-all hover:shadow-lg animate-fade-in',
        className
      )}
      role="article"
      aria-labelledby={`weather-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle
          id={`weather-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
          className="text-sm font-medium"
        >
          {title}
        </CardTitle>
        {icon && (
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description ? `Weather: ${description}` : 'Weather icon'}
            className="h-10 w-10"
            loading="lazy"
          />
        )}
      </CardHeader>
      <CardContent>
        <div
          className="space-y-3"
          role="group"
          aria-label={`Weather information for ${title}`}
        >
          {temperature !== undefined && (
            <div className="flex items-baseline space-x-2">
              <span
                className="text-2xl font-bold text-primary"
                aria-label={temperatureLabel}
              >
                {Math.round(temperature)}°C
              </span>
              {description && (
                <span className="text-sm text-muted-foreground capitalize">
                  {description}
                </span>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 gap-2 text-sm">
            {humidity !== undefined && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Humidity:</span>
                <span
                  className="font-medium"
                  aria-label={`${humidity} percent humidity`}
                >
                  {humidity}%
                </span>
              </div>
            )}
            {windSpeed !== undefined && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Wind Speed:</span>
                <span
                  className="font-medium"
                  aria-label={`${windSpeed} meters per second wind speed`}
                >
                  {windSpeed} m/s
                </span>
              </div>
            )}
            {pressure !== undefined && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Pressure:</span>
                <span
                  className="font-medium"
                  aria-label={`${pressure} hectopascals atmospheric pressure`}
                >
                  {pressure} hPa
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default WeatherCard

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utils/cn'

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
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && (
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description || 'Weather icon'}
            className="h-10 w-10"
          />
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {temperature !== undefined && (
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold">
                {Math.round(temperature)}°C
              </span>
              {description && (
                <span className="text-sm text-muted-foreground capitalize">
                  {description}
                </span>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 gap-1 text-sm">
            {humidity !== undefined && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Humidity:</span>
                <span>{humidity}%</span>
              </div>
            )}
            {windSpeed !== undefined && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Wind:</span>
                <span>{windSpeed} m/s</span>
              </div>
            )}
            {pressure !== undefined && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pressure:</span>
                <span>{pressure} hPa</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default WeatherCard

import { ITemperatureIndicatorProps } from '@/types'

const TemperatureIndicator: React.FC<ITemperatureIndicatorProps> = ({
  val,
  index,
}) => {
  if (index !== 2) return null

  /**
   * index === 2 means Real Feel
   */
  const numericVal = typeof val === 'string' ? parseFloat(val) : val

  const getIndicatorInfo = (temperature: number) => {
    if (temperature < 5) {
      return {
        color: 'bg-primary',
        label: 'Very Cold',
        description: 'Temperature feels very cold',
      }
    }
    if (temperature < 20) {
      return {
        color: 'bg-success',
        label: 'Comfortable',
        description: 'Temperature feels comfortable',
      }
    }
    if (temperature > 25) {
      return {
        color: 'bg-destructive',
        label: 'Hot',
        description: 'Temperature feels hot',
      }
    }
    return {
      color: 'bg-warning',
      label: 'Warm',
      description: 'Temperature feels warm',
    }
  }

  const indicator = getIndicatorInfo(numericVal)

  return (
    <span
      className={`inline-block h-3 w-3 rounded-full ${indicator.color} ring-2 ring-background shadow-sm`}
      role="img"
      aria-label={`${indicator.label}: ${indicator.description}`}
      title={`Real feel: ${numericVal}°C (${indicator.label})`}
    />
  )
}

export default TemperatureIndicator

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { Units } from '@/frontendTypes'
import { useUnits } from '@/providers/UnitsProvider'

export function UnitsToggle() {
  const { units, setUnits } = useUnits()

  return (
    <ToggleGroup
      type="single"
      size="sm"
      variant="outline"
      value={units}
      onValueChange={(value) => value && setUnits(value as Units)}
      aria-label="Temperature units"
    >
      <ToggleGroupItem
        value="metric"
        aria-label="Celsius"
        className="px-2.5 text-xs"
      >
        °C
      </ToggleGroupItem>
      <ToggleGroupItem
        value="imperial"
        aria-label="Fahrenheit"
        className="px-2.5 text-xs"
      >
        °F
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

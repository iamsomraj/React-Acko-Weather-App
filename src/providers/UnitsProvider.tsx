import { createContext, useContext, useMemo, type ReactNode } from 'react'
import type { Units } from '@/frontendTypes'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { STORAGE_KEYS } from '@/lib/constants'

interface UnitsContextValue {
  units: Units
  setUnits: (units: Units) => void
}

const UnitsContext = createContext<UnitsContextValue | null>(null)

const defaultUnits = (): Units =>
  typeof navigator !== 'undefined' && navigator.language === 'en-US'
    ? 'imperial'
    : 'metric'

export function UnitsProvider({ children }: { children: ReactNode }) {
  const [units, setUnits] = useLocalStorage<Units>(
    STORAGE_KEYS.units,
    defaultUnits()
  )
  const value = useMemo(() => ({ units, setUnits }), [units, setUnits])
  return <UnitsContext.Provider value={value}>{children}</UnitsContext.Provider>
}

export function useUnits() {
  const context = useContext(UnitsContext)
  if (!context) throw new Error('useUnits must be used within UnitsProvider')
  return context
}

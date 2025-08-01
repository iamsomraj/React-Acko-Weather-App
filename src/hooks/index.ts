import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/state/store'

// Typed hooks for better TypeScript experience
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector)

export { useAppDispatch as useDispatch, useAppSelector as useSelector }

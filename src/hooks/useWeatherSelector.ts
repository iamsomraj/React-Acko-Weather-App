import { useSelector, TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/state/store'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

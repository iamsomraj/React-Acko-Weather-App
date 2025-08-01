import { combineReducers } from 'redux'
import weatherReducer from '@/state/reducers/weatherReducer'

export const rootReducer = combineReducers({
  weather: weatherReducer,
})

export type RootState = ReturnType<typeof rootReducer>

import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from '@/state/reducers/weatherReducer'

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  devTools: true, // Enable Redux DevTools in all environments for development
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

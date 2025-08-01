import { describe, it, expect, vi, beforeEach } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import axios from 'axios'
import weatherReducer, {
  fetchWeatherData,
  fetchWeatherDataByCoords,
  initState,
  clearError,
} from '../weatherReducer'
import type { IWeatherState } from '../../../types'

vi.mock('axios')
const mockedAxios = vi.mocked(axios)

const mockWeatherResponse = {
  list: [
    {
      dt: 1640995200,
      main: { temp: 20, feels_like: 18 },
      weather: [{ main: 'Clear', description: 'clear sky' }],
      dt_txt: '2022-01-01 12:00:00',
    },
  ],
  city: { name: 'London', country: 'GB' },
}

type TestStore = ReturnType<typeof configureStore<{ weather: IWeatherState }>>

describe('Weather Reducer', () => {
  let store: TestStore

  beforeEach(() => {
    store = configureStore({
      reducer: { weather: weatherReducer },
    })
    vi.clearAllMocks()
  })

  it('should handle initial state', () => {
    const state = store.getState().weather
    expect(state.loading).toBe(false)
    expect(state.data).toBe(null)
    expect(state.error).toBe(null)
  })

  it('should handle initState action', () => {
    store.dispatch(initState())
    const state = store.getState().weather
    expect(state.loading).toBe(false)
    expect(state.data).toBe(null)
    expect(state.error).toBe(null)
  })

  it('should handle clearError action', () => {
    store.dispatch(clearError())
    const state = store.getState().weather
    expect(state.error).toBe(null)
  })

  it('should handle fetchWeatherData.pending', () => {
    const mockGet = vi.fn().mockResolvedValue({ data: mockWeatherResponse })
    mockedAxios.get = mockGet

    store.dispatch(fetchWeatherData('London'))
    const state = store.getState().weather
    expect(state.loading).toBe(true)
    expect(state.error).toBe(null)
  })

  it('should handle fetchWeatherDataByCoords.pending', () => {
    const mockGet = vi.fn().mockResolvedValue({ data: mockWeatherResponse })
    mockedAxios.get = mockGet

    store.dispatch(fetchWeatherDataByCoords({ lat: 51.5074, lng: -0.1278 }))
    const state = store.getState().weather
    expect(state.loading).toBe(true)
    expect(state.error).toBe(null)
  })

  it('should fetch weather data by city successfully', async () => {
    const mockGet = vi.fn().mockResolvedValue({ data: mockWeatherResponse })
    mockedAxios.get = mockGet

    await store.dispatch(fetchWeatherData('London'))
    const state = store.getState().weather

    expect(state.loading).toBe(false)
    expect(state.data).toEqual(mockWeatherResponse)
    expect(state.error).toBe(null)
    expect(mockGet).toHaveBeenCalledWith(
      expect.stringContaining('api.openweathermap.org'),
      expect.objectContaining({
        params: expect.objectContaining({
          q: 'London',
        }),
      })
    )
  })

  it('should fetch weather data by coordinates successfully', async () => {
    const mockGet = vi.fn().mockResolvedValue({ data: mockWeatherResponse })
    mockedAxios.get = mockGet

    const coords = { lat: 51.5074, lng: -0.1278 }
    await store.dispatch(fetchWeatherDataByCoords(coords))
    const state = store.getState().weather

    expect(state.loading).toBe(false)
    expect(state.data).toEqual(mockWeatherResponse)
    expect(state.error).toBe(null)
    expect(mockGet).toHaveBeenCalledWith(
      expect.stringContaining('api.openweathermap.org'),
      expect.objectContaining({
        params: expect.objectContaining({
          lat: coords.lat,
          lon: coords.lng,
        }),
      })
    )
  })

  it('should handle fetchWeatherData.rejected', async () => {
    const errorMessage = 'City not found'
    const mockGet = vi.fn().mockRejectedValue({
      response: { data: { message: errorMessage } },
    })
    mockedAxios.get = mockGet

    await store.dispatch(fetchWeatherData('InvalidCity'))
    const state = store.getState().weather

    expect(state.loading).toBe(false)
    expect(state.data).toBe(null)
    expect(state.error).toBe(errorMessage)
  })

  it('should handle fetchWeatherDataByCoords.rejected', async () => {
    const errorMessage = 'Invalid coordinates'
    const mockGet = vi.fn().mockRejectedValue({
      response: { data: { message: errorMessage } },
    })
    mockedAxios.get = mockGet

    await store.dispatch(fetchWeatherDataByCoords({ lat: 999, lng: 999 }))
    const state = store.getState().weather

    expect(state.loading).toBe(false)
    expect(state.data).toBe(null)
    expect(state.error).toBe(errorMessage)
  })
})

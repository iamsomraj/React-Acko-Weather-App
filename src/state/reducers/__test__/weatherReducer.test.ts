import { describe, it, expect, vi, beforeEach } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import axios from 'axios'
import weatherReducer, {
  fetchWeatherData,
  fetchWeatherDataByCoords,
  initState,
  clearError,
} from '../../../state/reducers/weatherReducer'

// Mock axios
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

describe('Weather Reducer', () => {
  let store: ReturnType<typeof configureStore>

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
    mockedAxios.get.mockResolvedValue({ data: mockWeatherResponse })

    store.dispatch(fetchWeatherData('London'))
    const state = store.getState().weather
    expect(state.loading).toBe(true)
    expect(state.error).toBe(null)
  })

  it('should handle fetchWeatherDataByCoords.pending', () => {
    mockedAxios.get.mockResolvedValue({ data: mockWeatherResponse })

    store.dispatch(fetchWeatherDataByCoords({ lat: 51.5074, lng: -0.1278 }))
    const state = store.getState().weather
    expect(state.loading).toBe(true)
    expect(state.error).toBe(null)
  })

  it('should fetch weather data by city successfully', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockWeatherResponse })

    await store.dispatch(fetchWeatherData('London'))
    const state = store.getState().weather

    expect(state.loading).toBe(false)
    expect(state.data).toEqual(mockWeatherResponse)
    expect(state.error).toBe(null)
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('api.openweathermap.org'),
      expect.objectContaining({
        params: expect.objectContaining({
          q: 'London',
        }),
      })
    )
  })

  it('should fetch weather data by coordinates successfully', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockWeatherResponse })

    const coords = { lat: 51.5074, lng: -0.1278 }
    await store.dispatch(fetchWeatherDataByCoords(coords))
    const state = store.getState().weather

    expect(state.loading).toBe(false)
    expect(state.data).toEqual(mockWeatherResponse)
    expect(state.error).toBe(null)
    expect(mockedAxios.get).toHaveBeenCalledWith(
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
    mockedAxios.get.mockRejectedValue({
      response: { data: { message: errorMessage } },
    })

    await store.dispatch(fetchWeatherData('InvalidCity'))
    const state = store.getState().weather

    expect(state.loading).toBe(false)
    expect(state.data).toBe(null)
    expect(state.error).toBe(errorMessage)
  })

  it('should handle fetchWeatherDataByCoords.rejected', async () => {
    const errorMessage = 'Invalid coordinates'
    mockedAxios.get.mockRejectedValue({
      response: { data: { message: errorMessage } },
    })

    await store.dispatch(fetchWeatherDataByCoords({ lat: 999, lng: 999 }))
    const state = store.getState().weather

    expect(state.loading).toBe(false)
    expect(state.data).toBe(null)
    expect(state.error).toBe(errorMessage)
  })
})

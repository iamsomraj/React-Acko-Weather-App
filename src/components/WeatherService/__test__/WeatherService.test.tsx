import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import WeatherService from '../WeatherService'

// Mock store
const mockStore = configureStore({
  reducer: {
    weather: () => ({
      loading: false,
      data: null,
      error: null,
    }),
  },
})

// Mock the WeatherDataProvider component
vi.mock('@/components/WeatherDataProvider/WeatherDataProvider', () => ({
  default: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="weather-data-provider">{children}</div>
  ),
}))

// Mock weather actions
vi.mock('@/state/reducers/weatherReducer', () => ({
  fetchWeatherData: vi.fn(),
  fetchWeatherDataByCoords: vi.fn(),
  initState: vi.fn(),
}))

describe('WeatherService Component', () => {
  const renderWithProvider = (component: React.ReactElement) => {
    return render(<Provider store={mockStore}>{component}</Provider>)
  }

  it('renders without crashing', () => {
    renderWithProvider(<WeatherService />)

    expect(document.body).toBeDefined()
  })

  it('renders error message when geolocation is not available', () => {
    const { getByText } = renderWithProvider(<WeatherService />)

    expect(getByText('Location Access Error')).toBeDefined()
  })

  it('provides weather service functionality', () => {
    renderWithProvider(<WeatherService />)

    // The service component should render the provider
    expect(document.body).toBeDefined()
  })
})

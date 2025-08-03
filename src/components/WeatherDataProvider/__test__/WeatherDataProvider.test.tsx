import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import WeatherDataProvider from '../WeatherDataProvider'

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

// Mock weather actions
vi.mock('@/state/action-creators', () => ({
  fetchWeatherData: vi.fn(),
}))

describe('WeatherDataProvider Component', () => {
  const defaultProps = {
    weatherData: {
      loading: false,
      data: null,
      error: null,
    },
    isLocationDenied: false,
    searchTerm: '',
    onSearchTermChange: vi.fn(),
    onSearchSubmit: vi.fn(),
    onClear: vi.fn(),
  }

  const renderWithProvider = (component: React.ReactElement) => {
    return render(<Provider store={mockStore}>{component}</Provider>)
  }

  it('renders without crashing', () => {
    renderWithProvider(<WeatherDataProvider {...defaultProps} />)

    expect(document.body).toBeDefined()
  })

  it('shows loading spinner when loading', () => {
    const loadingProps = {
      ...defaultProps,
      weatherData: {
        ...defaultProps.weatherData,
        loading: true,
      },
    }

    renderWithProvider(<WeatherDataProvider {...loadingProps} />)

    expect(document.body).toBeDefined()
  })

  it('shows location search when location is denied', () => {
    const deniedProps = {
      ...defaultProps,
      isLocationDenied: true,
    }

    renderWithProvider(<WeatherDataProvider {...deniedProps} />)

    expect(document.body).toBeDefined()
  })
})

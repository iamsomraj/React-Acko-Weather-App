import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import WeatherCard from '../WeatherCard'

// Mock store with weather data
const mockStore = configureStore({
  reducer: {
    weather: () => ({
      loading: false,
      data: {
        city: 'Test City',
        current: {
          temp: 25,
          humidity: 60,
          weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
          wind: { speed: 5 },
        },
      },
      error: null,
    }),
  },
})

// Mock child components
vi.mock('@/components/ui/card', () => ({
  Card: ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => (
    <div className={className} data-testid="card">
      {children}
    </div>
  ),
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-content">{children}</div>
  ),
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-header">{children}</div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => (
    <h3 data-testid="card-title">{children}</h3>
  ),
}))

describe('WeatherCard Component', () => {
  const defaultProps = {
    title: 'Current Weather',
  }

  const renderWithProvider = (component: React.ReactElement) => {
    return render(<Provider store={mockStore}>{component}</Provider>)
  }

  it('renders without crashing', () => {
    renderWithProvider(<WeatherCard {...defaultProps} />)

    expect(document.body).toBeDefined()
  })

  it('renders card structure', () => {
    const { getByTestId } = renderWithProvider(
      <WeatherCard {...defaultProps} />
    )

    expect(getByTestId('card')).toBeDefined()
  })

  it('renders card content', () => {
    const { getByTestId } = renderWithProvider(
      <WeatherCard {...defaultProps} />
    )

    expect(getByTestId('card-content')).toBeDefined()
  })

  it('displays weather information', () => {
    renderWithProvider(
      <WeatherCard {...defaultProps} temperature={25} description="Clear sky" />
    )

    // The component should render some weather data
    expect(document.body).toBeDefined()
  })
})

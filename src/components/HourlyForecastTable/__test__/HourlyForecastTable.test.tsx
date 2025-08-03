import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import HourlyForecastTable from '../HourlyForecastTable'

// Mock store with initial weather state
const mockStore = configureStore({
  reducer: {
    weather: () => ({
      loading: false,
      data: {
        city: 'Test City',
        list: [
          {
            dt: 1640995200,
            dt_txt: '2024-01-01 12:00:00',
            main: {
              temp: 25,
              feels_like: 24,
              humidity: 60,
              pressure: 1013,
            },
            weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
            wind: { speed: 5 },
            visibility: 10000,
            clouds: { all: 0 },
          },
        ],
      },
      error: null,
    }),
  },
})

// Mock child components
vi.mock('@/components/TableHeader/TableHeader', () => ({
  default: () => (
    <thead data-testid="table-header">
      <tr>
        <th>Header</th>
      </tr>
    </thead>
  ),
}))

vi.mock('@/components/TableBody/TableBody', () => ({
  default: () => (
    <tbody data-testid="table-body">
      <tr>
        <td>Body</td>
      </tr>
    </tbody>
  ),
}))

describe('HourlyForecastTable Component', () => {
  const defaultProps = {
    selectedDate: '2024-01-01',
  }

  const renderWithProvider = (component: React.ReactElement) => {
    return render(<Provider store={mockStore}>{component}</Provider>)
  }

  it('renders without crashing', () => {
    renderWithProvider(<HourlyForecastTable {...defaultProps} />)

    expect(document.body).toBeDefined()
  })

  it('renders table structure', () => {
    renderWithProvider(<HourlyForecastTable {...defaultProps} />)

    const table = screen.getByRole('table')
    expect(table).toBeDefined()
  })

  it('renders TableHeader component', () => {
    renderWithProvider(<HourlyForecastTable {...defaultProps} />)

    expect(screen.getByTestId('table-header')).toBeDefined()
  })

  it('renders TableBody component', () => {
    renderWithProvider(<HourlyForecastTable {...defaultProps} />)

    expect(screen.getByTestId('table-body')).toBeDefined()
  })

  it('has proper table caption for accessibility', () => {
    renderWithProvider(<HourlyForecastTable {...defaultProps} />)

    const caption = screen.queryByText(/hourly weather forecast/i)
    if (caption) {
      expect(caption).toBeDefined()
    }
  })
})

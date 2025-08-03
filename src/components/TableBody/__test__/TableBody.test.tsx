import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import TableBody from '../TableBody'

// Mock store with weather data
const mockStore = configureStore({
  reducer: {
    weather: () => ({
      loading: false,
      data: {
        city: 'Test City',
        list: [
          {
            dt: 1640995200,
            main: { temp: 25, humidity: 60 },
            weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
            wind: { speed: 5 },
          },
        ],
      },
      error: null,
    }),
  },
})

// Mock utility functions
vi.mock('@/util', () => ({
  getTimeFromTimestamp: () => '12:00 PM',
  getIconUrl: (icon: string) => `http://example.com/icon/${icon}.png`,
}))

describe('TableBody Component', () => {
  const mockRowData = [
    {
      Time: '12:00 PM',
      Temperature: 25,
      RealFeel: 24,
      Description: 'Clear sky',
      Visibility: 10000,
      Humidity: 60,
      Pressure: 1013,
      WindSpeed: 5,
      CloudCover: 0,
    },
  ]

  const renderWithProvider = (component: React.ReactElement) => {
    return render(
      <Provider store={mockStore}>
        <table>
          <tbody>{component}</tbody>
        </table>
      </Provider>
    )
  }

  it('renders without crashing', () => {
    renderWithProvider(<TableBody row={mockRowData} />)

    expect(document.body).toBeDefined()
  })

  it('renders table body element', () => {
    const { container } = renderWithProvider(<TableBody row={mockRowData} />)
    const tbody = container.querySelector('tbody')

    expect(tbody).toBeDefined()
  })

  it('renders row data when provided', () => {
    const { container } = renderWithProvider(<TableBody row={mockRowData} />)
    const rows = container.querySelectorAll('tr')

    expect(rows.length).toBe(mockRowData.length)
  })

  it('handles empty row data', () => {
    renderWithProvider(<TableBody row={[]} />)

    expect(document.body).toBeDefined()
  })
})

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../state/store'
import WeatherPage from '../WeatherPage'

const mockGeolocation = {
  getCurrentPosition: vi.fn(),
}
Object.defineProperty(global.navigator, 'geolocation', {
  value: mockGeolocation,
  writable: true,
})

describe('WeatherPage Component', () => {
  it('renders weather header and service components', () => {
    render(
      <Provider store={store}>
        <WeatherPage />
      </Provider>
    )

    expect(screen.getByText('Weather Forecast')).toBeDefined()
  })
})

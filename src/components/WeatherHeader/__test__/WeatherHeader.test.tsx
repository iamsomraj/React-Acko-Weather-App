import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import WeatherHeader from '../WeatherHeader'

describe('WeatherHeader Component', () => {
  it('renders the header text correctly', () => {
    const { getByTestId } = render(<WeatherHeader />)
    const element = getByTestId('weather-header-element')
    expect(element.innerHTML.includes('Weather Forecast')).toBeTruthy()
  })
})

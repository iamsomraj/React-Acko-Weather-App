import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '@/App'
import {
  airPollutionResponse,
  currentWeatherResponse,
  forecastResponse,
} from '@/test/fixtures/weather'
import { mockFetchByPath, renderWithProviders } from '@/test/utils'

describe('App routing', () => {
  it('renders the home page with search', async () => {
    renderWithProviders(<App />, { route: '/' })
    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: /beautifully clear/i,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('combobox', { name: /search for a city/i })
    ).toBeInTheDocument()
  })

  it('redirects the legacy /weather-forecast route to the empty forecast page', async () => {
    renderWithProviders(<App />, { route: '/weather-forecast' })
    expect(
      await screen.findByRole('heading', { name: /where are you headed/i })
    ).toBeInTheDocument()
  })

  it('shows a 404 for unknown routes', async () => {
    renderWithProviders(<App />, { route: '/nope' })
    expect(
      await screen.findByRole('heading', { name: /lost in the clouds/i })
    ).toBeInTheDocument()
  })

  it('renders the full dashboard for a location URL', async () => {
    mockFetchByPath({
      '/data/2.5/weather': currentWeatherResponse,
      '/data/2.5/forecast': forecastResponse(),
      '/data/2.5/air_pollution': airPollutionResponse,
    })
    renderWithProviders(<App />, {
      route: '/weather?lat=19.0761&lon=72.8775&name=Mumbai&country=IN',
    })

    expect(
      await screen.findByRole('heading', { level: 1, name: /Mumbai, IN/ })
    ).toBeInTheDocument()
    expect(screen.getByText('Next 48 hours')).toBeInTheDocument()
    expect(screen.getByText('3-day forecast')).toBeInTheDocument()
    expect(await screen.findByText('Moderate')).toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(document.title).toBe('Mumbai weather · WeatherNow')
  })

  it('shows a retryable error when the API fails', async () => {
    mockFetchByPath({
      '/data/2.5/weather': () => new Response('{}', { status: 404 }),
      '/data/2.5/forecast': () => new Response('{}', { status: 404 }),
    })
    renderWithProviders(<App />, { route: '/weather?lat=1&lon=1&name=Nowhere' })

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /couldn't find that location/i
    )
    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument()
  })
})

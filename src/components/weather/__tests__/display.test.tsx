import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CurrentConditionsHero } from '@/components/weather/CurrentConditionsHero'
import { DailyForecastList } from '@/components/weather/DailyForecastList'
import { toCurrentConditions, toForecast } from '@/converters'
import { STORAGE_KEYS } from '@/lib/constants'
import {
  currentWeatherResponse,
  forecastResponse,
} from '@/test/fixtures/weather'
import { renderWithProviders } from '@/test/utils'

describe('CurrentConditionsHero', () => {
  it('shows the searched place name, temperature and conditions', () => {
    localStorage.setItem(STORAGE_KEYS.units, '"metric"')
    renderWithProviders(
      <CurrentConditionsHero
        current={toCurrentConditions(currentWeatherResponse)}
        displayName={{ name: 'Bombay', country: 'IN' }}
        todayRange={{ min: 25.2, max: 31.6 }}
      />
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Bombay, IN'
    )
    expect(screen.getByText('28°')).toBeInTheDocument()
    expect(screen.getByText('°C')).toHaveClass('sr-only')
    expect(screen.getByText('Scattered clouds')).toBeInTheDocument()
    expect(screen.getByText(/Feels like 32°/)).toBeInTheDocument()
    expect(screen.getByText('UTC+5:30', { exact: false })).toBeInTheDocument()
    expect(screen.getByText('Wind 18 km/h WSW')).toBeInTheDocument()
  })
})

describe('DailyForecastList', () => {
  it('lists each day and reports the selected one', async () => {
    const forecast = toForecast(forecastResponse())
    const onSelect = vi.fn()
    const user = userEvent.setup()
    renderWithProviders(
      <DailyForecastList
        forecast={forecast}
        selectedDate="2026-10-06"
        onSelect={onSelect}
      />
    )

    const buttons = within(screen.getByRole('list')).getAllByRole('button')
    expect(buttons).toHaveLength(3)
    expect(buttons[0]).toHaveAttribute('aria-pressed', 'true')

    await user.click(buttons[1]!)
    expect(onSelect).toHaveBeenCalledWith('2026-10-07')
  })
})

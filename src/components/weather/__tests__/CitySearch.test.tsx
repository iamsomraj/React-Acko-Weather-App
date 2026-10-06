import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Route, Routes, useLocation } from 'react-router'
import { describe, expect, it } from 'vitest'
import { CitySearch } from '@/components/weather/CitySearch'
import { STORAGE_KEYS } from '@/lib/constants'
import { geocodingResponse } from '@/test/fixtures/weather'
import { mockFetchByPath, renderWithProviders } from '@/test/utils'

function LocationProbe() {
  const location = useLocation()
  return (
    <output data-testid="location">
      {location.pathname + location.search}
    </output>
  )
}

const renderSearch = () =>
  renderWithProviders(
    <Routes>
      <Route
        path="*"
        element={
          <>
            <CitySearch />
            <LocationProbe />
          </>
        }
      />
    </Routes>
  )

describe('CitySearch', () => {
  it('shows autocomplete results and navigates to the selected city', async () => {
    mockFetchByPath({ '/geo/1.0/direct': geocodingResponse })
    const user = userEvent.setup()
    renderSearch()

    await user.type(
      screen.getByRole('combobox', { name: /search for a city/i }),
      'London'
    )
    const option = await screen.findByRole('option', {
      name: /London, Ontario, CA/,
    })
    await user.click(option)

    await waitFor(() =>
      expect(screen.getByTestId('location')).toHaveTextContent(
        '/weather?lat=42.9834&lon=-81.2330&name=London&country=CA&state=Ontario'
      )
    )
    expect(
      JSON.parse(localStorage.getItem(STORAGE_KEYS.recents)!)
    ).toHaveLength(1)
  })

  it('shows recent searches when focused with an empty query', async () => {
    localStorage.setItem(
      STORAGE_KEYS.recents,
      JSON.stringify([
        { name: 'Tokyo', country: 'JP', lat: 35.68, lon: 139.76 },
      ])
    )
    const user = userEvent.setup()
    renderSearch()

    await user.click(
      screen.getByRole('combobox', { name: /search for a city/i })
    )
    expect(await screen.findByText('Recent')).toBeInTheDocument()
    expect(
      screen.getByRole('option', { name: /Tokyo, JP/ })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('option', { name: /use my current location/i })
    ).toBeInTheDocument()
  })

  it('tells the user when nothing matches', async () => {
    mockFetchByPath({ '/geo/1.0/direct': [] })
    const user = userEvent.setup()
    renderSearch()

    await user.type(
      screen.getByRole('combobox', { name: /search for a city/i }),
      'Qwzx'
    )
    expect(
      await screen.findByText(/No places match "Qwzx"/)
    ).toBeInTheDocument()
  })
})

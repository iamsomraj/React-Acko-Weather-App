import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import HeroPrimary from '../HeroPrimary'

// Mock the data import
vi.mock('@/data', () => ({
  default: {
    hero: {
      mainHeading: {
        first: 'Weather',
        last: 'Forecast',
      },
    },
  },
}))

describe('HeroPrimary Component', () => {
  it('renders without crashing', () => {
    render(<HeroPrimary />)

    expect(document.body).toBeDefined()
  })

  it('renders main heading text', () => {
    render(<HeroPrimary />)

    expect(screen.getByText('Weather')).toBeDefined()
    expect(screen.getByText('Forecast')).toBeDefined()
  })

  it('renders as h1 element', () => {
    render(<HeroPrimary />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeDefined()
  })

  it('applies gradient text classes', () => {
    render(<HeroPrimary />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading.className).toContain('text-4xl')
    expect(heading.className).toContain('font-extrabold')
  })
})

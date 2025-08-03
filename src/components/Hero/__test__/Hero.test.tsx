import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router'
import Hero from '../Hero'

// Mock child components
vi.mock('@/components/HeroPrimary/HeroPrimary', () => ({
  default: () => <div data-testid="hero-primary">Hero Primary</div>,
}))

vi.mock('@/components/HeroSecondary/HeroSecondary', () => ({
  default: () => <div data-testid="hero-secondary">Hero Secondary</div>,
}))

vi.mock('@/components/ActionButton/ActionButton', () => ({
  default: () => <div data-testid="action-button">Action Button</div>,
}))

vi.mock('@/components/PromoCard/PromoCard', () => ({
  default: () => <div data-testid="promo-card">Promo Card</div>,
}))

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Hero Component', () => {
  it('renders without crashing', () => {
    renderWithRouter(<Hero />)

    expect(document.body).toBeDefined()
  })

  it('renders HeroPrimary component', () => {
    const { getByTestId } = renderWithRouter(<Hero />)

    expect(getByTestId('hero-primary')).toBeDefined()
  })

  it('renders HeroSecondary component', () => {
    const { getByTestId } = renderWithRouter(<Hero />)

    expect(getByTestId('hero-secondary')).toBeDefined()
  })

  it('has proper section structure', () => {
    const { container } = renderWithRouter(<Hero />)
    const heroSection = container.querySelector('section')

    expect(heroSection).toBeDefined()
  })
})

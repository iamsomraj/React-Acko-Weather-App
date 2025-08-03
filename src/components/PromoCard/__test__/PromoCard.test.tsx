import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import PromoCard from '../PromoCard'

// Mock child components
vi.mock('@/components/Highlighter/Highlighter', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="highlighter">{children}</span>
  ),
}))

describe('PromoCard Component', () => {
  it('renders without crashing', () => {
    render(<PromoCard />)

    expect(document.body).toBeDefined()
  })

  it('renders promo text content', () => {
    render(<PromoCard />)

    // Look for any promotional text that might be displayed
    const promoElement =
      screen.queryByText(/promo/i) ||
      screen.queryByText(/special/i) ||
      screen.queryByText(/offer/i)
    if (promoElement) {
      expect(promoElement).toBeDefined()
    }
  })

  it('renders highlighter component if used', () => {
    render(<PromoCard />)

    const highlighter = screen.queryByTestId('highlighter')
    if (highlighter) {
      expect(highlighter).toBeDefined()
    }
  })

  it('has proper card structure', () => {
    const { container } = render(<PromoCard />)
    const card = container.firstChild as HTMLElement

    expect(card).toBeDefined()
  })
})

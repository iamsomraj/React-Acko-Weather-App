import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import FooterSection from '../FooterSection'

// Mock the child components
vi.mock('@/components/FooterBottom/FooterBottom', () => ({
  default: () => <div data-testid="footer-bottom">Footer Bottom</div>,
}))

vi.mock('@/components/FooterMain/FooterMain', () => ({
  default: () => <div data-testid="footer-main">Footer Main</div>,
}))

describe('FooterSection Component', () => {
  it('renders without crashing', () => {
    render(<FooterSection />)

    expect(document.body).toBeDefined()
  })

  it('renders FooterMain and FooterBottom components', () => {
    const { getByTestId } = render(<FooterSection />)

    expect(getByTestId('footer-main')).toBeDefined()
    expect(getByTestId('footer-bottom')).toBeDefined()
  })

  it('applies correct container classes', () => {
    const { container } = render(<FooterSection />)
    const footerSection = container.firstChild as HTMLElement

    expect(footerSection.className).toContain('container')
    expect(footerSection.className).toContain('mx-auto')
  })
})

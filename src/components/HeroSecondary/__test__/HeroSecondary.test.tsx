import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import HeroSecondary from '../HeroSecondary'

// Mock the data import
vi.mock('@/data', () => ({
  default: {
    hero: {
      subHeading: {
        first: 'Get accurate weather information for any location.',
        second: 'Real-time data at your fingertips.',
      },
    },
  },
}))

describe('HeroSecondary Component', () => {
  it('renders without crashing', () => {
    render(<HeroSecondary />)

    expect(document.body).toBeDefined()
  })

  it('renders subheading text', () => {
    render(<HeroSecondary />)

    expect(
      screen.getByText('Get accurate weather information for any location.')
    ).toBeDefined()
    expect(screen.getByText('Real-time data at your fingertips.')).toBeDefined()
  })

  it('has proper container structure', () => {
    const { container } = render(<HeroSecondary />)
    const heroSecondary = container.firstChild as HTMLElement

    expect(heroSecondary.className).toContain('mb-8')
    expect(heroSecondary.className).toContain('max-w-2xl')
    expect(heroSecondary.className).toContain('mx-auto')
  })

  it('renders paragraph elements', () => {
    render(<HeroSecondary />)

    const paragraphs = screen.getAllByText(/Get accurate|Real-time/)
    expect(paragraphs.length).toBe(2)
    paragraphs.forEach((p) => {
      expect(p.tagName.toLowerCase()).toBe('p')
    })
  })
})
